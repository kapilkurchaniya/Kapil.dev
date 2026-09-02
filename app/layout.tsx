

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// @ts-ignore: CSS import side effects are handled by Next.js
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kapiln.in"),
  title: {
    default: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
    template: "%s | Kapil Kurchaniya",
  },
  description:
    "Portfolio of Kapil Kurchaniya — AI-focused full stack developer from India building MERN products, dashboards, healthcare AI tools, and scalable frontend systems with React, Next.js, Node.js & TypeScript.",
  keywords: [
    "Kapil Kurchaniya",
    "kapiln.in",
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Portfolio",
    "Web Developer India",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Engineer",
    "AI Product Builder",
    "Freelance Developer India",
  ],
  authors: [{ name: "Kapil Kurchaniya", url: "https://www.kapiln.in" }],
  creator: "Kapil Kurchaniya",
  publisher: "Kapil Kurchaniya",
  alternates: {
    canonical: "https://www.kapiln.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlea6d38f57acd5b815",
  },
  openGraph: {
    title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
    description:
      "Portfolio of Kapil Kurchaniya — AI-focused full stack developer from India building MERN products, dashboards, healthcare AI tools, and scalable frontend systems.",
    url: "https://www.kapiln.in",
    siteName: "Kapil Kurchaniya — kapiln.in",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
    description:
      "Portfolio of Kapil Kurchaniya — AI-focused full stack developer building MERN products, AI tools & scalable systems.",
    creator: "@kapilkurchaniya",
  },
  other: {
    "theme-color": "#050713",
  },
};

import { CustomCursor } from "./components/CustomCursor";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.kapiln.in/#person",
        name: "Kapil Kurchaniya",
        url: "https://www.kapiln.in",
        jobTitle: "AI Engineer & Full Stack Developer",
        description:
          "AI-focused full stack developer from India building MERN products, dashboards, healthcare AI tools, and scalable frontend systems.",
        sameAs: [
          "https://github.com/kapilkurchaniya",
          "https://www.linkedin.com/in/kapil-kurchaniya-961589353",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "AI",
          "MERN Stack",
          "Tailwind CSS",
          "Full Stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.kapiln.in/#website",
        url: "https://www.kapiln.in",
        name: "Kapil Kurchaniya Portfolio",
        description:
          "Portfolio of Kapil Kurchaniya — AI-focused full stack developer.",
        publisher: { "@id": "https://www.kapiln.in/#person" },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://www.kapiln.in" />
        <meta name="theme-color" content="#050713" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8fbff" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
