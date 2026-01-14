import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Optimized font loading - self-hosted, no render blocking
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "noretto - Coming Soon",
  description: "Something exceptional is on the way. Be the first to know when we launch.",
  keywords: ["noretto", "coming soon", "launch"],
  authors: [{ name: "noretto" }],
  openGraph: {
    title: "noretto - Coming Soon",
    description: "Something exceptional is on the way. Be the first to know when we launch.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "noretto - Coming Soon",
    description: "Something exceptional is on the way. Be the first to know when we launch.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Get Payload URL for preconnect hints
const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
const payloadOrigin = new URL(PAYLOAD_URL).origin;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        {/* Preconnect to Payload CMS for faster image loading */}
        <link rel="preconnect" href={payloadOrigin} />
        <link rel="dns-prefetch" href={payloadOrigin} />
      </head>
      <body>{children}</body>
    </html>
  );
}
