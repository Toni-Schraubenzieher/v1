"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FILTER_MINT =
  "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(600%) hue-rotate(95deg) brightness(105%) contrast(92%)";
const FILTER_WARM =
  "brightness(0) saturate(100%) invert(78%) sepia(30%) saturate(700%) hue-rotate(332deg) brightness(102%) contrast(99%)";

const startups = [
  {
    id: 2,
    name: "Energy Robotics",
    logo: "/Logos_Portfolio/Energy_Robotocs.svg",
    wordmarkLogo: "/Logos+Font/Energy_Robotics.svg",
    accent: "#FEB180",
    logoFilter: FILTER_WARM,
    category: "ROBOTICS",
    description:
      "Energy Robotics builds the leading platform for autonomous robot and drone inspection, hardware-agnostic software that turns any robot into an autonomous inspection system for industrial facilities. Using AI and digital twin technology, the platform transforms raw sensor data into actionable insights. 20,000+ km of autonomous inspection rounds completed across 4 continents. Founded by robotics prize with backgrounds spanning RoboCup and the DARPA Robotics Challenge.",
    points: [],
    image: "/Portfolio_Teams/EnergyRobotics.png",
  },
  {
    id: 1,
    name: "Hefring",
    logo: "/Logos_Portfolio/Hefring.svg",
    wordmarkLogo: "/Logos+Font/Hefring.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "ENABLING TECHNOLOGIES",
    description:
      "Hefring built IMAS®, an AI-powered maritime intelligence platform that unifies data from navigation, propulsion, and environmental sensors across entire vessel fleets. Edge computing onboard, cloud analytics off-ship, delivering real-time safety guidance, fuel optimization, predictive maintenance, and regulatory compliance. The system is hardware-agnostic, designed to operate across commercial shipping, defense, and leisure maritime, integrating with existing protocols and third-party equipment. Founded by a team with 50+ years of combined expertise in maritime operations, corporate development, and condition monitoring.",
    points: [],
    image: "/Portfolio_Teams/Hefring.png",
  },
  {
    id: 3,
    name: "Pixel Photonics",
    logo: "/Logos_Portfolio/Pixel_Photonics.svg",
    wordmarkLogo: "/Logos+Font/Pixel_Photonics.svg",
    accent: "#FEB180",
    logoFilter: FILTER_WARM,
    category: "COMPUTATION",
    description:
      "Pixel Photonics develops superconducting nanowire single-photon detectors (SNSPDs), the enabling hardware for quantum computing, secure communications, and advanced sensing. Their waveguide-integrated architecture is globally unique: 1000+ detection channels where competitors max out at 24, with 25% higher device density. A 12-year R&D effort spun out of Uni Münster, now 35 strong with 8 PhDs. €11M revenue in 2024, €11M qualified pipeline, systems deployed with Fortune 500 and Nasdaq-listed defense companies. Backed by HTGF, QuantonNation, and SPRIND-D.",
    points: [],
    image: "/Portfolio_Teams/Pixel_Photonics.png",
  },
  {
    id: 5,
    name: "Quality Match",
    logo: "/Logos_Portfolio/Quality_Match.svg",
    wordmarkLogo: "/Logos+Font/Quality_Match.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "ENABLING TECHNOLOGIES",
    description:
      "Quality Match built AI-powered visual quality inspection that cut QA costs by 90% while drastically improving labeled data accuracy across manufacturing. Their technology capitalized on the industry shift from data quantity to data quality, making QA accessible to a far broader customer base as the EU AI Act raised provable data standards. Founded by Dr. Daniel Kondermann, who previously sold Pallas Ludens to Apple and led their data science team. Acquired by Wayve.",
    points: [],
    image: "/Portfolio_Teams/Quality Match.png",
  },
  {
    id: 6,
    name: "Qambria",
    logo: "/Logos_Portfolio/Qambria.svg",
    wordmarkLogo: "/Logo_loop/Qambria.svg",
    accent: "#FEB180",
    logoFilter: FILTER_WARM,
    category: "COMPUTATION",
    description:
      "Qambria is building the integration layer between quantum and classical computing, treating quantum processors as specialized accelerators within existing HPC environments, not as standalone research instruments. Hardware-agnostic and vendor-neutral, their platform eliminates lock-in while making quantum practically accessible across pharma, AI, and scientific workloads. The vision: quantum computers as standard nodes in enterprise data centers. Founded by Dominik Ulmer (30+ years supercomputing leadership at CRAY and HPE) and Marco Szalay (Quantum Engineer #4 at Google Quantum AI), with additional expertise from IBM Research and Argonne National Lab.",
    points: [],
    image: "/Portfolio_Teams/Qambria.png",
  },
  {
    id: 4,
    name: "CryptoNext Security",
    logo: "/Logos_Portfolio/CryptoNext.svg",
    wordmarkLogo: "/Logos+Font/CryptoNext.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "CYBERSECURITY / DUAL USE",
    description:
      "CryptoNext provides a complete suite of products and services to manage the transition to quantum-safe security, protecting critical data against the 'harvest now, decrypt later' threat before quantum computers break current public-key cryptography. Their technology covers the full migration: discovery, transition, and ongoing quantum-safe encryption for enterprises and government agencies. Already deployed through pilots with NATO, European Commission, Banque de France, and Société Générale across Europe and the US. CTO and founder Jean-Charles Faugère, former INRIA Research Director and École Normale Supérieure graduate, co-authored several NIST post-quantum standard algorithms and holds the Seymour Cray Prize.",
    points: [],
    image: "/Portfolio_Teams/CryptoNext.png",
  },
];

const socialProofItems = [
  {
    id: 1,
    founder: "Marc Dassler",
    company: "Energy Robotics",
    role: "Founder & CEO, Energy Robotics",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    avatar: "/WOES_PICS/MARC DASSLER.png",
    accent: "#FEB180",
    logo: "/Logos_Portfolio/Energy_Robotocs.svg",
  },
  {
    id: 2,
    founder: "Karl Birgir Björnsson",
    company: "Hefring",
    role: "Founder & CEO, Hefring",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    avatar: "/WOES_PICS/Karl Birgir Björnsson.png",
    accent: "#D4FFEF",
    logo: "/Logos_Portfolio/Hefring.svg",
  },
  {
    id: 3,
    founder: "Nicolai Walter",
    company: "Pixel Photonics",
    role: "Founder, Pixel Photonics",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    avatar: "/WOES_PICS/Nicolai Walter_.png",
    accent: "#FEB180",
    logo: "/Logos_Portfolio/Pixel_Photonics.svg",
  },
  {
    id: 4,
    founder: "Dr. Daniel Kondermann",
    company: "Quality Match",
    role: "Founder, Quality Match",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    avatar: "/WOES_PICS/DR.Daniel_Kondermann.png",
    accent: "#D4FFEF",
    logo: "/Logos_Portfolio/Quality_Match.svg",
  },
  {
    id: 5,
    founder: "Dominik Ulmer",
    company: "Qambria",
    role: "Founder & CEO, Qambria",
    quote:
      "Kensho was the first investor of Qambria, realising the visionary potential of our approach. They are extremely helpful and supportive, always available when a startup in its early phase is going through rough times.",
    avatar: "/WOES_PICS/Dominik Ulmer.png",
    accent: "#FEB180",
    logo: "/Logos_Portfolio/Qambria.svg",
  },
  {
    id: 6,
    founder: "Jean‑Charles Faugère",
    company: "CryptoNext",
    role: "Founder & CTO, CryptoNext Security",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    avatar: "/WOES_PICS/Jean-Charles Faugere.png",
    accent: "#D4FFEF",
    logo: "/Logos_Portfolio/CryptoNext.svg",
  },
] as const;

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 10 : -10,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    clipPath: "inset(2% 2% round 20px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    clipPath: "inset(0% 0% round 0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -10 : 10,
    opacity: 0,
    scale: 1.04,
    filter: "blur(4px)",
    clipPath: "inset(2% 2% round 20px)",
  }),
};

function PortfolioItem({
  startup,
  index,
  onOpen,
  onHoverChange,
}: {
  startup: (typeof startups)[0];
  index: number;
  onOpen: () => void;
  onHoverChange: (startup: (typeof startups)[0] | null) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1.5,
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={index === 0 ? "" : "border-t border-white/10"}
    >
      <button
        onClick={onOpen}
        onMouseEnter={() => onHoverChange(startup)}
        onMouseLeave={() => onHoverChange(null)}
        className="relative flex w-full cursor-pointer items-center overflow-hidden px-8 py-8 text-left group sm:px-12 md:py-10"
      >
        <span
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-white transition-colors duration-300 flex-1"
          style={{ ["--hover-color" as string]: startup.accent }}
          onMouseEnter={(e) => (e.currentTarget.style.color = startup.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
        >
          {startup.name}
        </span>
        <span className="text-sm text-white/40 hidden sm:block mr-8">
          {startup.category}
        </span>
        <motion.div
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-6 w-6 shrink-0"
        >
          <span className="absolute left-1/2 top-0 h-6 w-[1.5px] -translate-x-1/2 bg-white/50" />
          <span className="absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 bg-white/50" />
        </motion.div>
      </button>
    </div>
  );
}

export default function Portfolio() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);
  const [hoveredStartup, setHoveredStartup] = useState<(typeof startups)[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const woesRef = useRef<HTMLDivElement>(null);
  const lockedScrollYRef = useRef(0);
  const activeIndex = startups.findIndex((s) => s.id === activeId);
  const activeStartup = activeIndex >= 0 ? startups[activeIndex] : null;

  // Cursor tracking for the shared circle
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !hoveredStartup) return;
      const rect = containerRef.current.getBoundingClientRect();
      cursorX.set(event.clientX - rect.left);
      cursorY.set(event.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredStartup, cursorX, cursorY]);

  useEffect(() => {
    const lockEvent = new Event("kensho:lock-scroll");
    const unlockEvent = new Event("kensho:unlock-scroll");

    if (activeStartup) {
      lockedScrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.dispatchEvent(lockEvent);
    } else {
      const restoreY = lockedScrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (restoreY > 0) {
        window.scrollTo(0, restoreY);
      }
      window.dispatchEvent(unlockEvent);
    }

    return () => {
      const restoreY = lockedScrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (restoreY > 0) {
        window.scrollTo(0, restoreY);
      }
      window.dispatchEvent(unlockEvent);
    };
  }, [activeStartup]);

  useEffect(() => {
    if (!woesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        woesRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: woesRef.current,
            start: "top 80%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
    }, woesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="portfolio"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div ref={containerRef} className="rounded-3xl bg-[#181818] overflow-visible relative">
          {/* Startup rows */}
          <div>
            {startups.map((startup, index) => (
              <PortfolioItem
                key={startup.id}
                startup={startup}
                index={index}
                onOpen={() => {
                  setNavigationDirection(1);
                  setActiveId(startup.id);
                }}
                onHoverChange={setHoveredStartup}
              />
            ))}
          </div>

          {/* Shared cursor circle */}
          <AnimatePresence>
            {hoveredStartup && (
              <motion.span
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="pointer-events-none absolute left-0 top-0 z-[25] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
                style={{
                  left: x,
                  top: y,
                  backgroundColor: hoveredStartup.accent,
                }}
              >
                <motion.img
                  key={hoveredStartup.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={hoveredStartup.logo}
                  alt=""
                  className="h-8 w-auto object-contain"
                  style={{
                    filter: hoveredStartup.accent === "#FEB180"
                      ? "brightness(0) saturate(100%) invert(100%)"
                      : "brightness(0) saturate(100%) invert(0%)",
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div ref={woesRef} className="mx-auto mt-8 max-w-[1320px] px-6 sm:mt-10 sm:px-8">
        <div className="px-8 pb-10 pt-12 sm:px-12 lg:pb-14 lg:pt-14">
          <h3 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight mb-12" style={{ color: "#FEB180" }}>
            WHAT OUR
            <br />
            ENTREPRENEURS SAY
          </h3>

          <div className="space-y-0">
            {socialProofItems.map((item, index) => (
              <div key={item.id} className="relative -mx-8 sm:-mx-12">
                <div className="group relative transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#101010]">
                  {/* Animated Background - Full Viewport Width */}
                  <span
                    className="pointer-events-none absolute left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen origin-left scale-x-[0.985] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100"
                    style={{
                      backgroundColor: item.accent,
                      top: 0,
                      bottom: 0,
                    }}
                  />

                  {/* Content Container with sliding animation like Navbar */}
                  <div className="relative z-10 px-8 py-9 sm:px-12 sm:py-10 lg:py-12 h-[180px] sm:h-[200px] flex items-center">
                    {/* Default Content: Name / Company - slides up */}
                    <div className="w-full transform-gpu transition-all duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-hover:opacity-0 group-hover:absolute group-hover:inset-x-8 sm:group-hover:inset-x-12">
                      <h4 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white/80">
                        {item.founder.toUpperCase()} / <span className="text-2xl sm:text-3xl lg:text-4xl" style={{ color: item.accent }}>{item.company.toUpperCase()}</span>
                      </h4>
                    </div>

                    {/* Hover Content: Avatar + Quote - slides up from below, centered */}
                    <div className="w-full flex items-center gap-10 transform-gpu transition-all duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 absolute inset-x-8 sm:inset-x-12">
                      <Image
                        src={item.avatar}
                        alt={item.founder}
                        width={96}
                        height={96}
                        className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full object-cover"
                      />
                      <p className="text-lg leading-relaxed text-[#101010] sm:text-xl">
                        "{item.quote}"
                      </p>
                    </div>
                  </div>
                </div>
                {index < socialProofItems.length - 1 && (
                  <div className="h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeStartup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A]/96 backdrop-blur-md"
          >
            <div className="relative flex h-full flex-col">
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#101010]/68 text-white backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors sm:right-8 sm:top-8 cursor-pointer"
                aria-label="Close portfolio detail"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-0 h-[3px] w-[20px] translate-y-[9px] rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-0 h-[3px] w-[20px] translate-y-[9px] -rotate-45 rounded-full bg-current" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNavigationDirection(-1);
                  setActiveId(startups[(activeIndex - 1 + startups.length) % startups.length]!.id);
                }}
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:left-10 cursor-pointer"
                style={{
                  color: "#101010",
                  backgroundColor: activeStartup.accent,
                }}
                aria-label="Previous startup"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNavigationDirection(1);
                  setActiveId(startups[(activeIndex + 1) % startups.length]!.id);
                }}
                className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:right-10 cursor-pointer"
                style={{
                  color: "#101010",
                  backgroundColor: activeStartup.accent,
                }}
                aria-label="Next startup"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>

              <div
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                className="relative flex-1 overflow-y-auto overscroll-contain px-8 pb-40 pt-28 sm:px-12 sm:pt-32"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStartup.id}
                    custom={navigationDirection}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                      x: { type: "spring", stiffness: 320, damping: 28, mass: 0.45 },
                      scale: { type: "spring", stiffness: 320, damping: 28, mass: 0.45 },
                      filter: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                      clipPath: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-7 pb-10 md:gap-9"
                    style={{ transformPerspective: 900 }}
                  >
                    <motion.img
                      layout
                      src={activeStartup.wordmarkLogo}
                      alt={activeStartup.name}
                      className="mx-auto h-auto w-auto max-h-14 max-w-[340px] object-contain"
                      style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
                    />

                    <motion.div
                      layout
                      className="mx-auto w-full max-w-[760px]"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
                        <div className="w-full aspect-[2376/1586] relative">
                          <Image
                            src={activeStartup.image}
                            alt={activeStartup.name}
                            fill
                            sizes="(max-width: 760px) 100vw, 760px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p
                          className="mb-2 text-sm font-semibold uppercase tracking-[0.14em]"
                          style={{ color: activeStartup.accent }}
                        >
                          {activeStartup.category}
                        </p>
                        <h3 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {activeStartup.name}
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-base">
                          {activeStartup.description}
                        </p>

                        {activeStartup.points.length > 0 && (
                          <ul className="mt-6 flex flex-col gap-3">
                            {activeStartup.points.map((point) => (
                              <li key={point} className="flex items-center gap-3 text-white/78">
                                <svg
                                  className="h-4 w-4 shrink-0"
                                  style={{ color: activeStartup.accent }}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span className="text-sm sm:text-base">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center bg-[#0A0A0A] px-8 py-5 sm:px-12">
                <motion.a
                  key={activeStartup.id}
                  href="#"
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-colors"
                  style={{
                    color: "#101010",
                    backgroundColor: activeStartup.accent,
                  }}
                >
                  Visit Startup
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
