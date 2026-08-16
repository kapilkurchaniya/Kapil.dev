"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CursorVariant = "default" | "hover" | "project" | "text";

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });

  const addRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window) {
      setIsMobile(true);
      return;
    }

    // Direct RAF loop for zero-lag cursor tracking
    const updatePosition = () => {
      setPos({ x: mouseRef.current.x, y: mouseRef.current.y });
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    rafRef.current = requestAnimationFrame(updatePosition);

    const moveCursor = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    const attachHoverEvents = () => {
      document.querySelectorAll(".project-card").forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("project"));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });

      document.querySelectorAll("[data-cursor='text']").forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("text"));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });

      document.querySelectorAll("a, button, input, textarea, select, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () =>
          setVariant((prev) => (prev === "project" ? "project" : "hover"))
        );
        el.addEventListener("mouseleave", () =>
          setVariant((prev) => (prev === "project" ? "project" : "default"))
        );
      });
    };

    attachHoverEvents();

    const observer = new MutationObserver(() => {
      attachHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible, addRipple]);

  if (isMobile) return null;

  const size = variant === "project" ? 80 : variant === "hover" ? 48 : variant === "text" ? 120 : 32;

  return (
    <>
      {/* Main cursor — simple circle, no spring/magnetic */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border"
        style={{
          width: size,
          height: size,
          transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.15s ease",
          mixBlendMode: variant === "text" ? "difference" : "normal",
          backgroundColor:
            variant === "text"
              ? "white"
              : variant === "project"
              ? "rgba(103, 232, 249, 0.12)"
              : variant === "hover"
              ? "rgba(103, 232, 249, 0.08)"
              : "transparent",
          backdropFilter: variant !== "default" && variant !== "text" ? "blur(4px)" : "none",
          borderColor:
            variant === "text"
              ? "transparent"
              : variant === "project"
              ? "rgba(103, 232, 249, 0.6)"
              : "rgba(103, 232, 249, 1)",
        }}
      >
        {/* Center dot — visible in default state */}
        <div
          className="rounded-full bg-cyan-300"
          style={{
            width: variant === "default" ? 6 : 0,
            height: variant === "default" ? 6 : 0,
            opacity: variant === "default" ? 1 : 0,
            transition: "all 0.2s ease",
          }}
        />

        {/* Removed 'VIEW' label to prevent overlap with project images */}
      </div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9998] rounded-full border border-cyan-300/40"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
