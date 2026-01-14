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
  // Performance: Enable compression
  compress: true,
  // Caching headers for static assets
  async headers() {
    return [
      {
        // Static assets (fonts, images in public folder)
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Next.js static chunks (JS/CSS) - immutable because they have hash in filename
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
