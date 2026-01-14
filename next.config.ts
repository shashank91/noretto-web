import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Bypass Next.js image optimization - serve images directly from Payload
    // This avoids AVIF decoding issues and connection problems during SSR
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '46.62.135.233',
        port: '30081',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
