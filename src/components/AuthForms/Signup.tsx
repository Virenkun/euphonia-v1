"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { signInWithOAuth, signUp } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ redirectMethod }: Readonly<SignUpProps>) {
  const router = useRouter();
  const shouldUseRouter = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");
  const pathname = usePathname();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!re.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    await handleRequest(e, signUp, shouldUseRouter ? router : null, ref);
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoadingOAuth(true);
    await signInWithOAuth("google");
  };

  // const handleLoginAsGuest = async () => {
  //   setIsLoadingOAuth(true);
  //   await loginAsGuest();
  // };

  useEffect(() => {
    if (error) {
      setTimeout(() =>
        toast({
          variant: "destructive",
          title: error,
          description: error_description,
        })
      );
      router.replace(pathname);
    }
  }, [error, error_description, toast]);

  return (
    <div>
      <main className="flex flex-col items-center px-6">
        <div className="w-full max-w-[400px] space-y-16">
          <div className="flex justify-center text-[38px] font-[700] text-white"></div>

          <div className="space-y-6">
            <h1 className="text-[32px] text-center font-[700] text-white">
              Create an account
            </h1>

            <div className="space-y-3">
              <Link href="/signin/email_signin">
                <Button className="w-full h-[52px] bg-white rounded-[14px] flex items-center justify-center space-x-2 hover:bg-white/95 transition-colors">
                  <Mail className="h-8 w-8 text-black" />
                  <span className="text-[16px] font-[700] text-[#1A1A1A]">
                    Continue with OTP
                  </span>
                </Button>
              </Link>

              <Button
                className="w-full h-[52px] bg-white rounded-[14px] flex items-center justify-center space-x-3 hover:bg-white/95 transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isLoadingOAuth}
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
                  {isLoadingOAuth ? "Signing Up...." : "Continue with Google"}
                </span>
              </Button>
              {/* <Button
                className="w-full h-[52px] bg-black rounded-[14px] flex items-center justify-center space-x-2 hover:bg-black/95 transition-colors"
                onClick={handleLoginAsGuest}
              >
                <UserRound className="h-8 w-8 text-white" />
                <span className="text-[16px] font-[700] text-white">
                  Continue as Guest
                </span>
              </Button> */}

              <div className="relative py-2">
                <div className="relative flex justify-center">
                  <span className="bg-[#4B4ACF] px-4 text-[16px] font-[700] text-white">
                    or
                  </span>
                </div>
              </div>
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
                        className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none ${
                          emailError ? "border-red-500" : ""
                        }`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        required
                        aria-invalid={emailError ? "true" : "false"}
                        aria-describedby="email-error"
                      />
                      {emailError && (
                        <p id="email-error" className="text-sm text-red-500">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          autoComplete="new-password"
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none ${
                            passwordError ? "border-red-500" : ""
                          }`}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                          }}
                          required
                          aria-invalid={passwordError ? "true" : "false"}
                          aria-describedby="password-error"
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
                            <EyeOffIcon className="h-4 w-4 text-gray-100" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-100" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p id="password-error" className="text-sm text-red-500">
                          {passwordError}
                        </p>
                      )}
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
                          className={`w-full pr-10 h-[52px] bg-[#4342B9] border-0 border-white rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none ${
                            confirmPasswordError ? "border-red-500" : ""
                          }`}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateConfirmPassword(e.target.value);
                          }}
                          required
                          aria-invalid={confirmPasswordError ? "true" : "false"}
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
                      {confirmPasswordError && (
                        <p
                          id="confirm-password-error"
                          className="text-sm text-red-500"
                        >
                          {confirmPasswordError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[13px] text-center text-white/60 pt-1">
                  By signing up or logging in, you agree to our{" "}
                  <Link
                    href="/terms-of-services"
                    className="underline hover:text-white/80"
                  >
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-white/80"
                  >
                    Privacy policy
                  </Link>
                </p>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !!emailError ||
                    !!passwordError ||
                    !!confirmPasswordError ||
                    !email ||
                    !password ||
                    !confirmPassword
                  }
                  className="w-full h-[52px] bg-white rounded-[14px] text-[18px] text-[#1A1A1A] font-bold hover:bg-white/95 transition-colors mt-2"
                >
                  {isSubmitting ? "Setting Up Your Profile..." : "Continue"}
                </Button>
              </form>
              <div className="mt-20">
                <Link
                  href="/signin/password_signin"
                  className="text-white hover:text-white/80"
                >
                  <p className="text-[18px] font-[700] text-center text-white pt-1">
                    Have an account? Log in
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
