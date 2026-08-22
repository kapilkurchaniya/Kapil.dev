"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, ExternalLink, Mail, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface EmailSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact?: () => void;
}

export function EmailSideModal({ isOpen, onClose, onNavigateToContact }: EmailSideModalProps) {
  const [copied, setCopied] = useState(false);
  const email = "kapilkurchaniya98@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
          >
            {/* Ambient Glow */}
            <div className="pointer-events-none absolute -right-20 top-20 size-72 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-20 size-72 rounded-full bg-violet-500/15 blur-3xl" />

            {/* Top Header */}
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200 border border-cyan-300/30 shadow-[0_0_15px_rgba(103,232,249,0.2)]">
                    <Mail size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">Direct Connect</h3>
                    <p className="text-xs text-slate-400">Response within 24 hours</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Status Badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Available for internships & freelance roles
              </div>

              {/* Profile Card */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950 font-bold text-lg shadow-glow">
                    K
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Kapil Kurchaniya</h4>
                    <p className="text-xs text-slate-300">Full Stack & AI Engineer • Bhopal, India</p>
                  </div>
                </div>
              </div>

              {/* Email Address Section */}
              <div className="mt-6 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Primary Email
                </label>
                <div className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-cyan-300/30 bg-cyan-950/20 p-3.5 transition hover:border-cyan-300/60 hover:bg-cyan-950/30">
                  <span className="font-mono text-sm font-medium text-white truncate pr-2 selection:bg-cyan-300 selection:text-slate-950">
                    {email}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      copied
                        ? "bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                        : "border border-cyan-300/40 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300 hover:text-slate-950"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={14} strokeWidth={3} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 grid gap-3">
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-200"
                >
                  <Send size={16} /> Open Mail Client <ArrowUpRight size={16} />
                </motion.a>

                {onNavigateToContact && (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose();
                      onNavigateToContact();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                  >
                    <MessageSquare size={16} /> Use Website Contact Form
                  </motion.button>
                )}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-8 border-t border-white/10 pt-5 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Sparkles size={14} className="text-cyan-300" />
                Let&apos;s build impactful software together.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
