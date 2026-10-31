import type { ReactNode } from 'react';
import type { AdminProduct } from '../../../components/AdminProductForm';

export type AdminRow = AdminProduct & {
  id: string;
  created_at: string;
};

export type Tab = 'overview' | 'products' | 'orders' | 'settings';

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

export type Order = {
  id: string;
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
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchFocus?: () => void;
  action?: ReactNode;
  filters?: ReactNode;
};
