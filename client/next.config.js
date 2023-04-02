/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.watchOptions.poll = 300;
    return config;
  },
}

module.exports = nextConfig
