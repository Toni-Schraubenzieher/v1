export default function WhoWeAre() {
  return (
    <section id="about" className="relative py-32 px-6">
      {/* Subtle glow */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-mint/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-accent-mint" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-mint">
            Who We Are
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Big Statement */}
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
              Conviction-driven
              <br />
              investing for the
              <br />
              <span className="text-accent-warm">bold</span>.
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col gap-6">
            <p className="text-lg text-white/60 leading-relaxed">
              Kensho is an early-stage venture capital firm that partners with
              exceptional founders tackling the world&apos;s most pressing challenges
              through technology and innovation.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              We believe the best companies are built by relentless founders with
              deep domain expertise. Our role is to be their first believers — 
              providing not just capital, but strategic guidance, operational
              support, and access to our global network.
            </p>

            {/* Value pillars */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { title: "Seed & Pre-Seed", desc: "Earliest conviction" },
                { title: "Sector Agnostic", desc: "Breakthrough ideas" },
                { title: "Founder First", desc: "People over decks" },
                { title: "Global Reach", desc: "Network across 30+ countries" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-5 transition-all hover:border-white/10"
                >
                  <div className="font-heading text-base font-bold text-white mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-white/40">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
