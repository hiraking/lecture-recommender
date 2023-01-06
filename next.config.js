/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // assetPrefix: ".",
  webpack: (config) => {
    config.watchOptions = {
      poll: 5000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
