import SquircleShift from "@/components/SquircleShift";

export default function Hero() {
  const fadeMaskX = "linear-gradient(to right, transparent 0%, black 16%, black 74%, transparent 100%)";
  const fadeMaskY = "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";

  return (
    <section id="hero" className="hero px-6 sm:px-8">
      <div className="relative mx-auto max-w-[1320px] min-h-screen flex flex-col pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 overflow-visible">
        <div
          className="pointer-events-none absolute inset-y-0 -right-[12%] w-[76%] md:w-[66%] lg:w-[62%]"
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
              brightness={1}
              centerX={1}
              centerY={1}
            />
          </div>
        </div>

        <div className="relative z-10 mt-32 sm:mt-40 lg:mt-48 max-w-[980px] ml-4 sm:ml-6">
          <h1 className="font-heading text-[clamp(4rem,12vw,10.5rem)] font-bold text-white leading-[0.88] tracking-tight -ml-3">
            KENSHŌ
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-white/80 leading-relaxed max-w-[560px]">
            We invest in European resilience technologies - robotics, cybersecurity, quantum, industrial AI. Understood at first principles. Backed with patient capital and the infrastructure to scale.
          </p>
        </div>
      </div>
    </section>
  );
}
