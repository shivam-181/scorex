import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import TopHeader from "../components/TopHeader";
import Chatbot from "../components/Chatbot";
import ScrollToTop from "../components/ScrollToTop";
import BreakingNewsTicker from "../components/BreakingNewsTicker";
import { PinnedMatchProvider } from "../context/PinnedMatchContext";
import MiniScoreBar from "../components/MiniScoreBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ScoreX - The Future of Live Scores",
  description: "Experience football like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-dark text-white selection:bg-crimson selection:text-white`}>
        <PinnedMatchProvider>
          <BreakingNewsTicker />
          <TopHeader />
          {children}
          <Chatbot />
          <ScrollToTop />
          <MiniScoreBar />
        </PinnedMatchProvider>
      </body>
    </html>
  );
}
