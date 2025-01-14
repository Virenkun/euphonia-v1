"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Define message type
interface Message {
  id: string;
  created_at: string;
  role: string;
  content: string;
  session_id: string;
  user_id: string;
}

// Define grouped messages type
type GroupedMessages = {
  [session_id: string]: Message[];
};

export async function getChatsBySession(): Promise<GroupedMessages> {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data: valid_sessions, error: sessionError } = await supabase
      .from("session")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_deleted", false);

    if (sessionError) {
      console.error("Error fetching valid sessions:", sessionError);
    }

    if (!valid_sessions) {
      console.error("No valid sessions found");
      return {};
    }

    // Query Supabase: filter by userId and order by created_at
    const query = supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .in(
        "session_id",
        valid_sessions.map((session) => session.id)
      )
      .order("created_at", { ascending: true });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }

    // Ensure the data is typed correctly
    const messages = data as Message[];

    // Group messages by session_id
    const groupedMessages: GroupedMessages = messages.reduce(
      (sessions, message) => {
        const { session_id } = message;

        if (!sessions[session_id]) {
          sessions[session_id] = [];
        }

        sessions[session_id].push(message);

        return sessions;
      },
      {} as GroupedMessages
    );

    return groupedMessages;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
}

export async function deleteSessionById(sessionId: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("session")
      .update({ is_deleted: true })
      .eq("id", sessionId);

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }
  } catch (err) {
    console.error("Error deleting session:", err);
    throw err;
  }
  return revalidatePath("/chat-history", "page");
}

export async function insertSession({
  id,
  user_id,
  length,
}: {
  id: string;
  user_id: string;
  length: number;
}) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("session")
      .insert([{ id, user_id, length }]);

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }
  } catch (err) {
    console.error("Error inserting session:", err);
    throw err;
  }
  return revalidatePath("/(main)", "layout");
}
