"use client";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef } from "react";

/* 
  Authentic Apple Mac 'Hello' effect.
  Path is designed to be drawn using stroke-dashoffset.
*/
const HELLO_PATH = "M 151.54 259.66 C 219.34,206.68 190.47,237.58 219.34,206.68 C 241.57,182.89 253.21,150.90 244.29,137.12 C 211.83,87.01 192.50,269.63 197.21,269.66 C 201.92,269.68 201.65,216.50 225.54,204.44 C 249.42,192.38 257.84,208.44 258.94,215.94 C 260.71,228.04 253.50,247.22 254.71,254.20 C 259.78,283.42 342.30,254.73 348.79,221.59 C 355.77,185.97 294.64,187.67 306.72,244.59 C 311.16,265.51 338.77,270.90 353.44,267.77 C 406.50,256.46 442.90,198.68 441.60,154.30 C 439.90,96.81 382.85,154.92 396.57,243.46 C 401.86,277.57 446.73,266.48 459.99,257.40 C 484.51,240.63 527.73,192.24 519.82,145.26 C 511.58,96.25 449.45,177.00 477.96,250.43 C 487.47,274.93 516.02,266.64 523.84,262.87 C 542.42,253.92 548.40,221.44 563.79,207.27 C 583.25,189.36 613.90,202.74 615.17,224.04 C 617.97,270.97 577.27,271.00 562.10,260.42 C 549.02,251.29 545.95,224.09 563.58,207.27 C 575.63,195.77 594.90,195.48 620.24,208.40 C 630.60,213.68 639.48,212.73 646.46,204.25";

export function CinematicIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompleted = useRef(false);

  const done = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    if (typeof window !== "undefined" && sessionStorage.getItem("seen_intro")) {
      done();
      return;
    }

    try {
      sessionStorage.setItem("seen_intro", "true");
    } catch {
      // Ignore fallback
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }

    const ctx = gsap.context(() => {
      const dot = ".ci-dot";
      const helloPath = root.querySelector(".ci-hello-path") as SVGPathElement;
      
      gsap.set(dot, { scale: 0, opacity: 0 });

      // Initialize Hello SVG path to be perfectly hidden via stroke-dashoffset
      // We calculate exact length for perfect animation
      let helloLength = 2000;
      if (helloPath) {
        helloLength = helloPath.getTotalLength();
        gsap.set(helloPath, {
          strokeDasharray: helloLength,
          strokeDashoffset: helloLength,
          opacity: 1 // Ensure the group/path is visible for drawing
        });
      }

      const tl = gsap.timeline({
        onComplete: done,
        defaults: { overwrite: "auto" },
      });

      // 1. Dot appears
      tl.to(dot, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      tl.to(dot, { opacity: 0, scale: 4, duration: 0.3, ease: "power3.out" }, "+=0.1");

      // 2. Draw "hello"
      if (helloPath) {
        tl.fromTo(
          helloPath,
          { strokeDashoffset: helloLength },
          {
            strokeDashoffset: 0,
            duration: 2.2, // Elegant Apple speed
            ease: "power2.inOut",
          }
        );
      }

      // 3. Fade out Hello
      tl.to(".ci-hello-group", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.8");

      // 4. Draw "Namaste" outline
      tl.set(".ci-namaste-group", { opacity: 1 });
      tl.fromTo(".ci-namaste-text",
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }
      );
      
      // 5. Fill in "Namaste" smoothly
      tl.to(".ci-namaste-text", { fill: "url(#apple-gradient)", duration: 0.8, ease: "power2.out" }, "-=0.5");

      // 6. Hold for a moment
      tl.to({}, { duration: 1.0 });

      // 7. Screen splits open (Mac style)
      tl.addLabel("split");
      tl.to(".ci-bg-top", { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "split");
      tl.to(".ci-bg-bottom", { yPercent: 100, duration: 1.2, ease: "power4.inOut" }, "split");
      tl.to([".ci-camera", ".ci-skip"], { opacity: 0, duration: 0.4, ease: "power2.in" }, "split");
      
      tl.set(root, { autoAlpha: 0 });
    }, root);

    return () => ctx.revert();
  }, [done]);

  return (
    <div ref={containerRef} className="ci-container" aria-hidden="true">
      {/* Pure black background, split into top and bottom for the reveal */}
      <div className="ci-bg-top" style={{ backgroundColor: "#000" }} />
      <div className="ci-bg-bottom" style={{ backgroundColor: "#000" }} />
      
      <div className="ci-dot" />

      <div className="ci-camera">
        <svg 
          className="ci-svg-container"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', maxWidth: '800px' }}
        >
          {/* Apply a subtle warm gradient to the stroke, like Apple */}
          <defs>
            <linearGradient id="apple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f5f5f7" />
              <stop offset="100%" stopColor="#e5e5ea" />
            </linearGradient>
          </defs>

          {/* Hello Group */}
          <g className="ci-hello-group">
            <path
              className="ci-hello-path"
              d={HELLO_PATH}
              fill="none"
              stroke="url(#apple-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0, -50)"
              /* Fix FOUC: Initially hide the path using a large dashoffset */
              style={{ strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 0 }}
            />
          </g>

          {/* Namaste Group */}
          <g className="ci-namaste-group" style={{ opacity: 0 }}>
            <text
              className="ci-namaste-text"
              x="400"
              y="220"
              textAnchor="middle"
              fill="transparent"
              stroke="url(#apple-gradient)"
              strokeWidth="1.5"
              fontSize="80"
              fontWeight="300"
              fontFamily='system-ui, -apple-system, "Noto Sans Devanagari", sans-serif'
              /* Fix FOUC for outline drawing */
              style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
            >
              नमस्ते
            </text>
          </g>
        </svg>
      </div>

      <button className="ci-skip" onClick={done} aria-label="Skip intro">
        Skip
      </button>
    </div>
  );
}
