import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Euphonia",
  description:
    "Learn how Euphonia collects, uses, and protects your personal data in compliance with privacy laws.",
  keywords: [
    "privacy policy",
    "personal data protection",
    "GDPR compliance",
    "data security",
    "user privacy",
    "cookies policy",
    "data usage",
    "privacy rights",
    "data protection laws",
    "secure data handling",
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
