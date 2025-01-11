import Footer from "@/components/hero/Footer";
import Header from "@/components/hero/Header";
import ScrollProgress from "@/components/ui/scroll-progress";
import { ReactNode } from "react";

export default function Home({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scroll Progress */}
      <ScrollProgress className="top-[65px] relative z-10" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex-grow">
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
