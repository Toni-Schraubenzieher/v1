"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 0,
    title: "Discover",
    description:
      "We source exceptional founders through our global network — often before they've raised a single dollar.",
    color: "#FEB180",
  },
  {
    id: 1,
    title: "Evaluate",
    description:
      "Deep-dive into the team, market, and technology. We move with speed and conviction when we believe.",
    color: "#D4FFEF",
  },
  {
    id: 2,
    title: "Invest",
    description:
      "Meaningful capital, clear terms, and a partnership built on trust from day one. No games, no delays.",
    color: "#FEB180",
  },
  {
    id: 3,
    title: "Grow",
    description:
      "From hiring key talent to unlocking new markets — we're in the trenches with our founders every step.",
    color: "#D4FFEF",
  },
];

function KenshoIcon({ activeIndex }: { activeIndex: number }) {
  const inactiveColor = "rgba(255,255,255,0.08)";

  const parts = [
    {
      d: "M55.5204 56.8219L44.2592 45.5103L55.5204 0H119.421V39.7226L55.5204 56.8219Z",
      index: 0,
    },
    {
      d: "M55.7808 65.2399L43.9961 77.8671L55.7808 121.536H119.681V81.8131L55.7808 65.2399Z",
      index: 1,
    },
    {
      d: "M0 71.2906V121.799H25.403L35.6165 77.341L23.3079 65.2399L0 71.2906Z",
      index: 2,
    },
    {
      d: "M36.1398 45.7733L24.8786 56.8219L0.261322 49.7191V0.526184H24.8786L36.1398 45.7733Z",
      index: 3,
    },
  ];

  return (
    <svg
      viewBox="0 0 120 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[320px] lg:max-w-[400px]"
    >
      {parts.map((part) => (
        <path
          key={part.index}
          d={part.d}
          fill={activeIndex === part.index ? steps[part.index]!.color : inactiveColor}
          style={{
            transition: "fill 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ))}
    </svg>
  );
}

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

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="how-we-work py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <div className="rounded-3xl bg-[#101010] overflow-hidden px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          {/* Header */}
          <div ref={headerRef} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-accent-warm" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-warm">
                Our Process
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              How we work
            </h2>
          </div>

          {/* Content: Steps left, Logo right */}
          <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Left: Steps */}
            <div className="flex-1 w-full">
              <div className="flex flex-col">
                {steps.map((step) => {
                  const isActive = activeIndex === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setActiveIndex(step.id);
                        startTimer();
                      }}
                      className="text-left w-full py-4 cursor-pointer flex items-center gap-4"
                    >
                      <div
                        className="w-[3px] h-6 rounded-full shrink-0 transition-all duration-500"
                        style={{
                          backgroundColor: isActive ? step.color : "rgba(255,255,255,0.12)",
                        }}
                      />
                      <span
                        className="font-heading text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-500"
                        style={{
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Kensho Logo Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto">
              <KenshoIcon activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
