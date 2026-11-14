BEGIN;

-- =========================================================
-- 1. BACKFILL INVENTORY BALANCES
-- =========================================================

-- Create missing balances for existing products.
-- Never overwrite an existing balance or its quantities.

INSERT INTO public.inventory_balances (
    store_id,
    product_id
)
SELECT
    p.store_id,
    p.id
FROM public.products p
ON CONFLICT (store_id, product_id) DO NOTHING;

-- =========================================================
-- 2. ENFORCE RECEIPT AND ORDER STORE CONSISTENCY
-- =========================================================

ALTER TABLE public.receipts
    ADD CONSTRAINT receipts_store_order_fkey
    FOREIGN KEY (store_id, order_id)
    REFERENCES public.orders (store_id, id)
    ON DELETE RESTRICT;

-- =========================================================
-- 3. PROTECT ORDER STORE OWNERSHIP
-- =========================================================

-- Recreate the trigger so changing store_id directly also
-- causes the store to be derived from the storefront slug.

DROP TRIGGER IF EXISTS trg_sync_order_store_id
    ON public.orders;

CREATE TRIGGER trg_sync_order_store_id
BEFORE INSERT OR UPDATE OF storefront, store_id
ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.sync_order_store_id();

COMMIT;
