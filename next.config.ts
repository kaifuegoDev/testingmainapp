import type { NextConfig } from "next";

const nextConfig: any = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
