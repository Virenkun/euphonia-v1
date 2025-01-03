"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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

export default function ConfirmPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isMagicLink = searchParams.get("isMagicLink");

  const handleConfirm = async (formData: FormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    formData.append("email", email || "");
    if (isMagicLink !== "true") {
      const result = await confirmSignup(formData);
      setIsLoading(false);
      if (result?.error) {
        setError(result.error);
      }
    } else {
      const result = await confirmOtpSignin(formData);
      setIsLoading(false);
      if (result?.error) {
        setError(result.error);
      }
    }
  };

  const handleResendEmail = async () => {
    setError(null);
    setSuccess(null);
    setIsResending(true);
    const formData = new FormData();
    formData.append("email", email || "");
    const result = await resendConfirmationEmail(formData);
    setIsResending(false);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Confirm Your Email</CardTitle>
          <CardDescription>
            Enter the confirmation code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleConfirm}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="token">Confirmation Code</Label>
                <div className="space-y-2 flex align-middle justify-center">
                  <InputOTP maxLength={6} id="token" name="token" required>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="mt-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm Email"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Didnt receive the email?</p>
          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend Confirmation Email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
