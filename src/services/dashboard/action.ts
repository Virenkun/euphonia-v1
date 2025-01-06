"use server";

import { createClient } from "@/utils/supabase/server";

export async function GetDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error While Getting Dashboard Data", userError);
  }

  const auth_id = user?.id;

  const { data: session_count, error } = await supabase.rpc(
    "count_unique_sessions",
    {
      input_user_id: auth_id,
    }
  );

  const { data: sessions, error: sessionDurationError } = await supabase.rpc(
    "count_session_durations_and_word_count",
    {
      input_user_id: auth_id,
    }
  );

  const { data: streks, error: streaksError } = await supabase.rpc(
    "get_user_streaks",
    { user_uuid: auth_id }
  );

  if (streaksError) {
    console.error("Error While Getting Dashboard Data", streaksError);
  }

  if (error) {
    console.error("Error While Getting Dashboard Data", error);
  }
  if (sessionDurationError) {
    console.error("Error While Getting Dashboard Data", sessionDurationError);
  }

  type Session = {
    duration_seconds: number;
    user_word_count: number;
    assistant_word_count: number;
  };

  const totalDuration = sessions.reduce(
    (sum: number, session: Session) => sum + session.duration_seconds,
    0
  );
  const totalUserWordCount = sessions.reduce(
    (sum: number, session: Session) => sum + session.user_word_count,
    0
  );
  const totalAssistantWordCount = sessions.reduce(
    (sum: number, session: Session) => sum + session.assistant_word_count,
    0
  );

  const averageDuration = totalDuration / sessions.length;
  const averageUserWordCount = totalUserWordCount / sessions.length;
  const averageAssistantWordCount = totalAssistantWordCount / sessions.length;

  console.log("sessions", sessions);
  return {
    session_count: session_count,
    sessions: sessions,
    streaks: streks,
    avg_session_duration: averageDuration,
    user_avg_word_count: averageUserWordCount,
    assistant_avg_word_count: averageAssistantWordCount,
  };
}
