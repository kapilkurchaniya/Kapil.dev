"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Rocket,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  X,
  Zap
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = ["Projects", "Live", "Stack", "Experience", "Stats", "Contact"];

const projects = [
  {
    name: "KRISHI MITRA",
    type: "AI Agriculture Platform",
    summary:
      "Soil health and pH detection platform with responsive dashboards, AI-centered user flows, and cinematic product storytelling.",
    stack: ["TypeScript", "React", "Node", "Express", "Tailwind"],
    href: "https://krishi-mitra-ai-powered-app.vercel.app/",
    preview: "/previews/krishi-mitra.png",
    accent: "from-emerald-300 via-cyan-300 to-violet-300",
    metric: "AI-first agritech"
  },
  {
    name: "KARISHMA'S KITCHEN",
    type: "Restaurant Product UI",
    summary:
      "Interactive restaurant application with dynamic menus, accessible UI states, and a polished showcase for food discovery.",
    stack: ["TypeScript", "React", "HTML5", "CSS3"],
    href: "https://karishma-kitchen-app.vercel.app/",
    preview: "/previews/karishma-kitchen.png",
    accent: "from-rose-300 via-orange-200 to-cyan-200",
    metric: "Responsive commerce"
  },
  {
    name: "TAGORE VIDYA NIKETAN",
    type: "Education Interface",
    summary:
      "Fast-loading school portal with structured navigation, clean information hierarchy, and mobile-ready student journeys.",
    stack: ["TypeScript", "React", "Tailwind"],
    href: "https://tagore-vidya-niketan.vercel.app/",
    preview: "/previews/tagore-vidya-niketan.png",
    accent: "from-sky-300 via-indigo-300 to-fuchsia-300",
    metric: "Learning portal"
  },
  {
    name: "REDLIFELINE HUB FOUNDATION",
    type: "NGO Web Platform",
    summary:
      "Digital foundation platform with activity sections, clear content architecture, and community-focused frontend delivery.",
    stack: ["TypeScript", "React", "JavaScript"],
    href: "https://redlifeline.vercel.app/",
    preview: "/previews/redlifeline.png",
    accent: "from-red-300 via-pink-300 to-teal-200",
    metric: "Impact platform"
  }
];

const skills = [
  { icon: Code2, label: "Frontend Systems", items: ["React.js", "TypeScript", "Tailwind CSS", "Component Architecture"] },
  { icon: Server, label: "Backend APIs", items: ["Node.js", "Express.js", "REST APIs", "Socket.IO"] },
  { icon: Database, label: "Data Layer", items: ["MongoDB", "CRUD Workflows", "Firebase", "Postman"] },
  { icon: BrainCircuit, label: "AI + CS Core", items: ["AI Apps", "DSA", "OOP", "Complexity Analysis"] }
];

const timeline = [
  {
    title: "MERN Stack Intern",
    org: "Cybrom Technology Pvt Ltd",
    detail:
      "Built responsive React interfaces, reusable UI components, Node/Express integrations, MongoDB CRUD flows, and GitHub-based delivery habits.",
    icon: BriefcaseBusiness
  },
  {
    title: "B.Tech Information Technology",
    org: "Oriental Institute of Science and Technology",
    detail:
      "Affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya. Expected graduation in 2028.",
    icon: GraduationCap
  },
  {
    title: "Campus Technical Leadership",
    org: "TechHack 2.0, Techfizz x Pharmazephyr, Skit Competition",
    detail:
      "Coordinated event logistics, digital poster generation, technical operations, and marketing.",
    icon: Trophy
  }
];

const stats = [
  ["04", "Featured products"],
  ["15+", "Core technologies"],
  ["2028", "B.Tech graduation"],
  ["100%", "Builder mindset"]
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-cyan-300" style={{ scaleX }} />;
}

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>
    </div>
  );
}

function GlowButton({
  href,
  children,
  variant = "primary",
  onClick
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer"}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200"
          : "border border-white/15 bg-white/5 text-white hover:border-cyan-200/60 hover:bg-white/10"
      }`}
    >
      {children}
    </a>
  );
}

function ProjectLinkPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      className="glass group block overflow-hidden rounded-lg transition hover:-translate-y-1 hover:border-cyan-200/40"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">{project.name}</p>
          <p className="text-xs text-slate-400">{project.type}</p>
        </div>
        <span className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition group-hover:border-cyan-200/50 group-hover:text-white">
          Live link <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-950/70">
        <Image
          src={project.preview}
          alt={`${project.name} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">Preview capture</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
          </div>
          <span className="rounded-md bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950 shadow-glow">
            Open project
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function AIAssistant() {
  const prompts = useMemo(
    () => [
      "Which project proves AI product thinking?",
      "Summarize Kapil for a startup role.",
      "Show backend and frontend strengths."
    ],
    []
  );
  const [active, setActive] = useState(0);

  const replies = [
    "KRISHI MITRA is the strongest AI-product signal: it combines agriculture context, soil/pH detection, responsive workflows, and marketing execution.",
    "Kapil is an AI-focused full stack builder who ships React + Node products with a product story, UI discipline, and DSA fundamentals.",
    "Frontend: TypeScript, React, Tailwind, reusable components. Backend: Node, Express, REST APIs, MongoDB, Socket.IO."
  ];

  return (
    <div className="glass rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-md bg-cyan-300/15 text-cyan-200">
            <Bot size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Kapil AI Brief</p>
            <p className="text-xs text-slate-400">Portfolio assistant</p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-300/15 px-2 py-1 text-xs font-semibold text-emerald-200">online</span>
      </div>
      <div className="space-y-2">
        {prompts.map((prompt, index) => (
          <button
            key={prompt}
            onClick={() => setActive(index)}
            className={`w-full rounded-md border px-3 py-2 text-left text-xs transition ${
              active === index
                ? "border-cyan-200/60 bg-cyan-200/10 text-cyan-50"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm leading-6 text-slate-200"
      >
        {replies[active]}
      </motion.div>
    </div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="glass relative overflow-hidden rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://github.com/kapilkurchaniya.png"
              alt="Kapil Kurchaniya"
              width={54}
              height={54}
              className="rounded-md border border-white/15"
              priority
            />
            <div>
              <p className="font-semibold text-white">Kapil Kurchaniya</p>
              <p className="text-xs text-slate-400">AI Engineer + Full Stack Product Builder</p>
            </div>
          </div>
          <Terminal className="text-cyan-200" size={22} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_0.85fr]">
          <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Product Signal</p>
              <Sparkles className="text-violet-200" size={18} />
            </div>
            <div className="space-y-4">
              {["AI App Thinking", "MERN Delivery", "Product Marketing"].map((label, index) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-cyan-200">{92 - index * 7}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${92 - index * 7}%` }}
                      transition={{ duration: 1, delay: 0.35 + index * 0.12 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AIAssistant />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [booting, setBooting] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    lenisRef.current?.scrollTo(href, { offset: -88 });
    window.history.pushState(null, "", href);
    setMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[80] grid place-items-center bg-[var(--loader-bg)] backdrop-blur-2xl"
          >
            <div className="text-center">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 shadow-glow">
                <Loader2 className="animate-spin text-cyan-200" size={30} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-100">Initializing portfolio</p>
              <p className="mt-3 text-sm text-slate-300">Smooth scroll, live embeds, and theme engine are ready.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
      <div className="grid-mask pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
      <header className="fixed left-0 right-0 top-4 z-40 px-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-lg px-3 py-3">
          <a href="#top" onClick={(event) => scrollToSection(event, "#top")} className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="grid size-8 place-items-center rounded-md bg-cyan-300 text-slate-950">K</span>
            Kapil.dev
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => scrollToSection(event, `#${item.toLowerCase()}`)}
                className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
              className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a href="https://github.com/kapilkurchaniya" target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-md border border-white/10 text-slate-300 hover:text-white" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href="https://www.linkedin.com/in/kapil-kurchaniya-961589353" target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-md border border-white/10 text-slate-300 hover:text-white" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
              className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="grid size-9 place-items-center rounded-md border border-white/10 text-white" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-lg p-2 md:hidden">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => scrollToSection(event, `#${item.toLowerCase()}`)}
                className="rounded-md px-3 py-3 text-sm text-slate-200"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            <Zap size={14} />
            Bhopal-based builder
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            AI Engineer + Full Stack Product Builder
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I build MERN products with sharp interfaces, practical APIs, and startup-style product storytelling across agriculture, education, restaurant, and NGO platforms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
              Explore work <ArrowUpRight size={17} />
            </GlowButton>
            <GlowButton href="mailto:kapilkurchaniya98@gmail.com" variant="secondary">
              Contact <Mail size={17} />
            </GlowButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
              <MapPin size={16} className="text-cyan-200" /> Bhopal, India
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
              <Rocket size={16} className="text-violet-200" /> MERN + AI apps
            </span>
          </div>
        </motion.div>
        <HeroVisual />
      </section>

      <section id="projects" className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Featured projects"
            title="Built like product case studies, not assignment cards."
            copy="Each project is framed around the user problem, system choices, and proof that Kapil can ship usable software with a clear story."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-200/35"
              >
                <div className={`mb-5 h-32 rounded-lg bg-gradient-to-br ${project.accent} p-px`}>
                  <div className="flex h-full flex-col justify-between rounded-lg bg-slate-950/85 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{project.type}</p>
                      <ArrowUpRight className="text-cyan-200 transition group-hover:translate-x-1 group-hover:-translate-y-1" size={19} />
                    </div>
                    <p className="text-xl font-semibold text-white">{project.metric}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-slate-300">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="live" className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Live links"
            title="Fast project previews without heavy embeds."
            copy="Each card uses a captured preview image and opens the real project in a new tab, keeping the portfolio smooth while still showing the live work."
          /> 
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectLinkPreview key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Tech stack"
            title="A practical stack for fast product iteration."
            copy="The portfolio emphasizes the tools Kapil already uses to move from interface to API to shipped deployment."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ icon: Icon, label, items }) => (
              <div key={label} className="glass rounded-lg p-5">
                <span className="mb-5 grid size-11 place-items-center rounded-md bg-white/10 text-cyan-200">
                  <Icon size={21} />
                </span>
                <h3 className="text-lg font-semibold text-white">{label}</h3>
                <div className="mt-4 space-y-2">
                  {items.map((item) => (
                    <p key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Experience"
            title="Internship, education, and leadership in one timeline."
            copy="This keeps the student background, professional practice, and campus leadership connected to a product-engineering narrative."
          />
          <div className="space-y-4">
            {timeline.map(({ title, org, detail, icon: Icon }) => (
              <div key={title} className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[auto_1fr]">
                <span className="grid size-12 place-items-center rounded-md bg-cyan-300/15 text-cyan-200">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm font-medium text-violet-200">{org}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">GitHub + LeetCode</p>
            <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Signals for consistency, curiosity, and problem solving.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The portfolio links directly to GitHub and frames LeetCode as a strength in time complexity, space optimization, and advanced data structures.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlowButton href="https://github.com/kapilkurchaniya" variant="secondary">
                GitHub <Github size={17} />
              </GlowButton>
              <GlowButton href="https://www.linkedin.com/in/kapil-kurchaniya-961589353" variant="secondary">
                LinkedIn <Linkedin size={17} />
              </GlowButton>
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Stacks + queues", "Core DSA"],
                ["BST + OOP", "Problem models"],
                ["Time complexity", "Optimization"],
                ["Space complexity", "Competitive programming"]
              ].map(([title, label]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-lg font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-24 pt-16">
        <div className="glass mx-auto max-w-5xl rounded-lg p-6 text-center sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Contact</p>
          <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Let’s build the next AI-powered product.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Available for internships, startup-style product work, MERN development, AI-integrated web apps, and technical multimedia production.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GlowButton href="mailto:kapilkurchaniya98@gmail.com">
              Email Kapil <Mail size={17} />
            </GlowButton>
            <GlowButton href="https://github.com/kapilkurchaniya" variant="secondary">
              View GitHub <Github size={17} />
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
