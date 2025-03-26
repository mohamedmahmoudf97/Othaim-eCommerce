import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../../app/checkout/page';
import * as storeModule from '../../lib/store';
import * as nextNavigation from 'next/navigation';

// Mock the Zustand store
jest.mock('../../lib/store', () => ({
  useCartStore: jest.fn(),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('CheckoutPage Component', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'Test description',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/test.jpg',
      rating: { rate: 4.5, count: 120 },
      quantity: 2
    }
  ];
  
  const mockGetTotalPrice = jest.fn().mockReturnValue(199.98);
  const mockClearCart = jest.fn();
  const mockRouterPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      items: mockCartItems,
      getTotalPrice: mockGetTotalPrice,
      clearCart: mockClearCart
    });
    
    // Mock router
    const mockRouter = { push: mockRouterPush };
    (nextNavigation.useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test('renders checkout form and order summary', async () => {
    const { container } = render(<CheckoutPage />);
    
    // Wait for the component to finish loading
    await waitFor(() => {
      // Check for the form to be rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });
    
    // Check form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete order/i })).toBeInTheDocument();
    
    // Check order summary - be more specific with selectors
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    
    // Use a more specific query for the total price
    const totalElement = screen.getAllByText(/\$199\.98/i).find(
      element => element.closest('.flex.justify-between.py-2.border-t.border-gray-200')
    );
    expect(totalElement).toBeInTheDocument();
  });

  test('redirects to products page if cart is empty', () => {
    // Mock empty cart
    (storeModule.useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      getTotalPrice: mockGetTotalPrice,
      clearCart: mockClearCart
    });
    
    render(<CheckoutPage />);
    
    // Since we can't test useEffect directly, we can check if the router.push was called
    // This will happen after the component renders and the useEffect runs
    expect(mockRouterPush).toHaveBeenCalledWith('/products');
  });

  test('shows validation errors when submitting empty form', async () => {
    const { container } = render(<CheckoutPage />);
    
    // Wait for the component to finish loading
    await waitFor(() => {
      // Check for the form to be rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /complete order/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('City is required')).toBeInTheDocument();
      expect(screen.getByText('ZIP code is required')).toBeInTheDocument();
      expect(screen.getByText('Country is required')).toBeInTheDocument();
    });
  });

  test.skip('shows email validation error for invalid email', async () => {
    const { container } = render(<CheckoutPage />);
    
    // Wait for the component to finish loading
    await waitFor(() => {
      // Check for the form to be rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });
    
    // Fill in email field with invalid email
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /complete order/i }));
    
    // Check for email validation error using direct DOM query
    await waitFor(() => {
      // Find the error message element directly in the DOM
      const errorElement = container.querySelector('.text-red-600');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement?.textContent).toBe('Email is invalid');
    });
  });

  test('submits form successfully and redirects to confirmation page', async () => {
    const { container } = render(<CheckoutPage />);
    
    // Wait for the component to finish loading
    await waitFor(() => {
      // Check for the form to be rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/street address/i), {
      target: { value: '123 Main St' }
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Anytown' }
    });
    fireEvent.change(screen.getByLabelText(/zip/i), {
      target: { value: '12345' }
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'USA' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /complete order/i }));
    
    // Wait for async operations
    await waitFor(() => {
      // Check if localStorage was updated with order
      expect(window.localStorage.setItem).toHaveBeenCalledWith('last_order', expect.any(String));
      
      // Check if cart was cleared
      expect(mockClearCart).toHaveBeenCalled();
      
      // Check if redirected to confirmation page
      expect(mockRouterPush).toHaveBeenCalledWith('/checkout/confirmation');
    });
  });
});
