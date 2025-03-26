'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const { getTotalItems } = useCartStore();
  const pathname = usePathname();
  
  // Add client-side only state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  
  // Only run on client-side after hydration
  useEffect(() => {
    setMounted(true);
    setItemCount(getTotalItems());
    
    // Set up a listener to update the cart count when it changes
    const updateCartCount = () => {
      setItemCount(getTotalItems());
    };
    
    // Subscribe to cart changes
    window.addEventListener('storage', updateCartCount);
    
    // Check for cart updates periodically
    const interval = setInterval(updateCartCount, 1000);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, [getTotalItems]);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Othaim E-Commerce
            </Link>
          </div>
          <nav className="flex items-center space-x-1">
            <Link 
              href="/products" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === '/products'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Products
            </Link>
            <Link 
              href="/cart" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                pathname === '/cart'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              Cart
              {mounted && itemCount > 0 && (
                <span 
                  data-testid="cart-badge"
                  className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;