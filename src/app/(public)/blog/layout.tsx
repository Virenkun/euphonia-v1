import Footer from "@/components/hero/Footer";
import Header from "@/components/hero/Header";
import ScrollProgress from "@/components/ui/scroll-progress";
import { ReactNode } from "react";

export default async function Home({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      <ScrollProgress className="top-[65px]" />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
