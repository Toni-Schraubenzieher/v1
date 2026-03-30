import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kensho.vc"),
  title: {
    default: "Kensho Ventures | European Deep-Tech Venture Capital",
    template: "%s | Kensho Ventures",
  },
  description:
    "European deep-tech VC. EUR 500K first checks, hands-on infrastructure from Day 1. Investing in robotics, cybersecurity, quantum, and industrial AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kensho Ventures",
    title: "Kensho Ventures | European Deep-Tech Venture Capital",
    description:
      "European deep-tech VC. EUR 500K first checks, hands-on infrastructure from Day 1. Investing in robotics, cybersecurity, quantum, and industrial AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kensho Ventures | European Deep-Tech Venture Capital",
    description:
      "European deep-tech VC. EUR 500K first checks, hands-on infrastructure from Day 1. Investing in robotics, cybersecurity, quantum, and industrial AI.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/satoshi/Satoshi-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/satoshi/Satoshi-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${satoshi.variable} antialiased`}>
        <StructuredData />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
