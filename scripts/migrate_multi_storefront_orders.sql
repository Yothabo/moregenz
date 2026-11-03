BEGIN;

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS storefront text;

UPDATE public.orders
SET storefront = 'yotaabo'
WHERE storefront IS NULL;

ALTER TABLE public.orders
ALTER COLUMN storefront SET DEFAULT 'yotaabo';

ALTER TABLE public.orders
ALTER COLUMN storefront SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'orders_storefront_check'
          AND conrelid = 'public.orders'::regclass
    ) THEN
        ALTER TABLE public.orders
        ADD CONSTRAINT orders_storefront_check
        CHECK (storefront IN ('yotaabo', 'poshies'));
    END IF;
END
$$;

CREATE INDEX IF NOT EXISTS orders_storefront_created_at_idx
ON public.orders (storefront, created_at DESC);

COMMIT;
