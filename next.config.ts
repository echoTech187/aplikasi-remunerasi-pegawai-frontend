import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "0.0.0.0", "192.168.61.199"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  crossOrigin: 'use-credentials',
  reactStrictMode: false,
};

export default nextConfig;
