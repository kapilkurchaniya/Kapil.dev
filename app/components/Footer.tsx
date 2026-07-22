"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Heart, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/kapilkurchaniya", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kapil-kurchaniya-961589353", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kapilkurchaniya98@gmail.com", label: "Email" },
];

export function Footer({ onScrollToTop }: { onScrollToTop?: () => void }) {
  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      {/* Gradient separator line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        {/* Left — branding */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left"
        >
          <p className="text-sm text-slate-300">
            Designed & Built by{" "}
            <span className="font-semibold text-white">Kapil Kurchaniya</span>
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
            Made with <Heart size={12} className="text-rose-400" fill="currentColor" /> &
            caffeine · © {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* Center — social icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={label}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-200/30 hover:text-white"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* Right — back to top */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={onScrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-200/30 hover:text-white"
          >
            Back to top
            <ArrowUp size={14} className="transition group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
