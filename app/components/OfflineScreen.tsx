"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   OfflineScreen — Premium "No Internet" overlay
   Matches the portfolio's dark-ink/cyan-300/violet design system.
   Detects navigator.onLine events; auto-dismisses on reconnect.
   ═══════════════════════════════════════════════════════════════ */

export function OfflineScreen() {
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Network listeners ── */
  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setShowScreen(true);
    };
    const goOnline = () => {
      setIsOffline(false);
      // Keep showing screen briefly for the "reconnected" animation
      setTimeout(() => setShowScreen(false), 1600);
    };

    // Initial check
    if (!navigator.onLine) {
      goOffline();
    }

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, []);

  /* ── Manual retry ── */
  const handleRetry = useCallback(() => {
    setIsRetrying(true);

    // Attempt a lightweight fetch to check connectivity
    fetch("/favicon.svg", { method: "HEAD", cache: "no-store" })
      .then(() => {
        // We're back online
        setIsOffline(false);
        setIsRetrying(false);
        setTimeout(() => setShowScreen(false), 1600);
      })
      .catch(() => {
        setIsRetrying(false);
      });

    retryTimerRef.current = setTimeout(() => setIsRetrying(false), 4000);
  }, []);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          key="offline-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="offline-overlay"
          aria-live="assertive"
          role="alert"
        >
          {/* ── Animated background gradients ── */}
          <div className="offline-bg-orb offline-bg-orb--cyan" />
          <div className="offline-bg-orb offline-bg-orb--violet" />
          <div className="offline-bg-orb offline-bg-orb--rose" />

          {/* ── Floating particles ── */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="offline-particle"
              style={{
                left: `${8 + Math.random() * 84}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            />
          ))}

          {/* ── Grid overlay ── */}
          <div className="offline-grid-overlay" />

          {/* ── Content ── */}
          <motion.div
            className="offline-content"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Animated WiFi Icon ── */}
            <div className="offline-icon-wrapper">
              <svg
                className="offline-wifi-icon"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer arc */}
                <motion.path
                  d="M15 40C25.5 28 37.5 22 50 22C62.5 22 74.5 28 85 40"
                  stroke="rgba(103, 232, 249, 0.3)"
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
                  stroke="rgba(103, 232, 249, 0.5)"
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
                  stroke="rgba(103, 232, 249, 0.7)"
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
                  r="4"
                  fill="rgb(103, 232, 249)"
                  initial={{ scale: 0 }}
                  animate={
                    isOffline
                      ? { scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{
                    duration: isOffline ? 2 : 0.5,
                    repeat: isOffline ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
                {/* Slash line when offline */}
                {isOffline && (
                  <motion.line
                    x1="25"
                    y1="25"
                    x2="75"
                    y2="80"
                    stroke="rgba(244, 63, 94, 0.7)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />
                )}
              </svg>

              {/* Pulse ring behind icon */}
              <div className="offline-pulse-ring" />
              <div className="offline-pulse-ring offline-pulse-ring--delay" />
            </div>

            {/* ── Status indicator ── */}
            <motion.div
              className="offline-status-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {isOffline
                ? "It seems your internet connection dropped. Check your Wi-Fi or network cable and try again."
                : "Your connection has been restored. Welcome back!"}
            </motion.p>

            {/* ── Retry button (only when offline) ── */}
            {isOffline && (
              <motion.button
                className="offline-retry-btn"
                onClick={handleRetry}
                disabled={isRetrying}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  className={`offline-retry-icon ${isRetrying ? "offline-retry-spin" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
                {isRetrying ? "Checking…" : "Try Again"}
              </motion.button>
            )}

            {/* ── Diagnostic hints ── */}
            {isOffline && (
              <motion.div
                className="offline-hints"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                <div className="offline-hint-item">
                  <span className="offline-hint-icon">📡</span>
                  <span>Check your Wi-Fi or mobile data</span>
                </div>
                <div className="offline-hint-item">
                  <span className="offline-hint-icon">🔌</span>
                  <span>Verify your router is connected</span>
                </div>
                <div className="offline-hint-item">
                  <span className="offline-hint-icon">🔄</span>
                  <span>Try restarting your connection</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── Bottom branding ── */}
          <motion.div
            className="offline-branding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="offline-branding-name">kapiln.in</span>
            <span className="offline-branding-sep">·</span>
            <span className="offline-branding-status">
              {isOffline ? "waiting for network…" : "connected ✓"}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
