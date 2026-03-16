"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoElementsShowcase from "@/components/LogoElementsShowcase";
import Statement from "@/components/Statement";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load below-the-fold components
const PortfolioOverview = dynamic(() => import("@/components/PortfolioOverview"), {
  loading: () => null,
});
const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => null,
});
const LargeText = dynamic(() => import("@/components/LargeText"), {
  loading: () => null,
});
const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => null,
});
const AboutUs = dynamic(() => import("@/components/AboutUs"), {
  loading: () => null,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => null,
});
const GetInTouch = dynamic(() => import("@/components/GetInTouch"), {
  loading: () => null,
});

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Ensure page starts at the top on initial load
    if (!window.location.hash || window.location.hash === '#hero') {
      window.scrollTo(0, 0);
    }

    // Show content after loading screen duration
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4100); // 600ms delay + 2100ms loading + 200ms pause + 1200ms fade-out

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <LoadingScreen />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Navbar />
        <Hero />
        <LogoElementsShowcase />
        <Statement />
        <PortfolioOverview />
        <Portfolio />
        <LargeText />
        <Stats />
        <AboutUs />
        <FAQ />
        <GetInTouch />
      </motion.div>
    </div>
  );
}
