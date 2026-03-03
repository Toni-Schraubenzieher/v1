"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    question: "What stage do you invest in?",
    answer:
      "We primarily invest at pre-seed and seed stage, backing ambitious founders early when conviction and speed matter most.",
  },
  {
    question: "Which sectors are you focused on?",
    answer:
      "Our focus is on Robotics, Enabling Technologies, Cybersecurity / Dual use, and Computation, while staying open to exceptional outliers.",
  },
  {
    question: "How quickly can you make an investment decision?",
    answer:
      "We move fast. Once we align on team, market, and product potential, we can complete diligence and provide a decision in a short timeframe.",
  },
  {
    question: "Do you lead rounds or co-invest?",
    answer:
      "We can lead or co-invest depending on the round structure and founder needs, always with a practical, founder-first approach.",
  },
  {
    question: "How can founders get in touch?",
    answer:
      "Reach out via our contact section and include a short overview of your product, traction, and round details. We review every inbound carefully.",
  },
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">FAQ</span>
        </div>

        <h2 className="mb-10 font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-tight text-white">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8"
                >
                  <span className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {item.question}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-lg transition-colors ${
                      isOpen ? "bg-[#FEB180] text-[#101010]" : "bg-white/5 text-white"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-base leading-relaxed text-white/70 sm:px-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
