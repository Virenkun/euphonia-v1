import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-28">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-[700] text-gray-900 mb-6 lg:leading-tight">
            experience a new kind of therapy—talk openly
            <br />
            <span className="text-indigo-600 sm:text-2xl lg:text-4xl">
              feel heard, and find balance with AI guidance
            </span>
          </h1>
          <p className="text-xl text-gray-800 mb-8 font-[500]">
            Experience the future of mental wellness with our AI voice
            therapist. Compassionate, accessible, and always here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signin/signup">
              <RainbowButton className="font-[700] text-lg">
                Start Your Journey
              </RainbowButton>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg rounded-lg h-[42px]"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mr-5 lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30"></div>
            <Image
              src="/main.png"
              alt="AI Therapist Illustration"
              width={900}
              height={900}
              className="relative rounded-2xl border-[8px] border-indigo-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
