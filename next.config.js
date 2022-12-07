/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: "http://192.168.0.156:3023"
  }
}

module.exports = nextConfig
