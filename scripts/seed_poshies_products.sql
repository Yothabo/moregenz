BEGIN;

-- Add storefront ownership without replacing existing product data.
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS storefront text;

-- Existing products belong to Yotaabo.
UPDATE public.products
SET storefront = 'yotaabo'
WHERE storefront IS NULL;

ALTER TABLE public.products
ALTER COLUMN storefront SET DEFAULT 'yotaabo';

ALTER TABLE public.products
ALTER COLUMN storefront SET NOT NULL;

-- Restrict storefront values.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'products_storefront_check'
          AND conrelid = 'public.products'::regclass
    ) THEN
        ALTER TABLE public.products
        ADD CONSTRAINT products_storefront_check
        CHECK (storefront IN ('yotaabo', 'poshies'));
    END IF;
END $$;

-- Support storefront-specific catalogue queries.
CREATE INDEX IF NOT EXISTS products_storefront_category_idx
ON public.products (storefront, category, is_active, sort_order);

-- Insert Poshies products.
-- The NOT EXISTS condition makes this seed safe to rerun.
INSERT INTO public.products (
    name,
    price,
    category,
    subcategory,
    description,
    image_url,
    is_active,
    sort_order,
    storefront
)
SELECT
    seed.name,
    seed.price,
    seed.category,
    seed.subcategory,
    seed.description,
    NULL,
    TRUE,
    seed.sort_order,
    'poshies'
FROM (
    VALUES
    -- HIM
    (
        'Poshies Essential Boxer',
        149::numeric,
        'His',
        'Boxers',
        'Everyday comfort with a relaxed fit, designed for all-day wear.',
        1
    ),
    (
        'Poshies Comfort Boxer Set (3-Pack)',
        349::numeric,
        'His',
        'Boxers',
        'A three-piece boxer set offering everyday comfort and value.',
        2
    ),
    (
        'Poshies Classic Brief',
        119::numeric,
        'His',
        'Briefs',
        'A classic everyday brief with a comfortable, supportive fit.',
        3
    ),
    (
        'Poshies Everyday Brief Set (3-Pack)',
        279::numeric,
        'His',
        'Briefs',
        'Three everyday briefs designed for comfort and practicality.',
        4
    ),
    (
        'Poshies Flex Trunk',
        139::numeric,
        'His',
        'Trunks',
        'A modern trunk with a close fit and comfortable everyday feel.',
        5
    ),
    (
        'Poshies Premium Trunk Set (3-Pack)',
        329::numeric,
        'His',
        'Trunks',
        'A three-piece trunk set combining a modern fit with everyday comfort.',
        6
    ),

    -- HER
    (
        'Poshies Everyday Bra',
        249::numeric,
        'Hers',
        'Bras',
        'An everyday bra designed for comfortable daily support.',
        1
    ),
    (
        'Poshies Comfort Wireless Bra',
        279::numeric,
        'Hers',
        'Bras',
        'A wireless bra designed for a softer, more relaxed feel.',
        2
    ),
    (
        'Poshies Soft Touch Panty',
        99::numeric,
        'Hers',
        'Panties',
        'A soft everyday panty designed with comfort in mind.',
        3
    ),
    (
        'Poshies Essential Panty Set (3-Pack)',
        249::numeric,
        'Hers',
        'Panties',
        'A practical three-piece panty set for everyday wear.',
        4
    ),
    (
        'Poshies Summer Bikini',
        179::numeric,
        'Hers',
        'Bikinis',
        'A classic bikini-style piece for a comfortable everyday fit.',
        5
    ),
    (
        'Poshies Barely There G-String',
        99::numeric,
        'Hers',
        'G-Strings',
        'A minimal everyday style designed for a discreet fit.',
        6
    ),
    (
        'Poshies Lace Elegance Set',
        399::numeric,
        'Hers',
        'Matching Sets',
        'A coordinated lace-inspired set with a feminine finish.',
        7
    ),
    (
        'Poshies Signature Lingerie Set',
        499::numeric,
        'Hers',
        'Lingerie',
        'A coordinated lingerie set designed for an elegant look.',
        8
    ),

    -- LOUNGE
    (
        'Poshies Classic Pyjama Set',
        399::numeric,
        'Spaces',
        'Pyjamas',
        'A comfortable two-piece pyjama set for relaxed evenings.',
        1
    ),
    (
        'Poshies Satin Dream Pyjama Set',
        549::numeric,
        'Spaces',
        'Pyjamas',
        'A satin-inspired pyjama set for a smooth, relaxed feel.',
        2
    ),
    (
        'Poshies Soft Comfort Nightdress',
        329::numeric,
        'Spaces',
        'Nightwear',
        'A relaxed nightdress designed for comfortable rest.',
        3
    ),
    (
        'Poshies Relaxed Dressing Gown',
        449::numeric,
        'Spaces',
        'Dressing Gowns',
        'A comfortable dressing gown for unwinding at home.',
        4
    ),
    (
        'Poshies Luxe Robe',
        599::numeric,
        'Spaces',
        'Robes',
        'A refined robe for relaxed mornings and evenings.',
        5
    ),
    (
        'Poshies Everyday Lounge Set',
        499::numeric,
        'Spaces',
        'Lounge Sets',
        'A coordinated lounge set designed for everyday comfort.',
        6
    ),
    (
        'Poshies Premium Lounge Set',
        649::numeric,
        'Spaces',
        'Lounge Sets',
        'A premium lounge set for relaxed days and evenings.',
        7
    )
) AS seed(name, price, category, subcategory, description, sort_order)
WHERE NOT EXISTS (
    SELECT 1
    FROM public.products existing
    WHERE existing.storefront = 'poshies'
      AND existing.name = seed.name
);

COMMIT;
