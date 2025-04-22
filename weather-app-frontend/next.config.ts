import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 
  // Configure allowed image domains for next/image
  images: {
    domains: ['openweathermap.org'],
  }
};

export default nextConfig;