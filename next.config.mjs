// next.config.mjs

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['assets.aceternity.com', 'dummyimage.com','example.com','images.theconversation.com','example.%20com','m.media-amazon.com','drive.google.com','instagram.flko7-2.fna.fbcdn.net'], // Add your image hosting domains here
  },
  webpack(config) {
    // Additional custom webpack configurations can be added here
    return config;
  },
};

export default nextConfig;
