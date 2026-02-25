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
  form: "1" | "2" | "3";
  accent: string;
};

const stories: StoryItem[] = [
  {
    id: "conviction",
    index: "01",
    titleMain: "Founder",
    titleAccent: "Conviction",
    kicker: "Early signal, clear thesis.",
    description:
      "We partner with founders before consensus forms and help shape category-defining companies from day one.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1800&h=1300&fit=crop",
    form: "1",
    accent: "#FEB180",
  },
  {
    id: "network",
    index: "02",
    titleMain: "Operator",
    titleAccent: "Network",
    kicker: "Built-in unfair advantage.",
    description:
      "From hiring to GTM, our operator network supports portfolio teams with practical execution at every stage.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1800&h=1300&fit=crop",
    form: "2",
    accent: "#D4FFEF",
  },
  {
    id: "scale",
    index: "03",
    titleMain: "Scaling",
    titleAccent: "Discipline",
    kicker: "Speed without noise.",
    description:
      "We focus on durable growth, capital efficiency, and high-trust collaboration between founders and investors.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&h=1300&fit=crop",
    form: "3",
    accent: "#FEB180",
  },
];

const formAspectRatio: Record<StoryItem["form"], string> = {
  "1": "99 / 156",
  "2": "208 / 158",
  "3": "99 / 157",
};

const formMaskSizing: Record<StoryItem["form"], { size: string; position: string }> = {
  "1": { size: "100% 100%", position: "center" },
  // Form 2 has built-in left padding in the SVG viewBox, so we scale and pin left.
  "2": { size: "118% 100%", position: "left center" },
  "3": { size: "100% 100%", position: "center" },
};

const formSizeClass: Record<StoryItem["form"], string> = {
  "1": "max-w-[300px] lg:max-w-[300px]",
  "2": "max-w-[620px] lg:max-w-[620px]",
  "3": "max-w-[300px] lg:max-w-[300px]",
};

export default function LogoElementsShowcase() {
  const [activeItem, setActiveItem] = useState<StoryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
                    maskImage: `url('/Forms/${item.form}.svg')`,
                    WebkitMaskImage: `url('/Forms/${item.form}.svg')`,
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
