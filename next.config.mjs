/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"], //Allow images from cloudinary
  },
};

export default nextConfig;

