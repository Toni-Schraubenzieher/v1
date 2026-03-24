import Link from "next/link";
import Navbar from "@/components/Navbar";
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
      <Navbar />

      <main className="mx-auto max-w-[760px] px-6 sm:px-8 pt-40 sm:pt-48 pb-24 sm:pb-32">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/40 hover:text-white/70 transition-colors mb-16"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
          Back to Home
        </Link>

        <h1 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight text-white mb-4">
          {title}
        </h1>

        <div className="h-px bg-gradient-to-r from-[#FEB180]/40 via-[#FEB180]/10 to-transparent mb-12 sm:mb-16" />

        <div
          className="space-y-6 text-[15px] sm:text-base leading-relaxed text-white/65
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
