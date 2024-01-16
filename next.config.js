/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  publicRuntimeConfig: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
}
