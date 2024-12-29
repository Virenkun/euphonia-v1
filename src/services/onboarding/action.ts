"use server";

import { createClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";

interface FormData {
  name?: string;
  age?: number;
  gender?: string;
  pronouns?: string;
  phone?: string;
  communicationStyle?: string;
  primaryGoal?: string;
  interests?: string;
  sessionLength?: string;
  schedulingPreferences?: string;
  emergencyContact?: string;
  currentEmotionalState?: string;
  mentalHealthHistory?: string;
  currentChallenges?: string;
  stressLevel?: string;
  existingSupport?: string;
  preferredLanguage?: string;
  accessibilityNeeds?: string;
  interactionPreference?: string;
  avatar?: string;
  dataConsent?: boolean;
  termsAgreement?: boolean;
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
        communication_style: formObject.communicationStyle,
        primary_goals: formObject.primaryGoal,
        interest: formObject.interests,
        session_length: formObject.sessionLength,
        scheduling_preferences: formObject.schedulingPreferences,
        emergency_contact: formObject.emergencyContact,
        current_emotional_state: formObject.currentEmotionalState,
        mental_health_history: formObject.mentalHealthHistory,
        current_challenges: formObject.currentChallenges,
        stress_level: formObject.stressLevel,
        existing_support: formObject.existingSupport,
        preferred_language: formObject.preferredLanguage,
        accessibility_needs: formObject.accessibilityNeeds,
        interaction_preference: formObject.interactionPreference,
        avatar: formObject.avatar,
        data_consent: formObject.dataConsent,
        terms_agreement: formObject.termsAgreement,
        sessions: null,
        subscription: "free",
        is_onboarded: true,
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
