"use client";

import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitFeedbackByUser } from "@/services/common/action";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowThankYou(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await SubmitFeedbackByUser({ rating: rating.toString(), comment });
    setIsSubmitting(false);
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
      setRating(0);
      setComment("");
    }, 6000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-center text-indigo-800 dark:text-indigo-200">
            Your Voice Matters!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700 text-lg dark:text-gray-200">
            Help us fine-tune Euphonia with your valuable feedback.
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <motion.div
            key={showThankYou ? "thank-you" : "form"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {!showThankYou ? (
              <motion.form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-base text-gray-700 dark:text-gray-200">
                    How was your Euphonia experience?
                  </h4>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(value)}
                        className={`p-1 rounded-full transition-colors focus:outline-none  ${
                          rating >= value
                            ? "text-indigo-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        aria-label={`Rate ${value} star${
                          value !== 1 ? "s" : ""
                        }`}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating >= value ? "fill-current" : ""
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="comment"
                    className="text-base font-medium text-gray-700 dark:text-gray-200"
                  >
                    How can we amplify your experience?
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on Euphonia's performance..."
                    className="w-full h-32 bg-white dark:bg-gray-700 border-indigo-200 dark:border-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-200"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Feedback <Send className="ml-2 h-4 w-4 inline" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </motion.form>
            ) : (
              <motion.div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg
                    className="w-16 h-16 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <motion.h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Thank You!
                </motion.h2>
                <motion.p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
                  {`Your feedback is music to our ears. We'll use it to make
                  Euphonia even better!`}
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
