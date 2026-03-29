"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <main className="mx-auto max-w-[760px] px-6 sm:px-8 pt-24 sm:pt-32 pb-24 sm:pb-32">
        <Link
          href="/"
          className="inline-flex h-12 min-w-[210px] items-center justify-between rounded-2xl border border-white/15 bg-[#101010]/68 px-5 text-white backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors mb-16"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
          <span className="text-base font-medium">BACK TO HOME</span>
        </Link>

        <h1 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight mb-12 sm:mb-16" style={{ color: "#FEB180" }}>
          {title}
        </h1>

        <div
          className="space-y-6 text-[15px] sm:text-base leading-relaxed text-white/80
            [&>h2]:font-heading [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-semibold
            [&>h2]:text-white/90 [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-4
            [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-white/[0.06]
            [&>a]:text-[#FEB180] [&>a]:hover:underline
            [&>p>a]:text-[#FEB180] [&>p>a]:hover:underline"
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
