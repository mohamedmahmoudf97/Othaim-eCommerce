import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import * as storeModule from '../../lib/store';
import * as nextNavigation from 'next/navigation';

// Mock the Zustand store
jest.mock('../../lib/store', () => ({
  useCartStore: jest.fn(),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

describe('Header Component', () => {
  const mockGetTotalItems = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for empty cart
    mockGetTotalItems.mockReturnValue(0);
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems
    });
  });

  test('renders logo and navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('Othaim E-Commerce')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('does not show cart badge when cart is empty', () => {
    // For this test, we're already mocking getTotalItems to return 0
    render(<Header />);
    
    // The badge shouldn't be visible when cart is empty
    const badge = screen.queryByTestId('cart-badge');
    expect(badge).not.toBeInTheDocument();
  });

  test('shows cart badge with correct count when items are in cart', () => {
    // Mock non-empty cart for this specific test
    mockGetTotalItems.mockReturnValue(3);
    
    render(<Header />);
    
    // We'll need to add a data-testid to the badge in the Header component
    const badge = screen.queryByText('3');
    expect(badge).toBeInTheDocument();
  });

  test('applies active styles to current page link', () => {
    // Mock pathname to be /products
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/products');
    
    render(<Header />);
    
    // Products link should have active class
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveClass('bg-blue-100');
    expect(productsLink).toHaveClass('text-blue-700');
    
    // Cart link should not have active class
    const cartLink = screen.getByText('Cart').closest('a');
    expect(cartLink).not.toHaveClass('bg-blue-100');
    expect(cartLink).not.toHaveClass('text-blue-700');
  });
});
