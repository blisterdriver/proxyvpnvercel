import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add or modify the 'images' property
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Matches the 'https' in your URL
        hostname: 'blog.kitemporiam.com', // The domain from your image URL
        port: '', // No specific port in your URL
        pathname: '/wp-content/uploads/**', // Wildcard to match any year/month/filename structure in WordPress uploads
      },
    ],
  },
  /* other config options can go here */
};

export default nextConfig;