"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const entrepreneurs = [
  {
    name: "Sarah Mitchell",
    company: "NeuralPath",
    color: "#FEB180",
  },
  {
    name: "Alex Chen",
    company: "QuantumCore",
    color: "#D4FFEF",
  },
  {
    name: "Maria Rodriguez",
    company: "BioSphere",
    color: "#FEB180",
  },
  {
    name: "James O'Connor",
    company: "EdgeCompute",
    color: "#D4FFEF",
  },
  {
    name: "Priya Patel",
    company: "SecureNet",
    color: "#FEB180",
  },
  {
    name: "Thomas Wagner",
    company: "RoboTech",
    color: "#D4FFEF",
  },
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        const items = listRef.current.children;
        gsap.fromTo(
          items,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              end: "top 40%",
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
      id="who-we-are"
      className="who-we-are py-24 lg:py-32"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-mint animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">
              Testimonials
            </span>
          </div>
          <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
            WHAT OUR ENTREPRENEURS SAY
          </h2>
        </div>

        {/* Entrepreneurs List */}
        <div ref={listRef} className="space-y-0">
          {entrepreneurs.map((entrepreneur, index) => (
            <div key={index}>
              <div className="group py-8 sm:py-10 lg:py-12 flex items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors duration-300 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-lg">
                <div className="flex-1">
                  <h3
                    className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-300"
                    style={{
                      color: entrepreneur.color,
                    }}
                  >
                    {entrepreneur.name}
                  </h3>
                  <p className="text-white/50 text-base sm:text-lg">
                    {entrepreneur.company}
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/40 group-hover:text-white/80 transition-colors duration-300"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </div>
              </div>
              {index < entrepreneurs.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-16 lg:mt-20">
          <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
            We partner with visionary founders at the earliest stages, providing capital,
            strategic guidance, and access to our global network to build category-defining companies.
          </p>
        </div>
      </div>
    </section>
  );
}
