"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LineSpinnerProps {
  size?: number;
  color?: string;
  lineCount?: number;
  lineWidth?: number;
  className?: string;
}

export default function Spinner({
  size = 40,
  color = "currentColor",
  lineCount = 12,
  lineWidth = 2,
  className,
}: LineSpinnerProps) {
  return (
    <div
      style={{ width: size, height: size }}
      role="status"
      className={cn("inline-block", className)}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(lineCount)].map((_, index) => {
          const rotation = (index * 360) / lineCount;
          const opacity = 1 - (index / lineCount) * 0.75;
          return (
            <motion.line
              key={index}
              x1="50"
              y1="25"
              x2="50"
              y2="40"
              stroke={color}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              transform={`rotate(${rotation} 50 50)`}
              initial={{ opacity }}
              animate={{ opacity: [opacity, 1, opacity] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * (1.5 / lineCount),
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
