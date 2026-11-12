BEGIN;

-- =========================================================
-- 1. PRODUCT COST AND ORDER COST SNAPSHOTS
-- =========================================================

ALTER TABLE public.products
    ADD COLUMN supplier_cost NUMERIC(12,2),
    ADD COLUMN sku TEXT;

ALTER TABLE public.products
    ADD CONSTRAINT products_supplier_cost_check
    CHECK (supplier_cost IS NULL OR supplier_cost >= 0);

ALTER TABLE public.products
    ADD CONSTRAINT products_store_id_id_unique
    UNIQUE (store_id, id);

CREATE UNIQUE INDEX products_store_sku_unique
    ON public.products (store_id, sku)
    WHERE sku IS NOT NULL;

ALTER TABLE public.order_items
    ADD COLUMN unit_cost NUMERIC(12,2);

ALTER TABLE public.order_items
    ADD CONSTRAINT order_items_unit_cost_check
    CHECK (unit_cost IS NULL OR unit_cost >= 0);

-- =========================================================
-- 2. ORDER STORE OWNERSHIP
-- =========================================================

ALTER TABLE public.orders
    ADD COLUMN store_id UUID;

UPDATE public.orders o
SET store_id = s.id
FROM public.stores s
WHERE s.slug = o.storefront;

ALTER TABLE public.orders
    ALTER COLUMN store_id SET NOT NULL;

ALTER TABLE public.orders
    ADD CONSTRAINT orders_store_id_fkey
    FOREIGN KEY (store_id)
    REFERENCES public.stores(id)
    ON DELETE RESTRICT;

CREATE OR REPLACE FUNCTION public.sync_order_store_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT id
    INTO NEW.store_id
    FROM public.stores
    WHERE slug = NEW.storefront
      AND is_active = TRUE;

    IF NEW.store_id IS NULL THEN
        RAISE EXCEPTION 'Invalid or inactive storefront: %',
            NEW.storefront;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_order_store_id
BEFORE INSERT OR UPDATE OF storefront
ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.sync_order_store_id();

-- =========================================================
-- 3. INVENTORY BALANCES
-- =========================================================

CREATE TABLE public.inventory_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,

    product_id UUID NOT NULL,

    on_hand_quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER NOT NULL DEFAULT 0,

    is_initialized BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT inventory_balances_product_store_fkey
        FOREIGN KEY (store_id, product_id)
        REFERENCES public.products(store_id, id)
        ON DELETE RESTRICT,

    CONSTRAINT inventory_balances_store_product_unique
        UNIQUE (store_id, product_id),

    CONSTRAINT inventory_on_hand_nonnegative
        CHECK (on_hand_quantity >= 0),

    CONSTRAINT inventory_reserved_nonnegative
        CHECK (reserved_quantity >= 0),

    CONSTRAINT inventory_reserved_within_stock
        CHECK (reserved_quantity <= on_hand_quantity)
);

CREATE INDEX inventory_balances_store_idx
    ON public.inventory_balances(store_id);

CREATE INDEX inventory_balances_product_idx
    ON public.inventory_balances(product_id);

-- Available stock = on_hand_quantity - reserved_quantity.

CREATE OR REPLACE FUNCTION public.create_product_inventory_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.inventory_balances (
        store_id,
        product_id
    )
    VALUES (
        NEW.store_id,
        NEW.id
    )
    ON CONFLICT (store_id, product_id) DO NOTHING;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_product_inventory_balance
AFTER INSERT ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.create_product_inventory_balance();

-- =========================================================
-- 4. INVENTORY MOVEMENT AUDIT
-- =========================================================

CREATE TABLE public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,

    product_id UUID NOT NULL,

    movement_type TEXT NOT NULL CHECK (
        movement_type IN (
            'opening_stock',
            'reservation',
            'reservation_release',
            'order_confirmation',
            'direct_sale',
            'replenishment',
            'adjustment_increase',
            'adjustment_decrease',
            'sales_return'
        )
    ),

    quantity_delta INTEGER NOT NULL DEFAULT 0,
    reserved_delta INTEGER NOT NULL DEFAULT 0,

    source_type TEXT NOT NULL,
    source_id UUID,

    reason TEXT,

    actor_id UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    actor_email TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT inventory_movements_product_store_fkey
        FOREIGN KEY (store_id, product_id)
        REFERENCES public.products(store_id, id)
        ON DELETE RESTRICT,

    CONSTRAINT inventory_movements_nonzero
        CHECK (quantity_delta <> 0 OR reserved_delta <> 0)
);

CREATE INDEX inventory_movements_store_date_idx
    ON public.inventory_movements(store_id, created_at DESC);

CREATE INDEX inventory_movements_product_date_idx
    ON public.inventory_movements(product_id, created_at DESC);

CREATE INDEX inventory_movements_source_idx
    ON public.inventory_movements(source_type, source_id);

-- =========================================================
-- 5. ORDER STOCK RESERVATIONS
-- =========================================================

CREATE TABLE public.inventory_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL
        REFERENCES public.orders(id) ON DELETE RESTRICT,

    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,

    product_id UUID NOT NULL,

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'converted', 'released')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT inventory_reservations_product_store_fkey
        FOREIGN KEY (store_id, product_id)
        REFERENCES public.products(store_id, id)
        ON DELETE RESTRICT,

    CONSTRAINT inventory_reservations_order_product_unique
        UNIQUE (order_id, product_id)
);

CREATE INDEX inventory_reservations_status_idx
    ON public.inventory_reservations(store_id, status);

CREATE INDEX inventory_reservations_order_idx
    ON public.inventory_reservations(order_id);

-- =========================================================
-- 6. DIRECT SALES
-- =========================================================

CREATE TABLE public.direct_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sale_number TEXT NOT NULL,

    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,

    total_amount NUMERIC(12,2) NOT NULL
        CHECK (total_amount >= 0),

    status TEXT NOT NULL DEFAULT 'completed'
        CHECK (status IN ('completed', 'voided')),

    idempotency_key TEXT,
    notes TEXT,

    sold_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_by UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    created_by_email TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT direct_sales_store_number_unique
        UNIQUE (store_id, sale_number)
);

CREATE UNIQUE INDEX direct_sales_idempotency_unique
    ON public.direct_sales(store_id, idempotency_key)
    WHERE idempotency_key IS NOT NULL;

CREATE INDEX direct_sales_store_date_idx
    ON public.direct_sales(store_id, sold_at DESC);

CREATE TABLE public.direct_sale_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    direct_sale_id UUID NOT NULL
        REFERENCES public.direct_sales(id) ON DELETE RESTRICT,

    store_id UUID NOT NULL,
    product_id UUID NOT NULL,

    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),

    unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    unit_cost NUMERIC(12,2) CHECK (
        unit_cost IS NULL OR unit_cost >= 0
    ),

    line_total NUMERIC(12,2)
        GENERATED ALWAYS AS (quantity * unit_price) STORED,

    CONSTRAINT direct_sale_items_product_store_fkey
        FOREIGN KEY (store_id, product_id)
        REFERENCES public.products(store_id, id)
        ON DELETE RESTRICT
);

CREATE INDEX direct_sale_items_sale_idx
    ON public.direct_sale_items(direct_sale_id);

CREATE INDEX direct_sale_items_product_idx
    ON public.direct_sale_items(store_id, product_id);

-- =========================================================
-- 7. RECEIPTS
-- =========================================================

CREATE TABLE public.receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    receipt_number TEXT NOT NULL,

    order_id UUID NOT NULL
        REFERENCES public.orders(id) ON DELETE RESTRICT,

    store_id UUID NOT NULL
        REFERENCES public.stores(id) ON DELETE RESTRICT,

    receipt_type TEXT NOT NULL
        CHECK (receipt_type IN ('deposit', 'final', 'other')),

    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),

    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'approved', 'sent', 'voided')),

    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    sent_at TIMESTAMPTZ,
    sent_by UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    voided_at TIMESTAMPTZ,
    voided_by UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    notes TEXT,

    created_by UUID REFERENCES public.admins(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT receipts_store_number_unique
        UNIQUE (store_id, receipt_number),

    CONSTRAINT receipts_sent_requires_approval
        CHECK (sent_at IS NULL OR approved_at IS NOT NULL),

    CONSTRAINT receipts_void_requires_timestamp
        CHECK (status <> 'voided' OR voided_at IS NOT NULL)
);

CREATE INDEX receipts_order_idx
    ON public.receipts(order_id);

CREATE INDEX receipts_store_date_idx
    ON public.receipts(store_id, created_at DESC);

CREATE INDEX receipts_revenue_idx
    ON public.receipts(store_id, sent_at)
    WHERE status = 'sent' AND sent_at IS NOT NULL;

-- =========================================================
-- 8. RECEIPT STORE CONSISTENCY
-- =========================================================

CREATE OR REPLACE FUNCTION public.validate_receipt_store()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    order_store_id UUID;
BEGIN
    SELECT store_id
    INTO order_store_id
    FROM public.orders
    WHERE id = NEW.order_id;

    IF order_store_id IS NULL OR order_store_id <> NEW.store_id THEN
        RAISE EXCEPTION 'Receipt store must match order store';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_receipt_store
BEFORE INSERT OR UPDATE OF order_id, store_id
ON public.receipts
FOR EACH ROW
EXECUTE FUNCTION public.validate_receipt_store();

-- =========================================================
-- 9. STORE-SCOPED ROW LEVEL SECURITY
-- Netlify server-side database access remains responsible
-- for admin authorization and store scoping.
-- =========================================================

ALTER TABLE public.inventory_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.inventory_balances FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.inventory_movements FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.inventory_reservations FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.direct_sales FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.direct_sale_items FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.receipts FROM PUBLIC, anon, authenticated;

COMMIT;
