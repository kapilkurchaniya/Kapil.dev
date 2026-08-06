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
  metadataBase: new URL("https://kapils-portfolio.vercel.app"),
  title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
  description:
    "Modern portfolio for Kapil Kurchaniya, an AI-focused full stack developer building MERN products, dashboards, and scalable frontend systems.",
  keywords: ["Kapil Kurchaniya", "Full Stack Developer", "AI Engineer", "React", "Next.js", "MERN", "Portfolio"],
  authors: [{ name: "Kapil Kurchaniya" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
    description:
      "Modern portfolio for Kapil Kurchaniya, an AI-focused full stack developer building MERN products, dashboards, and scalable frontend systems.",
    url: "/",
    siteName: "Kapil Kurchaniya Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
    description:
      "Modern portfolio for Kapil Kurchaniya, an AI-focused full stack developer.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#050713" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8fbff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
