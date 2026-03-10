"use client";

import { useState } from "react";
import { motion } from "motion/react";

const verticals = [
  "All",
  "Robotics",
  "Enabling Technologies",
  "Cybersecurity / Dual use",
  "Computation",
] as const;

type Vertical = (typeof verticals)[number];

const verticalPillColor: Record<Exclude<Vertical, "All">, string> = {
  Robotics: "#FEB180",
  "Enabling Technologies": "#D4FFEF",
  "Cybersecurity / Dual use": "#FEB180",
  Computation: "#D4FFEF",
};

const companies = [
  {
    name: "Hefring",
    logo: "/Logos+Font/Hefring.svg",
    vertical: "Enabling Technologies",
  },
  {
    name: "Energy Robotics",
    logo: "/Logos+Font/Energy_Robotics.svg",
    vertical: "Robotics",
  },
  {
    name: "Pixel Photonics",
    logo: "/Logos+Font/Pixel_Photonics.svg",
    vertical: "Enabling Technologies",
  },
  {
    name: "CryptoNext Security",
    logo: "/Logos+Font/CryptoNext.svg",
    vertical: "Cybersecurity / Dual use",
  },
  {
    name: "Quality Match",
    logo: "/Logos+Font/Quality_Match.svg",
    vertical: "Computation",
  },
  {
    name: "Qambria",
    logo: "/Logo_loop/Qambria.svg",
    vertical: "Computation",
  },
] as const;

const logoSizePresets = {
  wordmarkWide: "w-[190px] max-h-11",
  wordmarkBalanced: "w-[182px] max-h-11",
  wordmarkCompact: "w-[165px] max-h-11",
  wordmarkCrypto: "w-[202px] max-h-12",
  wordmarkTall: "w-[205px] max-h-[4.7rem]",
} as const;

const companyLogoPreset: Record<(typeof companies)[number]["name"], keyof typeof logoSizePresets> = {
  Hefring: "wordmarkWide",
  "Energy Robotics": "wordmarkBalanced",
  "Pixel Photonics": "wordmarkCompact",
  "CryptoNext Security": "wordmarkCrypto",
  "Quality Match": "wordmarkTall",
  Qambria: "wordmarkBalanced",
};

export default function PortfolioOverview() {
  const [activeVertical, setActiveVertical] = useState<Vertical>("All");

  return (
    <section id="portfolio-overview" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight" style={{ color: "#FEB180" }}>
            PORTFOLIO OVERVIEW
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            Resilience technologies across four verticals.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-[#181818] p-2">
            {verticals.map((vertical) => {
              const isActive = activeVertical === vertical;
              const isColorPillActive = isActive && vertical !== "All";
              const activeColor = vertical === "All" ? "rgba(255,255,255,0.12)" : verticalPillColor[vertical];
              return (
                <button
                  key={vertical}
                  onClick={() => setActiveVertical(vertical)}
                  className={`relative rounded-full px-6 py-3 text-[1.05rem] font-semibold leading-none transition-colors duration-200 sm:px-8 sm:py-3.5 ${
                    isColorPillActive ? "text-[#101010]" : isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-vertical-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full shadow-[0_8px_22px_rgba(0,0,0,0.22)]"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}
                  <span className="relative z-10">{vertical}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid w-full grid-cols-2 gap-x-8 gap-y-12 px-8 sm:px-12 md:grid-cols-3 lg:grid-cols-4">
          {companies.map((company) => {
            const isActive = activeVertical === "All" || company.vertical === activeVertical;
            const logoSizeClass = logoSizePresets[companyLogoPreset[company.name]];
            return (
              <div
                key={company.name}
                className="flex h-24 items-center justify-center px-2"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className={`h-auto w-auto max-w-[240px] object-contain transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${logoSizeClass}`}
                  style={{
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(100%)"
                      : "brightness(0) saturate(100%) invert(28%)",
                  }}
                />
              </div>
            );
          })}
          </div>
      </div>
    </section>
  );
}
