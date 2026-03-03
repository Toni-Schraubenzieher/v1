"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Showcase1 } from "@/components/blocks/showcase-1";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      if (contentRef.current) {
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
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="how-we-work py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="rounded-3xl bg-[#101010] overflow-hidden px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          {/* Header */}
          <div ref={headerRef} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-warm animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">
                Our Process
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
              HOW WE WORK
            </h2>
          </div>

          <div
            ref={contentRef}
            className="w-full"
          >
            <Showcase1 />
          </div>
        </div>
      </div>
    </section>
  );
}
