"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { handleRequest } from "@/helpers/auth-helpers";
import { requestPasswordUpdate } from "@/services/auth/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
});

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton,
}: Readonly<ForgotPasswordProps>) {
  const router = useRouter();
  const shouldUseRouter = redirectMethod === "client";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const status = searchParams.get("status");
  const status_description = searchParams.get("status_description");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      console.log("onSubmit", values);
      const newFormData = new FormData();
      newFormData.append("email", values.email);
      await handleRequest(
        newFormData,
        requestPasswordUpdate,
        shouldUseRouter ? router : null
      );
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    if (status) {
      setTimeout(() =>
        toast({
          variant: "default",
          title: status,
          description: status_description,
        })
      );
      // router.replace(pathname);
    }
  }, [status, status_description, toast]);

  return (
    <div className="min-h-screen bg-[#4B4ACF]">
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
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      {...formik.getFieldProps("email")}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                disabled={
                  isSubmitting ||
                  disableButton ||
                  !formik.dirty ||
                  !!formik.errors.email
                }
                className="w-full h-[52px] bg-white rounded-[14px] text-[18px] text-[#1A1A1A] font-bold hover:bg-white/95 transition-colors mt-2"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                {isSubmitting ? "Sending..." : "Send Email"}
              </Button>

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
