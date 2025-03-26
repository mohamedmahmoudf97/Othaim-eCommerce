/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../lib/types';
import * as storeModule from '../../lib/store';

// Mock the Zustand store
jest.mock('../../lib/store', () => ({
  useCartStore: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/test.jpg',
    rating: {
      rate: 4.5,
      count: 120
    }
  };

  const mockAddItem = jest.fn();
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for not in cart
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      updateQuantity: mockUpdateQuantity,
      items: []
    });
  });

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5 (120)')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src');
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('calls addItem when Add to Cart button is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  test('shows quantity controls when product is in cart', () => {
    // Mock product in cart with quantity 2
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      updateQuantity: mockUpdateQuantity,
      items: [{ ...mockProduct, quantity: 2 }]
    });
    
    render(<ProductCard product={mockProduct} />);
    
    // Add to Cart button should not be visible
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
    
    // Quantity controls should be visible
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
  });

  test('calls updateQuantity when + button is clicked', () => {
    // Mock product in cart with quantity 2
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      updateQuantity: mockUpdateQuantity,
      items: [{ ...mockProduct, quantity: 2 }]
    });
    
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 3);
  });

  test('calls updateQuantity when - button is clicked', () => {
    // Mock product in cart with quantity 2
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      updateQuantity: mockUpdateQuantity,
      items: [{ ...mockProduct, quantity: 2 }]
    });
    
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 1);
  });

  test('displays discount information when applicable', () => {
    // Since the discount is randomly generated in the component, we need to mock Math.random
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.5); // 50% discount for testing
    
    render(<ProductCard product={mockProduct} />);
    
    // Check for discount elements
    expect(screen.getByText('15% off')).toBeInTheDocument();
    expect(screen.getByText('$117.64')).toBeInTheDocument(); // Original price calculation
    
    // Restore original Math.random
    Math.random = originalRandom;
  });
});
