"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { updatePassword } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = useRouter();
  const shouldRedirect = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleRequest(e, updatePassword, shouldRedirect ? router : null);
    await handleRequest(e, updatePassword, router);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#4B4ACF]">
      <main className="flex flex-col items-center px-6">
        <div className="w-full max-w-[400px] space-y-16">
          <div className="flex justify-center text-[38px] font-[700] text-white"></div>

          <div className="space-y-6">
            <h1 className="text-[32px] text-center font-[700] text-white">
              Sign in with Password
            </h1>

            <div className="space-y-3">
              <div className="relative py-2"></div>
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          autoComplete="password"
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          autoComplete="new-password"
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 border-white rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none" : ""
                          }`}
                          required
                          aria-describedby="confirm-password-error"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-100" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-100" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[52px] bg-white rounded-[14px] text-[18px] text-[#1A1A1A] font-bold hover:bg-white/95 transition-colors mt-2"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
