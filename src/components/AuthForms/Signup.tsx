"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { signUp } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter();
  const shouldUseRouter = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

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
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    await handleRequest(e, signUp, shouldUseRouter ? router : null);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() =>
        toast({
          variant: "destructive",
          title: error,
          description: error_description,
        })
      );
    }
  }, [error, error_description, toast]);

  return (
    <div className="lg:w-1/2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full filter blur-2xl opacity-30"></div>

        <Card className="w-full min-w-max relative">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Get started for free
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className={`w-full ${emailError ? "border-red-500" : ""}`}
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
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    className={`w-full pr-10 ${
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
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    className={`w-full pr-10 ${
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
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
              <Button
                type="submit"
                className="w-full bg-black text-white"
                disabled={
                  isSubmitting ||
                  !!emailError ||
                  !!passwordError ||
                  !!confirmPasswordError
                }
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Google
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-center text-sm text-gray-600 font-medium">
                Already have an account?
              </p>
              <div className="mt-2 space-y-2">
                <Link
                  href="/signin/password_signin"
                  className="block text-center text-sm text-blue-600 hover:underline"
                >
                  Sign in with email and password
                </Link>
                {allowEmail && (
                  <Link
                    href="/signin/email_signin"
                    className="block text-center text-sm text-blue-600 hover:underline"
                  >
                    Sign in with OTP
                  </Link>
                )}
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-600">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
