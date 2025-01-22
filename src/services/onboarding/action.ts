"use server";

import { createClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";
import { updateCurrentUserPhone } from "../auth/action";
import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";

export const completeOnboarding = async ({
  formObject,
}: {
  formObject: OnboardingFormValues;
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

  console.log("Onboarding form data:", formObject);

  // Insert data into the user_info table
  const { data, error } = await supabase
    .from("user_info")
    .update([
      {
        name: formObject.name,
        age: formObject.age,
        gender: formObject.gender,
        pronouns: formObject.pronouns,
        phone: formObject.phone,
        preferred_language: formObject.preferredLanguage,
        avatar: formObject.avatar,
        data_consent: formObject.dataConsent,
        terms_agreement: formObject.termsAgreement,
        sessions: null,
        is_onboarded: true,
        plan: 1,
      },
    ])
    .eq("auth_id", authId);

  if (formObject.phone) {
    await updateCurrentUserPhone(formObject.phone);
  }

  if (error) {
    console.error("Error inserting data:", error.message);
  } else {
    console.log("Data inserted successfully:", data);
    permanentRedirect("/main");
  }
};
