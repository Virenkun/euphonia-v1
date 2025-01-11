import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Mission - Euphonia",
  description:
    "Learn about the mission and values that drive Euphonia in providing accessible, AI-powered mental health support.",
  keywords: [
    "Euphonia mission",
    "AI-powered therapy",
    "mental health support",
    "accessible therapy",
    "AI mental health assistant",
    "emotional well-being",
    "therapy innovation",
    "mental health technology",
    "our mission",
    "Euphonia values",
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
