import AdminItemCard from '../../../components/AdminItemCard';
import AdminPageHeader from './AdminPageHeader';
import { formatPrice } from '../../../utils/formatPrice';
import type {
  Order,
  OrderFilter,
} from '../types/admin.types';

type AdminOrdersProps = {
  orderSearch: string;
  orderFilter: OrderFilter;
  filteredOrders: Order[];
  paginatedOrders: Order[];
  isLoadingOrders: boolean;
  orderPage: number;
  totalOrderPages: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: OrderFilter) => void;
  onPageChange: (page: number) => void;
  onSelectOrder: (order: Order) => void;
};

export default function AdminOrders({
  orderSearch,
  orderFilter,
  filteredOrders,
  paginatedOrders,
  isLoadingOrders,
  orderPage,
  totalOrderPages,
  onSearchChange,
  onFilterChange,
  onPageChange,
  onSelectOrder,
}: AdminOrdersProps) {
  return (
    <>
      <AdminPageHeader
        title="Orders"
        searchValue={orderSearch}
        searchPlaceholder="Search orders by number, name, or phone"
        onSearchChange={onSearchChange}
        filters={
          (['All', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'] as OrderFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`border-0 bg-transparent px-0 py-1 admin-type-body text-sm font-medium transition-colors ${
                orderFilter === filter
                  ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                  : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
              }`}
            >
              {filter}
            </button>
          ))
        }
      />

      <div className="admin-order-list-region">
        {isLoadingOrders ? (
          <p className="admin-order-list-message admin-type-supporting text-center text-[#4d4d4d]/40">
            Loading orders...
          </p>
        ) : filteredOrders.length === 0 ? (
          <p className="admin-order-list-message admin-type-supporting text-center text-[#4d4d4d]/40">
            No orders match your filters.
          </p>
        ) : (
          <>
            <div className="admin-order-mobile-list flex flex-col gap-6 md:hidden">
              {paginatedOrders.map((order) => {
                const orderDate = new Date(
                  order.created_at
                ).toLocaleDateString('en-ZA', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <AdminItemCard
                    key={order.id}
                    layout="product"
                    title={order.customer_name}
                    status={order.status}
                    price={formatPrice(order.subtotal)}
                    meta={orderDate}
                    onClick={() => onSelectOrder(order)}
                    ariaLabel={`View order from ${order.customer_name}`}
                    leftClassName="admin-item-card-order-media"
                    statusClassName={
                      order.status === 'pending'
                        ? 'text-amber-600'
                        : order.status === 'cancelled'
                          ? 'text-red-500'
                          : 'text-green-700'
                    }
                  />
                );
              })}
            </div>

            <div className="hidden md:block admin-orders-table-scroll">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="admin-orders-table-number">Items</th>
                    <th scope="col" className="admin-orders-table-number">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => {
                    const totalQuantity = order.items.reduce(
                      (total, item) => total + item.qty,
                      0
                    );

                    return (
                      <tr
                        key={order.id}
                        onClick={() => onSelectOrder(order)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onSelectOrder(order);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`View order ${order.order_number} from ${order.customer_name}`}
                      >
                        <td className="admin-orders-table-order">{order.order_number}</td>
                        <td className="admin-orders-table-customer">{order.customer_name}</td>
                        <td>
                          {new Date(order.created_at).toLocaleDateString('en-ZA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="admin-orders-table-number">
                          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                        </td>
                        <td className="admin-orders-table-total">{formatPrice(order.subtotal)}</td>
                        <td>
                          <span className={`admin-order-status admin-order-status-${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-[#4d4d4d]/10 pt-6">
        <p className="admin-type-supporting text-sm font-medium text-[#4d4d4d]/50">
          Showing {Math.min((orderPage - 1) * 20 + 1, filteredOrders.length)}–{Math.min(orderPage * 20, filteredOrders.length)} of {filteredOrders.length}
        </p>

        {totalOrderPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, orderPage - 1))}
              disabled={orderPage === 1}
              className="border-0 bg-transparent px-2 py-1 admin-type-body text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] border-0 bg-transparent px-2 py-1 admin-type-numeric text-sm font-medium transition-colors ${
                  page === orderPage
                    ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                    : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalOrderPages, orderPage + 1))}
              disabled={orderPage === totalOrderPages}
              className="border-0 bg-transparent px-2 py-1 admin-type-body text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
