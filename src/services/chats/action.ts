import { createClient } from "@/utils/supabase/server";

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

    // Query Supabase: filter by userId and order by created_at
    const query = supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
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

    console.log("Grouped messages:", groupedMessages);
    return groupedMessages;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
}
