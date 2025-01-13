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
