import { useEffect, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'His' | 'Hers' | 'Spaces';
  subcategory: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  order_count: number;
  created_at: string;
};

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
    return () => { cancelled = true; };
  }, []);

  return { products, isLoading, error };
}
