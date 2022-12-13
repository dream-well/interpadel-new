/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: "http://192.168.0.156:3023",
    STRIPE_KEY: "pk_test_51MBqwcCQO6T38kilxah5Ohj2C4kTH0wNAdQOsfdIbZG460IcQ7SQroUKKN3atjgRQ743ZhZG4C245Qq8ztny7Z8y00zmzMqxck",
  },
  images: {
    domains: ['cdn.pixabay.com']
  }
}

module.exports = nextConfig
