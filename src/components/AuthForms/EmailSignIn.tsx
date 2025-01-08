"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { signInWithEmail, signInWithPhone } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

interface EmailSignInProps {
  readonly allowPassword: boolean;
  readonly redirectMethod: string;
  readonly disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  const router = useRouter();
  const shouldRedirect = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.trim()) {
      setPhone("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.trim()) {
      setEmail("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== "")
      await handleRequest(e, signInWithEmail, shouldRedirect ? router : null);
    if (phone !== "")
      await handleRequest(e, signInWithPhone, shouldRedirect ? router : null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#4B4ACF] min-w-max">
      <div className="p-4">
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

      <main className="flex flex-col items-center px-6">
        <div className="w-full max-w-[400px] space-y-16">
          <div className="flex justify-center text-[38px] font-[700] text-white"></div>

          <div className="space-y-6">
            <h1 className="text-[28px] text-center font-[700] text-white">
              Continue with Email or Phone
            </h1>

            <div className="space-y-3">
              {allowPassword && (
                <Link href="/signin/email_signin">
                  <Button className="w-full h-[52px] bg-white rounded-[14px] flex items-center justify-center space-x-2 hover:bg-white/95 transition-colors">
                    <span className="text-[16px] font-[700] text-[#1A1A1A]">
                      Sign in with Email and Password
                    </span>
                  </Button>
                </Link>
              )}
              <div className="relative py-2"></div>
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="space-y-2">
                      <Input
                        id="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="name@example.com"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
                        required
                      />
                    </div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#4B4ACF] px-4 text-[16px] font-[700] text-white">
                      or
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="phone"
                          placeholder="+917408070150"
                          type="tel"
                          name="phone"
                          autoCapitalize="none"
                          autoComplete="tel"
                          autoCorrect="off"
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || disableButton}
                  className="w-full h-[52px] bg-white rounded-[14px] text-[18px] text-[#1A1A1A] font-bold hover:bg-white/95 transition-colors mt-2"
                >
                  {isSubmitting ? "Setting Up Your Profile..." : "Continue"}
                </Button>
              </form>

              <p className="text-[18px] font-[700] text-center text-white pt-1">
                Do not have an account?{" "}
                <Link
                  href="/signin/signup"
                  className="text-white hover:text-white/80"
                >
                  Regsiter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
