"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BasicInfo } from "@/components/steps/BasicInfo";
import { ContactInfo } from "@/components/steps/ContactInfo";
import { Interests } from "@/components/steps/Interests";
import { Consent } from "@/components/steps/Consent";
import {
  completeOnboarding,
  skipOnboarding,
} from "@/services/onboarding/action";

const steps = ["Basic Info", "Contact", "Interests", "Consent"];

export interface OnboardingFormValues {
  name: string;
  age: number;
  phone: string;
  gender: string;
  pronouns: string;
  interests: string[];
  currentChallenges: string;
  existingSupport: string;
  preferredLanguage: string;
  dataConsent: boolean;
  termsAgreement: boolean;
  avatar: string | undefined;
  country: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(14, "Age must be at least 14")
    .max(100, "Age must be no more than 100"),
  phone: Yup.string().matches(/^[0-9-+()]*$/, "Invalid phone number format"),
  stressLevel: Yup.number()
    .min(1, "Minimum stress level is 1")
    .max(10, "Maximum stress level is 10"),
  dataConsent: Yup.boolean().oneOf([true], "Data consent is required"),
  termsAgreement: Yup.boolean().oneOf([true], "Terms agreement is required"),
  country: Yup.string().required("Country is required"),
});

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: 18,
      gender: "",
      pronouns: "",
      phone: "",
      interests: [] as string[],
      currentChallenges: "",
      existingSupport: "",
      preferredLanguage: "",
      dataConsent: false,
      termsAgreement: false,
      avatar: avatarUrl,
      country: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await completeOnboarding({ formObject: values });
        // Handle successful submission (e.g., redirect to dashboard)
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show error message to user)
      }
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkipOnboarding = async () => {
    await skipOnboarding();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo formik={formik} setAvatarUrl={setAvatarUrl} />;
      case 1:
        return <ContactInfo formik={formik} />;
      case 2:
        return <Interests formik={formik} />;
      case 3:
        return <Consent formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800">
      <Button
        className="fixed left-10 z-50 top-10 p-5 rounded-xl "
        onClick={handleSkipOnboarding}
      >
        Skip for now
      </Button>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">
            Hey, Dreamer! Welcome to{" "}
            <span className="text-indigo-400">Euphonia</span>
          </h1>
          <p className="text-lg text-white/90 italic">
            {`Let’s make your vibe uniquely yours.`}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-white text-indigo-700"
                      : "bg-indigo-200 text-indigo-700"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-xs text-white/80">{step}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                onClick={formik.submitForm}
                disabled={!formik.isValid || formik.isSubmitting}
                className="bg-white text-base font-medium text-indigo-700 hover:bg-white/90 transition-colors"
              >
                {formik.isSubmitting ? "Submitting..." : "Complete"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-white text-base font-medium text-indigo-700 hover:bg-white/90 transition-colors"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
