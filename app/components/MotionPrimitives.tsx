"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) {
          return;
        }
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) {
          return;
        }
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
