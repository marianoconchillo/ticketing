/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: function (config, options) {
    config.watchOptions.poll = 300;
    return config;
  },
}

module.exports = nextConfig
