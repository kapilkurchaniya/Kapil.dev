# Made by Kapil — Portfolio Website Technical Overview

## What this project is

This is Kapil Kurchaniya's personal portfolio website. It presents selected work, technical skills, education, certifications, GitHub activity, contact details, and downloadable resume in a highly animated, product-style experience.

The project was assembled with modern AI-assisted/vibe-coding workflows alongside Kapil's own design direction, content, testing, integration work, and deployment decisions. In practical terms, the code is a real production Next.js application: it has a responsive front end, server-side API routes, environment-based secrets, asset optimisation, SEO metadata, and a live Vercel deployment.

**Live site:** https://www.kapiln.in  
**Framework:** Next.js 15 with React 19 and TypeScript  
**Hosting:** Vercel  
**Primary source folder:** `app/`

---

## How to explain it in one minute

> “I built my portfolio as a modern Next.js single-page experience. I used React and TypeScript for the interface, Tailwind CSS for responsive styling, Framer Motion and GSAP for cinematic motion, and Lenis for smooth scrolling. The site has server-side API routes: one sends contact-form messages by Gmail/Nodemailer and another retrieves my GitHub contribution data securely using an environment token. It is deployed on Vercel, where Next.js builds and serves the site. I also added SEO metadata, sitemap and robots files, optimized images, dark/light themes, accessibility fallbacks, and mobile-friendly behaviour.”

---

## Technology stack

| Area | Technology used | Why it is used |
| --- | --- | --- |
| Application framework | Next.js 15.5.18 (App Router) | Provides React rendering, routing, API routes, builds, static optimisation, and Vercel compatibility. |
| UI library | React 19 | Builds the page from reusable components and manages interactive state. |
| Language | TypeScript | Adds types for project data, props, API payloads, and safer development. |
| Styling | Tailwind CSS 3 | Utility classes make the responsive layout and visual system quick to maintain. |
| Global CSS | `app/globals.css` | Holds theme variables, glass effect, custom scrollbars, animations, responsive rules, and reduced-motion support. |
| Motion | Framer Motion 11 | Used for entrance animations, hover states, animated text, card effects, forms, and UI transitions. |
| Timeline animation | GSAP 3 + ScrollTrigger | Drives the cinematic loading intro and selected scroll-linked effects. |
| Smooth scrolling | Lenis | Makes scrolling feel fluid while staying compatible with animations. |
| Icons | Lucide React | Provides lightweight, consistent SVG icons. |
| Email delivery | Nodemailer + Gmail App Password | Sends form submissions to Kapil without exposing email credentials in browser code. |
| GitHub data | GitHub GraphQL API | Supplies contribution calendar data through a protected server route. |
| Image delivery | Next.js `Image` component | Optimizes local images and serves modern AVIF/WebP where supported. |
| Font delivery | `next/font/google` (Inter) | Loads the Inter typeface with Next.js optimisation. |
| Code quality | ESLint + TypeScript checking | Finds style and type problems before production builds. |
| Deployment | Vercel | Hosts the application and runs the production build/serverless functions. |

---

## Project structure

```text
PORTFOLIO WEB/
├── app/
│   ├── api/
│   │   ├── contact/route.ts       Contact-form email API
│   │   └── github/route.ts        GitHub contribution API proxy
│   ├── components/                Reusable client-side UI pieces
│   ├── globals.css                Global design system and animation CSS
│   ├── layout.tsx                 Root HTML layout, font, metadata, cursor
│   └── page.tsx                   Main portfolio page and content data
├── public/
│   ├── certificates/              Certificate images
│   ├── previews/                  Project preview images
│   ├── profile.png                Profile image
│   ├── Kapil-Kurchaniya-Resume.pdf
│   ├── robots.txt                 Search-crawler rules
│   └── sitemap.xml                Search-engine page list
├── .env.example                   Safe example of required secrets
├── next.config.ts                 Next.js build and image configuration
├── tailwind.config.ts             Tailwind theme extension
├── package.json                   Scripts and dependencies
└── vercel project link (`.vercel/`) Deployment connection, not application code
```

---

## How the site works

### 1. Application boot and page rendering

1. A visitor opens the Vercel URL.
2. Vercel serves the Next.js application.
3. `app/layout.tsx` creates the shared document shell: language, Inter font, site metadata, favicon, theme colour, and custom cursor.
4. `app/page.tsx` renders the portfolio home page. It is a **client component** (`"use client"`) because it uses React state, browser APIs, scroll position, and animations.
5. The browser downloads only the JavaScript required for the interactive parts; static assets come from `public/`.

The home page is a long, section-based portfolio rather than a group of separate page routes. Navigation buttons scroll the visitor to sections such as Projects, Stack, Experience, Stats, and Contact.

### 2. Content model

Most portfolio content is intentionally stored as typed arrays near the top of `app/page.tsx`:

- `projects`: project title, category, description, stack, link, GitHub link, preview image, accent gradient, and metric.
- `skills`: skill label, confidence score, and Lucide icon.
- `timeline`: internships, education, technical leadership, and certificate links.
- `certifications`: issuer, date, description, and image.
- `stats` and `roles`: highlighted facts and rotating role text.

This makes updates simple: Kapil can add a project or certificate by editing one data object, rather than rewriting the visual layout.

### 3. Visual design system

The visual direction is a dark, futuristic glassmorphism interface with cyan, violet, and pink lighting.

- CSS variables in `globals.css` define page backgrounds, text colors, glass borders, shadows, and grid lines.
- The `.glass` class creates translucent panels with blur, gradients, borders, and shadows.
- Tailwind handles spacing, grids, typography, breakpoints, colours, and responsive layouts directly in JSX.
- `tailwind.config.ts` extends the design system with custom colours (`ink`, `panel`, `line`), glow shadows, and the Inter font variable.
- A light-theme variable set exists under `:root[data-theme="light"]`; the page toggles the theme at runtime.
- Project carousels use CSS scroll snapping for touch-friendly horizontal browsing.

### 4. Animation and interaction system

The motion is made from several focused components instead of one huge animation file.

| Component | Responsibility |
| --- | --- |
| `CinematicIntro.tsx` | Plays the opening name reveal with GSAP. It remembers a completed intro in `sessionStorage`, so it normally runs once per browser session. It also skips itself for users who prefer reduced motion. |
| `MotionPrimitives.tsx` | Shared building blocks such as reveal-on-scroll, staggered children, animated numbers, magnetic elements, tilt cards, parallax layers, and floating overlays. |
| `TextReveal.tsx` | Reveals text by word or character using Framer Motion. |
| `SmoothScroll.tsx` | Wraps the page in Lenis smooth scrolling and exposes a helper for controlled scrolling. |
| `CustomCursor.tsx` | Adds a desktop-only interactive cursor. It changes form near links, text, and project cards, and adds click ripples. It is disabled on touch/small-screen devices. |
| `GithubCalendar.tsx` | Renders the contribution grid after loading data from the GitHub API route. |
| `ContactForm.tsx` | Provides animated fields, loading state, success/error feedback, and calls the contact API. |
| `Footer.tsx` | Includes social links and a smooth “back to top” action. |

The site pays attention to performance and comfort:

- `prefers-reduced-motion` disables nonessential animation.
- The cinematic intro is remembered with `sessionStorage`.
- Touch/mobile devices do not get the custom cursor.
- The CSS reduces glass blur on smaller screens.
- Images use Next.js optimisation.

---

## Backend features and APIs

Although the portfolio is mainly a front-end experience, it includes two server-side API endpoints. In Next.js App Router, `route.ts` files become endpoints automatically.

### Contact form: `POST /api/contact`

**Browser flow**

1. Visitor enters name, email, and project idea.
2. `ContactForm.tsx` prevents the normal browser form submission and sends JSON to `/api/contact` with `fetch`.
3. It shows “Sending”, “Sent”, or an error message without reloading the page.

**Server flow**

1. `app/api/contact/route.ts` reads and trims the submitted JSON.
2. It checks that all fields are present and verifies email format.
3. It loads Gmail credentials only from server environment variables.
4. Nodemailer sends the message through Gmail, sets the visitor as `replyTo`, and creates a styled HTML email.
5. The message body is HTML-escaped before it is placed into the HTML email, helping prevent unsafe markup injection.
6. The route returns JSON with either success or an appropriate error status.

**Required environment variables**

```env
GOOGLE_USER_EMAIL=your-gmail-address@gmail.com
GOOGLE_APP_PASSWORD=your-google-app-password
CONTACT_TO_EMAIL=kapilkurchaniya98@gmail.com
```

These belong in `.env.local` during local development and in Vercel Project Settings → Environment Variables for production. They must never be put in `page.tsx`, committed to Git, or exposed with a `NEXT_PUBLIC_` prefix.

### GitHub calendar: `GET /api/github`

1. `GithubCalendar.tsx` calls `/api/github` when the stats section mounts.
2. The server route reads `GITHUB_PAT` from Vercel/local environment variables.
3. It sends a GraphQL query to `https://api.github.com/graphql` for the `kapilkurchaniya` contribution calendar.
4. Next.js caches/revalidates this request for one hour (`revalidate: 3600`).
5. The client receives only the calendar data and converts contribution counts into visual colour levels.

This server proxy is important because it keeps the Personal Access Token out of browser JavaScript.

---

## Static assets

`public/` is for files served directly from the website root:

- Project screenshots are in `public/previews/`.
- Credential images are in `public/certificates/`.
- The resume is offered as both PDF and HTML.
- `profile.png`, `favicon.svg`, and preloader videos support branding and visual identity.
- All of these assets can be referenced from code with a root-relative URL, for example `/previews/mediassist-ai.png`.

`next.config.ts` allows Next.js to generate AVIF and WebP image formats and caches optimized images. It also permits remote images from `github.com` if needed.

---

## SEO and discoverability

The portfolio includes basic technical SEO:

- `layout.tsx` defines title, description, keywords, canonical URL, Open Graph metadata, Twitter card metadata, author, and theme colour.
- `metadataBase` is set to `https://www.kapiln.in`, allowing correct absolute metadata URLs.
- `public/robots.txt` allows search crawlers and points them to the sitemap.
- `public/sitemap.xml` lists the home page and online resume with update frequency and priority.
- Semantic HTML, clear headings, image `alt` text, labelled form fields, and focus-visible styles improve accessibility and crawlability.

---

## Local development, quality checks, and deployment

### Requirements

- Node.js (current LTS recommended)
- npm
- Gmail App Password only if testing the contact form
- GitHub Personal Access Token only if testing live contribution data

### Commands

```bash
# Install dependencies
npm install

# Run locally at http://localhost:3000
npm run dev

# Run ESLint with zero warnings allowed
npm run lint

# Create the production build, including TypeScript validation
npm run build

# Run the locally built production app
npm run start
```

### Deployment workflow

1. Make and test the changes locally.
2. Run `npm run lint` and `npm run build`.
3. Confirm the Vercel environment variables are configured.
4. Deploy through the connected Git repository or run:

```bash
npx vercel deploy --prod
```

5. Vercel installs dependencies, runs `npm run build`, creates optimized static files and serverless functions, and aliases the successful production deployment to `https://www.kapiln.in`.

The latest verified deployment built successfully with Next.js 15.5.18 and returned HTTP 200 on the production domain.

---

## What was deliberately built into the framework

- **Component-based design:** reusable visual behaviour lives in component files rather than being duplicated throughout the page.
- **Data-driven portfolio:** projects, skills, timeline items, and certifications can be edited as structured data.
- **Client/server separation:** interactive UI runs in the browser; secrets and third-party requests run in server API routes.
- **Responsive-first behaviour:** Tailwind breakpoints, scrollable mobile project tracks, and cursor exclusion on touch devices.
- **Progressive enhancement:** the site still has meaningful structure when special animation is reduced or unavailable.
- **Production optimisation:** Next image configuration, compression, font optimization, and Vercel build output.
- **Security basics:** no secrets in client code, server-side Gmail/GitHub calls, input checks, email HTML escaping, and error handling.

---

## Honest ownership statement

This portfolio is Kapil's project and product presentation. Its design, project/career content, assets, requirements, integration choices, testing, and launch are directed by Kapil. Modern AI-assisted coding tools were used to speed up implementation and refinement, which is a normal contemporary development workflow. The application should be described honestly as an AI-assisted, production-deployed Next.js portfolio rather than claiming every character was handwritten from scratch.

That is still valuable engineering work: the project has to be specified, assembled, understood, debugged, validated, supplied with assets and secrets, and deployed correctly. This document is the technical explanation of that finished system.

---

## Useful handover checklist

When updating the site in the future:

- Add projects, skills, experience, or certificates in `app/page.tsx`.
- Put new screenshots in `public/previews/` and certificates in `public/certificates/`.
- Keep image names simple and update their referenced paths.
- Update metadata, sitemap date, and resume whenever personal details change.
- Test the contact form after any email configuration change.
- Keep `GOOGLE_*`, `CONTACT_TO_EMAIL`, and `GITHUB_PAT` out of Git.
- Run lint and build before deploying.
- Review dependency/security updates carefully; major upgrades should be tested in a separate change before production release.

## File ownership map

| File / folder | What it controls |
| --- | --- |
| `app/page.tsx` | Main content, section composition, projects, skills, timeline, certifications, theme/menu/scroll interactions. |
| `app/layout.tsx` | Global document shell, SEO metadata, Inter font, favicon, custom cursor. |
| `app/globals.css` | Shared visual design and CSS animations. |
| `app/components/` | Isolated UI and animation functionality. |
| `app/api/contact/route.ts` | Gmail/Nodemailer form-delivery backend. |
| `app/api/github/route.ts` | Secure GitHub GraphQL calendar backend. |
| `public/` | Publicly served images, videos, resume, robots, sitemap, and favicon. |
| `next.config.ts` | Image optimization and compression options. |
| `tailwind.config.ts` | Tailwind scanning and custom theme tokens. |
| `.env.local` | Local secrets only; intentionally not committed. |
| `.env.example` | Safe template of required variables. |
| `package.json` | Project scripts and dependency list. |

---

**Prepared for:** Kapil Kurchaniya  
**Project:** Kapil AI Portfolio  
**Document purpose:** explain the actual framework, technology, and working flow of the deployed website.
