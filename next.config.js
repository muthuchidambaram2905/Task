/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other Next.js config options here
  experimental: {
    // example config
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig