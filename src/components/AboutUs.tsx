"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./modal-cards.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  linkedin: string;
  accent: string;
}

const team: TeamMember[] = [
  {
    id: "wolfgang",
    name: "Wolfgang",
    role: "Managing Partner",
    image: "/Team/Wolfgang.png",
    description:
      "With decades of experience in venture capital and deep-tech investing, Wolfgang leads Kensho's investment strategy. His conviction-first approach and extensive network across Europe and beyond help founders scale from breakthrough idea to global impact.",
    linkedin: "https://linkedin.com",
    accent: "#FEB180",
  },
  {
    id: "anton",
    name: "Anton",
    role: "Partner",
    image: "/Team/Anton.png",
    description:
      "Anton drives deal sourcing and portfolio growth at Kensho. With a sharp eye for exceptional founding teams and disruptive technology, he works hands-on with portfolio companies to unlock new markets and accelerate growth.",
    linkedin: "https://linkedin.com",
    accent: "#D4FFEF",
  },
];

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const smoothSpring = {
  type: "spring" as const,
  stiffness: 390,
  damping: 36,
};

const softSpring = {
  type: "spring" as const,
  stiffness: 210,
  damping: 27,
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  useEffect(() => {
    if (!selectedCard) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedCard]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".modal-card");
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
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
      id="about-us"
      className="about-us py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <div className="rounded-3xl bg-[#101010] overflow-hidden px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
          {/* Label */}
          <div className="flex items-center gap-3 mb-12 lg:mb-16">
            <div className="h-px w-10 bg-accent-warm" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-warm">
              About Us
            </span>
          </div>

          {/* Big statement */}
          <h2
            ref={headingRef}
            className="font-heading text-[clamp(2rem,5.5vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white uppercase max-w-[900px] mb-20 lg:mb-28"
          >
            We back founders
            who build what
            the world needs
            next.
          </h2>

          {/* Team modal cards */}
          <div ref={cardsRef} className="modal-cards-container">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-end">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  layoutId={`card-${member.id}`}
                  onClick={() => setSelectedCard(member)}
                  className="modal-card w-full sm:w-[280px] lg:w-[320px]"
                  whileTap={{ scale: 0.98 }}
                  transition={smoothSpring}
                >
                  <motion.img
                    layoutId={`image-${member.id}`}
                    src={member.image}
                    alt={member.name}
                    className="modal-card-image"
                  />
                  <motion.div
                    layoutId={`overlay-${member.id}`}
                    className="modal-card-overlay"
                  >
                    <div className="modal-card-content">
                      <div>
                        <motion.h3
                          layoutId={`title-${member.id}`}
                          className="modal-card-title"
                        >
                          {member.name}
                        </motion.h3>
                        <p className="modal-card-subtitle">{member.role}</p>
                      </div>
                      <motion.div
                        layoutId={`icon-${member.id}`}
                        className="modal-card-icon"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal portal */}
      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {selectedCard && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setSelectedCard(null)}
                  className="modal-backdrop modal-backdrop-clickable"
                  style={{ background: "rgba(0, 0, 0, 0.85)" }}
                />

                <div
                  className="modal-expanded-container"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Team member details"
                >
                  <motion.div
                    layoutId={`card-${selectedCard.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="modal-expanded-card"
                    onClick={(e) => e.stopPropagation()}
                    transition={springTransition}
                  >
                    <motion.div className="modal-expanded-image-container">
                      <motion.img
                        layoutId={`image-${selectedCard.id}`}
                        src={selectedCard.image}
                        alt={selectedCard.name}
                        className="modal-expanded-image"
                        transition={springTransition}
                      />
                      <motion.div
                        layoutId={`overlay-${selectedCard.id}`}
                        className="modal-expanded-overlay"
                        transition={springTransition}
                      >
                        <div className="modal-expanded-overlay-content">
                          <motion.h3
                            layoutId={`title-${selectedCard.id}`}
                            className="modal-expanded-title"
                            transition={springTransition}
                          >
                            {selectedCard.name}
                          </motion.h3>
                          <motion.button
                            layoutId={`icon-${selectedCard.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCard(null);
                            }}
                            className="modal-close-button"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={smoothSpring}
                            aria-label="Close modal"
                          >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="modal-description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <p className="!text-white/40 text-sm mb-1 font-medium">
                        {selectedCard.role}
                      </p>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={softSpring}
                      >
                        {selectedCard.description}
                      </motion.p>
                      <a
                        href={selectedCard.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-linkedin-btn"
                        style={{
                          background: selectedCard.accent,
                          color: "#161616",
                        }}
                      >
                        <LinkedInIcon />
                        LinkedIn
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
