/**
 * PLACEHOLDER data — real values swap in when backend is wired.
 * Two audiences: super-admin (portfolio view) vs store-owner (single store).
 */

export type TopProduct = { rank: number; name: string; units: number; revenue: number };
export type CategoryRevenue = { category: string; revenue: number; color: string };
export type TopCustomer = { phone: string; name: string; orders: number; lifetimeValue: number };
export type StoreComparison = { store: string; color: string; revenue: number; orders: number; averageOrderValue: number };
export type TrendPoint = { month: string; value: number };

export type StoreCategoryBreakdown = {
  store: string;
  color: string;
  categories: CategoryRevenue[];
};

export type PortfolioInsights = {
  scope: 'portfolio';
  storeComparison: StoreComparison[];
  orderVolumeTrend: TrendPoint[];
  categoryRevenueByStore: StoreCategoryBreakdown[];
  portfolioGrowth: { revenueGrowthPercent: number; totalRevenue: number; totalOrders: number };
  topProducts: TopProduct[];
  momentum: { newCustomersThisMonth: number; returningCustomersThisMonth: number };
};

export type StoreInsights = {
  scope: 'store';
  storeName: string;
  storeColor: string;
  topProducts: TopProduct[];
  categoryRevenue: CategoryRevenue[];
  orderVelocity: number;
  customerInsights: { averageOrderValue: number; repeatRate: number; totalCustomers: number };
  topCustomers: TopCustomer[];
  momentum: { newCustomersThisMonth: number; returningCustomersThisMonth: number; revenueGrowthPercent: number };
};

export const PLACEHOLDER_PORTFOLIO: PortfolioInsights = {
  scope: 'portfolio',
  storeComparison: [
    { store: 'Yotaabo', color: '#8aa89b', revenue: 60450, orders: 78, averageOrderValue: 775 },
    { store: 'Poshies', color: '#ff1493', revenue: 38250, orders: 96, averageOrderValue: 398 },
  ],
  orderVolumeTrend: [
    { month: 'Jun', value: 22 },
    { month: 'Jul', value: 24 },
    { month: 'Aug', value: 26 },
    { month: 'Sep', value: 29 },
    { month: 'Oct', value: 30 },
    { month: 'Nov', value: 34 },
  ],
  categoryRevenueByStore: [
    {
      store: 'Yotaabo',
      color: '#8aa89b',
      categories: [
        { category: 'His', revenue: 33600, color: '#8aa89b' },
        { category: 'Hers', revenue: 18600, color: '#ff1493' },
        { category: 'Spaces', revenue: 8250, color: '#c8ad8d' },
      ],
    },
    {
      store: 'Poshies',
      color: '#ff1493',
      categories: [
        { category: 'His', revenue: 4800, color: '#8aa89b' },
        { category: 'Hers', revenue: 24000, color: '#ff1493' },
        { category: 'Lounge', revenue: 9450, color: '#c8ad8d' },
      ],
    },
  ],
  portfolioGrowth: { revenueGrowthPercent: 12.4, totalRevenue: 98700, totalOrders: 174 },
  topProducts: [
    { rank: 1, name: 'Oud Royale', units: 84, revenue: 33600 },
    { rank: 2, name: 'Silk Bombshell', units: 120, revenue: 24000 },
    { rank: 3, name: 'Amber Nights', units: 62, revenue: 18600 },
    { rank: 4, name: 'Lace Comfort Set', units: 95, revenue: 14250 },
    { rank: 5, name: 'Home Ritual Spray', units: 55, revenue: 8250 },
  ],
  momentum: { newCustomersThisMonth: 24, returningCustomersThisMonth: 19 },
};

export const PLACEHOLDER_YOTAABO: StoreInsights = {
  scope: 'store',
  storeName: 'Yotaabo',
  storeColor: '#8aa89b',
  topProducts: [
    { rank: 1, name: 'Oud Royale', units: 84, revenue: 33600 },
    { rank: 2, name: 'Amber Nights', units: 62, revenue: 18600 },
    { rank: 3, name: 'Home Ritual Spray', units: 55, revenue: 8250 },
    { rank: 4, name: 'Velvet Smoke', units: 38, revenue: 9500 },
    { rank: 5, name: 'Cedar Night', units: 28, revenue: 7000 },
  ],
  categoryRevenue: [
    { category: 'His', revenue: 33600, color: '#8aa89b' },
    { category: 'Hers', revenue: 18600, color: '#ff1493' },
    { category: 'Spaces', revenue: 8250, color: '#c8ad8d' },
  ],
  orderVelocity: 2.6,
  customerInsights: { averageOrderValue: 775, repeatRate: 0.42, totalCustomers: 62 },
  topCustomers: [
    { phone: '+27 *** 4521', name: 'Naledi M.', orders: 5, lifetimeValue: 6100 },
    { phone: '+27 *** 8812', name: 'Thato K.', orders: 3, lifetimeValue: 4400 },
    { phone: '+27 *** 7756', name: 'Sipho N.', orders: 3, lifetimeValue: 3900 },
    { phone: '+27 *** 3304', name: 'Lerato S.', orders: 2, lifetimeValue: 2800 },
    { phone: '+27 *** 2190', name: 'Zanele D.', orders: 2, lifetimeValue: 2100 },
  ],
  momentum: { newCustomersThisMonth: 14, returningCustomersThisMonth: 9, revenueGrowthPercent: 18.7 },
};

export const PLACEHOLDER_POSHIES: StoreInsights = {
  scope: 'store',
  storeName: 'Poshies',
  storeColor: '#ff1493',
  topProducts: [
    { rank: 1, name: 'Silk Bombshell', units: 120, revenue: 24000 },
    { rank: 2, name: 'Lace Comfort Set', units: 95, revenue: 14250 },
    { rank: 3, name: 'Cotton Bralette', units: 72, revenue: 7200 },
    { rank: 4, name: 'Soft Lounge Pants', units: 48, revenue: 4800 },
    { rank: 5, name: 'Everyday Briefs 3-Pack', units: 88, revenue: 3520 },
  ],
  categoryRevenue: [
    { category: 'His', revenue: 4800, color: '#8aa89b' },
    { category: 'Hers', revenue: 24000, color: '#ff1493' },
    { category: 'Lounge', revenue: 9450, color: '#c8ad8d' },
  ],
  orderVelocity: 2.1,
  customerInsights: { averageOrderValue: 398, repeatRate: 0.34, totalCustomers: 81 },
  topCustomers: [
    { phone: '+27 *** 3304', name: 'Lerato S.', orders: 4, lifetimeValue: 4600 },
    { phone: '+27 *** 4521', name: 'Naledi M.', orders: 3, lifetimeValue: 3100 },
    { phone: '+27 *** 8812', name: 'Thato K.', orders: 2, lifetimeValue: 2300 },
    { phone: '+27 *** 2190', name: 'Zanele D.', orders: 2, lifetimeValue: 2000 },
    { phone: '+27 *** 7756', name: 'Sipho N.', orders: 2, lifetimeValue: 1800 },
  ],
  momentum: { newCustomersThisMonth: 10, returningCustomersThisMonth: 10, revenueGrowthPercent: 6.2 },
};
