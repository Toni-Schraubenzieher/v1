"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SquircleShift from "@/components/SquircleShift";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 55%",
              scrub: 1.5,
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fadeMaskX = "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)";
  const fadeMaskY = "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Dither Wave Background */}
      <div
        className="pointer-events-none absolute inset-0"
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
            centerX={0.5}
            centerY={0.9}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 sm:px-8">
        <h2
          ref={headingRef}
          className="mb-12 font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight lg:mb-16"
          style={{ color: "#FEB180" }}
        >
          SUBSTANCE OVER STORY
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card: €500K */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10">
            <div className="font-heading text-4xl font-bold text-white lg:text-5xl">€500K</div>
            <p className="mt-3 text-base text-white/90">
              First check · Pre-Seed & Seed
            </p>
          </div>

          {/* Card: €50m+ */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10">
            <div className="font-heading text-4xl font-bold text-white lg:text-5xl">€50m+</div>
            <p className="mt-3 text-base text-white/90">
              Deployed across 15+ deep-tech investments
            </p>
          </div>

          {/* Card: Quote */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-center">
            <p className="font-heading text-4xl font-bold text-white lg:text-5xl leading-tight">
              "We back the technologies that will define{" "}
              <span style={{ color: "#FEB180" }}>
                European sovereignty."
              </span>
            </p>
            <p className="mt-6 text-base text-white/90">- Kensho Ventures</p>
          </div>

          {/* Card: 2 CVCs */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10">
            <div className="font-heading text-4xl font-bold text-white lg:text-5xl">2 CVCs</div>
            <p className="mt-3 text-base text-white/90">
              Built from zero - we've been operators, not just investors
            </p>
          </div>

          {/* Card: 12 */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10">
            <div className="font-heading text-4xl font-bold text-white lg:text-5xl">12</div>
            <p className="mt-3 text-base text-white/90">
              Years deep-tech investing
            </p>
          </div>

          {/* Card: Infrastructure, Not Advice */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10 md:col-span-2 lg:col-span-2 flex flex-col">
            <h3 className="font-heading text-4xl font-bold text-white lg:text-5xl leading-tight">
              Infrastructure, <span style={{ color: "#D4FFEF" }}>Not Advice</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              We build the commercial engine around your technology. Lead generation, customer access, transatlantic expansion - operational from Day 1.
            </p>
          </div>

          {/* Card: 15+ */}
          <div className="rounded-3xl bg-[#181818] p-8 lg:p-10 md:col-span-2 lg:col-span-1">
            <div className="font-heading text-4xl font-bold text-white lg:text-5xl">15+</div>
            <p className="mt-3 text-base text-white/90">
              Investments across 4 verticals
            </p>
            <div className="mt-auto pt-6 text-base font-semibold text-white/90" style={{ color: "#FEB180" }}>
              Pre-Seed & Seed Focus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
