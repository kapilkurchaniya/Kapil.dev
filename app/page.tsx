"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Rocket,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  X,
  Zap
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import { Magnetic, Reveal, TiltCard } from "./components/MotionPrimitives";
import { SmoothScrollProvider, useSmoothScroll } from "./components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

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
  ["React.js", "94", Code2],
  ["TypeScript", "90", Terminal],
  ["Node.js", "86", Server],
  ["Express.js", "84", Server],
  ["MongoDB", "82", Database],
  ["Tailwind CSS", "95", Sparkles],
  ["GSAP", "88", Zap],
  ["Three.js", "82", BrainCircuit],
  ["Framer Motion", "92", Rocket],
  ["Firebase", "80", Database],
  ["GitHub", "90", Github]
] as const;

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
  ["11", "Core technologies"],
  ["2028", "B.Tech graduation"],
  ["100%", "Builder mindset"]
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-cyan-300 shadow-glow" style={{ scaleX }} />;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>
    </Reveal>
  );
}

function GlowButton({
  href,
  children,
  variant = "primary",
  onClick,
  download
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  download?: boolean;
}) {
  return (
    <Magnetic className="inline-flex">
      <a
        href={href}
        onClick={onClick}
        target={href.startsWith("#") || href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("#") || href.startsWith("mailto:") ? undefined : "noreferrer"}
        download={download}
        className={`group relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-md px-5 text-sm font-semibold transition ${
          variant === "primary"
            ? "bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200"
            : "border border-white/15 bg-white/5 text-white hover:border-cyan-200/60 hover:bg-white/10"
        }`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-700 group-hover:translate-x-full" />
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </a>
    </Magnetic>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <TiltCard className="project-card group h-full min-h-[520px] w-[82vw] max-w-[430px] shrink-0 rounded-lg md:w-[430px]">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="glass relative flex h-full flex-col overflow-hidden rounded-lg p-4 transition hover:border-cyan-200/45"
        >
          <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div className={`h-full w-full bg-gradient-to-br ${project.accent} opacity-10`} />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
            <Image
              src={project.preview}
              alt={`${project.name} project preview`}
              fill
              sizes="(max-width: 768px) 82vw, 430px"
              className="object-cover object-top transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-md border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              {project.metric}
            </span>
          </div>
          <div className="relative flex flex-1 flex-col p-2 pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">{project.type}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-cyan-200 transition group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{project.summary}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {project.stack.map((item) => (
                <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </a>
      </TiltCard>
    </Reveal>
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
    "KRISHI MITRA is the strongest AI-product signal: agriculture context, soil/pH detection, responsive workflows, and a clear product story.",
    "Kapil is an AI-focused full stack builder who ships React + Node products with interface discipline and practical product instincts.",
    "Frontend: TypeScript, React, Tailwind, Framer Motion, GSAP. Backend: Node, Express, REST APIs, MongoDB, Firebase."
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

function HeroShowcase() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProject((value) => (value + 1) % projects.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-showcase relative min-h-[560px]">
      <div className="absolute -inset-6 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute right-3 top-5 h-40 w-40 rounded-full border border-cyan-200/20 bg-cyan-200/5 blur-sm" />
      <div className="absolute bottom-24 left-0 h-36 w-36 rounded-full border border-violet-200/20 bg-violet-300/5 blur-sm" />

      <div className="glass relative overflow-hidden rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://github.com/kapilkurchaniya.png"
              alt="Kapil Kurchaniya"
              width={52}
              height={52}
              className="rounded-md border border-white/15"
              priority
            />
            <div>
              <p className="font-semibold text-white">Kapil Kurchaniya</p>
              <p className="text-xs text-slate-400">AI + Full Stack Product Builder</p>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-md border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
            <Sparkles size={18} />
          </span>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-white/10 bg-slate-950/65">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 1.04, x: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, x: -28, filter: "blur(8px)" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.preview}
                alt={`${project.name} cinematic preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-top"
                priority={activeProject === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <span className="rounded-md border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              Live product signal
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-200">
              0{activeProject + 1} / 04
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.name}-copy`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">{project.type}</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.06 }}
              className="rounded-md border border-white/10 bg-white/[0.04] p-3"
            >
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.92fr]">
        <div className="glass rounded-lg p-4">
          <p className="text-sm font-semibold text-white">Project transitions</p>
          <div className="mt-4 flex gap-2">
            {projects.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveProject(index)}
                className={`h-2 flex-1 rounded-full transition ${
                  index === activeProject ? "bg-cyan-300 shadow-glow" : "bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Show ${item.name}`}
              />
            ))}
          </div>
        </div>
        <AIAssistant />
      </div>
    </div>
  );
}

function HomeContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [booting, setBooting] = useState(true);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactMessage, setContactMessage] = useState("");
  const scroll = useSmoothScroll();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-showcase",
        { scale: 0.86, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.95, ease: "power3.out", delay: 0.16 }
      );

      gsap.to(".ambient-grid", {
        yPercent: 18,
        opacity: 0.24,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const track = horizontalRef.current?.querySelector(".project-track");
        if (!horizontalRef.current || !track) {
          return undefined;
        }

        const distance = Math.max(0, track.scrollWidth - horizontalRef.current.offsetWidth + 64);
        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${distance + 380}`,
            invalidateOnRefresh: true
          }
        });

        return () => tween.kill();
      });
    });

    return () => context.revert();
  }, []);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    scroll?.scrollTo(href);
    window.history.pushState(null, "", href);
    setMenuOpen(false);
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setContactStatus("sending");
    setContactMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not send message.");
      }

      form.reset();
      setContactStatus("sent");
      setContactMessage("Message sent. I will reply soon.");
    } catch (error) {
      setContactStatus("error");
      setContactMessage(error instanceof Error ? error.message : "Could not send message.");
    }
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
              <p className="mt-3 text-sm text-slate-300">Smooth scroll and cinematic transitions are ready.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <div className="ambient-grid grid-mask pointer-events-none fixed inset-x-0 top-0 h-[760px]" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-0 opacity-[0.055]" />

      <header className="fixed left-0 right-0 top-4 z-40 px-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-lg px-3 py-3">
          <a href="#top" onClick={(event) => scrollToSection(event, "#top")} className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="grid size-8 place-items-center rounded-md bg-cyan-300 text-slate-950 shadow-glow">K</span>
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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-lg p-2 md:hidden"
          >
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
          </motion.div>
        )}
      </header>

      <section
        ref={heroRef}
        id="top"
        className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100"
          >
            <Zap size={14} />
            Bhopal-based builder
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
            >
              Kapil Kurchaniya
            </motion.h1>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
            }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {["Full Stack Developer", "Creative Frontend Engineer", "AI Builder"].map((label) => (
              <motion.span
                key={label}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-200"
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Building immersive digital experiences with AI, 3D, and modern frontend engineering.
          </motion.p>
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
        </div>

        <HeroShowcase />

        <a
          href="#projects"
          onClick={(event) => scrollToSection(event, "#projects")}
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 md:flex"
        >
          Scroll <ArrowDown className="animate-bounce" size={16} />
        </a>
      </section>

      <section ref={horizontalRef} id="projects" className="relative z-10 px-4 py-20 md:min-h-screen">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Featured projects"
            title="Cinematic product cards built for depth and motion."
            copy="Each project is framed around user value, visual proof, and the stack decisions behind the shipped experience."
          />
        </div>
        <div className="project-track mx-auto flex max-w-6xl gap-5 overflow-x-auto pb-6 md:w-max md:overflow-visible">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="live" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Live links"
            title="Preview the work without slowing the show."
            copy="Captured previews keep scrolling smooth while every card still opens the real deployed project."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06}>
                <a href={project.href} target="_blank" rel="noreferrer" className="glass group block overflow-hidden rounded-lg transition hover:-translate-y-1 hover:border-cyan-200/40">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950/70">
                    <Image src={project.preview} alt={`${project.name} live preview`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">{project.type}</p>
                        <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
                      </div>
                      <span className="grid size-11 place-items-center rounded-md bg-cyan-300 text-slate-950 shadow-glow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Tech stack"
            title="Floating tools for modern product engineering."
            copy="A motion-first skill grid that highlights frontend craft, backend delivery, data flow, animation, and 3D interaction."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(([label, level, Icon], index) => (
              <Reveal key={label} delay={index * 0.035}>
                <div className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-200/35">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-md bg-white/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                      <Icon size={21} />
                    </span>
                    <span className="text-sm font-semibold text-cyan-100">{level}%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.12 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Experience"
            title="Internship, education, and leadership in one timeline."
            copy="The story connects student growth, production practice, and community leadership into a product-engineering path."
          />
          <div className="space-y-4">
            {timeline.map(({ title, org, detail, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[auto_1fr]">
                  <span className="grid size-12 place-items-center rounded-md bg-cyan-300/15 text-cyan-200">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm font-medium text-violet-200">{org}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="relative z-10 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.12}>
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
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-4 pb-24 pt-16">
        <Reveal>
          <div className="glass mx-auto grid max-w-5xl gap-8 rounded-lg p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Contact</p>
              <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Let&apos;s build the next AI-powered product.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Available for internships, startup-style product work, MERN development, AI-integrated web apps, and technical multimedia production.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlowButton href="mailto:kapilkurchaniya98@gmail.com">
                  Email <Mail size={17} />
                </GlowButton>
                <GlowButton href="https://github.com/kapilkurchaniya" variant="secondary">
                  GitHub <Github size={17} />
                </GlowButton>
                <GlowButton href="https://www.linkedin.com/in/kapil-kurchaniya-961589353" variant="secondary">
                  LinkedIn <Linkedin size={17} />
                </GlowButton>
                <GlowButton href="/Kapil-Kurchaniya-Resume.pdf" variant="secondary" download>
                  Resume <Download size={17} />
                </GlowButton>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              {[
                ["name", "Your name"],
                ["email", "Email address"],
                ["message", "Project idea"]
              ].map(([name, placeholder]) =>
                name === "message" ? (
                  <textarea
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    rows={5}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60 focus:bg-cyan-200/5"
                  />
                ) : (
                  <input
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60 focus:bg-cyan-200/5"
                  />
                )
              )}
              <button
                disabled={contactStatus === "sending"}
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {contactStatus === "sending" ? "Sending..." : "Send signal"} <Send size={17} />
              </button>
              {contactMessage && (
                <p className={`text-sm ${contactStatus === "sent" ? "text-emerald-200" : "text-rose-200"}`}>
                  {contactMessage}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  );
}
