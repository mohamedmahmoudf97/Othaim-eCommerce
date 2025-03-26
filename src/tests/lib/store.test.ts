import { act } from '@testing-library/react';
import { useCartStore } from '../../lib/store';

// Reset the store before tests
beforeEach(() => {
  // Clear the store state
  act(() => {
    const store = useCartStore.getState();
    store.clearCart();
  });

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

describe('Cart Store', () => {
  const mockProduct = {
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

  test('initial state has empty items array', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
  });

  test('addItem adds a product to the cart with quantity 1', () => {
    const { addItem } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
    });
    
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({
      ...mockProduct,
      quantity: 1
    });
  });

  test('addItem increases quantity if product already in cart', () => {
    const { addItem } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      addItem(mockProduct);
    });
    
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  test('updateQuantity updates the quantity of an item', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      updateQuantity(mockProduct.id, 5);
    });
    
    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(5);
  });

  test('updateQuantity removes item when quantity is 0', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      updateQuantity(mockProduct.id, 0);
    });
    
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  test('removeItem removes an item from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      removeItem(mockProduct.id);
    });
    
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  test('clearCart removes all items from the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      addItem({...mockProduct, id: 2, title: 'Another Product'});
      clearCart();
    });
    
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  test('getTotalItems returns the total number of items in the cart', () => {
    const { addItem, updateQuantity, getTotalItems } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      addItem({...mockProduct, id: 2, title: 'Another Product'});
      updateQuantity(mockProduct.id, 3);
    });
    
    expect(getTotalItems()).toBe(4); // 3 + 1
  });

  test('getTotalPrice returns the total price of all items in the cart', () => {
    const { addItem, updateQuantity, getTotalPrice } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct); // 99.99
      addItem({...mockProduct, id: 2, price: 49.99}); // 49.99
      updateQuantity(mockProduct.id, 2); // 99.99 * 2
    });
    
    expect(getTotalPrice()).toBeCloseTo(249.97, 2); // 99.99*2 + 49.99
  });
});
