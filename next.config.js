/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Configure SWC to work with custom Babel config
  experimental: {
    forceSwcTransforms: true,
  },
  // Configure compiler options
  compiler: {
    // Enable SWC minification
    swcMinify: true,
  },
};

module.exports = nextConfig;
