export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent-warm/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent-mint/8 blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-sm font-medium text-white/70">
            Investing in the future
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-white mb-6">
          We back founders{" "}
          <br className="hidden sm:block" />
          building{" "}
          <span className="gradient-text">
            what&apos;s next
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/50 leading-relaxed mb-10 font-light">
          Kensho is an early-stage venture capital firm partnering with
          visionary entrepreneurs to build transformative technology companies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-full bg-accent-warm px-8 py-3.5 text-base font-semibold text-[#101010] transition-all hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-accent-warm/20"
          >
            View Portfolio
          </a>
          <a
            href="#about"
            className="rounded-full border border-white/15 px-8 py-3.5 text-base font-medium text-white/80 transition-all hover:bg-white/5 hover:border-white/25"
          >
            Learn More
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-white">$120M</div>
            <div className="text-sm text-white/40 mt-1">Assets Under Management</div>
          </div>
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-white">40+</div>
            <div className="text-sm text-white/40 mt-1">Portfolio Companies</div>
          </div>
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-accent-mint">6x</div>
            <div className="text-sm text-white/40 mt-1">Average Return</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
