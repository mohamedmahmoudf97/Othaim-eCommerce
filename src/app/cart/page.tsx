// src/app/cart/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '../../lib/store';
import CartItem from '../../components/CartItem';
import Button from '../../components/Button';

export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link href="/products" >
          <Button className='cursor-pointer'>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-lg font-medium text-gray-900">Total</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalPrice().toFixed(2)}</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="secondary" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link href="/checkout">
                <Button>Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}