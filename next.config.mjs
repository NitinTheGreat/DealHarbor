// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.aceternity.com', 'dummyimage.com','example.com','images.theconversation.com'], // Add your image hosting domains here
  },
  webpack(config) {
    // Additional custom webpack configurations can be added here
    return config;
  },
};

export default nextConfig;
