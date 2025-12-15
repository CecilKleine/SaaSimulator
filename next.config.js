/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/startup-game-2',
  assetPrefix: '/startup-game-2',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
