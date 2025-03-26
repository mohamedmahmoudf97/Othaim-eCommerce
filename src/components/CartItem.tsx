'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '../lib/types';
import { useCartStore } from '../lib/store';
import Button from './Button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const [showConfirm, setShowConfirm] = useState(false);
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <Button
          className="p-1 text-gray-400 hover:text-gray-500"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          -
        </Button>
        <span className="mx-2 text-gray-900">{item.quantity}</span>
        <Button
          className="p-1 text-gray-400 hover:text-gray-500"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </Button>
      </div>
      <div className="ml-4 text-right">
        <p className="text-sm font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        {showConfirm ? (
          <div className="mt-1 flex items-center">
            <span className="text-xs text-gray-500 mr-2">Remove?</span>
            <Button
              className="text-xs text-red-600 hover:text-red-800 mr-2"
              onClick={() => removeItem(item.id)}
            >
              Yes
            </Button>
            <Button
              className="text-xs text-gray-600 hover:text-gray-800"
              onClick={() => setShowConfirm(false)}
            >
              No
            </Button>
          </div>
        ) : (
          <Button
            className="mt-1 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirm(true)}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;