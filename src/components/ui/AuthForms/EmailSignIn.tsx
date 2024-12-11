"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { signInWithEmail, signInWithPhone } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Separator from "./Separator";

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
    console.log(email);
    console.log(phone);
    if (email !== "")
      await handleRequest(e, signInWithEmail, shouldRedirect ? router : null);
    if (phone !== "")
      await handleRequest(e, signInWithPhone, shouldRedirect ? router : null);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full min-w-max">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign in to your account
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
              value={email}
              onChange={handleEmailChange}
              className="w-full"
            />
          </div>
          <Separator text="OR" />
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
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
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white"
            disabled={isSubmitting || disableButton}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        {allowPassword && (
          <div className="mt-4 space-y-2">
            <Link
              href="/signin/password_signin"
              className="block text-center text-sm text-gray-600 hover:underline"
            >
              Sign in with email and password
            </Link>
            <Link
              href="/signin/signup"
              className="block text-center text-sm text-gray-600 hover:underline"
            >
              Dont have an account? Sign up
            </Link>
          </div>
        )}
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
  );
}
