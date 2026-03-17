"use client";

import { useRef, useEffect, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./modal-cards.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  accent: string;
  bio: string;
  linkedin: string;
}
type TeamCarouselItem =
  | {
      type: "label";
      id: string;
      label: string;
      color: string;
    }
  | {
      type: "member";
      member: TeamMember;
    };

const team: TeamMember[] = [
  {
    id: "wolfgang",
    name: "Wolfgang",
    role: "General Partner · PhD, Deep-Tech Investor",
    image: "/Team/Wolfgang.webp",
    accent: "#FEB180",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "anton",
    name: "Anton",
    role: "Principal · B2B Lead Generation",
    image: "/Team/Anton.webp",
    accent: "#FEB180",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "marc",
    name: "Marc",
    role: "GP Advisor · B2B Sales",
    image: "/Team/Marc.webp",
    accent: "#D4FFEF",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "david",
    name: "David",
    role: "Advisor · Cryptographic Algorithms",
    image: "",
    accent: "#D4FFEF",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "linda",
    name: "Linda",
    role: "Advisor · AI Research & Legal/Tech",
    image: "/Team/Linda.webp",
    accent: "#D4FFEF",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedin: "https://linkedin.com",
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);
  const lockedScrollYRef = useRef(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [oneSetWidth, setOneSetWidth] = useState(0);
  const baseVelocity = -18;
  const baseX = useMotionValue(0);
  const scrollVelocity = useRef(baseVelocity);
  const jumpAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const baseCarouselItems: TeamCarouselItem[] = [
    { type: "label", id: "core-team", label: "CORE-TEAM", color: "#FEB180" },
    { type: "member", member: team[0]! },
    { type: "member", member: team[1]! },
    { type: "label", id: "advisor", label: "ADVISORS", color: "#D4FFEF" },
    { type: "member", member: team[2]! },
    { type: "member", member: team[3]! },
    { type: "member", member: team[4]! },
  ];
  const carouselItems = [
    ...baseCarouselItems,
    ...baseCarouselItems,
    ...baseCarouselItems,
    ...baseCarouselItems,
  ];

  const getCarouselDimensions = () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = window.innerWidth < 640;
    const isDesktop = window.innerWidth >= 1024;
    return {
      memberWidth: (isMobile ? 15.625 : isDesktop ? 18.75 : 17.5) * rem,
      labelWidth: (isMobile ? 7.8 : isDesktop ? 9.375 : 8.75) * rem,
      gap: 20,
      horizontalPadding: isMobile ? 24 : 32,
    };
  };

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
              scrub: 1.5,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsCarouselVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const { memberWidth, labelWidth, gap } = getCarouselDimensions();
      const width = (memberWidth + gap) * team.length + (labelWidth + gap) * 2;
      setOneSetWidth(width);
      baseX.set(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseX]);

  useEffect(() => {
    const activeMember = team.find((m) => m.id === activeId);

    if (activeMember) {
      lockedScrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
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
    };
  }, [activeId]);

  const jumpCarouselForward = (label: "core-team" | "advisor", clickedIndex: number) => {
    const { memberWidth, labelWidth, gap, horizontalPadding } = getCarouselDimensions();
    const cardsInGroup = label === "advisor" ? 3 : 2;

    let offsetBeforeGroup = horizontalPadding;
    const groupStartIndex = clickedIndex + 1;
    for (let i = 0; i < groupStartIndex; i += 1) {
      const item = carouselItems[i];
      if (!item) continue;
      const width = item.type === "member" ? memberWidth : labelWidth;
      offsetBeforeGroup += width + gap;
    }

    const groupWidth = cardsInGroup * memberWidth + (cardsInGroup - 1) * gap;
    const groupCenterX = offsetBeforeGroup + groupWidth / 2;
    const viewportCenterX = window.innerWidth / 2;
    const targetX = viewportCenterX - groupCenterX;

    setIsDragging(true);
    jumpAnimationRef.current?.stop();
    jumpAnimationRef.current = animate(baseX, targetX, {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIsDragging(false);
        scrollVelocity.current = baseVelocity;
      },
    });
  };

  useAnimationFrame((_, delta) => {
    if (!oneSetWidth || isDragging || !isCarouselVisible) return;

    scrollVelocity.current = scrollVelocity.current * 0.9 + baseVelocity * 0.1;
    const moveBy = scrollVelocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);

    const x = baseX.get();
    if (x <= -oneSetWidth * 2) {
      baseX.set(x + oneSetWidth);
    } else if (x > 0) {
      baseX.set(x - oneSetWidth);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      className="about-us py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Big statement */}
        <h2
          ref={headingRef}
          className="mb-16 max-w-[900px] mx-auto font-heading text-[clamp(2rem,5.5vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white lg:mb-20 text-center"
        >
          Built for founders
          <br />
          who build what matters.
        </h2>

        {/* Infinite team carousel */}
        <div
          ref={cardsRef}
          className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-hidden overflow-y-visible py-6"
        >
          <motion.div
            ref={scrollerRef}
            className="flex cursor-grab items-end gap-5 px-6 active:cursor-grabbing sm:px-8"
            style={{ x: baseX }}
            drag="x"
            dragElastic={0.04}
            dragMomentum={false}
            onDragStart={() => {
              jumpAnimationRef.current?.stop();
              setIsDragging(true);
            }}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              scrollVelocity.current = info.velocity.x;
            }}
          >
            {carouselItems.map((item, index) => (
              <motion.div
                key={`${item.type === "member" ? item.member.id : item.id}-${index}`}
                className={
                  item.type === "member"
                    ? "modal-card team-scroll-card w-[15.625rem] shrink-0 sm:w-[17.5rem] lg:w-[18.75rem]"
                    : "team-scroll-card relative flex h-[23.4rem] w-[7.8rem] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#101010]/0 sm:h-[26.25rem] sm:w-[8.75rem] lg:h-[28.125rem] lg:w-[9.375rem]"
                }
                animate={
                  item.type === "member" && hoveredId === `${item.member.id}-${index}`
                    ? { scale: 1.03, y: -8 }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                onMouseEnter={() => {
                  setHoveredId(
                    item.type === "member" ? `${item.member.id}-${index}` : `${item.id}-${index}`
                  );
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (item.type === "label") {
                    jumpCarouselForward(item.id === "core-team" ? "core-team" : "advisor", index);
                  } else if (item.type === "member" && !isDragging) {
                    setNavigationDirection(1);
                    setActiveId(item.member.id);
                  }
                }}
              >
                {item.type === "member" ? (
                  <>
                    {item.member.image ? (
                      <Image
                        src={item.member.image}
                        alt={item.member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="modal-card-image"
                        draggable="false"
                      />
                    ) : (
                      <div className="modal-card-image bg-[#2A2A2A]" />
                    )}
                    <div className="modal-card-overlay">
                      <div className="modal-card-content">
                        <div>
                          <h3 className="modal-card-title">{item.member.name}</h3>
                          <p className="modal-card-subtitle">{item.member.role}</p>
                        </div>
                        <div
                          className="modal-card-icon"
                          style={{ color: item.member.accent }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M8 3V13M3 8H13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className="relative z-10 px-1 text-center font-heading text-[1.45rem] font-black uppercase tracking-[0.14em] [writing-mode:vertical-rl] rotate-180 sm:text-[1.65rem]"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <div className="absolute inset-x-0 bottom-[29px] z-10 flex justify-center">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 backdrop-blur-md"
                        style={{
                          color:
                            hoveredId === `${item.id}-${index}` ? "#101010" : item.color,
                          backgroundColor:
                            hoveredId === `${item.id}-${index}` ? item.color : undefined,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 17L17 7M17 7H9M17 7V15"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Team Member Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeId ? 1 : 0 }}
        className={`fixed inset-0 z-[100] bg-[#0A0A0A]/96 backdrop-blur-md ${
          activeId ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {activeId && (() => {
          const activeIndex = team.findIndex((m) => m.id === activeId);
          const activeMember = team[activeIndex];
          if (!activeMember) return null;

          return (
            <div className="relative flex h-full flex-col">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#101010]/68 text-white backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors sm:right-8 sm:top-8 cursor-pointer"
                aria-label="Close team member detail"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-0 h-[3px] w-[20px] translate-y-[9px] rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-0 h-[3px] w-[20px] translate-y-[9px] -rotate-45 rounded-full bg-current" />
                </span>
              </button>

              {/* Previous Button */}
              <button
                type="button"
                onClick={() => {
                  setNavigationDirection(-1);
                  setActiveId(team[(activeIndex - 1 + team.length) % team.length]!.id);
                }}
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:left-10 cursor-pointer"
                style={{
                  color: "#101010",
                  backgroundColor: activeMember.accent,
                }}
                aria-label="Previous team member"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  setNavigationDirection(1);
                  setActiveId(team[(activeIndex + 1) % team.length]!.id);
                }}
                className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 transition-colors sm:right-10 cursor-pointer"
                style={{
                  color: "#101010",
                  backgroundColor: activeMember.accent,
                }}
                aria-label="Next team member"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="flex h-full items-center justify-center px-8 py-20 sm:px-12">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
                  >
                  {/* Left: Image */}
                  <div className="flex items-center justify-center">
                    {activeMember.image ? (
                      <div className="aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-[#101010] relative">
                        <Image
                          src={activeMember.image}
                          alt={activeMember.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 448px"
                          className="object-cover"
                          loading="eager"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] w-full max-w-md rounded-2xl bg-[#2A2A2A]" />
                    )}
                  </div>

                  {/* Right: Info */}
                  <div className="flex flex-col justify-center">
                    <h2 className="font-heading text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
                      {activeMember.name}
                    </h2>
                    <p
                      className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl"
                      style={{ color: activeMember.accent }}
                    >
                      {activeMember.role}
                    </p>
                    <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
                      {activeMember.bio}
                    </p>

                    {/* LinkedIn Icon */}
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center justify-center cursor-pointer"
                      aria-label="Connect on LinkedIn"
                    >
                      <svg
                        className="h-12 w-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: activeMember.accent }}
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
                </AnimatePresence>
              </div>
            </div>
          );
        })()}
      </motion.div>
    </section>
  );
}
