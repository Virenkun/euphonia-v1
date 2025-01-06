"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { signInWithEmail, signInWithPhone } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
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
      setPhone(""); // Clear phone field if email is entered
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.trim()) {
      setEmail(""); // Clear email field if phone is entered
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.target);
    e.preventDefault();
    console.log("email", email);
    console.log("phone", phone);
    if (email !== "")
      await handleRequest(e, signInWithEmail, shouldRedirect ? router : null);
    if (phone !== "")
      await handleRequest(e, signInWithPhone, shouldRedirect ? router : null);
    setIsSubmitting(false);
  };

  return (
    // <Card className="w-full min-w-max">
    //   <CardHeader className="space-y-1">
    //     <CardTitle className="text-2xl font-bold text-center">
    //       Sign in to your account
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <form noValidate onSubmit={handleSubmit} className="space-y-2">
    //       <div className="space-y-2 mb-4">
    //         <label htmlFor="email" className="text-sm font-medium">
    //           Email
    //         </label>
    //         <Input
    //           id="email"
    //           placeholder="name@example.com"
    //           type="email"
    //           name="email"
    //           autoCapitalize="none"
    //           autoComplete="email"
    //           autoCorrect="off"
    //           value={email}
    //           onChange={handleEmailChange}
    //           className="w-full"
    //         />
    //       </div>
    //       <div className="relative">
    //         <div className="absolute inset-0 flex items-center">
    //           <span className="w-full border-t border-gray-300" />
    //         </div>
    //         <div className="relative flex justify-center text-sm">
    //           <span className="px-2 bg-white text-gray-500">OR</span>
    //         </div>
    //       </div>
    //       <div className="space-y-2">
    //         <label htmlFor="phone" className="text-sm font-medium">
    //           Phone
    //         </label>
    //         <Input
    //           id="phone"
    //           placeholder="+917408070150"
    //           type="tel"
    //           name="phone"
    //           autoCapitalize="none"
    //           autoComplete="tel"
    //           autoCorrect="off"
    //           value={phone}
    //           onChange={handlePhoneChange}
    //           className="w-full"
    //         />
    //       </div>
    //       <Button
    //         type="submit"
    //         className="w-full bg-black text-white "
    //         disabled={isSubmitting || disableButton}
    //       >
    //         {isSubmitting ? "Signing in..." : "Sign in"}
    //       </Button>
    //     </form>
    //     {allowPassword && (
    //       <div className="mt-4 space-y-2">
    //         <Link
    //           href="/signin/password_signin"
    //           className="block text-center text-sm text-blue-600 hover:underline"
    //         >
    //           Sign in with email and password
    //         </Link>
    //         <Link
    //           href="/signin/signup"
    //           className="block text-center text-sm text-blue-600 hover:underline"
    //         >
    //           Dont have an account? Sign up
    //         </Link>
    //       </div>
    //     )}
    //     <p className="mt-6 text-center text-xs text-gray-600">
    //       By continuing, you agree to our{" "}
    //       <Link href="/terms" className="underline">
    //         Terms of Service
    //       </Link>{" "}
    //       and{" "}
    //       <Link href="/privacy" className="underline">
    //         Privacy Policy
    //       </Link>
    //       .
    //     </p>
    //   </CardContent>
    // </Card>
    <div className="min-h-screen bg-[#4B4ACF] min-w-max">
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <main className="flex flex-col items-center px-6">
        <div className="w-full max-w-[400px] space-y-16">
          <div className="flex justify-center text-[38px] font-[700] text-white"></div>

          <div className="space-y-6">
            <h1 className="text-[28px] text-center font-[700] text-white">
              Continue with Email or Phone
            </h1>

            <div className="space-y-3">
              <Link href="/signin/email_signin">
                <Button className="w-full h-[52px] bg-white rounded-[14px] flex items-center justify-center space-x-2 hover:bg-white/95 transition-colors">
                  <span className="text-[16px] font-[700] text-[#1A1A1A]">
                    Sign in with Email and Password
                  </span>
                </Button>
              </Link>

              {/* <Button
                className="w-full h-[52px] bg-white rounded-[14px] flex items-center justify-center space-x-3 hover:bg-white/95 transition-colors"
                onClick={handleGoogleSignIn}
                isLoading={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span className="text-[16px] font-[700] text-[#1A1A1A]">
                  Continue with Google
                </span>
              </Button> */}

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
                        className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4`}
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
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4`}
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
