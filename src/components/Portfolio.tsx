"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FILTER_MINT =
  "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(600%) hue-rotate(95deg) brightness(105%) contrast(92%)";
const FILTER_WARM =
  "brightness(0) saturate(100%) invert(78%) sepia(30%) saturate(700%) hue-rotate(332deg) brightness(102%) contrast(99%)";

const startups = [
  {
    id: 1,
    name: "Hefring",
    logo: "/Logos_Portfolio/Hefring.svg",
    wordmarkLogo: "/Logos+Font/Hefring.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "Maritime Tech",
    description:
      "Hefring develops intelligent marine technology that improves safety and efficiency at sea. Their solutions help vessel operators optimize routes, reduce fuel consumption, and navigate challenging conditions.",
    points: [
      "Marine Intelligence",
      "Route Optimization",
      "Safety Systems",
      "Fuel Efficiency",
    ],
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Energy Robotics",
    logo: "/Logos_Portfolio/Energy_Robotocs.svg",
    wordmarkLogo: "/Logos+Font/Energy_Robotics.svg",
    accent: "#FEB180",
    logoFilter: FILTER_WARM,
    category: "Robotics / Energy",
    description:
      "Energy Robotics provides autonomous robot solutions for inspection and monitoring of industrial facilities. Their software platform enables robots to operate in hazardous environments across the energy sector.",
    points: [
      "Autonomous Inspection",
      "Industrial Robotics",
      "Hazardous Environments",
      "Energy Infrastructure",
    ],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Pixel Photonics",
    logo: "/Logos_Portfolio/Pixel_Photonics.svg",
    wordmarkLogo: "/Logos+Font/Pixel_Photonics.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "Deep Tech / Quantum",
    description:
      "Pixel Photonics builds next-generation single-photon detectors for quantum computing, secure communications, and advanced sensing applications. Pushing the boundaries of photonic technology.",
    points: [
      "Single-Photon Detection",
      "Quantum Computing",
      "Secure Communications",
      "Advanced Sensing",
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "CryptoNext Security",
    logo: "/Logos_Portfolio/CryptoNext.svg",
    wordmarkLogo: "/Logos+Font/CryptoNext.svg",
    accent: "#FEB180",
    logoFilter: FILTER_WARM,
    category: "Cybersecurity",
    description:
      "CryptoNext Security develops post-quantum cryptography solutions to protect organizations against future quantum computing threats. Their technology ensures long-term data security.",
    points: [
      "Post-Quantum Cryptography",
      "Data Protection",
      "Enterprise Security",
      "Future-proof Encryption",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Quality Match",
    logo: "/Logos_Portfolio/Quality_Match.svg",
    wordmarkLogo: "/Logos+Font/Quality_Match.svg",
    accent: "#D4FFEF",
    logoFilter: FILTER_MINT,
    category: "AI / Quality Assurance",
    description:
      "Quality Match leverages AI to automate visual quality inspection in manufacturing. Their platform detects defects in real-time, reducing waste and improving production efficiency.",
    points: [
      "Visual Quality Inspection",
      "AI-powered Detection",
      "Manufacturing Automation",
      "Real-time Analysis",
    ],
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop",
  },
];

const socialProofItems = [
  {
    id: 1,
    founder: "Maya Olsen",
    role: "Founder & CEO, Hefring",
    quote:
      "Kensho moved fast, understood our market instantly, and helped us scale from pilot projects into global maritime operations.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces",
    accent: "#D4FFEF",
    logo: "/Logos+Font/Hefring.svg",
  },
  {
    id: 2,
    founder: "Jonas Weber",
    role: "Co-Founder, Energy Robotics",
    quote:
      "From first meeting to strategic hires, Kensho has been a true sparring partner for every critical product and go-to-market decision.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    accent: "#FEB180",
    logo: "/Logos+Font/Energy_Robotics.svg",
  },
  {
    id: 3,
    founder: "Elena Rossi",
    role: "Founder, Pixel Photonics",
    quote:
      "Their conviction in deep tech gave us the confidence to execute ambitious R&D milestones while building commercial traction.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces",
    accent: "#D4FFEF",
    logo: "/Logos+Font/Pixel_Photonics.svg",
  },
  {
    id: 4,
    founder: "David Lin",
    role: "Founder & CTO, CryptoNext Security",
    quote:
      "Kensho backed us early and accelerated enterprise adoption with practical guidance on positioning and customer introductions.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    accent: "#FEB180",
    logo: "/Logos+Font/CryptoNext.svg",
  },
  {
    id: 5,
    founder: "Sophie Keller",
    role: "Founder, Quality Match",
    quote:
      "The team helped us sharpen our value proposition and scale deployments with manufacturing customers across multiple regions.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    accent: "#D4FFEF",
    logo: "/Logos+Font/Quality_Match.svg",
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
}: {
  startup: (typeof startups)[0];
  index: number;
  onOpen: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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
            scrub: 1,
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="border-t border-white/10"
    >
      <button
        onClick={onOpen}
        onMouseEnter={(event) => {
          setIsHovering(true);
          const rect = event.currentTarget.getBoundingClientRect();
          setCursorPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setCursorPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setIsHovering(false)}
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
      <AnimatePresence>
        {isHovering && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-0 top-0 z-[25] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              backgroundColor: startup.accent,
            }}
          >
            <img
              src={startup.logo}
              alt=""
              className="h-8 w-auto object-contain"
              style={{
                filter:
                  startup.accent === "#D4FFEF"
                    ? "brightness(0) saturate(100%) invert(0%)"
                    : "brightness(0) saturate(100%) invert(100%)",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function Portfolio() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lockedScrollYRef = useRef(0);
  const activeIndex = startups.findIndex((s) => s.id === activeId);
  const activeStartup = activeIndex >= 0 ? startups[activeIndex] : null;
  const activeQuote = socialProofItems[activeQuoteIndex] ?? socialProofItems[0];
  const quoteDurationMs = 5200;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % socialProofItems.length);
    }, quoteDurationMs);
    return () => window.clearTimeout(timer);
  }, [activeQuoteIndex]);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="portfolio"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="rounded-3xl bg-[#101010] overflow-hidden py-16 lg:py-24">
          {/* Header */}
          <div ref={headerRef} className="flex items-center justify-between px-8 sm:px-12 mb-12 lg:mb-16">
            <h2 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
              PORTFOLIO
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-warm animate-pulse" />
              <span className="text-sm font-medium tracking-[0.01em] text-white/50">
                05 COMPANIES
              </span>
            </div>
          </div>

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
              />
            ))}
            <div className="border-t border-white/10" />
          </div>

        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1320px] px-6 sm:mt-10 sm:px-8">
        <div className="px-8 pb-10 pt-12 sm:px-12 lg:pb-14 lg:pt-14">
          <h3 className="font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
            WHAT OUR ENTREPRENEURS SAY
          </h3>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {socialProofItems.map((item, index) => {
                const isActive = index === activeQuoteIndex;
                const ringSize = isActive ? 76 : 60;
                const radius = (ringSize - 8) / 2;
                const circumference = 2 * Math.PI * radius;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveQuoteIndex(index)}
                    className="relative rounded-full transition-transform duration-300 hover:scale-[1.03]"
                    aria-label={`Show quote from ${item.founder}`}
                  >
                    <span
                      className={`relative block overflow-hidden rounded-full transition-all duration-300 ${
                        isActive ? "h-[76px] w-[76px]" : "h-[60px] w-[60px]"
                      }`}
                    >
                      <img
                        src={item.avatar}
                        alt={item.founder}
                        className="h-full w-full object-cover"
                        style={{ filter: isActive ? "none" : "grayscale(100%)" }}
                      />
                      <svg
                        className="pointer-events-none absolute inset-0"
                        viewBox={`0 0 ${ringSize} ${ringSize}`}
                        fill="none"
                      >
                        <circle
                          cx={ringSize / 2}
                          cy={ringSize / 2}
                          r={radius}
                          stroke="rgba(255,255,255,0.22)"
                          strokeWidth={3}
                        />
                        {isActive && (
                          <motion.circle
                            key={`${item.id}-${activeQuoteIndex}`}
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={radius}
                            stroke={item.accent}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: quoteDurationMs / 1000, ease: "linear" }}
                          />
                        )}
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="max-w-3xl">
              <p className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{activeQuote.quote}&rdquo;
              </p>
              <p className="mt-6 text-base font-semibold text-white">{activeQuote.founder}</p>
              <p className="mt-1 text-sm text-white/55">{activeQuote.role}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {socialProofItems.map((item, index) => {
              const isActive = index === activeQuoteIndex;

              return (
                <div
                  key={item.id}
                  className="flex h-10 items-center justify-start transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.35 }}
                >
                  <img
                    src={item.logo}
                    alt={item.role}
                    className="h-7 w-auto max-w-[180px] object-contain"
                    style={{
                      filter: "brightness(0) saturate(100%) invert(100%)",
                    }}
                  />
                </div>
              );
            })}
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
                className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#101010]/68 text-white backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors sm:right-8 sm:top-8"
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
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:left-10"
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
                className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:right-10"
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
                        <div className="h-[240px] w-full sm:h-[300px] md:h-[340px]">
                          <img
                            src={activeStartup.image}
                            alt={activeStartup.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="mt-6 text-left">
                        <p
                          className="mb-2 text-sm font-semibold uppercase tracking-[0.14em]"
                          style={{ color: activeStartup.accent }}
                        >
                          {activeStartup.category}
                        </p>
                        <h3 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {activeStartup.name}
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
                          {activeStartup.description}
                        </p>

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
