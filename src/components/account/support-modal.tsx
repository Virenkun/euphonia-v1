"use client";

import { useState, useEffect } from "react";
import { Send, HelpCircle } from "lucide-react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { SubmitSupportRequest } from "@/services/common/action";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
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
    await SubmitSupportRequest({ category, message });
    setIsSubmitting(false);
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
      setCategory("");
      setMessage("");
    }, 6000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px] bg-gradient-to-br from-indigo-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-indigo-800 dark:text-indigo-200">
            Need Help?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700 dark:text-gray-200">
            {`We're here to assist you with any questions or issues you may have.`}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          ß
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
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-indigo-200 dark:border-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account Related</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    How can we help you?
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question..."
                    required
                    className="w-full h-32 bg-white dark:bg-gray-700 border-indigo-200 dark:border-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-200"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Request <Send className="ml-2 h-4 w-4 inline" />
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
                  <HelpCircle className="w-16 h-16 text-indigo-500" />
                </motion.div>
                <motion.h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Thank You for Reaching Out!
                </motion.h2>
                <motion.p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
                  {`We've received your request and will get back to you as soon as possible.`}
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
