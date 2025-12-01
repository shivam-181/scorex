import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import InitDeviceId from "../components/InitDeviceId";
import Navbar from "../components/Navbar";
import TopHeader from "../components/TopHeader";
import Chatbot from "../components/Chatbot";
import ScrollToTop from "../components/ScrollToTop";
import BreakingNewsTicker from '@/components/BreakingNewsTicker';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScoreX - Live Football Scores, Stats & Insights",
  description:
    "ScoreX provides real-time football scores, match insights, AI-powered analysis, standings, and personalized football feed.",
  keywords: [
    "football live score",
    "soccer stats",
    "live match updates",
    "football insights",
    "ScoreX",
  ],
  openGraph: {
    title: "ScoreX - Live Football Scores & AI Insights",
    description:
      "Track football scores, match events, stats, and AI-powered analysis in real-time.",
    url: "https://your-vercel-domain.vercel.app",
    siteName: "ScoreX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScoreX Football Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScoreX - Live Football Scores & Insights",
    description:
      "Real-time football updates, events, stats and AI-powered insights.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark text-white`}
      >
        <InitDeviceId />
        <BreakingNewsTicker />
        <TopHeader />
        {children}
        <ScrollToTop />
        <Chatbot />
        <Navbar />
      </body>
    </html>
  );
}
