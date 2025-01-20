"use server";

import { createClient } from "@/utils/supabase/server";

interface SubmitFeedbackByUser {
  rating: string;
  comment: string;
}

export async function SubmitFeedbackByUser({
  rating,
  comment,
}: SubmitFeedbackByUser) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error(`Supabase Error: ${error.message}`);
    return;
  }

  if (!user) {
    console.error("User is not authenticated.");
    return;
  }

  const { error: insertError } = await supabase.from("feedback").insert([
    {
      user_id: user.id,
      rating: rating,
      comments: comment,
    },
  ]);

  if (insertError) {
    console.error(
      `Error While Submitting the Feedback: ${insertError.message}`
    );
  }
}

interface GuestFeedback {
  mood: string;
  exprience: string;
  accessibilty: string;
  recommendation: string;
}

export async function SubmitFeedbackByGuest({
  mood,
  exprience,
  accessibilty,
  recommendation,
}: GuestFeedback) {
  const supabase = await createClient();
  const { error } = await supabase.from("user_feedback").insert([
    {
      mood: mood,
      exprience: exprience,
      accessibilty: accessibilty,
      recommendation: recommendation,
    },
  ]);

  if (error) {
    console.error(`Error While Submitting the Feedback: ${error.message}`);
  }
}

export async function SubmitSupportRequest({
  category,
  message,
}: {
  category: string;
  message: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: auth_error,
  } = await supabase.auth.getUser();
  if (auth_error || !user) {
    console.error(
      `Supabase Error: ${auth_error?.message ?? "User not authenticated"}`
    );
    return;
  }
  const { error } = await supabase.from("support_request").insert([
    {
      category: category,
      message: message,
      status: "open",
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error(
      `Error While Submitting the Support Request: ${error.message}`
    );
  }
  console.log("Support Request Submitted Successfully");
}
