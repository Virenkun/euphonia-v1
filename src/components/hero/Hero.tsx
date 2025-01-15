"use client";

import Image from "next/image";
import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row  justify-space-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 mb-12 lg:mb-0 z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Therapy, but make it
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                {" "}
                fun & way more easy
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6">
              Spill your thoughts, get answers, share secrets (we won’t even
              tell your diary).
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {`Meet your new favorite therapist: always awake, never out of
              coffee, and ready to listen without saying, "Tell me how that
              makes you feel." Your mental wellness, served with a side of AI
              magic.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signin/signup">
                <RainbowButton className="font-bold text-xl px-8 py-6 rounded-lg transition-transform hover:scale-105">
                  Experience Euphonia Now
                </RainbowButton>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="relative">
              <Image
                src="/main.png"
                alt="AI Therapist Illustration"
                width={900}
                height={900}
                className="rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 mix-blend-overlay"></div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 to-indigo-50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center bg-repeat opacity-5 -z-10"></div>
    </section>
  );
}
