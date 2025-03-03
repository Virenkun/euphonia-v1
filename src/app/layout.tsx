import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "@/components/ui/toaster";
import { CSPostHogProvider } from "@/provider/PosthogProvider";

// const quicksand = Poppins({ subsets: ["latin"], weight: "400", display: "swap" });
const quicksand = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
export const metadata: Metadata = {
  title:
    "Euphonia - AI-Powered Therapy for Emotional Support and Mental Health",
  description:
    "Euphonia offers cutting-edge AI therapy solutions to provide personalized emotional support and improve mental health. Experience advanced AI-driven therapy for your well-being.",
  keywords: [
    "AI therapy",
    "emotional support AI",
    "mental health technology",
    "AI-powered therapy",
    "mental health solutions",
    "personalized therapy",
    "AI mental health assistant",
    "therapy innovations",
    "emotional well-being",
    "AI in therapy",
    "mental health care",
    "mental health AI",
    "AI for mental health",
    "AI chat therapy",
    "Euphonia AI therapy",
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://euphonia.me/" />
      </head>
      <CSPostHogProvider>
        <body className={quicksand.className} suppressHydrationWarning>
          <NextTopLoader
            color="#000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
