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
] as const;

const logoSizePresets = {
  wordmarkWide: "w-[185px] max-h-10",
  wordmarkBalanced: "w-[175px] max-h-10",
  wordmarkCompact: "w-[155px] max-h-10",
  wordmarkTall: "w-[185px] max-h-16",
} as const;

const companyLogoPreset: Record<(typeof companies)[number]["name"], keyof typeof logoSizePresets> = {
  Hefring: "wordmarkWide",
  "Energy Robotics": "wordmarkBalanced",
  "Pixel Photonics": "wordmarkCompact",
  "CryptoNext Security": "wordmarkBalanced",
  "Quality Match": "wordmarkTall",
};

export default function PortfolioOverview() {
  const [activeVertical, setActiveVertical] = useState<Vertical>("All");

  return (
    <section id="portfolio-overview" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Portfolio Overview
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            Explore our portfolio by verticals.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-white/[0.07] p-2">
            {verticals.map((vertical) => {
              const isActive = activeVertical === vertical;
              return (
                <button
                  key={vertical}
                  onClick={() => setActiveVertical(vertical)}
                  className={`relative rounded-full px-6 py-3 text-[1.05rem] font-semibold leading-none transition-colors duration-200 sm:px-8 sm:py-3.5 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-vertical-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-0 rounded-full bg-white/12 shadow-[0_8px_22px_rgba(0,0,0,0.22)]"
                    />
                  )}
                  {vertical}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 gap-y-12 md:grid-cols-4">
          {companies.map((company) => {
            const isActive = activeVertical === "All" || company.vertical === activeVertical;
            const logoSizeClass = logoSizePresets[companyLogoPreset[company.name]];
            return (
              <div
                key={company.name}
                className="flex h-20 items-center justify-center px-5"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className={`h-auto w-auto max-w-[220px] object-contain transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${logoSizeClass}`}
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
