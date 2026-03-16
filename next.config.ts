import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images from /public are automatically allowed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
    ],
  },
};

export default nextConfig;
