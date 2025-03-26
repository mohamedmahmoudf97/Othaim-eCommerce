/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
  // Enable static exports for better performance
  output: 'standalone',
};

module.exports = nextConfig;
