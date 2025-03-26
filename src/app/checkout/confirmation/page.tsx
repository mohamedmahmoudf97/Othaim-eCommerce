'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '../../../lib/types';
import Button from '../../../components/Button';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // Get order from localStorage
    const savedOrder = localStorage.getItem('last_order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find your order information.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Order Details</h3>
            
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center py-2 border-b border-gray-200">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Shipping Information</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-900">{order.customer.name}</p>
                <p className="text-sm text-gray-900">{order.customer.email}</p>
                <p className="text-sm text-gray-900">{order.customer.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
