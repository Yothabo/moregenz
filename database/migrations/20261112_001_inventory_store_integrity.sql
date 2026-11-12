BEGIN;

-- Required as referenced keys for store-scoped foreign keys.
ALTER TABLE public.orders
  ADD CONSTRAINT orders_store_id_id_unique
  UNIQUE (store_id, id);

ALTER TABLE public.direct_sales
  ADD CONSTRAINT direct_sales_store_id_id_unique
  UNIQUE (store_id, id);

-- A reservation must belong to the same store as its order.
ALTER TABLE public.inventory_reservations
  ADD CONSTRAINT inventory_reservations_order_store_fkey
  FOREIGN KEY (store_id, order_id)
  REFERENCES public.orders (store_id, id)
  ON DELETE RESTRICT;

-- A direct-sale item must belong to the same store as its sale.
ALTER TABLE public.direct_sale_items
  ADD CONSTRAINT direct_sale_items_sale_store_fkey
  FOREIGN KEY (store_id, direct_sale_id)
  REFERENCES public.direct_sales (store_id, id)
  ON DELETE RESTRICT;

COMMIT;
