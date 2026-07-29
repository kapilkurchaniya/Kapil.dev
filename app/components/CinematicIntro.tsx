"use client";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef } from "react";

/* ─── Language sequence ─── */
const titles = [
  { lang: "English", text: "Kapil Kurchaniya" },
  { lang: "हिन्दी", text: "कपिल कुर्चानिया" },
  { lang: "संस्कृत", text: "कपिल कुर्चानियः" },
  { lang: "తెలుగు", text: "కపిల్ కుర్చానియా" },
  { lang: "ಕನ್ನಡ", text: "ಕಪಿಲ್ ಕುರ್ಚಾನಿಯಾ" },
  { lang: "日本語", text: "カピル・クルチャニヤ" },
];

const FINALE_TEXT = "KAPIL KURCHANIYA";

/* Safe grapheme splitter for the finale character stagger */
function splitGraphemes(text: string): string[] {
  try {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return [...segmenter.segment(text)].map((s) => s.segment);
  } catch {
    return Array.from(text);
  }
}

/* ─────────────────────────────────────────────────────
   CinematicIntro
   Apple-keynote-style title reveal with GSAP timeline.
   ───────────────────────────────────────────────────── */
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

    /* Respect reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Selectors ── */
      const dot = ".ci-dot";
      const camera = ".ci-camera";
      const titleGroups = gsap.utils.toArray<HTMLElement>(".ci-title");
      const finaleGroup = ".ci-finale";
      const finaleChars = gsap.utils.toArray<HTMLElement>(".ci-fchar");
      const finaleGlow = ".ci-finale-glow";

      /* ── Initial state: everything hidden ── */
      gsap.set(titleGroups, { autoAlpha: 0 });
      gsap.set(finaleGroup, { autoAlpha: 0 });
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.set(finaleChars, { opacity: 0, y: 5, scale: 0.96 });
      gsap.set(finaleGlow, { opacity: 0, scale: 0.7 });

      /* ── Build the master timeline ── */
      const tl = gsap.timeline({
        onComplete: done,
        defaults: { overwrite: "auto" },
      });

      /* ═══ Phase 1: Dot breathes in (ultra-fast & crisp) ═══ */
      tl.to(dot, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      /* ═══ Phase 2: Dot expands into sequence ═══ */
      tl.to(
        dot,
        {
          opacity: 0,
          scale: 8,
          duration: 0.25,
          ease: "power3.out",
        },
        "+=0.05"
      );

      /* Camera push-in */
      tl.to(
        camera,
        {
          scale: 1.015,
          duration: 3.5,
          ease: "none",
        },
        "-=0.25"
      );

      /* ═══ Phase 3: Ultra-fast language sequence (zero delay) ═══ */
      titleGroups.forEach((group, i) => {
        const text = group.querySelector<HTMLElement>(".ci-text")!;
        const label = group.querySelector<HTMLElement>(".ci-label")!;
        const sweep = group.querySelector<HTMLElement>(".ci-sweep")!;

        if (i === 0) {
          const tLabel = `title0`;
          tl.addLabel(tLabel, "-=0.15");
          tl.set(group, { autoAlpha: 1 }, tLabel);

          tl.fromTo(
            text,
            { opacity: 0, y: 6, filter: "blur(4px)", scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0.01px)",
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            tLabel
          );

          tl.fromTo(
            label,
            { opacity: 0, y: 3 },
            { opacity: 0.5, y: 0, duration: 0.18, ease: "power2.out" },
            tLabel
          );

          tl.fromTo(
            sweep,
            { xPercent: -120 },
            { xPercent: 120, duration: 0.45, ease: "power1.inOut" },
            tLabel
          );

          /* Hold for 0.2s */
          tl.to({}, { duration: 0.2 });
        } else {
          const prev = titleGroups[i - 1];
          const prevText = prev.querySelector<HTMLElement>(".ci-text")!;
          const prevLabel = prev.querySelector<HTMLElement>(".ci-label")!;

          const stepLabel = `step${i}`;
          tl.addLabel(stepLabel);

          /* 1. Outgoing language disappears fast */
          tl.to(
            [prevText, prevLabel],
            {
              opacity: 0,
              y: -6,
              filter: "blur(3px)",
              duration: 0.12,
              ease: "power2.in",
            },
            stepLabel
          );

          tl.set(prev, { autoAlpha: 0 });

          /* 2. Incoming language rises instantly with zero delay */
          tl.set(group, { autoAlpha: 1 });

          tl.fromTo(
            text,
            { opacity: 0, y: 6, filter: "blur(4px)", scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0.01px)",
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            }
          );

          tl.fromTo(
            label,
            { opacity: 0, y: 3 },
            { opacity: 0.5, y: 0, duration: 0.15, ease: "power2.out" },
            "-=0.18"
          );

          tl.fromTo(
            sweep,
            { xPercent: -120 },
            { xPercent: 120, duration: 0.4, ease: "power1.inOut" },
            "-=0.15"
          );

          /* Hold for 0.2s */
          tl.to({}, { duration: 0.2 });
        }
      });

      /* ═══ Outgoing last language ═══ */
      const last = titleGroups[titleGroups.length - 1];
      const lastText = last.querySelector<HTMLElement>(".ci-text")!;
      const lastLabel = last.querySelector<HTMLElement>(".ci-label")!;

      tl.to([lastText, lastLabel], {
        opacity: 0,
        y: -6,
        filter: "blur(3px)",
        duration: 0.12,
        ease: "power2.in",
      });
      tl.set(last, { autoAlpha: 0 });

      /* ═══ Phase 4: Quick Convergence Dot ═══ */
      tl.fromTo(
        dot,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 0.8, duration: 0.18, ease: "power2.out" }
      );

      tl.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.15,
        ease: "power2.in",
      });

      /* ═══ Phase 5: Finale — "KAPIL KURCHANIYA" ═══ */
      tl.addLabel("finale");
      tl.set(finaleGroup, { autoAlpha: 1 }, "finale");

      tl.to(
        finaleGlow,
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "finale"
      );

      tl.to(
        finaleChars,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: { each: 0.015, ease: "power1.out" },
          ease: "power3.out",
        },
        "finale"
      );

      const fSweep = root.querySelector<HTMLElement>(".ci-finale .ci-sweep");
      if (fSweep) {
        tl.fromTo(
          fSweep,
          { xPercent: -120 },
          { xPercent: 120, duration: 0.8, ease: "power1.inOut" },
          "finale"
        );
      }

      /* Hold finale for 0.35s */
      tl.addLabel("finaleHold", "+=0.35");

      /* ═══ Phase 6: Fast Exit to Portfolio ═══ */
      tl.to(
        root,
        { opacity: 0, duration: 0.4, ease: "power2.inOut" },
        "finaleHold"
      );
    }, root);

    return () => ctx.revert();
  }, [done]);

  const finaleGraphemes = splitGraphemes(FINALE_TEXT);

  return (
    <div ref={containerRef} className="ci-container">
      {/* ── Cyan dot ── */}
      <div className="ci-dot" />

      {/* ── Camera wrapper (subtle push-in) ── */}
      <div className="ci-camera">
        {/* ── Stacked language titles ── */}
        {titles.map((title, i) => (
          <div key={i} className="ci-title">
            <p className="ci-label">{title.lang}</p>
            <div className="ci-text-wrap">
              <h1 className="ci-text">{title.text}</h1>
              <div className="ci-sweep" aria-hidden="true" />
            </div>
          </div>
        ))}

        {/* ── Finale ── */}
        <div className="ci-finale">
          <h1 className="ci-finale-text">
            {finaleGraphemes.map((char, i) => (
              <span key={i} className="ci-fchar">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <div className="ci-finale-glow" aria-hidden="true" />
          <div className="ci-sweep" aria-hidden="true" />
        </div>
      </div>

      {/* ── Skip ── */}
      <button className="ci-skip" onClick={done} aria-label="Skip intro">
        Skip
      </button>
    </div>
  );
}
