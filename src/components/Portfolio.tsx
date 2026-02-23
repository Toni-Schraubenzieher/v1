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

function PortfolioItem({
  startup,
  index,
  isOpen,
  onToggle,
}: {
  startup: (typeof startups)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
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
        onClick={onToggle}
        className="flex items-center w-full cursor-pointer px-8 sm:px-12 py-8 md:py-10 text-left group"
      >
        <img
          src={startup.logo}
          alt=""
          className="h-7 sm:h-9 w-auto mr-6 sm:mr-8 shrink-0"
          style={{ filter: startup.logoFilter }}
        />
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
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-6 w-6 shrink-0"
        >
          <span className="absolute left-1/2 top-0 h-6 w-[1.5px] -translate-x-1/2 bg-white/50" />
          <span className="absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 bg-white/50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 sm:px-12 pb-10 md:pb-14">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Image */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-[320px] lg:w-[400px] shrink-0 rounded-2xl overflow-hidden aspect-[3/2]"
                >
                  <img
                    src={startup.image}
                    alt={startup.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Text + Points */}
                <div className="flex flex-col md:flex-row gap-8 flex-1">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base lg:text-lg text-white/50 leading-relaxed flex-1"
                  >
                    {startup.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-3 shrink-0"
                  >
                    <ul className="flex flex-col gap-3">
                      {startup.points.map((point) => (
                        <li key={point} className="flex items-center gap-3">
                          <svg
                            className="w-4 h-4 shrink-0"
                            style={{ color: startup.accent }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span className="text-sm font-medium text-white/70">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110 hover:scale-105 w-fit"
                      style={{
                        backgroundColor: startup.accent,
                        color: "#161616",
                      }}
                    >
                      Visit company
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Portfolio() {
  const [openId, setOpenId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="portfolio"
    >
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="rounded-3xl bg-[#101010] overflow-hidden py-16 lg:py-24">
          {/* Header */}
          <div ref={headerRef} className="flex items-center justify-between px-8 sm:px-12 mb-12 lg:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Portfolio
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-warm" />
              <span className="text-sm text-white/50">
                05 Companies
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
                isOpen={openId === startup.id}
                onToggle={() =>
                  setOpenId(openId === startup.id ? null : startup.id)
                }
              />
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
