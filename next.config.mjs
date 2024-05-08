/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    TOKEN: process.env.API_TOKEN,
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
