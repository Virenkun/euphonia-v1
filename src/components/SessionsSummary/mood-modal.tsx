"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

const moods = [
  { emoji: "😊", text: "Happy", color: "bg-yellow-100" },
  { emoji: "😐", text: "Neutral", color: "bg-gray-100" },
  { emoji: "😢", text: "Sad", color: "bg-blue-100" },
  { emoji: "😡", text: "Angry", color: "bg-red-100" },
  { emoji: "😴", text: "Tired", color: "bg-purple-100" },
  { emoji: "🤔", text: "Confused", color: "bg-green-100" },
];

interface MoodModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MoodModal({ isOpen, setIsOpen }: MoodModalProps) {
  const handleMoodSelect = (mood: string) => {
    setTimeout(() => setIsOpen(false), 500); // Delay closing for animation
    // Here you can add logic to handle the selected mood, e.g., send it to a server
    console.log(`Selected mood: ${mood}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-none hover:from-purple-500 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          How are you feeling?
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-clip-text">
            How are you feeling now?
          </DialogTitle>
        </DialogHeader>
        <motion.div
          className="grid grid-cols-3 gap-4 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {moods.map((mood) => (
              <motion.div
                key={mood.text}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className={`w-full h-28 flex flex-col items-center justify-center text-center rounded-xl border-2 border-transparent hover:border-purple-400 transition-all duration-300 ${mood.color}`}
                  onClick={() => handleMoodSelect(mood.text)}
                >
                  <span className="text-5xl mb-2">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.text}</span>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
