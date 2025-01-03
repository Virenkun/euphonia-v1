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
  age: Yup.string().required("Age is required"),
  primaryGoal: Yup.string().required("Primary goal is required"),
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
      age: undefined,
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

  console.log(formik);

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to Euphonia
        </h1>
        <p className="text-muted-foreground">
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
              className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${
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
          <p className="text-xs text-muted-foreground">
            Optional: Upload a profile picture
          </p>
        </div>

        {/* Basic Information Section */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Your name
              <RequiredIndicator />
            </label>
            <Input
              id="name"
              {...formik.getFieldProps("name")}
              disabled={formik.isSubmitting}
              placeholder="Enter your name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="age">
              Age
              <RequiredIndicator />
            </label>
            <Select
              name="age"
              onValueChange={(value) => formik.setFieldValue("age", value)}
              disabled={formik.isSubmitting}
            >
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
            {formik.touched.age && formik.errors.age && (
              <p className="text-xs text-red-500">{formik.errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="gender">
              Gender (optional)
            </label>
            <Select
              name="gender"
              onValueChange={(value) => formik.setFieldValue("gender", value)}
              disabled={formik.isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
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
            <label className="text-sm font-medium" htmlFor="pronouns">
              Preferred Pronouns
            </label>
            <Input
              id="pronouns"
              {...formik.getFieldProps("pronouns")}
              disabled={formik.isSubmitting}
              placeholder="e.g., she/her, he/him, they/them"
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phone">
              Phone Number (optional)
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="phone"
                type="tel"
                {...formik.getFieldProps("phone")}
                disabled={formik.isSubmitting || isVerified}
                placeholder="Enter your phone number"
                className="flex-grow"
              />
              <Button
                onClick={handleVerifyClick}
                disabled={
                  !formik.values.phone ||
                  isVerifying ||
                  isVerified ||
                  formik.isSubmitting
                }
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

        {/* Therapy Preferences Section */}
        <div className="space-y-4">
          {/* Primary Goal Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Primary Goals
              <RequiredIndicator />
            </label>
            <Select
              name="primaryGoal"
              onValueChange={(value) =>
                formik.setFieldValue("primaryGoal", value)
              }
              disabled={formik.isSubmitting}
            >
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
            {formik.touched.primaryGoals && formik.errors.primaryGoals && (
              <p className="text-xs text-red-500">
                {formik.errors.primaryGoals}
              </p>
            )}
          </div>

          {/* Chat Tone Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="chatTone">
              Preferred Communication Style
            </label>
            <Select
              name="chatTone"
              onValueChange={(value) => formik.setFieldValue("chatTone", value)}
              disabled={formik.isSubmitting}
            >
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

          {/* Session Length Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="sessionLength">
              Preferred Session Length
            </label>
            <Select
              name="sessionLength"
              onValueChange={(value) =>
                formik.setFieldValue("sessionLength", value)
              }
              disabled={formik.isSubmitting}
            >
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
        </div>

        {/* Interests Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium " htmlFor="interest">
            Areas of Interest
          </label>
          <div className="flex gap-2">
            <Input
              id="interest"
              placeholder="Add an interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              disabled={formik.isSubmitting}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                addInterest();
              }}
              disabled={interests.length >= 5 || formik.isSubmitting}
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
                  disabled={formik.isSubmitting}
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

        {/* Scheduling and Emergency Contact */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="schedulingPreferences"
            >
              Scheduling Preferences
            </label>
            <Input
              id="schedulingPreferences"
              {...formik.getFieldProps("schedulingPreferences")}
              disabled={formik.isSubmitting}
              placeholder="e.g., weekday evenings, weekends"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="emergencyContact">
              Emergency Contact (optional)
            </label>
            <Input
              id="emergencyContact"
              {...formik.getFieldProps("emergencyContact")}
              disabled={formik.isSubmitting}
              placeholder="Enter your emergency contact"
            />
          </div>
        </div>

        {/* Mental Health Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="currentEmotionalState"
            >
              Current Emotional State
            </label>
            <Select
              name="currentEmotionalState"
              onValueChange={(value) =>
                formik.setFieldValue("currentEmotionalState", value)
              }
              disabled={formik.isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="How are you feeling?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="stressed">Stressed</SelectItem>
                <SelectItem value="anxious">Anxious</SelectItem>
                <SelectItem value="sad">Sad</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="mentalHealthHistory"
            >
              Mental Health History (optional)
            </label>
            <Textarea
              id="mentalHealthHistory"
              {...formik.getFieldProps("mentalHealthHistory")}
              disabled={formik.isSubmitting}
              placeholder="Briefly describe your mental health history"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="currentChallenges">
              Current Challenges
            </label>
            <Textarea
              id="currentChallenges"
              {...formik.getFieldProps("currentChallenges")}
              disabled={formik.isSubmitting}
              placeholder="What challenges are you facing right now?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="stressLevel">
              Stress Level (1-10)
            </label>
            <Input
              id="stressLevel"
              type="number"
              min="1"
              max="10"
              {...formik.getFieldProps("stressLevel")}
              disabled={formik.isSubmitting}
              placeholder="Enter your stress level"
            />
            {formik.touched.stressLevel && formik.errors.stressLevel && (
              <p className="text-xs text-red-500">
                {formik.errors.stressLevel}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="existingSupport">
              Existing Support System
            </label>
            <Textarea
              id="existingSupport"
              {...formik.getFieldProps("existingSupport")}
              disabled={formik.isSubmitting}
              placeholder="Describe your existing support system"
            />
          </div>
        </div>

        {/* Additional Preferences */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="preferredLanguage">
              Preferred Language
            </label>
            <Input
              id="preferredLanguage"
              {...formik.getFieldProps("preferredLanguage")}
              disabled={formik.isSubmitting}
              placeholder="Enter your preferred language"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="accessibilityNeeds">
              Accessibility Needs (optional)
            </label>
            <Input
              id="accessibilityNeeds"
              {...formik.getFieldProps("accessibilityNeeds")}
              disabled={formik.isSubmitting}
              placeholder="Describe your accessibility needs"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="interactionPreference"
            >
              Voice or Text Interaction Preference
            </label>
            <Select
              name="interactionPreference"
              onValueChange={(value) =>
                formik.setFieldValue("interactionPreference", value)
              }
              disabled={formik.isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose interaction preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice">Voice</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
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
            <label htmlFor="dataConsent" className="text-sm font-medium ml-2">
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
              className="text-sm font-medium ml-2"
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

        <p className="text-sm text-muted-foreground mt-4">
          Fields marked with an asterisk (*) are required.
        </p>

        {/* Submit Buttons */}
        <div className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            onClick={formik.submitForm}
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
            />
            <Button onClick={handleOtpSubmit}>Submit OTP</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
