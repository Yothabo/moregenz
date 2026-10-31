import { useEffect, useState } from 'react';

export type ProductCategory = 'His' | 'Hers' | 'Spaces';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  subcategory: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  order_count: number;
  created_at: string;
};

function timestamp(value: string | null | undefined): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Hero selection:
 * 1. Active products only.
 * 2. Higher order_count first, when the API supplies it.
 * 3. Lower admin sort_order first for ties.
 * 4. Newest products first as the final tie-breaker.
 */
export function getFeaturedProducts(
  products: Product[],
  limit = 5
): Product[] {
  return products
    .filter((product) => product.is_active === true)
    .slice()
    .sort((a, b) => {
      const orderDifference =
        (Number(b.order_count) || 0) - (Number(a.order_count) || 0);

      if (orderDifference !== 0) return orderDifference;

      const sortDifference =
        (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);

      if (sortDifference !== 0) return sortDifference;

      return timestamp(b.created_at) - timestamp(a.created_at);
    })
    .slice(0, limit);
}

/**
 * Category selection:
 * 1. Active products only.
 * 2. Exact category match.
 * 3. Admin sort_order ascending.
 * 4. Newest first when sort_order is equal.
 */
export function getCategoryProducts(
  products: Product[],
  category: ProductCategory,
  limit = 5
): Product[] {
  return products
    .filter(
      (product) =>
        product.is_active === true &&
        product.category === category
    )
    .slice()
    .sort((a, b) => {
      const sortDifference =
        (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);

      if (sortDifference !== 0) return sortDifference;

      return timestamp(b.created_at) - timestamp(a.created_at);
    })
    .slice(0, limit);
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setIsLoading(true);

      try {
        const response = await fetch('/api/products', {
          headers: { Accept: 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load products.');
        }

        if (!cancelled) {
          setProducts(Array.isArray(data.products) ? data.products : []);
          setError(null);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Unable to load products.'
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading, error };
}
