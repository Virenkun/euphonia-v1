import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Euphonia Blog - AI Therapy, Mental Health, and Emotional Support Insights",
  description:
    "Explore the Euphonia blog for expert articles, tips, and news on AI-driven therapy, mental health advancements, emotional well-being, and innovative therapeutic solutions.",
  keywords: [
    "Euphonia blog",
    "AI therapy blog",
    "mental health blog",
    "emotional support articles",
    "AI mental health assistant",
    "mental health technology",
    "mental health tips",
    "AI in therapy",
    "therapy innovations",
    "emotional well-being",
    "mental health awareness",
    "therapy chatbot",
    "mental health news",
    "AI therapy insights",
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
