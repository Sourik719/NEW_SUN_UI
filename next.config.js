/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
}

module.exports = nextConfig