import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Euphonia",
  description:
    "Find out how [Your Website Name] uses cookies to enhance your browsing experience.",
  keywords: [
    "cookie policy",
    "cookies",
    "tracking",
    "privacy",
    "user experience",
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
