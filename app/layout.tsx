import type { Metadata } from "next";
import { Inter } from "next/font/google";

// @ts-ignore: CSS import side effects are handled by Next.js
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Kapil Kurchaniya | AI Engineer + Full Stack Product Builder",
  description:
    "Modern portfolio for Kapil Kurchaniya, an AI-focused full stack developer building MERN products, dashboards, and scalable frontend systems."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
