import Image from "next/image";
import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account and set up your profile with your preferences and goals.",
  },
  {
    title: "Choose Your Focus",
    description:
      "Select the areas of your mental health you'd like to work on, such as stress, anxiety, or personal growth.",
  },
  {
    title: "Start Talking",
    description:
      "Begin your voice conversation with our AI therapist, available anytime you need support.",
  },
  {
    title: "Receive Insights",
    description:
      "Get personalized insights, coping strategies, and progress tracking based on your conversations.",
  },
  {
    title: "Track Progress",
    description:
      "Monitor your mental health journey with detailed analytics and progress reports.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        How to <span className="text-indigo-600">Start</span>?
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Getting started with AITherapist is easy. Follow these simple steps to
        begin your journey to better mental health.
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start mb-8">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-5 top-10 h-full border-l-2 border-gray-300 z-0"></div>
              )}
              {/* Circle */}
              <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg mr-4 z-10">
                {index + 1}
              </div>
              {/* Step Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}

          <Link href="/signin/signup">
            <RainbowButton className="mt-6">Get Started Now</RainbowButton>
          </Link>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full filter blur-3xl opacity-30"></div>
            <Image
              src={"/Astronot.gif"}
              alt="How It Works Illustration"
              width={500}
              height={500}
              className="relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
