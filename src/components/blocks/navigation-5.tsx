"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function Navigation5() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { title: "Home", href: "#hero" },
    { title: "Who we are", href: "#who-we-are" },
    { title: "How we work", href: "#how-we-work" },
    { title: "Portfolio", href: "#portfolio" },
    { title: "About Us", href: "#about-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (!item) continue;
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(item.title);
          return;
        }
      }
      setActiveSection("Home");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LinkedInBrandIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const KenshoMarkIcon = () => (
    <svg viewBox="0 0 120 122" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white">
      <path d="M55.5204 56.8219L44.2592 45.5103L55.5204 0H119.421V39.7226L55.5204 56.8219Z" fill="currentColor" />
      <path d="M55.7808 65.2399L43.9961 77.8671L55.7808 121.536H119.681V81.8131L55.7808 65.2399Z" fill="currentColor" />
      <path d="M0 71.2906V121.799H25.403L35.6165 77.341L23.3079 65.2399L0 71.2906Z" fill="currentColor" />
      <path d="M36.1398 45.7733L24.8786 56.8219L0.261322 49.7191V0.526184H24.8786L36.1398 45.7733Z" fill="currentColor" />
    </svg>
  );

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-md z-50 cursor-pointer"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none sm:bottom-6 sm:px-6"
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="rounded-2xl bg-[#101010]/95 border border-white/10 shadow-xl overflow-hidden backdrop-blur-xl">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 sm:p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="inline-flex w-fit"
                    >
                      <KenshoMarkIcon />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="flex items-center justify-between"
                    >
                      <div className="text-2xl font-medium text-white leading-tight">
                        This is Kensho
                      </div>
                      <a
                        href="#about-us"
                        className="px-4 py-2 rounded-sm bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors no-underline"
                      >
                        Let&apos;s talk
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="-mx-4 sm:-mx-5"
                    >
                      {navItems.map((item, index) => (
                        <motion.a
                          key={item.title}
                          href={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.25 + index * 0.05,
                          }}
                          whileHover={{ scale: 1.01 }}
                          className={`flex items-center justify-between px-4 py-4 border-t border-white/10 hover:bg-white/5 transition-colors no-underline group cursor-pointer ${
                            index === navItems.length - 1
                              ? "border-b border-white/10"
                              : "border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-14 rounded-lg bg-white/8 border border-white/10 shrink-0 transition-all duration-200 group-hover:w-[72px]" />
                            <span className="text-base font-light text-white group-hover:text-white/85 transition-colors">
                              {item.title}
                            </span>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="pt-2"
                    >
                      <a href="#" aria-label="LinkedIn" className="inline-flex items-center text-[#FEB180] transition-opacity hover:opacity-85">
                        <LinkedInBrandIcon />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-5 py-3.5 min-h-[58px] text-left transition-colors hover:bg-white/[0.03]"
            >
              <div className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/85">
                {isExpanded ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Close Menu</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Open Menu</span>
                  </>
                )}
              </div>
              <div className="pointer-events-none text-sm font-medium text-white/55">{activeSection}</div>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navigation5;
