import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import {
  updateCurrentUserPhone,
  confirmPhoneChange,
} from "@/services/auth/action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormikProps } from "formik";
import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";
import { CountrySelect } from "../select-country";

export function ContactInfo({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

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
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80" htmlFor="phone">
            Can I have your phone number to keep you updated?
          </label>
          <div className="flex items-center space-x-2">
            <Input
              id="phone"
              type="tel"
              {...formik.getFieldProps("phone")}
              disabled={isVerified}
              className={`flex-grow w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              placeholder="Enter your phone number"
            />
            <Button
              onClick={handleVerifyClick}
              disabled={!formik.values.phone || isVerifying || isVerified}
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
            <p className="text-xs text-red-300">{formik.errors.phone}</p>
          )}
          {isVerified && (
            <p className="text-xs text-green-400">
              Phone number verified successfully!
            </p>
          )}
          {error && <p className="text-xs text-red-300">{error}</p>}
        </div>

        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="bg-indigo-700 text-white">
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`flex-grow w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              />
              <Button
                onClick={handleOtpSubmit}
                className="bg-white text-indigo-700 hover:bg-white/90"
              >
                Submit OTP
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <CountrySelect
          onValueChange={(value) => formik.setFieldValue("country", value)}
        />
      </div>
    </>
  );
}
