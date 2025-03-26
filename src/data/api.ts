import axios from 'axios';

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com',
});

export default api;