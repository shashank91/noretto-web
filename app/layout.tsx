import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
