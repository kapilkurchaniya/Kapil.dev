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
  FileText,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedNumber, FloatingOverlay, Magnetic, ParallaxLayer, Reveal, StaggerItem, StaggerReveal, TiltCard } from "./components/MotionPrimitives";
import { TextReveal } from "./components/TextReveal";
import { SmoothScrollProvider, useSmoothScroll } from "./components/SmoothScroll";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { CinematicIntro } from "./components/CinematicIntro";
import GithubCalendar from "./components/GithubCalendar";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Projects", "Stack", "Experience", "Stats", "Contact"];

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
};

const projects: Project[] = [
  {
    name: "INVEST MADHYA PRADESH 2026",
    type: "Contribution Project",
    summary:
      "A prototype platform developed for the Global Investors Summit Madhya Pradesh 2026. Designed to showcase investment opportunities, facilitate registrations, and connect government leaders with global investors.",
    stack: ["React", "Next.js", "Tailwind", "TypeScript"],
    preview: "/previews/invest-mp.png",
    accent: "from-blue-400 via-indigo-400 to-violet-400",
    metric: "Government Prototype"
  },
  {
    name: "GOVT. CIVIL HOSPITAL OPD",
    type: "Software & Freelance Project",
    summary:
      "A comprehensive Hospital Management System for Govt. Civil Hospital, Gadarwara. Built to streamline OPD management, digitize patient records, and provide a secure admin portal for hospital staff.",
    stack: ["React", "TypeScript", "Tailwind", "Node.js"],
    preview: "/previews/hospital-management.png",
    accent: "from-teal-300 via-emerald-300 to-blue-400",
    metric: "Healthcare software"
  },
  {
    name: "GHSS ASHTA",
    type: "Freelancing Project",
    summary:
      "Government Higher Secondary School, Ashta (GHSS Ashta) website. The project provides a public website for students, staff and visitors plus an admin area to manage notices, documents and gallery uploads.",
    stack: ["Next.js", "TypeScript", "Tailwind", "React"],
    href: "https://ashta-project.vercel.app/",
    github: "https://github.com/kapilkurchaniya/ashta-project",
    preview: "/previews/ashta-project.png",
    accent: "from-blue-300 via-indigo-300 to-purple-300",
    metric: "School admin portal"
  },
  {
    name: "MEDIASSIST AI",
    type: "AI Healthcare Platform",
    summary:
      "Prescription digitizer and medicine safety checker powered by Google Gemini AI, built for fast extraction and safer medication review.",
    stack: ["TypeScript", "React", "Gemini AI", "Tailwind"],
    href: "https://mediassist-ai-services.vercel.app/",
    github: "https://github.com/kapilkurchaniya/MediAssist_AI",
    preview: "/previews/mediassist-ai.png",
    accent: "from-cyan-300 via-emerald-300 to-blue-300",
    metric: "AI healthtech"
  },
  {
    name: "FRIDAY THE ASSISTANT",
    type: "Modular AI Assistant",
    summary:
      "Python-first AI assistant with an LLM intent router, Groq chat fallbacks, real-time web search, system automation, voice I/O, Flask UI, and PyQt5 desktop mode.",
    stack: ["Python", "Flask", "Groq", "Tavily", "Tailwind"],
    github: "https://github.com/kapilkurchaniya/FRIDAY_THE_ASSITANT",
    preview: "/previews/friday-assistant.png",
    accent: "from-cyan-300 via-teal-300 to-slate-200",
    metric: "Repo showcase"
  },
  {
    name: "KRISHI MITRA",
    type: "AI Agriculture Platform",
    summary:
      "Soil health and pH detection platform with responsive dashboards, AI-centered user flows, and cinematic product storytelling.",
    stack: ["TypeScript", "React", "Node", "Express", "Tailwind"],
    href: "https://krihi-mitra.vercel.app/",
    github: "https://github.com/kapilkurchaniya/KRISHI-MITRA-",
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
    href: "https://karishma-healthy-kitchen.vercel.app/",
    github: "https://github.com/kapilkurchaniya/Karishma-s-kitchen",
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
    github: "https://github.com/kapilkurchaniya/TOGORE-VIDYA-NIKETAN",
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
    github: "https://github.com/kapilkurchaniya/Redlifelline-hub-foundation",
    preview: "/previews/redlifeline.png",
    accent: "from-red-300 via-pink-300 to-teal-200",
    metric: "Impact platform"
  }
];

const moreProjects: Array<{name: string; summary: string; stack: string[]; href?: string; github?: string}> = [
  {
    name: "Spotlight Effect 2",
    summary: "A visually stunning spotlight effect highlighting elements with fluid motion and interaction.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    href: "https://spotlight-effect2.vercel.app/",
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
    title: "Full Stack Intern",
    org: "Anav WebTech Pvt. Ltd.",
    detail:
      "Completed a comprehensive 30-day OutSystems training program. Developed skills in Service Development, UI Design, and Business Process Management. Gained hands-on experience with HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Contributed to the integration and security aspects of web applications, enhancing overall functionality.",
    icon: BriefcaseBusiness,
    certLink: "/certificates/anav-certificate.jpg"
  },
  {
    title: "MERN Stack Intern",
    org: "Cybrom Technology Pvt Ltd",
    detail:
      "Developed responsive frontend interfaces using React.js, enhancing user experience and maintainability. Integrated RESTful backend APIs with Node.js and Express.js, facilitating efficient CRUD operations in MongoDB. Collaborated in an agile workflow with Git and GitHub, improving code review and deployment processes.",
    icon: Code2,
    certLink: "/certificates/cybrom-certificate.jpg"
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

const certifications = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "Jun 29, 2025",
    description: "Completed practical tasks in Data analysis and Forensic technology.",
    image: "/certificates/deloitte-data-analytics.png",
  },
  {
    title: "AI Skills Passport",
    issuer: "EY and Microsoft",
    date: "2025-2026",
    description: "Completed the employability sections covering Sustainability, Business, or Technology.",
    image: "/certificates/ai-skills-passport.jpeg",
  },
  {
    title: "Google Play Store Listing",
    issuer: "Google Play Academy",
    date: "Valid till Nov 2028",
    description: "Successfully completed the Google Play Store Listing Certificate requirements.",
    image: "/certificates/google-play.jpeg",
  },
  {
    title: "AWS DevOps Engineer",
    issuer: "AWS Training & Certification",
    date: "Oct 27, 2025",
    description: "Domain 1 Review: AWS Certified DevOps Engineer - Professional (DOP-C02).",
    image: "/certificates/aws-devops.png",
  },
  {
    title: "Getting Started with DevOps on AWS",
    issuer: "AWS Training & Certification",
    date: "Jun 06, 2024",
    description: "Successfully completed the Getting Started with DevOps on AWS course.",
    image: "/certificates/aws-getting-started-devops.png",
  },
  {
    title: "Gemini Certified Student",
    issuer: "Google for Education",
    date: "Valid till Oct 2028",
    description: "Demonstrated the knowledge, skills, and basic competencies needed to use Google AI.",
    image: "/certificates/gemini-certified.jpg",
  },
  {
    title: "GA4 Data and Reports",
    issuer: "Google",
    date: "2025-2026",
    description: "Successfully completed the Dive Deeper into GA4 Data and Reports course.",
    image: "/certificates/ga4-reports.jpeg",
  },
  {
    title: "Introduction to GitHub Copilot",
    issuer: "Microsoft",
    date: "Jan 2, 2026",
    description: "Successfully completed the introduction to GitHub Copilot.",
    image: "/certificates/github-copilot.jpeg",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Feb 14, 2026",
    description: "Successfully completed the Data Analytics Essentials course offered by Cisco.",
    image: "/certificates/cisco-data-analytics.jpg",
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "Infosys Springboard",
    date: "Nov 6, 2025",
    description: "Successfully completed the Cybersecurity Fundamentals course.",
    image: "/certificates/infosys-cybersecurity.jpeg",
  },
  {
    title: "Microsoft Build Event",
    issuer: "SCALive x Knowvy Technologies",
    date: "Jun 20, 2026",
    description: "Awarded for outstanding participation in the Microsoft Build Event by SCALive and Knowvy Technologies.",
    image: "/certificates/microsoft-build.jpg",
  },
  {
    title: "AI Day Bhopal 2.0: Build With AI",
    issuer: "ML Bhopal at LNCT Group",
    date: "May 16, 2026",
    description: "Participated in Hands-On Expert Sessions & Workshop organized by ML Bhopal and Google for Developers.",
    image: "/certificates/ai-day-bhopal.jpg",
  },
  {
    title: "Build With AI",
    issuer: "SCALive x DevAarambh",
    date: "Jun 13, 2026",
    description: "Participated in Build With AI event, demonstrating dedication and enthusiasm for AI Tools.",
    image: "/certificates/build-with-ai.jpg",
  },
  {
    title: "Docker & Kubernetes",
    issuer: "Scaler Masterclass",
    date: "Nov 6, 2025",
    description: "Upskilled in the Fundamentals of Docker & Kubernetes Masterclass.",
    image: "/certificates/scaler-docker.jpeg",
  },
  {
    title: "E-Commerce with React",
    issuer: "Scaler Masterclass",
    date: "Nov 25, 2025",
    description: "Upskilled in building an E-Commerce platform using React Masterclass.",
    image: "/certificates/scaler-react.jpeg",
  },
  {
    title: "Oriental TechHack 2.0 Winner",
    issuer: "Oriental Institute of Science & Technology",
    date: "Apr 30, 2026",
    description: "Overall Category Winner at the National Level Hackathon organized by OIST and Cybrom Technology.",
    image: "/certificates/oriental-techhack-winner.jpeg",
  },
  {
    title: "Coding Premier League 2026",
    issuer: "TechArena Club, LNCT Group",
    date: "Jun 13, 2026",
    description: "Participated in Season 1 of the Coding Premier League (CPL) 2026.",
    image: "/certificates/cpl-2026-participant.jpeg",
  }
];

const stats = [
  ["06", "Featured products"],
  ["11", "Core technologies"],
  ["2028", "B.Tech graduation"],
  ["100%", "Builder mindset"]
];

const roles = ["Full Stack Developer", "Creative Frontend Engineer", "AI Builder", "Product Thinker"];

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ───────── Floating Particles ───────── */
const particles = [
  { size: 4, left: "12%", top: "18%", duration: "7s", delay: "0s" },
  { size: 3, left: "78%", top: "22%", duration: "9s", delay: "1.2s" },
  { size: 5, left: "45%", top: "72%", duration: "8s", delay: "0.5s" },
  { size: 3, left: "88%", top: "55%", duration: "10s", delay: "2s" },
  { size: 4, left: "25%", top: "65%", duration: "7.5s", delay: "1.8s" },
  { size: 2, left: "62%", top: "35%", duration: "11s", delay: "0.8s" },
];

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle absolute rounded-full bg-cyan-300/40"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            "--duration": p.duration,
            "--delay": p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ───────── Preloader (replaced by CinematicIntro) ───────── */

/* ───────── Animated stat value ───────── */
function AnimatedStatValue({ value }: { value: string }) {
  const isPercent = value.endsWith("%");
  const numericValue = Number(value.replace("%", ""));

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return (
    <>
      {value.startsWith("0") && numericValue < 10 ? "0" : ""}
      <AnimatedNumber value={numericValue} suffix={isPercent ? "%" : ""} />
    </>
  );
}

/* ───────── Scroll progress ───────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-cyan-300 shadow-glow" style={{ scaleX }} />;
}

/* ───────── Section heading ───────── */
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Reveal delay={0}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</p>
      </Reveal>
      <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl my-2">
        <TextReveal text={title} delay={0.15} />
      </h2>
      <Reveal delay={0.3}>
        <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>
      </Reveal>
    </div>
  );
}

/* ───────── GlowButton ───────── */
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

/* ───────── Animated Role Ticker ───────── */
function RoleTicker() {
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRole((v) => (v + 1) % roles.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[activeRole]}
          initial={{ y: 32, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0.01px)" }}
          exit={{ y: -32, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: smoothEase }}
          className="flex items-center gap-3"
        >
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200">
            {roles[activeRole]}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/40 to-transparent" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────── ProjectCard with FloatingOverlay + spotlight glow ───────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className="w-[88vw] max-w-[420px] sm:w-[380px] md:w-[440px] lg:w-[460px] shrink-0 snap-center" delay={index * 0.08}>
      <TiltCard className="project-card group h-full w-full rounded-lg">
        <FloatingOverlay>
          <motion.div
            whileTap={{ scale: 0.985 }}
            whileHover={{
              boxShadow: `0 0 60px ${
                project.accent.includes("cyan") ? "rgba(103, 232, 249, 0.12)" :
                project.accent.includes("emerald") ? "rgba(52, 211, 153, 0.12)" :
                project.accent.includes("rose") ? "rgba(251, 113, 133, 0.12)" :
                "rgba(139, 92, 246, 0.12)"
              }`,
            }}
            className="glass relative flex h-full flex-col overflow-hidden rounded-lg p-4 transition hover:border-cyan-200/45"
          >
            <motion.div
              className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              initial={false}
              whileHover={{ opacity: 1 }}
            >
              <div className={`h-full w-full bg-gradient-to-br ${project.accent} opacity-10`} />
            </motion.div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
              <Image
                src={project.preview}
                alt={`${project.name} project preview`}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 31vw"
                className="object-cover object-top transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.04 }}
                className="absolute left-4 top-4 z-10 rounded-md border border-cyan-200/45 bg-slate-950/85 px-3 py-1 text-xs font-semibold text-cyan-100 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
              >
                {project.metric}
              </motion.span>
            </div>
            <div className="relative flex flex-1 flex-col p-2 pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">{project.type}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                </div>
                <div className="flex shrink-0 gap-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub repo for ${project.name}`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 transition group-hover:bg-white/10 group-hover:text-white"
                    >
                      <Github size={18} />
                    </motion.a>
                  )}
                  {project.href && (
                    <motion.a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                      whileHover={{ rotate: 12 }}
                      className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-cyan-200 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <ArrowUpRight size={18} />
                    </motion.a>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{project.summary}</p>
              <StaggerReveal className="mt-auto flex flex-wrap gap-2 pt-6" delay={0.1} stagger={0.045}>
                {project.stack.map((item) => (
                  <StaggerItem key={item}>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-200">
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </motion.div>
        </FloatingOverlay>
      </TiltCard>
    </Reveal>
  );
}

/* ───────── Live project card with scroll-through hover ───────── */
/* ───────── AI Assistant ───────── */
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
    "MEDIASSIST AI, FRIDAY THE ASSISTANT, and KRISHI MITRA are the strongest AI-product signals: healthcare safety workflows, voice assistant routing, agriculture context, responsive flows, and clear product stories.",
    "Kapil is an AI-focused full stack builder who ships React + Node products with interface discipline and practical product instincts.",
    "Frontend: TypeScript, React, Tailwind, Framer Motion, GSAP. Backend: Node, Express, REST APIs, MongoDB, Firebase."
  ];

  return (
    <motion.div
      className="glass rounded-lg p-4"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
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
          <motion.button
            key={prompt}
            onClick={() => setActive(index)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.985 }}
            className={`w-full rounded-md border px-3 py-2 text-left text-xs transition ${
              active === index
                ? "border-cyan-200/60 bg-cyan-200/10 text-cyan-50"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
            }`}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0.01px)" }}
        transition={{ duration: 0.38, ease: smoothEase }}
        className="mt-4 rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm leading-6 text-slate-200"
      >
        {replies[active]}
      </motion.div>
    </motion.div>
  );
}

/* ───────── Hero Showcase ───────── */
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
    <div className="hero-showcase relative">
      <div className="absolute -inset-6 rounded-full bg-cyan-300/10 blur-3xl" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -16, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-3 top-5 h-40 w-40 rounded-full border border-cyan-200/20 bg-cyan-200/5 blur-sm"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 18, 0], x: [0, 10, 0], scale: [1, 0.96, 1] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-0 h-36 w-36 rounded-full border border-violet-200/20 bg-violet-300/5 blur-sm"
      />

      <motion.div
        className="glass relative overflow-hidden rounded-lg p-4"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
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
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0.01px)" }}
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
              0{activeProject + 1} / {projects.length < 10 ? `0${projects.length}` : projects.length}
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
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4, borderColor: "rgba(103, 232, 249, 0.45)" }}
              transition={{ delay: 0.12 + index * 0.06, ease: smoothEase }}
              className="rounded-md border border-white/10 bg-white/[0.04] p-3"
            >
              <p className="text-2xl font-semibold text-white">
                <AnimatedStatValue value={value} />
              </p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.92fr]">
        <motion.div className="glass rounded-lg p-4" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
          <p className="text-sm font-semibold text-white">Project transitions</p>
          <div className="mt-4 flex gap-2">
            {projects.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveProject(index)}
                className={`relative h-2 flex-1 overflow-hidden rounded-full transition ${
                  index === activeProject ? "bg-cyan-300 shadow-glow" : "bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Show ${item.name}`}
              >
                {index === activeProject && (
                  <motion.span
                    layoutId="active-project-pill"
                    className="absolute inset-0 rounded-full bg-cyan-300"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
        <AIAssistant />
      </div>
    </div>
  );
}

/* ───────── Orbit Animation (Stats section) ───────── */
function SkillOrbit() {
  const dsaTopics = [
    { label: "Stacks + Queues", color: "bg-cyan-300/20 text-cyan-100 border-cyan-300/30" },
    { label: "BST + OOP", color: "bg-violet-300/20 text-violet-100 border-violet-300/30" },
    { label: "Time Complexity", color: "bg-emerald-300/20 text-emerald-100 border-emerald-300/30" },
    { label: "Space Complexity", color: "bg-rose-300/20 text-rose-100 border-rose-300/30" },
  ];

  return (
    <div className="relative mx-auto flex aspect-square w-[88%] items-center justify-center sm:w-[72%] lg:w-[64%]">
      {/* Outer orbit ring */}
      <div className="orbit-ring absolute h-[82%] w-[82%] rounded-full border border-white/10" />
      {/* Inner orbit ring */}
      <div className="orbit-ring absolute h-[57%] w-[57%] rounded-full border border-white/[0.06]" style={{ animationDelay: "2s" }} />

      {/* Center node */}
      <div className="relative z-10 flex flex-col items-center gap-1 rounded-xl border border-cyan-200/30 bg-cyan-200/10 px-5 py-4 text-center shadow-glow backdrop-blur-sm">
        <BrainCircuit size={22} className="text-cyan-200" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">Problem Solving</span>
      </div>

      {/* Orbiting items */}
      {dsaTopics.map((topic, i) => (
        <div
          key={topic.label}
          className="orbit-item absolute"
          style={{
            "--orbit-radius": "38vw",
            "--orbit-duration": `${16 + i * 3}s`,
            animationDelay: `${i * -4}s`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          } as React.CSSProperties}
        >
          <span
            className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm ${topic.color}`}
          >
            {topic.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────── Decorative GitHub Heatmap ───────── */
function GitHubHeatmap() {
  const weeks = 20;
  const days = 7;

  // Deterministic "random" pattern using index
  const getIntensity = (week: number, day: number) => {
    const seed = (week * 7 + day * 13 + 42) % 100;
    if (seed > 75) return "bg-emerald-400/80";
    if (seed > 55) return "bg-emerald-400/50";
    if (seed > 35) return "bg-emerald-400/25";
    if (seed > 20) return "bg-emerald-400/10";
    return "bg-white/[0.04]";
  };

  return (
    <Reveal delay={0.2}>
      <div className="glass mt-6 overflow-hidden rounded-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Contribution pattern</p>
          <span className="text-xs text-slate-500">Decorative</span>
        </div>
        <div className="flex gap-[3px] overflow-x-auto no-scrollbar">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: days }).map((_, d) => (
                <motion.div
                  key={`${w}-${d}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.01 * (w + d), duration: 0.3 }}
                  className={`h-[10px] w-[10px] rounded-[2px] ${getIntensity(w, d)}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
          <span>Less</span>
          <div className="flex gap-1">
            {["bg-white/[0.04]", "bg-emerald-400/10", "bg-emerald-400/25", "bg-emerald-400/50", "bg-emerald-400/80"].map((c) => (
              <div key={c} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ───────── Home Content ───────── */
function HomeContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [booting, setBooting] = useState(true);
  const scroll = useSmoothScroll();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = booting ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [booting]);

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
        const section = horizontalRef.current;
        const track = section?.querySelector<HTMLElement>(".project-track");
        if (!section || !track) {
          return undefined;
        }

        const getDistance = () => Math.max(0, track.scrollWidth - section.offsetWidth + 96);
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${getDistance() + 420}`,
            invalidateOnRefresh: true
          }
        });
        const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

        return () => {
          window.clearTimeout(refresh);
          tween.kill();
        };
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

  const handleScrollToTop = useCallback(() => {
    scroll?.scrollTo("#top");
  }, [scroll]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {booting && (
          <CinematicIntro onComplete={() => setBooting(false)} />
        )}
      </AnimatePresence>

      <ScrollProgress />
      <div className="ambient-grid grid-mask pointer-events-none fixed inset-x-0 top-0 h-[82vh]" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-0 opacity-[0.055]" />

      <header className="fixed left-0 right-0 top-4 z-40 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: smoothEase }}
          className="glass mx-auto flex max-w-6xl items-center justify-between rounded-lg px-3 py-3"
        >
          <a href="#top" onClick={(event) => scrollToSection(event, "#top")} className="flex items-center gap-2 text-sm font-semibold text-white">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="grid size-8 place-items-center rounded-md bg-cyan-300 text-slate-950 shadow-glow"
            >
              K
            </motion.span>
            Kapil.dev
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => scrollToSection(event, `#${item.toLowerCase()}`)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <motion.button
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
              whileTap={{ rotate: 20, scale: 0.92 }}
              className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
              whileTap={{ rotate: 20, scale: 0.92 }}
              className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.92 }} className="grid size-9 place-items-center rounded-md border border-white/10 text-white" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </motion.nav>
        <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: smoothEase }}
            className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-lg p-2 md:hidden"
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => scrollToSection(event, `#${item.toLowerCase()}`)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md px-3 py-3 text-sm text-slate-200"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </header>

      {/* ═══════ HERO SECTION ═══════ */}
      <section
        ref={heroRef}
        id="top"
        className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 pb-48 pt-32 lg:pt-40 lg:pb-72"
      >
        <HeroParticles />

        <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[56%]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                <Zap size={14} />
                Bhopal-based builder
              </span>
              {/* Available for work badge */}
              <span className="inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                <span className="pulse-glow h-2 w-2 rounded-full bg-emerald-400" />
                Available for work
              </span>
            </motion.div>
            
            <div className="overflow-visible group relative">
              <h1 data-cursor="text" className="text-balance text-[clamp(3rem,14vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
                <span className="block text-stroke-hover"><TextReveal text="Kapil" mode="char" delay={0.1} /></span>
                <span className="block text-stroke-hover"><TextReveal text="Kurchaniya" mode="char" delay={0.3} /></span>
              </h1>
            </div>

            {/* Animated role ticker */}
            <RoleTicker />

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
            <StaggerReveal className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300" delay={0.42} stagger={0.09}>
              <StaggerItem>
              <motion.span whileHover={{ y: -3 }} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <MapPin size={16} className="text-cyan-200" /> Bhopal, India
              </motion.span>
              </StaggerItem>
              <StaggerItem>
              <motion.span whileHover={{ y: -3 }} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <Rocket size={16} className="text-violet-200" /> MERN + AI apps
              </motion.span>
              </StaggerItem>
            </StaggerReveal>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0.01px)" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-[88%] sm:w-[72%] lg:w-[38%]"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass border border-white/10 group-hover:border-cyan-200/50 transition duration-500">
              <Image src="/profile.png" fill sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 38vw" alt="Kapil Portrait" className="h-auto w-full object-cover image-mask-bottom transition duration-700 hover:scale-105" priority />
            </div>
          </motion.div>
        </div>

        <div className="w-full z-10 relative">
          <HeroShowcase />
        </div>

        <a
          href="#projects"
          onClick={(event) => scrollToSection(event, "#projects")}
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 md:flex"
        >
          Scroll <ArrowDown className="animate-bounce" size={16} />
        </a>
      </section>

      {/* ═══════ PROJECTS SECTION ═══════ */}
      <section ref={horizontalRef} id="projects" className="relative z-10 overflow-hidden py-20 md:min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Featured projects"
            title="Cinematic product cards built for depth and motion."
            copy="Each project is framed around user value, visual proof, and the stack decisions behind the shipped experience."
          />
        </div>
        <div className="project-track mx-auto flex w-full max-w-full gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory lg:overflow-visible lg:w-max px-4 lg:px-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
        <div className="mx-auto mt-32 max-w-6xl">
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">More Projects</p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((project) => (
                <motion.div
                  key={project.name}
                  whileHover={{ y: -6, borderColor: "rgba(103, 232, 249, 0.4)" }}
                  className="glass flex flex-col justify-between rounded-lg p-6 transition border border-white/5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="grid size-10 place-items-center rounded-md bg-cyan-300/10 text-cyan-200">
                        <Code2 size={18} />
                      </span>
                      <div className="flex gap-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                            <Github size={18} />
                          </a>
                        )}
                        {project.href && (
                          <a href={project.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-200 transition">
                            <ArrowUpRight size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ STACK SECTION ═══════ */}
      <section id="stack" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Tech stack"
            title="Floating tools for modern product engineering."
            copy="A motion-first skill grid that highlights frontend craft, backend delivery, data flow, animation, and 3D interaction."
          />
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.045}>
            {skills.map(([label, level, Icon]) => (
              <StaggerItem key={label}>
                <motion.div
                  className="glass group rounded-lg p-5 transition hover:border-cyan-200/35"
                  whileHover={{ y: -7, scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <motion.span
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.42 }}
                      className="grid size-11 place-items-center rounded-md bg-white/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950"
                    >
                      <Icon size={21} />
                    </motion.span>
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
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════ EXPERIENCE SECTION ═══════ */}
      <section id="experience" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Experience"
            title="Internship, education, and leadership in one timeline."
            copy="The story connects student growth, production practice, and community leadership into a product-engineering path."
          />
          <div className="space-y-4">
            {timeline.map(({ title, org, detail, icon: Icon, certLink }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <motion.div
                  className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[auto_1fr]"
                  whileHover={{ x: 6, borderColor: "rgba(103, 232, 249, 0.35)" }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.06 }}
                    className="grid size-12 place-items-center rounded-md bg-cyan-300/15 text-cyan-200"
                  >
                    <Icon size={22} />
                  </motion.span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      {certLink && (
                        <a href={certLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20 hover:bg-cyan-500/20 transition hover:scale-105">
                          <FileText size={12} /> View Certificate
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-violet-200">{org}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CERTIFICATIONS SECTION ═══════ */}
      <section id="certifications" className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Certifications"
            title="Continuous Learning & Credentials"
            copy="Recognized for participation in workshops, events, and achieving foundational competencies in modern AI and data analytics."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map(({ title, issuer, date, description, image }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <motion.div
                  className="glass group flex h-full flex-col overflow-hidden rounded-xl"
                  whileHover={{ y: -8, borderColor: "rgba(103, 232, 249, 0.4)" }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/5 bg-slate-900/50">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-cyan-200">{date}</span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold leading-snug text-white">{title}</h3>
                    <p className="mb-4 text-sm font-medium text-violet-300">{issuer}</p>
                    <p className="mt-auto text-sm leading-relaxed text-slate-300">{description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATS SECTION ═══════ */}
      <section id="stats" className="relative z-10 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">GitHub + LeetCode</p>
              <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Signals for consistency, curiosity, and problem solving.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                The portfolio links directly to GitHub and frames LeetCode as a strength in time complexity, space optimization, and advanced data structures.
              </p>
            </Reveal>
            <GithubCalendar />
          </div>
          <Reveal delay={0.12}>
            <div className="glass rounded-lg p-5">
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Core DSA competence</p>
              <SkillOrbit />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CONTACT SECTION ═══════ */}
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
                <GlowButton href="/Kapil-Kurchaniya-Resume.pdf" variant="secondary" download>
                  Resume <Download size={17} />
                </GlowButton>
              </div>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <Footer onScrollToTop={handleScrollToTop} />
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
