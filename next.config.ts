import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Disable optimization in dev (localhost resolves to private IP which Next.js blocks)
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      // Add your production Payload URL here when deploying
      // {
      //   protocol: 'https',
      //   hostname: 'your-payload-domain.com',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
