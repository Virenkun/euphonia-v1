"use server";

import { createClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";

interface FormData {
  name?: string;
  age?: number;
  communicationStyle?: string;
  primaryGoals?: string;
  interest?: string;
  avatar?: string;
}

export const completeOnboarding = async ({
  formObject,
}: {
  formObject: FormData;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(
      "Error fetching session or user not logged in:",
      userError?.message
    );
    return;
  }

  const authId = user.id;

  // Insert data into the user_info table
  const { data, error } = await supabase
    .from("user_info")
    .update([
      {
        email: user.email,
        name: formObject.name,
        age: formObject.age,
        communication_style: formObject.communicationStyle,
        primary_goals: formObject.primaryGoals,
        interest: formObject.interest,
        avatar: formObject.avatar,
        sessions: null,
        subscription: "free",
      },
    ])
    .eq("auth_id", authId);

  if (error) {
    console.error("Error inserting data:", error.message);
  } else {
    console.log("Data inserted successfully:", data);
    permanentRedirect("/main");
  }
};
