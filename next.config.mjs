// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.aceternity.com', 'dummyimage.com'], // Added dummyimage.com to allowed domains
  },
  webpack(config) {
    // Additional custom webpack configurations can be added here
    return config;
  },
 
};

export default nextConfig;
