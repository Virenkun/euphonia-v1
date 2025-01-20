import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikProps } from "formik";

export function Consent({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="dataConsent"
          checked={formik.values.dataConsent}
          onCheckedChange={(checked) =>
            formik.setFieldValue("dataConsent", checked)
          }
          className="border-white/30 text-indigo-700"
        />
        <label htmlFor="dataConsent" className="text-sm text-white/80">
          I consent to the use of my data for improving AI and personalized
          therapy
        </label>
      </div>
      {formik.touched.dataConsent && formik.errors.dataConsent && (
        <p className="text-xs text-red-300">{formik.errors.dataConsent}</p>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="termsAgreement"
          checked={formik.values.termsAgreement}
          onCheckedChange={(checked) =>
            formik.setFieldValue("termsAgreement", checked)
          }
          className="border-white/30 text-indigo-700"
        />
        <label htmlFor="termsAgreement" className="text-sm text-white/80">
          I agree to the Terms and Conditions
        </label>
      </div>
      {formik.touched.termsAgreement && formik.errors.termsAgreement && (
        <p className="text-xs text-red-300">{formik.errors.termsAgreement}</p>
      )}
    </div>
  );
}
