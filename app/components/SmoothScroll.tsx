"use client";

import Lenis from "lenis";
import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollContextValue = {
  scrollTo: (target: string | number) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.85
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        scrollTo: (target) => {
          lenisRef.current?.scrollTo(target, { offset: -88, duration: 1.15 });
        }
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
