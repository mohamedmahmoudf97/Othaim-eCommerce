import { getProducts } from '../../data/productService';
import api from '../../data/api';

// Mock the API module
jest.mock('../../data/api', () => ({
  get: jest.fn(),
}));

describe('Product Service', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      description: 'Test description 1',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/test1.jpg',
      rating: { rate: 4.5, count: 120 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 49.99,
      description: 'Test description 2',
      category: 'clothing',
      image: 'https://fakestoreapi.com/img/test2.jpg',
      rating: { rate: 3.8, count: 80 }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    test('returns products when API call is successful', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });
      
      const result = await getProducts();
      
      expect(api.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockProducts);
    });

    test('returns empty array when API call fails', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('API error'));
      
      const result = await getProducts();
      
      expect(api.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual([]);
    });
  });
});
