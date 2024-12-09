"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "The email or password you entered is incorrect." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return { error: "An account with this email already exists." };
    }
    return { error: error.message };
  }

  return {
    success: "Please check your email for a confirmation link.",
    email: data.email,
  };
}

export async function confirmSignup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) {
    return { error: "Invalid or expired confirmation code." };
  }

  redirect("/main");
}

export async function resendConfirmationEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Confirmation email resent. Please check your inbox." };
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
        redirectTo: "http://localhost:3000/main",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}
