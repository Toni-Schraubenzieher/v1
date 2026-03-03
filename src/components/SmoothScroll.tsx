"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
    });
    const handleLockScroll = () => {
      lenis.stop();
    };
    const handleUnlockScroll = () => {
      lenis.start();
    };

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);
    window.addEventListener("kensho:lock-scroll", handleLockScroll);
    window.addEventListener("kensho:unlock-scroll", handleUnlockScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("kensho:lock-scroll", handleLockScroll);
      window.removeEventListener("kensho:unlock-scroll", handleUnlockScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
