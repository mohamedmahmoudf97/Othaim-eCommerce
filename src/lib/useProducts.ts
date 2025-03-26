import { useEffect, useState } from 'react';
import { getProducts } from '../data/productService';
import { Product } from './types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Try to get products from localStorage first
        const cachedProducts = localStorage.getItem('cached_products');
        const cachedTimestamp = localStorage.getItem('cached_products_timestamp');
        
        // Check if we have cached products and if they're less than 1 hour old
        if (cachedProducts && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp, 10);
          const now = new Date().getTime();
          const oneHour = 60 * 60 * 1000;
          
          if (now - timestamp < oneHour) {
            setProducts(JSON.parse(cachedProducts));
            setLoading(false);
            
            // Refresh cache in background
            refreshCache();
            return;
          }
        }
        
        // If no cache or cache is old, fetch from API
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        
        // Cache the products
        localStorage.setItem('cached_products', JSON.stringify(fetchedProducts));
        localStorage.setItem('cached_products_timestamp', new Date().getTime().toString());
        
        setLoading(false);
      } catch (err) {
        console.error(err)
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        
        // If we have cached products, use them as fallback
        const cachedProducts = localStorage.getItem('cached_products');
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
        }
      }
    };
    
    const refreshCache = async () => {
      try {
        const fetchedProducts = await getProducts();
        
        // Update cache silently
        localStorage.setItem('cached_products', JSON.stringify(fetchedProducts));
        localStorage.setItem('cached_products_timestamp', new Date().getTime().toString());
        
        // Update state if products changed
        setProducts(fetchedProducts);
      } catch (err) {
        // Silently fail on background refresh
        console.error('Background cache refresh failed:', err);
      }
    };
    
    // Check online status
    const handleOnline = () => {
      fetchProducts();
    };
    
    window.addEventListener('online', handleOnline);
    fetchProducts();
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  return { products, loading, error };
};