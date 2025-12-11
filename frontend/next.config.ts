import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ericchurch.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
      },
      {
        protocol: 'https',
        hostname: 'toppng.com',
      },
      {
        protocol: 'https',
        hostname: 'imagescdn.designweek.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.sportico.com',
      },
      {
        protocol: 'https',
        hostname: 'northeastlive.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: "https",
        hostname: "digitalhub.fifa.com",
      },
    ],
  },
};

export default nextConfig;
