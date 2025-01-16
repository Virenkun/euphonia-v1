"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { SubmitFeedbackByGuest } from "@/services/common/action";
import { useToast } from "@/hooks/use-toast";

const emojis = [
  { emotion: "Disappointed", icon: "😣" },
  { emotion: "Neutral", icon: "🙂" },
  { emotion: "Good", icon: "👌" },
  { emotion: "Great", icon: "👍" },
  { emotion: "Amazing", icon: "🔥" },
];

interface FeedbackPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserFeedbackPage({
  open,
  onOpenChange,
}: FeedbackPageProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [useFul, setuseFul] = useState(false);
  const [recommend, setrecommend] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    await SubmitFeedbackByGuest({
      mood: selectedEmotion!,
      exprience: feedback,
      accessibilty: useFul ? "yes" : "no",
      recommendation: recommend ? "yes" : "no",
    });
    onOpenChange(false);
    toast({
      variant: "default",
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]  flex flex-col p-0 bg-[#4C4ACF] border-none text-white py-6">
        <DialogHeader className="text-2xl md:text-3xl font-semibold text-white4">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center bg-[#4C4ACF] p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                Help us improve!
              </h1>
              <p className="text-white/80 font-light text-sm py-2">
                {`Got thoughts to share? Let us know how Euphonia’s doing whether it's soothing your soul or cracking you up. Your feedback keeps our Euphonia sharp and ready for all your deep dives and daydreams!`}
              </p>
            </div>

            <div className="flex justify-between gap-2">
              {emojis.map(({ emotion, icon }) => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedEmotion === emotion
                      ? "bg-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <span className="text-2xl" role="img" aria-label={emotion}>
                    {icon}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/80">
                {`What's your overall experience?`}
              </p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your thoughts..."
                className="min-h-[120px] resize-none bg-white/10 border-0 text-white placeholder:text-white/60 focus-visible:ring-1 focus-visible:ring-white"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contact"
                  checked={useFul}
                  onCheckedChange={(checked) => setuseFul(checked as boolean)}
                  className="border-white/60 data-[state=checked]:bg-white data-[state=checked]:text-[#4C4ACF]"
                />
                <label htmlFor="contact" className="text-sm text-white/80">
                  Euphonia is easy to use and has a great user interface.
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="beta"
                  checked={recommend}
                  onCheckedChange={(checked) =>
                    setrecommend(checked as boolean)
                  }
                  className="border-white/60 data-[state=checked]:bg-white data-[state=checked]:text-[#4C4ACF]"
                />
                <label htmlFor="beta" className="text-sm text-white/80">
                  {`I'll recommend Euphonia to my friends and family.`}
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-white hover:bg-white/90 text-[#4C4ACF]"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
