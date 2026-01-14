import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.creativehub.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.creativehub.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

