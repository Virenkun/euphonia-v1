import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Check-in | Euphonia",
  description:
    "Perform a comprehensive mental health check-in with our AI-powered assessment tool.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
