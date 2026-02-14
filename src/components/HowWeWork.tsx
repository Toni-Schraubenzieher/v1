const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We actively source and identify exceptional founders at the earliest stages — often before they've raised a single dollar. Our network spans accelerators, universities, and industry hubs worldwide.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Invest",
    description:
      "We move with conviction and speed. When we believe in a founder's vision, we commit — providing meaningful capital, clear terms, and a partnership built on trust from day one.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Grow",
    description:
      "Post-investment, we roll up our sleeves. From hiring key talent and refining go-to-market strategies to introductions that unlock new markets — we're in the trenches with our founders.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function HowWeWork() {
  return (
    <section id="process" className="relative py-32 px-6">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-accent-warm/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-accent-warm" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-warm">
            How We Work
          </span>
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-xl">
          From first meeting to lasting impact
        </h2>
        <p className="text-lg text-white/50 mb-16 max-w-xl">
          Our process is built on speed, transparency, and deep founder alignment.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative glass rounded-3xl p-8 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              {/* Step number */}
              <div className="text-sm font-bold text-white/20 mb-6 font-heading">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl ${
                  i === 0
                    ? "bg-accent-mint/10 text-accent-mint"
                    : i === 1
                    ? "bg-accent-warm/10 text-accent-warm"
                    : "bg-white/5 text-white/70"
                }`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-base text-white/45 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
