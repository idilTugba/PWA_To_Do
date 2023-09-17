const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  plugins: ['@styled-jsx/plugin-sass']
}

module.exports = withPWA(nextConfig)