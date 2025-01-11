import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Euphonia",
  description: "The legal disclaimer for using [Your Website Name].",
  keywords: [
    "disclaimer",
    "legal notice",
    "terms of use",
    "limitations of liability",
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
