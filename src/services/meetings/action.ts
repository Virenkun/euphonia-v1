"use server";

import { createClient } from "@/utils/supabase/server";

export async function getMeetings() {
  const supabase = await createClient();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (getUserError) {
    console.error(
      "Error Getting user info while fetching meetings",
      getUserError
    );
  }
  const auth_id = user?.id;

  const { data: meetings, error: getMeetingsError } = await supabase
    .from("meetings")
    .select("*, user_id(auth_id), therapist_id(name,specialization)")
    .eq("user_id.auth_id", auth_id);

  if (getMeetingsError) {
    console.error("Error while getting meetings", getMeetingsError);
  }
  return meetings;
}
