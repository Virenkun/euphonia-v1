"use client";
import Spinner from "@/components/spinner";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const loadingMessages = [
    "Preparing your experience...",
    "Gathering the latest data...",
    "Almost there...",
    "Putting on the finishing touches...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Spinner />
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="mt-4 text-base font-normal text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Loading;
