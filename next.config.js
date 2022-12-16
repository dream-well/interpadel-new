/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: "https://192.168.0.156:3024",
    GOOGLE_CLIENT_ID: "368739694144-iqfcj2bv8b2vsn6u1ia6c6vho4q3uu99.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    STRIPE_KEY: "pk_test_51MBqwcCQO6T38kilxah5Ohj2C4kTH0wNAdQOsfdIbZG460IcQ7SQroUKKN3atjgRQ743ZhZG4C245Qq8ztny7Z8y00zmzMqxck",
  },
  images: {
    domains: ['cdn.pixabay.com', '192.168.0.156']
  },
  async redirects() {
    return [
      {
        source: '/api/images/:path*',
        destination: 'http://192.168.0.156:3023/images/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
