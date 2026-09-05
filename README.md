# Kapil's AI Portfolio

A modern, highly interactive, and beautifully animated personal portfolio website built with Next.js 15, React 19, and Tailwind CSS. The portfolio showcases a cinematic project display, smooth scrolling, and complex animations powered by Framer Motion and GSAP.

## ✨ Features

- **Next-Gen Tech Stack:** Built with Next.js 15 (App Router) and React 19.
- **Cinematic Animations:** Deep integration of Framer Motion and GSAP for micro-interactions, complex stagger reveals, and scroll-linked animations.
- **Smooth Scrolling:** Fluid and natural scrolling experience provided by Lenis.
- **AI Portfolio Assistant:** A simulated AI assistant interface that provides context on my work and skills.
- **Responsive Design:** Fully responsive UI with Tailwind CSS, ensuring a great experience across desktop and mobile.
- **Contact Form Integration:** Working contact form using Nodemailer to send emails directly from the site.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP (GreenSock)](https://gsap.com/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email/Backend:** [Nodemailer](https://nodemailer.com/)
- **Language:** TypeScript

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kapilkurchaniya/kapil-ai-portfolio.git
   ```

2. Navigate into the project directory:
   ```bash
   cd kapil-ai-portfolio
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and copy the contents from `.env.example`. You will need to configure your Google App Password for the contact form to work properly.

```env
GOOGLE_USER_EMAIL=your-gmail-address@gmail.com
GOOGLE_APP_PASSWORD=your-google-app-password
CONTACT_TO_EMAIL=kapilkurchaniya98@gmail.com
```
> **Note:** Generate an App Password from your Google Account settings -> Security -> 2-Step Verification.

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio live!

## 📁 Project Structure

- `app/` - Next.js App Router pages, layouts, API routes, and components.
  - `page.tsx` - Main portfolio page containing the hero, showcase, and other sections.
  - `components/` - Reusable UI and motion primitives.
- `public/` - Static assets, images, and project preview screenshots.

## 📬 Contact

**Kapil Kurchaniya**
- Email: [kapilkurchaniya98@gmail.com](mailto:kapilkurchaniya98@gmail.com)
- LinkedIn: [Kapil Kurchaniya](https://www.linkedin.com/in/kapil-kurchaniya-961589353)
- GitHub: [@kapilkurchaniya](https://github.com/kapilkurchaniya)
