import Image from "next/image";

const team = [
  {
    name: "Wolfgang",
    role: "Managing Partner",
    bio: "15+ years in venture and growth equity. Previously at Goldman Sachs and EQT Ventures.",
    image: "/Team/Wolfgang.png",
  },
  {
    name: "Marc",
    role: "Partner",
    bio: "Former CTO at a YC-backed startup. Deep expertise in AI/ML and developer infrastructure.",
    image: "/Team/Marc.png",
  },
  {
    name: "Anton",
    role: "Principal",
    bio: "Climate tech specialist with a background in environmental engineering and impact investing.",
    image: "/Team/Anton.png",
  },
  {
    name: "Linda",
    role: "Vice President",
    bio: "Fintech and Web3 focus. Previously led strategy at a leading European neobank.",
    image: "/Team/Linda.png",
  },
];

export default function TeamContact() {
  return (
    <section id="team" className="relative py-32 px-6">
      {/* Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-mint/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-accent-warm" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-warm">
            Our Team
          </span>
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-xl">
          The people behind Kensho
        </h2>
        <p className="text-lg text-white/50 mb-16 max-w-xl">
          Operators turned investors — we&apos;ve been in the founder&apos;s seat and understand
          what it takes to build from zero to one.
        </p>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {team.map((member) => (
            <div
              key={member.name}
              className="group glass rounded-3xl p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              {/* Avatar image */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-0.5">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-accent-mint mb-3">
                {member.role}
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="relative glass rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent-warm/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-mint/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Building something
              <br />
              <span className="gradient-text">extraordinary</span>?
            </h3>
            <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">
              We&apos;re always looking to meet ambitious founders. Whether you have a
              deck, a prototype, or just a bold idea — reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@kensho.vc"
                className="rounded-full bg-accent-warm px-8 py-3.5 text-base font-semibold text-[#101010] transition-all hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-accent-warm/20"
              >
                hello@kensho.vc
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-8 py-3.5 text-base font-medium text-white/80 transition-all hover:bg-white/5 hover:border-white/25"
              >
                Follow on X
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
