"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    number: "01",
    title: "Robotics",
    description:
      "We source exceptional founders through our global network — often before they've raised a single dollar.",
    color: "#D4FFEF",
    formNumber: "1",
  },
  {
    id: 2,
    number: "02",
    title: "Enabling Technologies",
    description:
      "Deep-dive into the team, market, and technology. We move with speed and conviction when we believe.",
    color: "#FEB180",
    formNumber: "2",
  },
  {
    id: 3,
    number: "03",
    title: "Cybersecurity / Dual use",
    description:
      "Meaningful capital, clear terms, and a partnership built on trust from day one. No games, no delays.",
    color: "#D4FFEF",
    formNumber: "3",
  },
  {
    id: 4,
    number: "04",
    title: "Computation",
    description:
      "From hiring key talent to unlocking new markets — we're in the trenches with our founders every step.",
    color: "#FEB180",
    formNumber: "4",
  },
];

export default function HowWeWork() {
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
              scrub: 1.5,
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
              scrub: 1.5,
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
      <div className="mx-auto max-w-[82.5rem] px-6 sm:px-8">
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

          {/* Content: Grid with 4 cards */}
          <div
            ref={contentRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveIndex(index)}
                className="group relative text-left rounded-2xl bg-[#0A0A0A] p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Form SVG Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ position: "relative" }}>
                  <Image
                    src={`/Forms/${step.formNumber}.svg`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ filter: "brightness(1.5)" }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{
                      backgroundColor: `${step.color}20`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="font-heading text-2xl lg:text-3xl font-bold mb-3 transition-colors duration-300"
                    style={{
                      color: activeIndex === index ? step.color : "#ffffff",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-10"
                  style={{
                    background: `radial-gradient(circle at center, ${step.color}, transparent 70%)`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
