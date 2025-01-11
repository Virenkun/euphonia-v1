import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Euphonia",
  description:
    "Read the terms and conditions that govern your use of Euphonia, including rights, responsibilities, and legal disclaimers.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "legal terms",
    "service agreement",
    "website usage",
    "user responsibilities",
    "acceptance of terms",
    "disclaimer",
    "terms for website",
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
