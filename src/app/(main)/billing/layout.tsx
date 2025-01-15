import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Therapist",
  description: "Find your perfect therapist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
