"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Zap,
  // Target,
  MessageCircle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account and set up your profile with your preferences and goals.",
    icon: Zap,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Start Talking",
    description:
      "Begin your voice conversation with our AI therapist, available anytime you need support.",
    icon: MessageCircle,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Receive Insights",
    description:
      "Get personalized insights, coping strategies, and metrics based on your conversations.",
    icon: Lightbulb,
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "Track Progress",
    description: "Monitor your mental health journey with detailed analytics",
    icon: TrendingUp,
    color: "from-purple-400 to-violet-500",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center"
        >
          Your Journey to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Better Mental Health
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          {`Embark on a transformative experience with AITherapist. Here's how
          your path to improved well-being unfolds:`}
        </motion.p>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16 relative">
            <div className="absolute left-8 top-0 h-[80%] bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 rounded-full"></div>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className={`relative flex items-start mb-12 ${
                  index === steps.length - 1 ? "mb-0" : ""
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div
                  className={`
                  flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full 
                  bg-gradient-to-br ${step.color} text-white shadow-lg mr-6 z-10
                  ${activeStep === index ? "scale-110" : "scale-100"}
                  transition-all duration-300
                `}
                >
                  <step.icon size={32} />
                </div>
                <div
                  className={`
                  bg-white rounded-2xl p-6 shadow-lg transition-all duration-300
                  ${activeStep === index ? "scale-105" : "scale-100"}
                `}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
