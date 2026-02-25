"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const sections = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "how-we-work", label: "How we work", href: "#how-we-work" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "who-we-are", label: "About us", href: "#who-we-are" },
  { id: "team", label: "Team", href: "#team" },
  { id: "get-in-touch", label: "Get in touch", href: "#get-in-touch" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

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
      setActiveSection("Home");
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
              className="fixed right-3 top-3 z-[55] h-[calc(100vh-24px)] w-[min(46vw,520px)] min-w-[320px] rounded-3xl bg-[#121214] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:p-10"
            >
              <nav className="mt-24 -mx-8 sm:mt-28 sm:-mx-10">
                <ul className="space-y-0">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={section.href}
                        onClick={() => setIsOpen(false)}
                        className="group relative block overflow-hidden px-8 py-1 sm:px-10 font-heading text-[clamp(2rem,4.4vw,4.4rem)] font-bold leading-[0.95] tracking-tight text-[#D4FFEF] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#101010]"
                      >
                        <span className="pointer-events-none absolute inset-0 origin-left scale-x-[0.985] bg-[#D4FFEF] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100" />
                        <span className="relative z-10 block h-[1.05em] overflow-hidden">
                          <span className="block transform-gpu transition-transform duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.05em]">
                            {section.label}
                          </span>
                          <span className="absolute left-0 top-[1.05em] block transform-gpu transition-transform duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.05em]">
                            {section.label}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
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
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="relative h-5 w-5 text-white"
          >
            <span className="absolute left-1/2 top-0 h-5 w-[1.5px] -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 bg-current" />
          </motion.span>
        </button>
      </div>
    </>
  );
}
