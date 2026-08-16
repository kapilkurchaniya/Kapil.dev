"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Project = {
  name: string;
  type: string;
  summary: string;
  stack: string[];
  href?: string;
  github?: string;
  preview: string;
  accent: string;
  metric: string;
  fullDescription?: string;
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl"
        >
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between border-b border-white/10 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">{project.type}</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{project.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex shrink-0 items-center gap-2">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10 hover:text-white"
                        title="View Source"
                    >
                        <Github size={18} />
                    </a>
                )}
                {project.href && (
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-cyan-400 transition hover:bg-white/10"
                        title="Visit Live Site"
                    >
                        <ArrowUpRight size={18} />
                    </a>
                )}
                <button
                    onClick={onClose}
                    className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    title="Close"
                >
                    <X size={20} />
                </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar" data-lenis-prevent="true">
            <div className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-img:rounded-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.fullDescription || project.summary}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
