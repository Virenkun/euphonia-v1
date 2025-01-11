import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team - Euphonia",
  description:
    "Meet the dedicated team behind Euphonia, working to bring innovative AI-powered therapy to individuals seeking emotional support.",
  keywords: [
    "Euphonia team",
    "meet the team",
    "AI therapy team",
    "our team",
    "Euphonia experts",
    "therapy innovation",
    "mental health professionals",
    "AI development team",
    "leadership team",
    "Euphonia professionals",
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
