const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: process.env.API_HOST,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
  images: {
    domains: ['cdn.pixabay.com', process.env.API_DOMAIN]
  },
  async redirects() {
    return [
      {
        source: '/api/images/:path*',
        destination: process.env.API_HOST + '/images/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig