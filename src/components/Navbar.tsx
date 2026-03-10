"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const sections = [
  { id: "hero", label: "HOME", href: "#hero" },
  { id: "venture-stories", label: "THIS IS KENSHO", href: "#venture-stories" },
  { id: "portfolio-overview", label: "PORTFOLIO", href: "#portfolio-overview" },
  { id: "who-we-are", label: "ABOUT US", href: "#who-we-are" },
  { id: "team", label: "TEAM", href: "#team" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "get-in-touch", label: "GET IN TOUCH", href: "#get-in-touch" },
];
const NAV_ORANGE = "#FEB180";
const NAV_MINT = "#D4FFEF";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");

  const animateScrollTo = (targetY: number, durationMs = 1100) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: (typeof sections)[number]
  ) => {
    event.preventDefault();
    const element = document.getElementById(section.id);
    setIsOpen(false);

    if (!element) return;

    const targetTop = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
    animateScrollTo(targetTop, 980);
    window.history.replaceState(null, "", section.href);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;

        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section.label);
          return;
        }
      }
      setActiveSection("HOME");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-3 top-3 z-[55] h-[calc(100vh-24px)] w-[40vw] min-w-[320px] rounded-3xl bg-[#121214] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:p-10"
            >
              <nav className="-mx-8 flex h-full items-center sm:-mx-10">
                <ul className="w-full space-y-0">
                  {sections.map((section, index) => {
                    const itemColor = index % 2 === 0 ? NAV_ORANGE : NAV_MINT;

                    return (
                    <li key={section.id}>
                      <a
                        href={section.href}
                        onClick={(event) => handleSectionClick(event, section)}
                        className="group relative block w-full overflow-hidden px-8 py-1 font-heading text-[clamp(1.8rem,3.4vw,4.2rem)] font-bold leading-[0.95] tracking-tight text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#101010] sm:px-10"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 origin-left scale-x-[0.985] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100"
                          style={{ backgroundColor: itemColor }}
                        />
                        <span className="relative z-10 mx-auto block h-[1.15em] w-full max-w-[32rem] overflow-hidden text-left">
                          <span className="block whitespace-nowrap transform-gpu transition-transform duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.15em]">
                            {section.label}
                          </span>
                          <span className="absolute left-0 top-[1.15em] block whitespace-nowrap transform-gpu transition-transform duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.15em]">
                            {section.label}
                          </span>
                        </span>
                      </a>
                    </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="fixed right-6 top-6 z-[60] sm:right-8 sm:top-8">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 min-w-[210px] items-center justify-between rounded-2xl border border-white/15 bg-[#101010]/68 px-5 text-white backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          aria-label="Toggle navigation menu"
        >
          <span className="text-base font-medium">{activeSection}</span>
          <span className="relative h-5 w-5 text-white">
            <motion.span
              animate={{
                width: isOpen ? "20px" : "13px",
                x: isOpen ? 0 : 7,
                y: isOpen ? 9 : 1.5,
                rotate: isOpen ? 45 : 0,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.45 }}
              className="absolute left-0 top-0 h-[3px] rounded-full bg-current"
            />
            <motion.span
              animate={{
                width: isOpen ? "0px" : "20px",
                x: isOpen ? 10 : 0,
                y: 9,
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.45 }}
              className="absolute left-0 top-0 h-[3px] rounded-full bg-current"
            />
            <motion.span
              animate={{
                width: isOpen ? "20px" : "13px",
                x: isOpen ? 0 : 0,
                y: isOpen ? 9 : 16.5,
                rotate: isOpen ? -45 : 0,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.45 }}
              className="absolute left-0 top-0 h-[3px] rounded-full bg-current"
            />
          </span>
        </button>
      </div>
    </>
  );
}
