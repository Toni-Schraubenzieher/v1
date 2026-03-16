"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "What's the best way to reach out?",
    answer:
      "Come introduced through someone we know. That works best. You can also use the form below - but we are honest: fewer than 1 in 20 cold submissions lead to an investment. That is true for every VC, we just say it.",
    highlight: "MOST OF OUR PORTFOLIO STARTED WITH US REACHING OUT FIRST.",
  },
  {
    question: "How fast do you make decisions?",
    answer:
      "Our GP evaluates the research directly - technical deep-dive, reference checks, advisory review. No black box. Throughout the process, we tell you where we stand: what we find strong, where we see risks, and what we need to understand better.",
    highlight: "IF IT IS A FIT, YOU WILL KNOW. IF IT IS NOT, YOU WILL KNOW THAT TOO.",
  },
  {
    question: "What do you actually do after you invest?",
    answer:
      "We deploy commercial infrastructure from Day 1. For Qambria, that meant 3,250 B2B leads and introductions to three add-on investors. For Diffraqtion, an intro to the Head of Defense Research in Munich.",
    highlight: "WE BUILD YOUR PIPELINE AND YOUR INVESTOR NETWORK SO YOU CAN FOCUS ON THE TECHNOLOGY.",
  },
  {
    question: "Why a small fund?",
    answer:
      "By design. 20 companies, EUR 500K first checks. A small fund means we can commit fully: dedicated lead generation, direct customer introductions, hands-on operational support. That is harder with 80 companies in a portfolio.",
    highlight: "WE CHOSE DEPTH OVER BREADTH.",
  },
  {
    question: "What won't you invest in?",
    answer:
      "Business models. We back hard technology - systems where the defensibility is in the architecture, not the go-to-market. No SaaS, no marketplaces, no consumer apps. If your moat is a network effect rather than a technical breakthrough, we are the wrong fund.",
    highlight: "AND THAT IS FINE.",
  },
  {
    question: "What kind of founders are you looking for?",
    answer:
      "Technical founders who can sell - or are coachable enough to learn. We look for what we call Double PMF: proof of fit in one focused use case, plus visibility into a larger market. We do not need a finished company.",
    highlight: "WE NEED DEFENSIBLE TECHNOLOGY WITH GLOBAL POTENTIAL.",
  },
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
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

      if (faqsRef.current) {
        const items = faqsRef.current.children;
        gsap.fromTo(
          items,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: faqsRef.current,
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
    <section ref={sectionRef} id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <h2 ref={headingRef} className="mb-12 font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight" style={{ color: "#FEB180" }}>
          WHAT FOUNDERS
          <br />
          ASK US
        </h2>

        <div ref={faqsRef} className="space-y-0">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-9 text-left sm:py-10 lg:py-12 cursor-pointer"
                >
                  <span className="font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {item.question}
                  </span>
                  <span className="relative h-5 w-5 shrink-0">
                    {/* Horizontal line (always visible) */}
                    <motion.span
                      className="absolute left-0 top-0 h-[3px] rounded-full bg-current"
                      animate={{
                        width: "20px",
                        x: 0,
                        y: 9,
                      }}
                      style={{
                        color: isOpen ? "#D4FFEF" : "#FEB180"
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.45 }}
                    />
                    {/* Vertical line (rotated horizontal, only for +) */}
                    <motion.span
                      className="absolute left-0 top-0 h-[3px] rounded-full bg-current"
                      animate={{
                        width: "20px",
                        x: 0,
                        y: 9,
                        rotate: isOpen ? 0 : 90,
                        opacity: isOpen ? 0 : 1,
                      }}
                      style={{
                        color: isOpen ? "#D4FFEF" : "#FEB180",
                        transformOrigin: "center",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.45 }}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        opacity: { duration: 0.3 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-9 sm:pb-10 lg:pb-12">
                        <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                          {item.answer}
                        </p>
                        {"highlight" in item && item.highlight && (
                          <p className="mt-4 text-xl font-semibold leading-relaxed sm:text-2xl lg:text-3xl" style={{ color: "#FEB180" }}>
                            {item.highlight}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {index < faqs.length - 1 && (
                  <div className="h-px bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
