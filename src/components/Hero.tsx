import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="hero px-4 pt-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl bg-card-bg min-h-[85vh]">
        {/* Logo inside card */}
        <div className="absolute top-8 left-8 sm:left-12 z-10">
          <Image
            src="/Kensho_Logo.svg"
            alt="Kensho"
            width={140}
            height={33}
            priority
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-between px-8 sm:px-12 pt-24 sm:pt-32 pb-12 min-h-[85vh]">
          {/* Top right: descriptor text */}
          <div className="self-end max-w-xs text-right hidden sm:block">
            <p className="text-sm text-white/50 leading-relaxed">
              <span className="text-accent-warm font-semibold">Early-Stage</span> Venture Capital
              Backing Founders Building
              Transformative Technology
            </p>
          </div>

          {/* Bottom area */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-8 mt-auto">
            {/* Left side: tagline + big title */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent-mint animate-pulse" />
                <span className="text-sm font-medium text-white/50">
                  Open for new investments
                </span>
              </div>

              <p className="text-base sm:text-lg text-white/40 mb-4 max-w-md">
                <span className="text-accent-warm font-medium">Kensho</span>{" "}
                Helps Visionary Founders Turn Bold Ideas Into
                Companies People Remember.
              </p>

              <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                Kenshō
              </h1>
            </div>

            {/* Right side: CTA */}
            <div className="flex flex-col items-end gap-4 flex-shrink-0">
              <a
                href="#who-we-are"
                className="rounded-full bg-accent-warm px-8 py-3.5 text-base font-semibold text-[#161616] transition-all hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-accent-warm/25"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
