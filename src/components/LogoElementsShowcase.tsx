"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMotionValue, useSpring } from "motion/react";

type StoryItem = {
  id: string;
  index: string;
  titleMain: string;
  titleAccent: string;
  kicker: string;
  description: string;
  image: string;
  form: "1" | "2" | "3" | "4";
  accent: string;
};

const stories: StoryItem[] = [
  {
    id: "technical",
    index: "01",
    titleMain: "Technical",
    titleAccent: "Fluency",
    kicker: "No translating. No dumbing down.",
    description:
      "We start with your technology, not your TAM slide. Whether it's post-quantum algorithms, autonomous perception, or photonic detectors, we invest the time to understand what you've actually built. Not to nod along. To challenge it, pressure-test it, and back it with conviction.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1800&h=1300&fit=crop",
    form: "1",
    accent: "#FEB180",
  },
  {
    id: "commitment",
    index: "02",
    titleMain: "Full",
    titleAccent: "Commitment",
    kicker: "Every door we can open. We open.",
    description:
      "B2B lead generation, investor introductions, defense and enterprise access, expansion into new markets. Our GP works directly with every portfolio company - from technical evaluation to commercial execution. One decision-maker, fully invested. We activate our full network for every founder we back. Not as a promise. As how we operate.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&h=1300&fit=crop",
    form: "2",
    accent: "#D4FFEF",
  },
  {
    id: "capital",
    index: "03",
    titleMain: "Patient",
    titleAccent: "Capital",
    kicker: "Fewer bets. Full attention.",
    description:
      "€500K first checks into Pre-Seed and Seed. Five to seven investments per year. Small fund by design. That means more time per founder, more resources per company, and a long-horizon commitment to technology that takes time to mature.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&h=1300&fit=crop",
    form: "3",
    accent: "#FEB180",
  },
  {
    id: "focus",
    index: "04",
    titleMain: "Where we",
    titleAccent: "invest",
    kicker: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&h=1300&fit=crop",
    form: "4",
    accent: "#D4FFEF",
  },
];

const investmentAreas = [
  {
    id: 1,
    number: "01",
    title: "Robotics",
    description:
      "Autonomous systems for industrial and defense applications. From warehouse automation to field robotics. Machines that replace risk, not just labor.",
    color: "#FEB180",
    formNumber: "1",
  },
  {
    id: 2,
    number: "02",
    title: "Enabling Technologies",
    description:
      "Specialized AI, photonics, and the commercial infrastructure layer that deep tech needs to scale. The substrate - not the application.",
    color: "#D4FFEF",
    formNumber: "2",
  },
  {
    id: 3,
    number: "03",
    title: "Cybersecurity / Dual Use",
    description:
      "Post-quantum cryptography, secure communication, autonomous surveillance. The infrastructure layer of European defense sovereignty.",
    color: "#FEB180",
    formNumber: "3",
  },
  {
    id: 4,
    number: "04",
    title: "Computation",
    description:
      "Quantum computing, edge computing, HPC, semiconductors. The compute layer underneath every other vertical we invest in, from scientific simulation to real-time autonomous decision-making.",
    color: "#D4FFEF",
    formNumber: "4",
  },
];

const formAspectRatio: Record<StoryItem["form"], string> = {
  "1": "99 / 156",
  "2": "206 / 156",
  "3": "99 / 157",
  "4": "208 / 154",
};

const formMaskSizing: Record<StoryItem["form"], { size: string; position: string }> = {
  "1": { size: "100% 100%", position: "center" },
  "2": { size: "100% 100%", position: "center" },
  "3": { size: "100% 100%", position: "center" },
  "4": { size: "100% 100%", position: "center" },
};

const formSizeClass: Record<StoryItem["form"], string> = {
  "1": "max-w-[300px] lg:max-w-[300px]",
  "2": "max-w-[620px] lg:max-w-[620px]",
  "3": "max-w-[300px] lg:max-w-[300px]",
  "4": "max-w-[620px] lg:max-w-[620px]",
};

export default function LogoElementsShowcase() {
  const [activeItem, setActiveItem] = useState<StoryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeInvestmentArea, setActiveInvestmentArea] = useState(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 280, damping: 30, mass: 0.35 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 280, damping: 30, mass: 0.35 });

  return (
    <section id="venture-stories" className="py-10 lg:py-14">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-24 px-6 sm:px-8 lg:gap-28">
        {stories.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                isEven ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveItem(item)}
                onMouseEnter={(event) => {
                  setHoveredId(item.id);
                  cursorX.set(event.clientX);
                  cursorY.set(event.clientY);
                }}
                onMouseMove={(event) => {
                  cursorX.set(event.clientX);
                  cursorY.set(event.clientY);
                }}
                onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                className={`group relative w-full overflow-visible text-left ${formSizeClass[item.form]}`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: formAspectRatio[item.form],
                    maskImage: `url('/Forms/${item.form}.svg?v=11')`,
                    WebkitMaskImage: `url('/Forms/${item.form}.svg?v=11')`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: formMaskSizing[item.form].position,
                    WebkitMaskPosition: formMaskSizing[item.form].position,
                    maskSize: formMaskSizing[item.form].size,
                    WebkitMaskSize: formMaskSizing[item.form].size,
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${item.titleMain} ${item.titleAccent}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>

              </button>

              <div className="w-full max-w-[520px]">
                <p className="text-lg font-medium text-white/55">{item.index}</p>
                <h3 className="mt-3 font-heading text-5xl font-bold leading-[0.92] text-white sm:text-6xl">
                  {item.titleMain}
                  <br />
                  <span className="font-medium">{item.titleAccent}</span>
                </h3>

                {item.index === "04" ? (
                  // Investment Areas - Vertical List only
                  <div className="mt-7">
                    {/* Clickable Vertical List */}
                    <div className="flex flex-col gap-2 max-w-[520px] relative" style={{ height: '500px' }}>
                      {investmentAreas.map((area, areaIndex) => {
                        const isActive = activeInvestmentArea === areaIndex;
                        return (
                          <motion.button
                            key={area.id}
                            onClick={() => setActiveInvestmentArea(areaIndex)}
                            className="relative text-left cursor-pointer rounded-2xl px-6 overflow-hidden"
                            initial={false}
                            animate={{
                              height: isActive ? '225px' : '70px',
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {/* Background for active item */}
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-[#FEB180]"
                              initial={false}
                              animate={{
                                opacity: isActive ? 1 : 0,
                              }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />

                            <div className="relative z-10 flex items-start gap-4 h-full py-6">
                              <div className="flex-1">
                                <h4
                                  className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                                    isActive ? 'text-[#101010]' : 'text-white/30'
                                  }`}
                                >
                                  {area.title}
                                </h4>

                                <AnimatePresence mode="wait">
                                  {isActive && (
                                    <motion.p
                                      key={area.id}
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                      className="mt-4 text-sm sm:text-base leading-relaxed text-[#101010]/80"
                                    >
                                      {area.description}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Normal Layout for other items
                  <>
                    <p className="mt-7 text-base font-semibold text-white/92 sm:text-lg">
                      {item.kicker}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-white/62 sm:text-lg">
                      {item.description}
                    </p>
                    <span
                      className="mt-7 inline-block h-1 w-20 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {hoveredId && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-[90] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-semibold uppercase tracking-[0.14em] text-[#101010]"
            style={{ x: smoothCursorX, y: smoothCursorY }}
          >
            Open
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <img
              src={activeItem.image}
              alt={`${activeItem.titleMain} ${activeItem.titleAccent}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">
                    {activeItem.index}
                  </p>
                  <h3 className="mt-3 max-w-[560px] font-heading text-5xl font-bold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
                    {activeItem.titleMain}
                    <br />
                    <span className="font-medium">{activeItem.titleAccent}</span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/18 text-2xl leading-none text-white transition-colors hover:bg-white/24"
                  aria-label="Close story"
                >
                  x
                </button>
              </div>

              <div className="max-w-[620px]">
                <p className="text-xl font-semibold text-white">{activeItem.kicker}</p>
                <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                  {activeItem.description}
                </p>
                <span
                  className="mt-6 inline-block h-1 w-20 rounded-full"
                  style={{ backgroundColor: activeItem.accent }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
