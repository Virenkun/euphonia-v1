"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { requestPasswordUpdate } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton,
}: Readonly<ForgotPasswordProps>) {
  const router = useRouter();
  const shouldUseRouter = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    await handleRequest(
      e,
      requestPasswordUpdate,
      shouldUseRouter ? router : null
    );
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#4B4ACF] min-w-max">
      <div className="p-4 rounded-full">
        <Link href="/" className="text-white hover:text-white/80">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black bg-opacity-20 font-bold hover:bg-white/10 hover:text-white rounded-full m-4"
          >
            <ChevronLeft
              strokeWidth={5}
              size={100}
              className="font-bold text-xl"
            />
          </Button>
        </Link>
      </div>

      <main className="flex flex-col items-center px-6 gap-4">
        <div className="w-full max-w-[400px] space-y-16">
          <div className="flex justify-center text-[38px] font-[700] text-white"></div>

          <div className="space-y-6">
            <h1 className="text-[32px] text-center font-[700] text-white">
              Forgot Password
            </h1>

            <div className="space-y-3">
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="space-y-2">
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        name="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || disableButton}
                  className="w-full h-[52px] bg-white rounded-[14px] text-[18px] text-[#1A1A1A] font-bold hover:bg-white/95 transition-colors mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Email"}
                </Button>
              </form>
              <div className="mt-8">
                <Link
                  href="/signin/password_signin"
                  className="text-white hover:text-white/80"
                >
                  <p className="text-[18px] font-[700] text-center text-white pt-2">
                    Sign in with email and password
                  </p>
                </Link>
              </div>

              {allowEmail && (
                <Link
                  href="//signin/email_signin"
                  className="text-white hover:text-white/80"
                >
                  <p className="text-[18px] font-[700] text-center text-white mt-2">
                    Sign in with OTP
                  </p>
                </Link>
              )}

              <Link
                href="/signin/signup"
                className="text-white hover:text-white/80"
              >
                <p className="text-[18px] font-[700] text-center text-white mt-2">
                  Do not have an account? Regsiter
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
