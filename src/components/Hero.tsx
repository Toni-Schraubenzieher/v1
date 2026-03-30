import dynamic from "next/dynamic";
const SquircleShift = dynamic(() => import("@/components/SquircleShift"), { ssr: false });

export default function Hero() {
  const fadeMaskX = "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)";
  const fadeMaskY = "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";

  return (
    <section id="hero" className="hero px-6 sm:px-8">
      <div className="relative mx-auto max-w-[82.5rem] min-h-screen flex flex-col pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32">
        <div
          className="pointer-events-none absolute inset-y-0 -right-[6%] w-[65%] sm:-right-[8%] sm:w-[72%] md:-right-[12%] md:w-[70%] lg:w-[66%]"
          style={{ maskImage: fadeMaskX, WebkitMaskImage: fadeMaskX }}
        >
          <div className="h-full w-full" style={{ maskImage: fadeMaskY, WebkitMaskImage: fadeMaskY }}>
            <SquircleShift
              width="100%"
              height="100%"
              speed={0.3}
              colorLayers={3}
              gridFrequency={7}
              gridIntensity={0.4}
              lineThickness={0.09}
              phaseOffset={29}
              waveSpeed={0.2}
              waveIntensity={0.3}
              colorTint="#FEB180"
              brightness={1.5}
              centerX={0}
              centerY={1}
            />
          </div>
        </div>

        <div className="relative z-10 mt-32 sm:mt-40 lg:mt-48 max-w-[61.25rem] ml-4 sm:ml-6">
          <h1 className="font-heading text-[clamp(4rem,12vw,10.5rem)] font-bold text-white leading-[0.88] tracking-tight -ml-3">
            KENSHŌ
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-white/90 leading-relaxed max-w-[56rem] text-balance">
            We invest in European resilience technologies - robotics, cybersecurity, quantum, industrial AI. Understood at first principles. Backed with patient capital and the infrastructure to scale.
          </p>
        </div>
      </div>
    </section>
  );
}
