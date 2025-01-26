"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  confirmOtpSignin,
  confirmSignup,
  resendConfirmationEmail,
} from "@/services/auth/action";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { submitRefer } from "@/services/users/action";

export default function ConfirmPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(60);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const isMagicLink = searchParams.get("isMagicLink");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimeout > 0) {
      timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimeout]);

  const handleConfirm = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    formData.append("email", email ?? "");
    formData.append("phone", phone ?? "");
    if (isMagicLink !== "true") {
      const result = await confirmSignup(formData);

      if (result?.error) {
        setError(result.error);
      }

      if (ref && ref !== "undefined") {
        await submitRefer(ref);
      }
    } else {
      const result = await confirmOtpSignin(formData);
      if (result?.error) {
        setError(result.error);
      }

      if (ref && ref !== "undefined") {
        await submitRefer(ref);
      }
    }
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    setError(null);
    setSuccess(null);
    setIsResending(true);
    const formData = new FormData();
    formData.append("email", email ?? "");
    const result = await resendConfirmationEmail(formData);
    setIsResending(false);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      setResendTimeout(60);
    }
  };

  return (
    <div className="min-h-screen bg-[#4B4ACF] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="absolute left-2 top-2 p-4 rounded-full">
          <Link href="/" className="text-white hover:text-white/80">
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black bg-opacity-20 font-bold hover:bg-white/10 hover:text-white rounded-full"
            >
              <ChevronLeft
                strokeWidth={5}
                size={100}
                className="font-bold text-xl"
              />
            </Button>
          </Link>
        </div>
        <main className="flex flex-col self-center justify-center items-center px-6 gap-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Confirm Your Account
          </h2>
          <form action={handleConfirm} className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg font-medium text-white">
                Enter confirmation code
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} id="token" name="token" required>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full h-[50px] bg-white rounded-[14px] text-[16px] text-[#4B4ACF] font-semibold hover:bg-white/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Confirming..." : "Confirm"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-lg text-white mb-4">Didn’t receive the email?</p>
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={isResending || resendTimeout > 0 || isLoading}
              className="h-[50px] px-6 bg-transparent border-2 border-white rounded-[14px] text-[16px] text-white font-medium hover:bg-white hover:text-[#4B4ACF] transition-colors"
            >
              {isResending
                ? "Resending..."
                : resendTimeout > 0
                ? `Resend in ${resendTimeout}s`
                : "Resend Confirmation Email"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
