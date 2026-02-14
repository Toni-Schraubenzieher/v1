"use client";

import { useRef, useState, useEffect } from "react";

const startups = [
  {
    name: "NeuralPath",
    category: "AI / Machine Learning",
    description: "Next-gen AI infrastructure for enterprise automation and decision intelligence.",
    stage: "Series A",
    color: "#FEB180",
  },
  {
    name: "GreenLedger",
    category: "Climate Tech",
    description: "Carbon accounting platform helping companies measure, report, and reduce emissions.",
    stage: "Seed",
    color: "#D4FFEF",
  },
  {
    name: "VaultSync",
    category: "Fintech",
    description: "Decentralized treasury management for DAOs and digital-native organizations.",
    stage: "Pre-Seed",
    color: "#FEB180",
  },
  {
    name: "MediCore",
    category: "Health Tech",
    description: "AI-powered diagnostics platform reducing time-to-treatment in critical care.",
    stage: "Seed",
    color: "#D4FFEF",
  },
  {
    name: "Orbitex",
    category: "Space Tech",
    description: "Satellite data analytics enabling real-time supply chain and logistics insights.",
    stage: "Series A",
    color: "#FEB180",
  },
  {
    name: "CodeWeave",
    category: "Developer Tools",
    description: "AI pair-programming platform that understands your entire codebase contextually.",
    stage: "Seed",
    color: "#D4FFEF",
  },
];

export default function PortfolioSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    ref?.addEventListener("scroll", checkScroll);
    return () => ref?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="portfolio" className="relative py-32 px-6">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent-warm/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-mint" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-mint">
                Portfolio
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Companies we believe in
            </h2>
            <p className="text-lg text-white/50 max-w-lg">
              A selection of exceptional teams building category-defining products.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all ${
                canScrollLeft
                  ? "border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                  : "border-white/5 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all ${
                canScrollRight
                  ? "border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                  : "border-white/5 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {startups.map((startup) => (
            <div
              key={startup.name}
              className="group flex-shrink-0 w-[340px] sm:w-[380px] glass rounded-3xl p-8 snap-start transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              {/* Logo placeholder */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl font-heading font-bold"
                style={{
                  backgroundColor: `${startup.color}15`,
                  color: startup.color,
                }}
              >
                {startup.name.charAt(0)}
              </div>

              {/* Stage tag */}
              <div
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
                style={{
                  backgroundColor: `${startup.color}12`,
                  color: startup.color,
                }}
              >
                {startup.stage}
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-white mb-1">
                {startup.name}
              </h3>
              <p className="text-sm text-white/40 mb-3">{startup.category}</p>
              <p className="text-base text-white/50 leading-relaxed">
                {startup.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
