"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const areas = [
  {
    id: 1,
    title: "Robotics",
    description:
      "We source exceptional founders through our global network — often before they've raised a single dollar.",
    color: "#FEB180",
  },
  {
    id: 2,
    title: "Enabling Technologies",
    description:
      "Deep-dive into the team, market, and technology. We move with speed and conviction when we believe.",
    color: "#D4FFEF",
  },
  {
    id: 3,
    title: "Cybersecurity / Dual use",
    description:
      "Meaningful capital, clear terms, and a partnership built on trust from day one. No games, no delays.",
    color: "#FEB180",
  },
  {
    id: 4,
    title: "Computation",
    description:
      "From hiring key talent to unlocking new markets — we're in the trenches with our founders every step.",
    color: "#D4FFEF",
  },
];

export default function VentureStories() {
  const [activeIndex, setActiveIndex] = useState(0);
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
      id="venture-stories"
      className="py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="rounded-3xl bg-[#101010] overflow-hidden px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          {/* Header */}
          <div ref={headerRef} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-warm animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">
                Investment Focus
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
              THIS IS KENSHO
            </h2>
          </div>

          {/* Content: Items left, Image right */}
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            {/* Left: Clickable Items */}
            <div className="flex flex-col">
              {areas.map((area, index) => (
                <button
                  key={area.id}
                  onClick={() => setActiveIndex(index)}
                  className="group relative text-left py-6 sm:py-8 cursor-pointer flex items-center gap-4"
                >
                  <div
                    className="w-[3px] h-12 rounded-full shrink-0 transition-all duration-500"
                    style={{
                      backgroundColor: activeIndex === index ? area.color : "rgba(255,255,255,0.12)",
                    }}
                  />
                  <div className="flex-1">
                    <h3
                      className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-2 transition-colors duration-500"
                      style={{
                        color: activeIndex === index ? area.color : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {area.title}
                    </h3>
                    {activeIndex === index && (
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                        {area.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Kensho Form 4 Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-[208/154]">
                <Image
                  src="/Forms/4.svg"
                  alt="Kensho"
                  width={208}
                  height={154}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
