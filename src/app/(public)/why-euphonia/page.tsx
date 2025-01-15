import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const WhyEuphonia = () => {
  return (
    <div className="py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between mb-16">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl mb-4">
              why <span className="text-indigo-600">euphonia</span>?
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Euphonia redefines mental well-being with empathetic AI designed
              to help you navigate life’s challenges in a safe, supportive, and
              private space.
            </p>
            <Link href="/main">
              <Button className="px-6 py-3 h-12 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Start the Conversation
              </Button>
            </Link>
          </div>
        </div>

        {/* Meaning of .me Section */}
        <div className="rounded-lg bg-gray-50 py-10 px-6 lg:px-16 mb-16">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            What’s up with <span className="text-indigo-600">.me</span>?
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            The <span className="font-semibold text-indigo-600">{`".me"`}</span>
            {` in
            Euphonia.me isn’t just a fancy internet address—it’s our way of
            saying, "Hey, this is all about`}{" "}
            <span className="italic">you</span>
            {` !" It’s like a digital hug, but without the awkward pat on the back.
            When you see`}{" "}
            <span className="font-semibold">{`".me"`}</span>, think of it as
            your VIP pass to a space where your feelings take center stage. So,
            whether you’re here to laugh, cry, or just figure things out,
            Euphonia is ready to help <span className="italic">you</span> do{" "}
            <span className="italic">you</span>—in the best way possible.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="rounded-lg p-8 mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            {`euphonia's promise`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Empathy at the Core",
                icon: "❤️",
                description:
                  "Designed to listen and respond with genuine understanding, ensuring you feel heard.",
              },
              {
                title: "Your Time, Your Space",
                icon: "⏰",
                description:
                  "Available 24/7, so you can connect whenever you’re ready.",
              },
              {
                title: "Privacy First",
                icon: "🔒",
                description:
                  "Your conversations are secure and confidential with industry-leading protections.",
              },
              {
                title: "Science-Backed Approach",
                icon: "🧠",
                description:
                  "Built with insights from psychologists and mental health experts.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-indigo-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            Euphonia vs. Traditional Approaches
          </h2>
          <div className="overflow-hidden rounded-lg shadow-md border">
            <table className="table-auto w-full text-left text-gray-700">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4">Euphonia</th>
                  <th className="px-6 py-4">Traditional Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Availability",
                    euphonia: "24/7, anytime you need.",
                    traditional: "Limited to appointments.",
                  },
                  {
                    feature: "Cost",
                    euphonia: "Affordable and flexible plans.",
                    traditional: "Expensive hourly rates.",
                  },
                  {
                    feature: "Empathy",
                    euphonia: "Genuine, human-like conversations.",
                    traditional: "May feel impersonal at times.",
                  },
                  {
                    feature: "Data Privacy",
                    euphonia: "State-of-the-art encryption.",
                    traditional: "Varies by provider.",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-gray-500">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 font-medium">{row.euphonia}</td>
                    <td className="px-6 py-4 font-medium">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Stories Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            Transforming Lives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Overcoming Anxiety",
                story:
                  "With Euphonia, I’ve learned to manage my anxiety and feel more in control of my emotions.",
                user: "Sophia M.",
              },
              {
                title: "Finding Balance",
                story:
                  "Euphonia helped me navigate challenging times and focus on self-care when I needed it the most.",
                user: "James L.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                  {testimonial.title}
                </h3>
                <p className="text-gray-600 mb-4 italic">{testimonial.story}</p>
                <h4 className="text-gray-800 font-medium">
                  - {testimonial.user}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-indigo-600 text-white p-10 rounded-lg">
          <h2 className="text-3xl font-extrabold mb-4">
            Talk It Out, Find Your Clarity
          </h2>
          <p className="mb-6">
            Euphonia is here to listen, understand, and help you solve life’s
            toughest problems. Speak freely, and let’s find peace together.
          </p>
          <Link href="/main">
            <Button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 hover:text-indigo-800 transition">
              Start Your Conversation Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyEuphonia;
