/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Only enable static export for GitHub Pages builds
  ...(process.env.GITHUB_ACTIONS && { output: 'export' }),
}

module.exports = nextConfig
