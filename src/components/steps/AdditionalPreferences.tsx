import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";
import { Input } from "@/components/ui/input";
import { FormikProps } from "formik";

export function AdditionalPreferences({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) {
  return (
    <div className="space-y-6">
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
