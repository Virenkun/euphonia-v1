import CTA from "@/components/hero/CTA";
import FAQ from "@/components/hero/FAQ";
import Features from "@/components/hero/Features";
import { FeaturesSection } from "@/components/hero/FeaturesSection";
import Footer from "@/components/hero/Footer";
import Header from "@/components/hero/Header";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/hero/HowItWorks";
import Testimonials from "@/components/hero/Testimonials";
import WhatIsEuphonia from "@/components/hero/What";
import ScrollProgress from "@/components/ui/scroll-progress";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      <ScrollProgress className="top-[65px]" />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <main>
          <Hero />
          <Features />
          <WhatIsEuphonia />
          <HowItWorks />
          <FeaturesSection />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
      </div>
      <Footer />
    </div>
  );
}
