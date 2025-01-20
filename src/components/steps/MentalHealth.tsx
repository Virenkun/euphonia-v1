import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";
import { Textarea } from "@/components/ui/textarea";
import { FormikProps } from "formik";

export function MentalHealth({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-white/80"
          htmlFor="currentChallenges"
        >
          Current Challenges
        </label>
        <Textarea
          id="currentChallenges"
          {...formik.getFieldProps("currentChallenges")}
          placeholder="What challenges are you facing right now?"
          className={`w-full h-[80px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-white/80"
          htmlFor="existingSupport"
        >
          Existing Support System
        </label>
        <Textarea
          id="existingSupport"
          {...formik.getFieldProps("existingSupport")}
          placeholder="Describe your existing support system"
          className={`w-full h-[80px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
        />
      </div>
    </div>
  );
}
