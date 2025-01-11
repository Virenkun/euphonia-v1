import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Euphonia? - Euphonia",
  description:
    "Discover why Euphonia is the best choice for personalized AI-driven therapy and emotional support.",
  keywords: [
    "why Euphonia",
    "Euphonia benefits",
    "AI therapy",
    "personalized emotional support",
    "mental health AI",
    "therapy chatbot",
    "Euphonia features",
    "AI assistant therapy",
    "best AI therapist",
    "innovative therapy solutions",
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
