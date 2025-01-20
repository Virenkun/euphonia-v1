import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { FormikProps } from "formik";
import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";

export function Interests({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) {
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    if (newInterest && formik.values.interests.length < 5) {
      formik.setFieldValue("interests", [
        ...formik.values.interests,
        newInterest,
      ]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    formik.setFieldValue(
      "interests",
      formik.values.interests.filter((i) => i !== interest)
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80" htmlFor="interest">
          What topics would you like to focus on?
        </label>
        <div className="flex gap-2">
          <Input
            id="interest"
            placeholder="e.g., Mental Health, Personal Growth"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addInterest();
            }}
            disabled={formik.values.interests.length >= 5}
            type="button"
            className="h-[50px] rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {formik.values.interests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="bg-white/20 text-white px-3 py-1"
            >
              {interest}
              <button
                onClick={() => removeInterest(interest)}
                className="ml-2 hover:text-red-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <p className="text-xs text-white/60">
          {`Add up to 5 topics you'd like to explore (e.g., meditation,
          mindfulness, work-life balance)`}
        </p>
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-white/80"
          htmlFor="preferredLanguage"
        >
          Preferred Language
        </label>
        <Input
          id="preferredLanguage"
          {...formik.getFieldProps("preferredLanguage")}
          placeholder="Enter your preferred language"
          className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
        />
      </div>
    </div>
  );
}
