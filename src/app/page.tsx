"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LargeText from "@/components/LargeText";
import Statement from "@/components/Statement";
import LoadingScreen from "@/components/LoadingScreen";
import LazySection from "@/components/LazySection";
import Footer from "@/components/Footer";

const LogoElementsShowcase = dynamic(() => import("@/components/LogoElementsShowcase"), { ssr: false });
const PortfolioOverview = dynamic(() => import("@/components/PortfolioOverview"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const AboutUs = dynamic(() => import("@/components/AboutUs"), { ssr: false });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });
const GetInTouch = dynamic(() => import("@/components/GetInTouch"), { ssr: false });

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
    }, 3000); // 600ms delay + 1500ms loading + 100ms pause + 600ms fade-out

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
        <LazySection>
          <LogoElementsShowcase />
        </LazySection>
        <Statement />
        <LazySection>
          <PortfolioOverview />
        </LazySection>
        <LazySection>
          <Portfolio />
        </LazySection>
        <LargeText />
        <LazySection>
          <Stats />
        </LazySection>
        <LazySection>
          <AboutUs />
        </LazySection>
        <LazySection>
          <FAQ />
        </LazySection>
        <LazySection>
          <GetInTouch />
        </LazySection>
        <Footer />
      </motion.div>
    </div>
  );
}
