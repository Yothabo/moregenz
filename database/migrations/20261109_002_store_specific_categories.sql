BEGIN;

-- ============================================================
-- 1. Verify the expected stores and existing product records.
-- ============================================================

DO $$
BEGIN
    IF (
        SELECT COUNT(*)
        FROM public.stores
        WHERE slug IN ('yotaabo', 'poshies')
    ) <> 2 THEN
        RAISE EXCEPTION
            'Expected Yotaabo and Poshies in the store registry.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.products p
        LEFT JOIN public.stores s
            ON s.slug = p.storefront
        WHERE s.id IS NULL
    ) THEN
        RAISE EXCEPTION
            'One or more products have no matching store.';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgrelid = 'public.products'::regclass
          AND tgname = 'trg_capture_product_activity'
          AND NOT tgisinternal
          AND tgenabled = 'O'
    ) THEN
        RAISE EXCEPTION
            'Expected product activity trigger to exist and be enabled.';
    END IF;
END
$$;

-- ============================================================
-- 2. Create store-owned category and subcategory structures.
-- ============================================================

CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT categories_name_valid
        CHECK (
            length(name) BETWEEN 1 AND 120
            AND name !~ '^[[:space:]]|[[:space:]]$'
            AND name !~ '[[:cntrl:]]'
        ),

    CONSTRAINT categories_slug_valid
        CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),

    CONSTRAINT categories_id_store_unique
        UNIQUE (id, store_id)
);

CREATE UNIQUE INDEX categories_store_name_unique
    ON public.categories (store_id, lower(name));

CREATE UNIQUE INDEX categories_store_slug_unique
    ON public.categories (store_id, slug);

CREATE INDEX categories_store_active_order_idx
    ON public.categories (store_id, is_active, sort_order);

CREATE TABLE public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL,
    category_id UUID NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT subcategories_name_valid
        CHECK (
            length(name) BETWEEN 1 AND 120
            AND name !~ '^[[:space:]]|[[:space:]]$'
            AND name !~ '[[:cntrl:]]'
        ),

    CONSTRAINT subcategories_slug_valid
        CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),

    CONSTRAINT subcategories_category_store_fkey
        FOREIGN KEY (category_id, store_id)
        REFERENCES public.categories (id, store_id)
        ON DELETE RESTRICT,

    CONSTRAINT subcategories_id_store_category_unique
        UNIQUE (id, store_id, category_id)
);

CREATE UNIQUE INDEX subcategories_category_name_unique
    ON public.subcategories (category_id, lower(name));

CREATE UNIQUE INDEX subcategories_category_slug_unique
    ON public.subcategories (category_id, slug);

CREATE INDEX subcategories_store_active_order_idx
    ON public.subcategories (
        store_id,
        category_id,
        is_active,
        sort_order
    );

-- ============================================================
-- 2a. Enforce category/subcategory lifecycle consistency.
-- ============================================================

CREATE OR REPLACE FUNCTION public.enforce_active_subcategory_parent()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
DECLARE
    v_parent_active BOOLEAN;
BEGIN
    IF NEW.is_active THEN
        SELECT is_active
        INTO v_parent_active
        FROM public.categories
        WHERE id = NEW.category_id
          AND store_id = NEW.store_id;

        IF v_parent_active IS DISTINCT FROM TRUE THEN
            RAISE EXCEPTION
                'An active subcategory requires an active parent category.';
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

CREATE TRIGGER trg_enforce_active_subcategory_parent
BEFORE INSERT OR UPDATE OF category_id, store_id, is_active
ON public.subcategories
FOR EACH ROW
EXECUTE FUNCTION public.enforce_active_subcategory_parent();

CREATE OR REPLACE FUNCTION public.deactivate_child_subcategories()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    IF OLD.is_active AND NOT NEW.is_active THEN
        UPDATE public.subcategories
        SET is_active = FALSE,
            updated_at = NOW()
        WHERE category_id = NEW.id
          AND store_id = NEW.store_id
          AND is_active = TRUE;
    END IF;

    RETURN NEW;
END;
$function$;

CREATE TRIGGER trg_deactivate_child_subcategories
AFTER UPDATE OF is_active
ON public.categories
FOR EACH ROW
WHEN (OLD.is_active IS DISTINCT FROM NEW.is_active)
EXECUTE FUNCTION public.deactivate_child_subcategories();

-- ============================================================
-- 3. Seed the approved categories for each store.
-- ============================================================

INSERT INTO public.categories (
    store_id,
    name,
    slug,
    sort_order
)
SELECT
    s.id,
    c.name,
    lower(c.slug),
    c.sort_order
FROM public.stores s
CROSS JOIN (
    VALUES
        ('His', 'his', 1),
        ('Hers', 'hers', 2),
        ('Spaces', 'spaces', 3)
) AS c(name, slug, sort_order)
WHERE s.slug = 'yotaabo';

INSERT INTO public.categories (
    store_id,
    name,
    slug,
    sort_order
)
SELECT
    s.id,
    c.name,
    lower(c.slug),
    c.sort_order
FROM public.stores s
CROSS JOIN (
    VALUES
        ('His', 'his', 1),
        ('Hers', 'hers', 2),
        ('Lounge', 'lounge', 3)
) AS c(name, slug, sort_order)
WHERE s.slug = 'poshies';

-- ============================================================
-- 4. Remove the old category restriction.
--    Poshies Spaces products will be normalized to canonical Lounge text
--    and linked to the corresponding category record.
-- ============================================================

ALTER TABLE public.products
    DROP CONSTRAINT products_category_check;

-- Prevent migration backfill from generating false product.updated
-- activity events. The transaction restores the trigger below.
ALTER TABLE public.products
    DISABLE TRIGGER trg_capture_product_activity;

-- ============================================================
-- 5. Seed subcategories from existing product data.
--    Existing product records and their other fields are retained.
-- ============================================================

WITH source AS (
    SELECT
        storefront,
        category,
        MIN(trim(subcategory)) AS subcategory
    FROM public.products
    GROUP BY
        storefront,
        category,
        lower(trim(subcategory))
),
resolved AS (
    SELECT
        s.id AS store_id,
        c.id AS category_id,
        source.subcategory
    FROM source
    JOIN public.stores s
        ON s.slug = source.storefront
    JOIN public.categories c
        ON c.store_id = s.id
       AND lower(c.name) = lower(
           CASE
               WHEN s.slug = 'poshies'
                AND lower(source.category) = 'spaces'
               THEN 'Lounge'
               ELSE source.category
           END
       )
),
normalized AS (
    SELECT
        store_id,
        category_id,
        subcategory,
        COALESCE(
            NULLIF(
                trim(
                    both '-' FROM lower(
                        regexp_replace(
                            trim(subcategory),
                            '[^a-zA-Z0-9]+',
                            '-',
                            'g'
                        )
                    )
                ),
                ''
            ),
            'subcategory'
        ) AS base_slug
    FROM resolved
),
ranked AS (
    SELECT
        *,
        COUNT(*) OVER (
            PARTITION BY category_id, base_slug
        ) AS slug_count
    FROM normalized
)
INSERT INTO public.subcategories (
    store_id,
    category_id,
    name,
    slug,
    sort_order
)
SELECT
    store_id,
    category_id,
    subcategory,
    CASE
        WHEN slug_count = 1 THEN base_slug
        ELSE base_slug || '-' || md5(subcategory)
    END,
    ROW_NUMBER() OVER (
        PARTITION BY category_id
        ORDER BY lower(subcategory), subcategory
    ) - 1
FROM ranked;

-- ============================================================
-- 6. Add authoritative store/category relationships to products.
-- ============================================================

ALTER TABLE public.products
    ADD COLUMN store_id UUID,
    ADD COLUMN category_id UUID,
    ADD COLUMN subcategory_id UUID;

UPDATE public.products p
SET
    store_id = s.id,
    category_id = c.id,
    subcategory_id = sc.id,
    category = c.name,
    subcategory = sc.name
FROM public.stores s
JOIN public.categories c
    ON c.store_id = s.id
JOIN public.subcategories sc
    ON sc.store_id = s.id
   AND sc.category_id = c.id
WHERE s.slug = p.storefront
  AND lower(c.name) = lower(
      CASE
          WHEN s.slug = 'poshies'
           AND lower(p.category) = 'spaces'
          THEN 'Lounge'
          ELSE p.category
      END
  )
  AND lower(sc.name) = lower(trim(p.subcategory));

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM public.products
        WHERE store_id IS NULL
           OR category_id IS NULL
           OR subcategory_id IS NULL
    ) THEN
        RAISE EXCEPTION
            'Product category backfill incomplete. Migration cancelled.';
    END IF;
END
$$;

ALTER TABLE public.products
    ALTER COLUMN store_id SET NOT NULL,
    ALTER COLUMN category_id SET NOT NULL,
    ALTER COLUMN subcategory_id SET NOT NULL;

ALTER TABLE public.products
    ADD CONSTRAINT products_store_id_fkey
        FOREIGN KEY (store_id)
        REFERENCES public.stores(id)
        ON DELETE RESTRICT,

    ADD CONSTRAINT products_category_store_fkey
        FOREIGN KEY (category_id, store_id)
        REFERENCES public.categories(id, store_id)
        ON DELETE RESTRICT,

    ADD CONSTRAINT products_subcategory_store_category_fkey
        FOREIGN KEY (subcategory_id, store_id, category_id)
        REFERENCES public.subcategories(id, store_id, category_id)
        ON DELETE RESTRICT;

CREATE INDEX products_store_id_idx
    ON public.products (store_id);

CREATE INDEX products_category_id_idx
    ON public.products (category_id);

CREATE INDEX products_subcategory_id_idx
    ON public.products (subcategory_id);

-- ============================================================
-- 7. Maintain compatibility with existing product API clients.
--    Existing clients still send storefront/category/subcategory.
--    New clients may send category_id/subcategory_id instead.
-- ============================================================

CREATE OR REPLACE FUNCTION public.sync_product_catalogue_refs()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
DECLARE
    v_store_id UUID;
    v_category_id UUID;
    v_category_name TEXT;
    v_subcategory_id UUID;
    v_subcategory_name TEXT;
BEGIN
    SELECT id
    INTO v_store_id
    FROM public.stores
    WHERE slug = NEW.storefront;

    IF v_store_id IS NULL THEN
        RAISE EXCEPTION 'Unknown storefront: %', NEW.storefront;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        IF NEW.store_id IS NOT NULL
           AND NEW.store_id <> v_store_id THEN
            RAISE EXCEPTION
                'Product store_id does not match its storefront.';
        END IF;
    END IF;

    NEW.store_id := v_store_id;

    -- Resolve the category by ID when supplied, otherwise by its
    -- existing display name for compatibility with older API clients.
    IF TG_OP = 'INSERT'
       AND NEW.category_id IS NOT NULL THEN

        SELECT id, name
        INTO v_category_id, v_category_name
        FROM public.categories
        WHERE id = NEW.category_id
          AND store_id = v_store_id;

    ELSIF TG_OP = 'UPDATE'
       AND NEW.category_id IS DISTINCT FROM OLD.category_id THEN

        SELECT id, name
        INTO v_category_id, v_category_name
        FROM public.categories
        WHERE id = NEW.category_id
          AND store_id = v_store_id;

    ELSIF TG_OP = 'INSERT'
       OR (
           TG_OP = 'UPDATE'
           AND NEW.category IS DISTINCT FROM OLD.category
       ) THEN

        SELECT id, name
        INTO v_category_id, v_category_name
        FROM public.categories
        WHERE store_id = v_store_id
          AND lower(name) = lower(
              CASE
                  WHEN v_store_id = (
                      SELECT id FROM public.stores WHERE slug = 'poshies'
                  )
                   AND lower(trim(NEW.category)) = 'spaces'
                  THEN 'Lounge'
                  ELSE trim(NEW.category)
              END
          );

    ELSE
        SELECT id, name
        INTO v_category_id, v_category_name
        FROM public.categories
        WHERE id = NEW.category_id
          AND store_id = v_store_id;
    END IF;

    IF v_category_id IS NULL THEN
        RAISE EXCEPTION
            'Category "%" does not exist in storefront "%".',
            NEW.category,
            NEW.storefront;
    END IF;

    NEW.category_id := v_category_id;

    -- A newly supplied subcategory ID takes precedence over its old
    -- display name, including when the category changes in the same save.
    IF TG_OP = 'INSERT'
       AND NEW.subcategory_id IS NOT NULL THEN

        SELECT id, name
        INTO v_subcategory_id, v_subcategory_name
        FROM public.subcategories
        WHERE id = NEW.subcategory_id
          AND store_id = v_store_id
          AND category_id = v_category_id;

    ELSIF TG_OP = 'UPDATE'
       AND NEW.subcategory_id IS DISTINCT FROM OLD.subcategory_id THEN

        SELECT id, name
        INTO v_subcategory_id, v_subcategory_name
        FROM public.subcategories
        WHERE id = NEW.subcategory_id
          AND store_id = v_store_id
          AND category_id = v_category_id;

    ELSIF TG_OP = 'INSERT'
       OR (
           TG_OP = 'UPDATE'
           AND (
               NEW.subcategory IS DISTINCT FROM OLD.subcategory
               OR v_category_id IS DISTINCT FROM OLD.category_id
           )
       ) THEN

        SELECT id, name
        INTO v_subcategory_id, v_subcategory_name
        FROM public.subcategories
        WHERE store_id = v_store_id
          AND category_id = v_category_id
          AND lower(name) = lower(trim(NEW.subcategory));

    ELSE
        SELECT id, name
        INTO v_subcategory_id, v_subcategory_name
        FROM public.subcategories
        WHERE id = NEW.subcategory_id
          AND store_id = v_store_id
          AND category_id = v_category_id;
    END IF;

    IF v_subcategory_id IS NULL THEN
        RAISE EXCEPTION
            'Subcategory "%" does not exist under category "%".',
            NEW.subcategory,
            v_category_name;
    END IF;

    NEW.subcategory_id := v_subcategory_id;

    NEW.category := v_category_name;
    NEW.subcategory := v_subcategory_name;

    RETURN NEW;
END;
$function$;

CREATE TRIGGER trg_sync_product_catalogue_refs
BEFORE INSERT OR UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.sync_product_catalogue_refs();

-- ============================================================
-- 8. Protect category tables from direct public client access.
--    Backend functions use the database connection.
-- ============================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.categories
FROM PUBLIC, anon, authenticated;

REVOKE ALL ON TABLE public.subcategories
FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 9. Verify ownership, category mapping and restore activity.
-- ============================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM public.products p
        LEFT JOIN public.stores s
            ON s.id = p.store_id
           AND s.slug = p.storefront
        LEFT JOIN public.categories c
            ON c.id = p.category_id
           AND c.store_id = p.store_id
        LEFT JOIN public.subcategories sc
            ON sc.id = p.subcategory_id
           AND sc.store_id = p.store_id
           AND sc.category_id = p.category_id
        WHERE s.id IS NULL
           OR c.id IS NULL
           OR sc.id IS NULL
    ) THEN
        RAISE EXCEPTION
            'Final product relationship verification failed.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.products p
        JOIN public.categories c
            ON c.id = p.category_id
        JOIN public.subcategories sc
            ON sc.id = p.subcategory_id
        WHERE p.store_id <> c.store_id
           OR p.store_id <> sc.store_id
           OR p.category_id <> sc.category_id
           OR p.category IS DISTINCT FROM c.name
           OR p.subcategory IS DISTINCT FROM sc.name
    ) THEN
        RAISE EXCEPTION
            'Product text and category relationships are inconsistent.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.products p
        JOIN public.stores s
            ON s.id = p.store_id
        WHERE s.slug = 'poshies'
          AND p.category = 'Spaces'
    ) THEN
        RAISE EXCEPTION
            'Poshies products still contain the legacy Spaces category.';
    END IF;
END
$$;

ALTER TABLE public.products
    ENABLE TRIGGER trg_capture_product_activity;

COMMIT;
