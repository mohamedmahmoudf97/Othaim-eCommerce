'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../lib/types';
import Button from './Button';
import { useCartStore } from '../lib/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, updateQuantity, items } = useCartStore();
  
  // Check if product is in cart and get its quantity
  const cartItem = items.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  
  // Calculate discount percentage (for display purposes)
  const discountPercentage = Math.floor(Math.random() * 30); // Random discount between 0-30%
  const originalPrice = (product.price * (100 / (100 - discountPercentage))).toFixed(2);
  
  // Handle quantity changes
  const handleIncrease = () => {
    if (quantityInCart === 0) {
      addItem(product);
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantityInCart > 0) {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          className="object-contain h-full"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span className="capitalize">{product.category}</span>
          <div className="ml-auto flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{product.rating.rate} ({product.rating.count})</span>
          </div>
        </div>
        
        <h3 className="text-base font-medium text-gray-900 truncate" title={product.title}>
          {product.title}
        </h3>
        
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {discountPercentage > 0 && (
            <>
              <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
              <span className="ml-2 text-sm font-medium text-green-600">{discountPercentage}% off</span>
            </>
          )}
        </div>
        
        <div className="mt-3">
          {quantityInCart > 0 ? (
            <div className="flex items-center justify-between">
              <button 
                onClick={handleDecrease}
                className="w-10 h-10 flex items-center justify-center text-lg font-medium bg-gray-100 text-gray-700 rounded-l-md hover:bg-gray-200 cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 h-10 flex items-center justify-center bg-gray-50 text-gray-900 font-medium">
                {quantityInCart}
              </span>
              <button 
                onClick={handleIncrease}
                className="w-10 h-10 flex items-center justify-center text-lg font-medium bg-gray-100 text-gray-700 rounded-r-md hover:bg-gray-200 cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <Button 
              className="w-full h-10 cursor-pointer"
              onClick={handleIncrease}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;