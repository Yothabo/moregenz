import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

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
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, isLoading, error };
}
