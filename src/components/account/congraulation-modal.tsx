import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CongratulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: number;
}

const congratMessages = [
  "Woohoo! You've unlocked {sessions} fantastic therapy sessions! 🎉",
  "Amazing job! {sessions} sessions of self-care coming right up! 🌟",
  "You did it! {sessions} opportunities for growth and healing await you! 💖",
  "Congratulations! {sessions} chances to chat, reflect, and thrive are all yours! 🌈",
  "Bravo! You've earned {sessions} moments of peace and understanding! 🧘‍♀️",
];

export function CongratulationModal({
  isOpen,
  onClose,
  sessions,
}: CongratulationModalProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      const randomMessage =
        congratMessages[Math.floor(Math.random() * congratMessages.length)];
      setMessage(randomMessage.replace("{sessions}", sessions.toString()));
    }
  }, [isOpen, sessions]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-center">
            Congratulations!
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <p className="text-lg mb-4 text-gray-700">{message}</p>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="text-4xl mb-6"
            >
              🎁
            </motion.div>
            <Button onClick={onClose}>Back to Euphonia</Button>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
