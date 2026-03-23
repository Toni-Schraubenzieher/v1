import Link from "next/link";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="mx-auto max-w-[760px] px-6 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-12"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-10">
          {title}
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-white/80">
          {children}
        </div>
      </div>
    </div>
  );
}
