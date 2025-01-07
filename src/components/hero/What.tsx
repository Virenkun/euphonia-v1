"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";

export default function WhatIsEuphonia() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="about-euphonia" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-[700] text-gray-900 mb-4">
            What Is Meaning of <span className="text-indigo-600">Euphonia</span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the AI-powered platform that brings harmony to
            conversations and promotes well-being through words.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Etymology
            </h3>
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <span className="block text-4xl font-bold text-indigo-600 mb-2">
                  eu-
                </span>
                <span className="text-sm text-gray-500">good, pleasant</span>
              </div>
              <span className="text-3xl text-gray-400">+</span>
              <div className="text-center">
                <span className="block text-4xl font-bold text-purple-600 mb-2">
                  phonia
                </span>
                <span className="text-sm text-gray-500">voice, sound</span>
              </div>
            </div>
            <p className="text-gray-900 text-center font-semibold">
              Euphonia: A harmony of words that brings peace and well-being
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Core Principles
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Safe Space",
                "Clarity",
                "Compassion",
                "Understanding",
                "Healing",
                "Growth",
              ].map((principle) => (
                <div key={principle} className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="text-gray-700">{principle}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-lg shadow-xl p-8 mb-16 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-50" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 relative z-10">
            How Euphonia Works
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Natural Language Processing",
              "Emotional Intelligence",
              "Personalized Responses",
            ].map((feature, index) => (
              <div key={feature} className="relative z-10">
                <button
                  onClick={() => toggleSection(feature)}
                  className="flex justify-between items-center w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <span className="font-medium text-gray-900">{feature}</span>
                  {expandedSection === feature ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === feature && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-gray-50 rounded-b-lg"
                    >
                      <p className="text-gray-600">
                        {index === 0 &&
                          "Euphonia uses advanced NLP to understand and interpret user input accurately."}
                        {index === 1 &&
                          "Our AI is trained to recognize and respond to emotional cues in conversations."}
                        {index === 2 &&
                          "Euphonia adapts its communication style to each user's preferences and needs."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
