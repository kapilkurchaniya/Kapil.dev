"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Radio, Cable, RotateCcw, RefreshCw, X, AlertCircle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   OfflineScreen — Premium "No Internet" overlay
   Desktop & Laptop Optimized:
   - Full responsive scaling across laptop heights (1366x768, 1440x900)
   - Cursor pointer support and z-index coordination
   - Keyboard navigation (Enter / Space / R to retry, Esc to close preview)
   - Real connectivity validation & auto-retry countdown
   - Instant preview via URL (?offline=true or #offline) & Ctrl+Alt+O
   - 3-column diagnostic telemetry cards for wide screens
   - Inline branding without absolute positioning overlaps
   ═══════════════════════════════════════════════════════════════ */

export function OfflineScreen() {
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [autoRetryCountdown, setAutoRetryCountdown] = useState<number>(8);

  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const retryBtnRef = useRef<HTMLButtonElement | null>(null);

  /* ── Verification function ── */
  const verifyConnectivity = useCallback(async (): Promise<boolean> => {
    // If browser navigator itself reports offline, definitely offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`/favicon.svg?t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return res.ok || res.status < 400;
    } catch {
      return false;
    }
  }, []);

  /* ── Network listeners & preview query/hash detection ── */
  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setShowScreen(true);
      setAutoRetryCountdown(8);
    };

    const goOnline = () => {
      setIsOffline(false);
      // Keep showing screen briefly for the "reconnected" green state
      setTimeout(() => {
        setShowScreen(false);
        setIsPreviewMode(false);
      }, 1400);
    };

    // Initial hardware check
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      goOffline();
    }

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    // URL preview detector (?offline=true or #offline)
    const checkPreviewTrigger = () => {
      if (typeof window === "undefined") return;
      const urlParams = new URLSearchParams(window.location.search);
      const isParamOffline =
        urlParams.get("offline") === "true" ||
        urlParams.get("offline") === "1" ||
        urlParams.get("test-offline") === "true";
      const isHashOffline = window.location.hash === "#offline";

      if (isParamOffline || isHashOffline) {
        setIsPreviewMode(true);
        setIsOffline(true);
        setShowScreen(true);
      }
    };

    checkPreviewTrigger();
    window.addEventListener("hashchange", checkPreviewTrigger);

    // Desktop Developer shortcut: Ctrl+Alt+O or Shift+Alt+O
    const handleDevShortcut = (e: KeyboardEvent) => {
      if (e.altKey && (e.ctrlKey || e.shiftKey) && (e.key === "o" || e.key === "O")) {
        e.preventDefault();
        setShowScreen((prev) => {
          const next = !prev;
          setIsOffline(next);
          setIsPreviewMode(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleDevShortcut);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
      window.removeEventListener("hashchange", checkPreviewTrigger);
      window.removeEventListener("keydown", handleDevShortcut);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  /* ── Manual retry handler ── */
  const handleRetry = useCallback(async () => {
    if (isRetrying) return;
    setIsRetrying(true);

    const isConnected = await verifyConnectivity();

    if (isConnected) {
      setIsOffline(false);
      setIsRetrying(false);
      setTimeout(() => {
        setShowScreen(false);
        setIsPreviewMode(false);
        if (window.location.hash === "#offline") {
          history.replaceState(null, "", window.location.pathname);
        }
      }, 1400);
    } else {
      setIsRetrying(false);
      setAutoRetryCountdown(8);
    }

    retryTimerRef.current = setTimeout(() => setIsRetrying(false), 4000);
  }, [isRetrying, verifyConnectivity]);

  /* ── Auto-retry countdown for desktop/laptop ── */
  useEffect(() => {
    if (!showScreen || !isOffline || isPreviewMode) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      return;
    }

    countdownIntervalRef.current = setInterval(() => {
      setAutoRetryCountdown((prev) => {
        if (prev <= 1) {
          handleRetry();
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [showScreen, isOffline, isPreviewMode, handleRetry]);

  /* ── Keyboard navigation on desktop & laptop ── */
  useEffect(() => {
    if (!showScreen) return;

    // Auto-focus retry button on appearance for instant keyboard access
    const focusTimer = setTimeout(() => {
      retryBtnRef.current?.focus();
    }, 300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "Enter" || e.key === " " || e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleRetry();
      }

      if (e.key === "Escape" && isPreviewMode) {
        e.preventDefault();
        setShowScreen(false);
        setIsOffline(false);
        setIsPreviewMode(false);
        if (window.location.hash === "#offline") {
          history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showScreen, isPreviewMode, handleRetry]);

  const closePreview = () => {
    setShowScreen(false);
    setIsOffline(false);
    setIsPreviewMode(false);
    if (window.location.hash === "#offline") {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          key="offline-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="offline-overlay"
          aria-live="assertive"
          role="alert"
        >
          {/* ── Background aura glows ── */}
          <div className="offline-bg-orb offline-bg-orb--cyan" />
          <div className="offline-bg-orb offline-bg-orb--violet" />
          <div className="offline-bg-orb offline-bg-orb--rose" />

          {/* ── Subtle grid overlay ── */}
          <div className="offline-grid-overlay" />

          {/* ── Optional Preview Badge (when tested manually) ── */}
          {isPreviewMode && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="offline-preview-banner"
            >
              <AlertCircle className="w-4 h-4 text-cyan-300" />
              <span>Offline Screen Preview Mode</span>
              <button
                onClick={closePreview}
                className="offline-preview-close"
                title="Close preview (Esc)"
                aria-label="Close preview"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">ESC</span>
              </button>
            </motion.div>
          )}

          {/* ── Main centered content container (auto vertical margins) ── */}
          <div className="offline-content-wrapper">
            <motion.div
              className="offline-content"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── Animated WiFi Icon ── */}
              <div className="offline-icon-wrapper">
                <svg
                  className="offline-wifi-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Outer arc */}
                  <motion.path
                    d="M15 40C25.5 28 37.5 22 50 22C62.5 22 74.5 28 85 40"
                    stroke="rgba(103, 232, 249, 0.35)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isOffline
                        ? { pathLength: [0, 1, 0.6], opacity: [0, 0.5, 0.2] }
                        : { pathLength: 1, opacity: 1 }
                    }
                    transition={{
                      duration: isOffline ? 3 : 0.6,
                      repeat: isOffline ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Middle arc */}
                  <motion.path
                    d="M27 52C34 43 42 38 50 38C58 38 66 43 73 52"
                    stroke="rgba(103, 232, 249, 0.6)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isOffline
                        ? { pathLength: [0, 0.8, 0.3], opacity: [0, 0.6, 0.15] }
                        : { pathLength: 1, opacity: 1 }
                    }
                    transition={{
                      duration: isOffline ? 2.5 : 0.6,
                      delay: 0.15,
                      repeat: isOffline ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Inner arc */}
                  <motion.path
                    d="M38 63C42 57 46 54 50 54C54 54 58 57 62 63"
                    stroke="rgba(103, 232, 249, 0.85)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isOffline
                        ? { pathLength: [0, 0.5, 0.1], opacity: [0, 0.7, 0.1] }
                        : { pathLength: 1, opacity: 1 }
                    }
                    transition={{
                      duration: isOffline ? 2 : 0.6,
                      delay: 0.3,
                      repeat: isOffline ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Center dot */}
                  <motion.circle
                    cx="50"
                    cy="74"
                    r="4.5"
                    fill="rgb(103, 232, 249)"
                    initial={{ scale: 0 }}
                    animate={
                      isOffline
                        ? { scale: [0.8, 1.25, 0.8], opacity: [0.4, 1, 0.4] }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{
                      duration: isOffline ? 2 : 0.5,
                      repeat: isOffline ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Red Slash line when offline */}
                  {isOffline && (
                    <motion.line
                      x1="24"
                      y1="24"
                      x2="76"
                      y2="80"
                      stroke="rgba(244, 63, 94, 0.85)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    />
                  )}
                </svg>

                {/* Pulse ring behind icon */}
                <div className="offline-pulse-ring" />
                <div className="offline-pulse-ring offline-pulse-ring--delay" />
              </div>

              {/* ── Status indicator badge ── */}
              <motion.div
                className="offline-status-badge"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <span
                  className={`offline-status-dot ${
                    isOffline ? "offline-status-dot--red" : "offline-status-dot--green"
                  }`}
                />
                <span className="offline-status-text">
                  {isOffline ? "Connection Lost" : "Back Online"}
                </span>
              </motion.div>

              {/* ── Title ── */}
              <motion.h1
                className="offline-title"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {isOffline ? (
                  <>
                    You&apos;re <span className="offline-title-accent">Offline</span>
                  </>
                ) : (
                  <>
                    <span className="offline-title-accent-green">Reconnected</span> ✦
                  </>
                )}
              </motion.h1>

              {/* ── Description ── */}
              <motion.p
                className="offline-description"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.45 }}
              >
                {isOffline
                  ? "Your internet connection dropped. We'll automatically reconnect once your Wi-Fi or Ethernet is restored."
                  : "Your network connection has been successfully restored. Resuming..."}
              </motion.p>

              {/* ── Action Section (Button & Keyboard hint) ── */}
              {isOffline && (
                <motion.div
                  className="offline-actions"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.45 }}
                >
                  <motion.button
                    ref={retryBtnRef}
                    className="offline-retry-btn group"
                    onClick={handleRetry}
                    disabled={isRetrying}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Try reconnecting to the internet"
                  >
                    <RefreshCw
                      className={`offline-retry-icon ${
                        isRetrying ? "offline-retry-spin" : "group-hover:rotate-180 transition-transform duration-500"
                      }`}
                    />
                    <span>{isRetrying ? "Checking Connection…" : "Try Again"}</span>
                  </motion.button>

                  {/* Desktop / Laptop Keyboard & Auto-retry Pill */}
                  <div className="offline-keyboard-hint">
                    <span className="offline-kbd">Enter</span>
                    <span>or</span>
                    <span className="offline-kbd">R</span>
                    <span className="hidden sm:inline">to retry</span>
                    <span className="offline-kbd-sep">·</span>
                    <span className="offline-auto-retry-text">
                      auto-check in {autoRetryCountdown}s
                    </span>
                  </div>
                </motion.div>
              )}

              {/* ── Diagnostic cards (Desktop 3-column / Mobile stack) ── */}
              {isOffline && (
                <motion.div
                  className="offline-hints"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="offline-hint-item">
                    <div className="offline-hint-icon-box">
                      <Radio className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="offline-hint-body">
                      <span className="offline-hint-title">Wi-Fi & Ethernet</span>
                      <span className="offline-hint-desc">Verify wireless or network cable</span>
                    </div>
                  </div>

                  <div className="offline-hint-item">
                    <div className="offline-hint-icon-box">
                      <Cable className="w-4 h-4 text-violet-300" />
                    </div>
                    <div className="offline-hint-body">
                      <span className="offline-hint-title">Router Gateway</span>
                      <span className="offline-hint-desc">Ensure modem or DNS is reachable</span>
                    </div>
                  </div>

                  <div className="offline-hint-item">
                    <div className="offline-hint-icon-box">
                      <RotateCcw className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="offline-hint-body">
                      <span className="offline-hint-title">Auto Reconnect</span>
                      <span className="offline-hint-desc">Detects connection automatically</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Branding Footer (Inline to prevent collision) ── */}
              <motion.div
                className="offline-branding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                <span className="offline-branding-name">kapiln.in</span>
                <span className="offline-branding-sep">·</span>
                <span className="offline-branding-status">
                  {isOffline ? "waiting for network…" : "connected ✓"}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
