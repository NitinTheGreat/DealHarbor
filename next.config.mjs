// next.config.mjs

const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['assets.aceternity.com'], // Add your external image domains here
    },
    webpack(config) {
      // Additional custom webpack configurations can be added here
      return config;
    },
    // Other configurations can go here
  };
  
  export default nextConfig;
  