"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Upload } from "lucide-react";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "@/services/uploader/action";
import { completeOnboarding } from "@/services/onboarding/action";

export default function OnboardingForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addInterest = () => {
    if (newInterest && interests.length < 5) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmitPicture = async (file: File | null) => {
    if (!file) return;

    const result = await uploadProfilePicture(file);
    if (!result) {
      alert("Failed to upload profile picture.");
      return;
    }
    const { signedUrl: profilePictureUrl } = result;
    setAvatarUrl(profilePictureUrl);
    console.log(profilePictureUrl);

    if (!profilePictureUrl) {
      alert("Failed to upload profile picture.");
      return;
    }
  };

  const handleRemoveImage = async () => {
    if (!avatarUrl) return;
    await deleteProfilePicture(avatarUrl);
    setAvatarUrl(null);
    setProfilePicture(null);
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      await handleSubmitPicture(file);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Append interests array as a comma-separated string
    formData.append("interests", interests.join(","));

    if (avatarUrl) {
      formData.append("avatar", avatarUrl);
    }

    const formObject = Object.fromEntries(formData.entries());
    console.log("Form Data:", formObject);

    await completeOnboarding({ formObject });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <form
        className="w-full max-w-md space-y-8"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to AI Therapy
          </h1>
          <p className="text-muted-foreground">
            Help us personalize your therapeutic experience
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl ?? undefined} />
              <AvatarFallback>
                <Upload className="w-8 h-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="picture-upload"
              />
              <label
                htmlFor="picture-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {isUploading ? "Uploading..." : "Upload Picture"}
              </label>
              {profilePicture && !isUploading && (
                <Button variant="outline" size="lg" onClick={handleRemoveImage}>
                  Remove
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Optional: Upload a profile picture
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Your name
            </label>
            <Input id="name" name="name" placeholder="Enter your name" />
            <p className="text-xs text-muted-foreground">
              Your preferred name for sessions
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="age">
              Age
            </label>
            <Select name="age">
              <SelectTrigger>
                <SelectValue placeholder="Select your age" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 150 }, (_, i) => (
                  <SelectItem key={i + 13} value={(i + 13).toString()}>
                    {i + 13} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Preferred Communication Style
            </label>
            <Select name="communicationStyle">
              <SelectTrigger>
                <SelectValue placeholder="Choose communication style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">
                  Direct and Straightforward
                </SelectItem>
                <SelectItem value="empathetic">Warm and Empathetic</SelectItem>
                <SelectItem value="casual">Casual and Friendly</SelectItem>
                <SelectItem value="professional">
                  Professional and Formal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Goals</label>
            <Select name="primaryGoals">
              <SelectTrigger>
                <SelectValue placeholder="Select your main goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxiety">Managing Anxiety</SelectItem>
                <SelectItem value="depression">
                  Dealing with Depression
                </SelectItem>
                <SelectItem value="stress">Stress Management</SelectItem>
                <SelectItem value="relationships">
                  Relationship Issues
                </SelectItem>
                <SelectItem value="self-growth">Personal Growth</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Areas of Interest</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add an interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addInterest()}
              />
              <Button
                onClick={addInterest}
                disabled={interests.length >= 5}
                type="button"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="px-3 py-1">
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {`Add up to 5 topics you'd like to explore (e.g., meditation, mindfulness, work-life balance)`}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Preferred Session Length
            </label>
            <Select name="sessionLength">
              <SelectTrigger>
                <SelectValue placeholder="Choose session length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Button className="w-full" size="lg" type="submit">
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              type="button"
            >
              Skip for Now
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
