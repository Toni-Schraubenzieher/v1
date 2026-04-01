"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsapScrollTrigger";
import Image from "next/image";

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
    titleMain: "FIRST",
    titleAccent: "PRINCIPLES",
    kicker: "No translating. No dumbing down.",
    description:
      "We start with your technology, not your TAM slide. Our GP has spent over a decade in deep-tech. Building CVCs, leading technical due diligence, working alongside quantum researchers and robotics teams. We do not need it simplified. We need to understand what is actually defensible.",
    image:
      "/This_is_Kensho/Technical_Fluency.webp",
    form: "1",
    accent: "#D4FFEF",
  },
  {
    id: "commitment",
    index: "02",
    titleMain: "FULL",
    titleAccent: "COMMITMENT",
    kicker: "Every door we can open. We open.",
    description:
      "B2B lead generation, investor introductions, defense and enterprise access, expansion into new markets. Our GP works directly with every portfolio company - from technical evaluation to commercial execution. One decision-maker, fully invested. We activate our full network for every founder we back. That is how we operate.",
    image:
      "/This_is_Kensho/Full_Commitment.webp",
    form: "2",
    accent: "#FEB180",
  },
  {
    id: "capital",
    index: "03",
    titleMain: "PATIENT",
    titleAccent: "CAPITAL",
    kicker: "Fewer bets. Full attention.",
    description:
      "€500K first checks into Pre-Seed and Seed. Five to seven investments per year. Small fund by design. That means more time per founder, more resources per company, and a long-horizon commitment to technology that takes time to mature.",
    image:
      "/This_is_Kensho/Patient_Capital.webp",
    form: "3",
    accent: "#D4FFEF",
  },
  {
    id: "focus",
    index: "04",
    titleMain: "WHERE WE",
    titleAccent: "INVEST",
    kicker: "Our four verticals",
    description: "",
    image:
      "/This_is_Kensho/Robotics.webp",
    form: "4",
    accent: "#D4FFEF",
  },
];

const investmentAreas = [
  {
    id: 1,
    number: "01",
    title: "ROBOTICS",
    description:
      "Autonomous systems for industrial and defense applications. From warehouse automation to field robotics. Machines that replace risk, not just labor.",
    color: "#FEB180",
    formNumber: "1",
    image: "/This_is_Kensho/Robotics.webp",
  },
  {
    id: 2,
    number: "02",
    title: "INDUSTRIAL AI",
    description:
      "AI built for physical systems: machine perception, predictive maintenance, autonomous decision-making at the edge. Not chatbots. The intelligence layer that makes factories, warehouses, and defense systems work.",
    color: "#D4FFEF",
    formNumber: "2",
    image: "/This_is_Kensho/Enabling_Technologies.webp",
  },
  {
    id: 3,
    number: "03",
    title: "COMPUTATION",
    description:
      "Quantum computing, edge computing, HPC, semiconductors. The compute layer underneath every other vertical we invest in, from scientific simulation to real-time autonomous decision-making.",
    color: "#FEB180",
    formNumber: "3",
    image: "/This_is_Kensho/Computation.webp",
  },
  {
    id: 4,
    number: "04",
    title: "CYBERSECURITY / DUAL USE",
    description:
      "Post-quantum cryptography, secure communication, autonomous surveillance. The infrastructure layer of European defense sovereignty.",
    color: "#D4FFEF",
    formNumber: "4",
    image: "/This_is_Kensho/Cybersecurity.webp",
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
  "1": "max-w-[18.75rem]",
  "2": "max-w-[38.75rem]",
  "3": "max-w-[18.75rem]",
  "4": "max-w-[38.75rem]",
};

const getRemInPx = () => typeof window !== 'undefined'
  ? parseFloat(getComputedStyle(document.documentElement).fontSize)
  : 16;

function StoryItemComponent({ item, index, activeInvestmentArea, setActiveInvestmentArea }: {
  item: StoryItem;
  index: number;
  activeInvestmentArea: number;
  setActiveInvestmentArea: (index: number) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const [remPx, setRemPx] = useState(16);

  useEffect(() => {
    const update = () => setRemPx(getRemInPx());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { x: isEven ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 95%",
            end: "top 75%",
            scrub: 1.5,
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index, isEven]);

  return (
    <div
      ref={itemRef}
      key={item.id}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
        isEven ? "" : "lg:[&>*:first-child]:order-2"
      }`}
    >
      <div
        className={`group relative w-full overflow-visible ${formSizeClass[item.form]}`}
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
          {item.index === "04" ? (
            <>
              {investmentAreas.map((area, areaIndex) => (
                <motion.div
                  key={area.id}
                  initial={false}
                  animate={{
                    opacity: activeInvestmentArea === areaIndex ? 1 : 0,
                    scale: activeInvestmentArea === areaIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 h-full w-full"
                  style={{ pointerEvents: activeInvestmentArea === areaIndex ? 'auto' : 'none' }}
                >
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 620px"
                    className="object-cover"
                    loading="eager"
                    quality={95}
                  />
                </motion.div>
              ))}
            </>
          ) : (
            <Image
              src={item.image}
              alt={`${item.titleMain} ${item.titleAccent}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              priority={index === 0}
              quality={95}
            />
          )}
        </div>

      </div>

      <div className="w-full max-w-[32.5rem]">
        <p className="text-lg font-medium text-white/55">{item.index}</p>
        <h3 className="mt-3 font-heading text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold leading-[0.92] text-white whitespace-nowrap">
          {item.titleMain}{" "}
          <span className="font-bold">{item.titleAccent}</span>
        </h3>

        {item.index === "04" ? (
          // Investment Areas - Vertical List only
          <div className="mt-7">
            <p className="mb-7 text-base font-semibold text-white/92 sm:text-lg">
              {item.kicker}
            </p>
            {/* Clickable Vertical List */}
            <div className="flex flex-col gap-1 max-w-[32.5rem] relative">
              {/* Orange sliding background */}
              <motion.div
                className="absolute left-0 right-0 rounded-2xl bg-[#FEB180] pointer-events-none"
                animate={{
                  y: (() => {
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                    const collapsedH = isMobile ? 5.3125 * remPx : 4.7 * remPx;
                    const gap = 4;
                    let totalY = 0;
                    for (let i = 0; i < activeInvestmentArea; i++) {
                      totalY += collapsedH + gap;
                    }
                    return totalY;
                  })(),
                  height: typeof window !== 'undefined' && window.innerWidth < 640
                    ? 15 * remPx
                    : 12.5 * remPx,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />

              {investmentAreas.map((area, areaIndex) => {
                const isActive = activeInvestmentArea === areaIndex;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => setActiveInvestmentArea(areaIndex)}
                    className="relative text-left cursor-pointer px-6"
                    initial={false}
                    animate={{
                      height: isActive
                        ? (isMobile ? 15 * remPx : 12.5 * remPx)
                        : (isMobile ? 5.3125 * remPx : 4.7 * remPx),
                    }}
                    transition={{
                      height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }}
                  >
                    <div className="relative z-10 flex items-start gap-4 h-full py-6">
                      <div className="flex-1">
                        <motion.h4
                          className="font-heading text-[clamp(1.125rem,3vw,2rem)] font-bold whitespace-nowrap"
                          animate={{
                            color: isActive ? '#101010' : 'rgba(255, 255, 255, 0.3)',
                          }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {area.title}
                        </motion.h4>

                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              key={area.id}
                              initial={{ opacity: 0, filter: "blur(8px)" }}
                              animate={{ opacity: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0, filter: "blur(8px)" }}
                              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
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
}

export default function LogoElementsShowcase() {
  const [activeItem, setActiveItem] = useState<StoryItem | null>(null);
  const [activeInvestmentArea, setActiveInvestmentArea] = useState(0);

  return (
    <section id="venture-stories" className="py-10 lg:py-14">
      <div className="mx-auto flex max-w-[82.5rem] flex-col gap-24 px-6 sm:px-8 lg:gap-28">
        {stories.map((item, index) => (
          <StoryItemComponent
            key={item.id}
            item={item}
            index={index}
            activeInvestmentArea={activeInvestmentArea}
            setActiveInvestmentArea={setActiveInvestmentArea}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black"
            style={{ position: "relative" }}
          >
            <Image
              src={activeItem.image}
              alt={`${activeItem.titleMain} ${activeItem.titleAccent}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/80">
                    {activeItem.index}
                  </p>
                  <h3 className="mt-3 max-w-[35rem] font-heading text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.9] text-white whitespace-nowrap">
                    {activeItem.titleMain}{" "}
                    <span className="font-bold">{activeItem.titleAccent}</span>
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

              <div className="max-w-[38.75rem]">
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
