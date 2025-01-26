"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { RainbowButton } from "../ui/rainbow-button";

interface ReferModalProps {
  isOpen: boolean;
  onClose: () => void;
  referInfo: {
    id: string;
    points: number;
    claimed: number;
    refers: number;
  };
}

export function ReferModal({ isOpen, onClose, referInfo }: ReferModalProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [localRewardPoints, setLocalRewardPoints] = useState(
    referInfo.points - referInfo.claimed
  );

  const shareLink = `https://euphonia.me/signin/signup?ref=${referInfo.id}`;

  useEffect(() => {
    setLocalRewardPoints(referInfo.points - referInfo.claimed);
  }, [referInfo]);

  const handleShare = async (platform: string) => {
    let url = "";
    const text = encodeURIComponent(
      "🎉 Discover Euphonia - Your AI Therapist! 🌟 Feel lighter, stress less, and thrive with personalized support. Try it now! 💬 #MentalWellness"
    );

    const encodedLink = encodeURIComponent(shareLink);

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "instagram":
        url = "https://www.instagram.com/";
        break;
      case "x":
        url = `https://twitter.com/intent/tweet?url=${encodedLink}&text=${text}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}&title=${text}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${text} ${encodedLink}`;
        break;
    }
    window.open(url, "_blank");
    setLocalRewardPoints((prev) => prev + 10);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    setLocalRewardPoints((prev) => prev + 5);
  };

  const handleClaimRewards = async () => {
    setIsClaiming(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Rewards claimed successfully");
      setLocalRewardPoints(0);
    } catch (error) {
      console.error("Error claiming rewards:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Spread the word and get rewarded!
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Share Euphonia with ease across platforms, earn points, and claim
              rewards—all in one sleek, user-friendly modal.
            </p>
            <div className="flex items-center space-x-2">
              <Input value={shareLink} readOnly className="flex-grow" />
              <Button onClick={handleCopyLink} size="icon" variant="outline">
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isCopied ? "Copied" : "Copy share link"}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Image
              src="social/fb_icon.svg"
              alt="Facebook"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() => handleShare("facebook")}
            />

            <Image
              src="social/instgram_icon_2.svg"
              alt="Instagram"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() => handleShare("instagram")}
            />
            <Image
              src="social/x_logo.svg"
              alt="Twitter"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() => handleShare("x")}
            />
            <Image
              src="social/linkedin_icon.svg"
              alt="LinkedIn"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() => handleShare("linkedin")}
            />
            <Image
              src="social/whatsapp_icon.svg"
              alt="LinkedIn"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() => handleShare("whatsapp")}
            />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">Your Rewards Point</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Earn more points by sharing with friends!
                </div>
              </div>
              <div className="text-4xl font-bold text-primary">
                {localRewardPoints}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">How it Works</h2>
            <ol className="list-decimal space-y-2 pl-4 text-sm">
              <li>Copy your unique referral link or share directly.</li>
              <li>
                Send it to your friends via platforms like WhatsApp, Facebook,
                etc.
              </li>
              <li>
                Earn reward points for every suucessful signup and session used
              </li>
              <li>Claim your rewards points and get free sessions</li>
            </ol>
          </div>
        </div>
        <div className="text-center mt-4">
          <RainbowButton
            onClick={handleClaimRewards}
            disabled={isClaiming || localRewardPoints === 0}
          >
            {isClaiming ? "Claiming..." : "Claim Rewards"}
          </RainbowButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
