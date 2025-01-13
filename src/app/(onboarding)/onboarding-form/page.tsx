"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { X, Upload, Loader2, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "@/services/uploader/action";
import { completeOnboarding } from "@/services/onboarding/action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  confirmPhoneChange,
  updateCurrentUserPhone,
} from "@/services/auth/action";

const RequiredIndicator = () => (
  <span className="text-red-500 ml-1" aria-hidden="true">
    *
  </span>
);

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(14, "Age must be at least 18")
    .max(100, "Age must be no more than 100"),
  phone: Yup.string().matches(/^[0-9-+()]*$/, "Invalid phone number format"),
  stressLevel: Yup.number()
    .min(1, "Minimum stress level is 1")
    .max(10, "Maximum stress level is 10"),
  dataConsent: Yup.boolean().oneOf([true], "Data consent is required"),
  termsAgreement: Yup.boolean().oneOf([true], "Terms agreement is required"),
});

export default function OnboardingForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      pronouns: "",
      phone: "",
      communicationStyle: "",
      primaryGoals: "",
      interests: "",
      sessionLength: "",
      schedulingPreferences: "",
      emergencyContact: "",
      currentEmotionalState: "",
      mentalHealthHistory: "",
      currentChallenges: "",
      stressLevel: "",
      existingSupport: "",
      preferredLanguage: "",
      accessibilityNeeds: "",
      interactionPreference: "",
      avatar: avatarUrl,
      dataConsent: false,
      termsAgreement: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await completeOnboarding({ formObject: values });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const addInterest = () => {
    if (newInterest && interests.length < 5) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsUploading(true);
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadProfilePicture(file);
      if (result) {
        setAvatarUrl(result.signedUrl);
      } else {
        alert("Failed to upload profile picture.");
      }
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (avatarUrl) {
      await deleteProfilePicture(avatarUrl);
      setAvatarUrl(undefined);
    }
  };

  if (!isMounted) {
    return null;
  }

  const handleVerifyClick = async () => {
    setIsVerifying(true);
    try {
      const result = await updateCurrentUserPhone(formik.values.phone);
      if (result?.error) {
        setError(result.error);
        setIsVerifying(false);
        return;
      }
      setShowOtpDialog(true);
    } catch (error) {
      console.error("Error verifying phone number:", error);
    }
    setIsVerifying(false);
  };
  const handleOtpSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("token", otp);
      formData.append("phone", formik.values.phone);
      await confirmPhoneChange(formData);
      setIsVerified(true);
      setShowOtpDialog(false);
    } catch (error) {
      console.error("Error verifying phone number:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#4B4ACF] min-w-max">
      <div className="space-y-2 text-center mb-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome to Euphonia
        </h1>
        <p className="text-white">
          Help us personalize your therapeutic experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar Upload Section */}
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
              disabled={formik.isSubmitting}
            />
            <label
              htmlFor="picture-upload"
              className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Picture"}
            </label>
            {avatarUrl && !isUploading && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleRemoveImage}
                disabled={formik.isSubmitting}
              >
                Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-white">
            Optional: Upload a profile picture
          </p>
        </div>

        {/* Basic Information Section */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-normal text-white" htmlFor="name">
              {`What's your name?`}
              <RequiredIndicator />
            </label>
            <Input
              id="name"
              {...formik.getFieldProps("name")}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue =
                  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                formik.setFieldValue("name", formattedValue);
              }}
              disabled={formik.isSubmitting}
              spellCheck="false"
              placeholder="Enter your name"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label className="text-sm font-normal text-white" htmlFor="age">
              Can I know your age?
              <RequiredIndicator />
            </label>
            <Input
              id="age"
              {...formik.getFieldProps("age")}
              disabled={formik.isSubmitting}
              placeholder="Enter your age"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-xs text-red-500">{formik.errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label className="text-sm font-normal text-white" htmlFor="gender">
              Gender (optional)
            </label>
            <Select
              name="gender"
              onValueChange={(value) => formik.setFieldValue("gender", value)}
              disabled={formik.isSubmitting}
            >
              <SelectTrigger
                className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-gray-400 px-4 focus-visible:ring-1 focus-visible:ring-white focus:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              >
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent className="bg-black/40 text-white backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="transgender">Transgender</SelectItem>
                <SelectItem value="genderqueer">Genderqueer</SelectItem>
                <SelectItem value="genderfluid">Genderfluid</SelectItem>
                <SelectItem value="agender">Agender</SelectItem>
                <SelectItem value="bigender">Bigender</SelectItem>
                <SelectItem value="two-spirit">Two-Spirit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pronouns Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-normal text-white"
              htmlFor="pronouns"
            >
              What pronouns do you use?
            </label>
            <Input
              id="pronouns"
              {...formik.getFieldProps("pronouns")}
              disabled={formik.isSubmitting}
              placeholder="e.g., she/her, he/him, they/them"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-sm font-normal text-white" htmlFor="phone">
              Can I have your phone number to keep you updated?
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="phone"
                type="tel"
                {...formik.getFieldProps("phone")}
                disabled={formik.isSubmitting || isVerified}
                placeholder="Enter your phone number"
                className={`flex-grow w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              />
              <Button
                onClick={handleVerifyClick}
                disabled={
                  !formik.values.phone ||
                  isVerifying ||
                  isVerified ||
                  formik.isSubmitting
                }
                className="h-[50px] rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {(() => {
                  if (isVerifying)
                    return <Loader2 className="h-4 w-4 animate-spin" />;
                  if (isVerified)
                    return <Check className="h-4 w-4 text-green-500" />;
                  return "Verify";
                })()}
              </Button>
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-xs text-red-500">{formik.errors.phone}</p>
            )}
            {isVerified && (
              <p className="text-xs text-green-500">
                Phone number verified successfully!
              </p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>

        {/* Interests Section */}
        <div className="space-y-2">
          <label className="text-sm font-normal text-white" htmlFor="interest">
            What topics would you like to focus on?
          </label>
          <div className="flex gap-2">
            <Input
              id="interest"
              placeholder="(e.g., Mental Health,
            Personal Growth, Stress Relief, Motivation)"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              disabled={formik.isSubmitting}
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                addInterest();
              }}
              disabled={interests.length >= 5 || formik.isSubmitting}
              type="button"
              className="h-[50px] rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
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
                  disabled={formik.isSubmitting}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-white">
            {`Add up to 5 topics you'd like to explore (e.g., meditation, mindfulness, work-life balance)`}
          </p>
        </div>

        {/* Mental Health Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-normal text-white"
              htmlFor="currentChallenges"
            >
              Current Challenges
            </label>
            <Textarea
              id="currentChallenges"
              {...formik.getFieldProps("currentChallenges")}
              disabled={formik.isSubmitting}
              placeholder="What challenges are you facing right now?"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-normal text-white"
              htmlFor="existingSupport"
            >
              Existing Support System
            </label>
            <Textarea
              id="existingSupport"
              {...formik.getFieldProps("existingSupport")}
              disabled={formik.isSubmitting}
              placeholder="Describe your existing support system"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
          </div>
        </div>

        {/* Additional Preferences */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-normal text-white"
              htmlFor="preferredLanguage"
            >
              Preferred Language
            </label>
            <Input
              id="preferredLanguage"
              {...formik.getFieldProps("preferredLanguage")}
              disabled={formik.isSubmitting}
              placeholder="Enter your preferred language"
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Checkbox
              id="dataConsent"
              checked={formik.values.dataConsent}
              onCheckedChange={(checked) =>
                formik.setFieldValue("dataConsent", checked)
              }
              disabled={formik.isSubmitting}
            />
            <label
              htmlFor="dataConsent"
              className="text-sm font-normal ml-2 text-white"
            >
              I consent to the use of my data for improving AI and personalized
              therapy
              <RequiredIndicator />
            </label>
          </div>
          {formik.touched.dataConsent && formik.errors.dataConsent && (
            <p className="text-xs text-red-500">{formik.errors.dataConsent}</p>
          )}

          <div className="flex items-center">
            <Checkbox
              id="termsAgreement"
              checked={formik.values.termsAgreement}
              onCheckedChange={(checked) =>
                formik.setFieldValue("termsAgreement", checked)
              }
              disabled={formik.isSubmitting}
            />
            <label
              htmlFor="termsAgreement"
              className="text-sm font-normal ml-2 text-white"
            >
              I agree to the Terms and Conditions
              <RequiredIndicator />
            </label>
          </div>
          {formik.touched.termsAgreement && formik.errors.termsAgreement && (
            <p className="text-xs text-red-500">
              {formik.errors.termsAgreement}
            </p>
          )}
        </div>

        <p className="text-sm text-white mt-4">
          Fields marked with an asterisk (*) are required.
        </p>

        {/* Submit Buttons */}
        <div className="space-y-4 mb-20">
          <Button
            size="lg"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            onClick={formik.submitForm}
            className="w-full h-[50px] rounded-2xl bg-white text-[#4342B9] font-semibold text-md hover:bg-primary/90"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Start Your Journey"
            )}
          </Button>
        </div>
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
            />
            <Button onClick={handleOtpSubmit}>Submit OTP</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
