BEGIN;

-- 1. Create the central store registry.
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT stores_name_valid
        CHECK (length(trim(name)) BETWEEN 1 AND 120),

    CONSTRAINT stores_slug_valid
        CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- 2. Register the existing storefronts.
INSERT INTO public.stores (name, slug)
VALUES
    ('Yotaabo', 'yotaabo'),
    ('Poshies', 'poshies')
ON CONFLICT (slug) DO NOTHING;

-- Verify that existing slug records have the expected names.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.stores
        WHERE slug = 'yotaabo' AND name = 'Yotaabo'
    ) OR NOT EXISTS (
        SELECT 1 FROM public.stores
        WHERE slug = 'poshies' AND name = 'Poshies'
    ) THEN
        RAISE EXCEPTION
            'Store registry verification failed. Existing store records were not modified.';
    END IF;
END
$$;

-- 3. Extend the existing administrator records.
ALTER TABLE public.admins
    ADD COLUMN IF NOT EXISTS store_id UUID,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- 4. Verify the approved initial Super Admin exists.
DO $$
DECLARE
    admin_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO admin_count
    FROM public.admins
    WHERE id = 'f2795b24-edfa-4c1f-a698-47dd03107c4c';

    IF admin_count <> 1 THEN
        RAISE EXCEPTION
            'Expected exactly one existing administrator matching the approved UUID. Found %.',
            admin_count;
    END IF;

    IF (SELECT COUNT(*) FROM public.admins) <> 1 THEN
        RAISE EXCEPTION
            'Unexpected administrator records detected. Review existing accounts before migration.';
    END IF;
END
$$;

-- 5. Add the store assignment foreign key.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.admins'::regclass
          AND conname = 'admins_store_id_fkey'
    ) THEN
        ALTER TABLE public.admins
            ADD CONSTRAINT admins_store_id_fkey
            FOREIGN KEY (store_id)
            REFERENCES public.stores(id)
            ON DELETE RESTRICT;
    END IF;
END
$$;

-- 6. Promote the explicitly approved existing administrator.
UPDATE public.admins
SET role = 'super_admin',
    store_id = NULL
WHERE id = 'f2795b24-edfa-4c1f-a698-47dd03107c4c';

-- 7. Set the default role for future administrator records.
ALTER TABLE public.admins
    ALTER COLUMN role SET DEFAULT 'store_admin';

-- 8. Enforce supported roles.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.admins'::regclass
          AND conname = 'admins_role_valid'
    ) THEN
        ALTER TABLE public.admins
            ADD CONSTRAINT admins_role_valid
            CHECK (role IN ('super_admin', 'store_admin'));
    END IF;
END
$$;

-- 9. Enforce role/store assignment consistency.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.admins'::regclass
          AND conname = 'admins_role_store_consistency'
    ) THEN
        ALTER TABLE public.admins
            ADD CONSTRAINT admins_role_store_consistency
            CHECK (
                (role = 'super_admin' AND store_id IS NULL)
                OR
                (role = 'store_admin' AND store_id IS NOT NULL)
            );
    END IF;
END
$$;

-- 10. Add administrator lookup indexes.
CREATE INDEX IF NOT EXISTS admins_store_id_idx
    ON public.admins(store_id);

CREATE INDEX IF NOT EXISTS admins_active_role_idx
    ON public.admins(is_active, role);

-- 11. Protect the new store registry.
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.stores
FROM PUBLIC, anon, authenticated;

COMMIT;
