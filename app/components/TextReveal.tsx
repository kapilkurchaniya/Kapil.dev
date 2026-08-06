"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: "word" | "char";
}

export function TextReveal({ text, className = "", delay = 0, mode = "word" }: TextRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const units = mode === "char" ? text.split("") : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === "char" ? 0.025 : 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        y: { type: "spring", damping: mode === "char" ? 22 : 18, stiffness: mode === "char" ? 200 : 150 },
        rotateX: { type: "spring", damping: mode === "char" ? 22 : 18, stiffness: mode === "char" ? 200 : 150 },
        opacity: { duration: 0.4, ease: "easeOut" },
        filter: { duration: 0.4, ease: "easeOut" },
      },
    },
    hidden: {
      opacity: 0,
      y: mode === "char" ? 60 : 40,
      rotateX: mode === "char" ? -45 : 4,
      filter: mode === "char" ? "blur(8px)" : "blur(12px)",
    },
  };

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: mode === "char" ? "600px" : undefined }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {units.map((unit, index) => {
        const isSpace = unit === " ";
        return (
          <span
            key={index}
            className={`overflow-hidden inline-flex ${
              mode === "word" ? "mr-[0.25em]" : isSpace ? "mr-[0.25em]" : ""
            }`}
            style={mode === "char" ? { perspective: "400px" } : undefined}
          >
            <motion.span
              variants={child}
              className={`inline-block`}
              style={
                mode === "char"
                  ? { transformOrigin: "bottom center", display: "inline-block" }
                  : undefined
              }
            >
              {isSpace ? "\u00A0" : unit}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
