"use client";

import dynamic from "next/dynamic";
const SquircleShift = dynamic(() => import("@/components/SquircleShift"), { ssr: false });
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const fadeMaskX =
    "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)";
  const fadeMaskY =
    "linear-gradient(to bottom, transparent 0%, black 10%, black 92%, transparent 100%)";

  return (
    <section ref={sectionRef} id="get-in-touch" className="px-6 sm:px-8 py-12 lg:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-[82.5rem] min-h-[60vh] sm:min-h-[70vh] lg:min-h-[82vh] overflow-visible pt-10 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[75%] sm:w-[75%] md:w-[70%] lg:w-[65%]"
          style={{ maskImage: fadeMaskX, WebkitMaskImage: fadeMaskX }}
        >
          <div
            className="h-full w-full"
            style={{ maskImage: fadeMaskY, WebkitMaskImage: fadeMaskY }}
          >
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

        <div className="relative z-10 flex min-h-[68vh] items-center">
          <div ref={contentRef} className="ml-[50%] w-full max-w-[32.5rem] text-left">
            <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
              GET IN TOUCH
            </h2>
            <p className="mt-7 max-w-[28.75rem] text-base leading-relaxed text-white/90 sm:text-lg">
              We back ambitious founders early and move with conviction. If you are building
              transformative technology, let&apos;s talk.
            </p>
            <a
              href="mailto:info@kensho.vc"
              className="mt-9 inline-flex items-center rounded-full bg-[#FEB180] px-7 py-3 text-base font-semibold text-[#101010] transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
