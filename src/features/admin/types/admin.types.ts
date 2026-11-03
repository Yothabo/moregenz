import type { ReactNode } from 'react';
import type { AdminProduct } from '../../../components/AdminProductForm';

export type AdminRow = AdminProduct & {
  id: string;
  created_at: string;
};

export type Tab = 'overview' | 'products' | 'orders' | 'activities' | 'settings';

export type CategoryFilter = 'All' | 'His' | 'Hers' | 'Spaces' | 'Hidden';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'delivered'
  | 'cancelled';

export type OrderFilter =
  | 'All'
  | 'Pending'
  | 'Confirmed'
  | 'Delivered'
  | 'Cancelled';

export type OrderItem = {
  name: string;
  price: number;
  qty: number;
};

export type Storefront = 'yotaabo' | 'poshies';

export type Order = {
  id: string;
  storefront: Storefront;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type AdminPageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchFocus?: () => void;
  action?: ReactNode;
  filters?: ReactNode;
};
