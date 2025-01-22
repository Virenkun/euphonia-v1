import ChatHistory from "@/components/chat-history/chat-history";
import { getChatsBySession } from "@/services/chats/action";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const chat = await getChatsBySession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 ">
      <nav className="flex flex-col items-start justify-between p-4 z-10 bg-white border-b">
        <h1 className="text-2xl font-bold">Chat History</h1>
        <p className="text-md text-muted-foreground">
          Chat with your euphonia AI therapist
        </p>
      </nav>
      <div className="flex-1 overflow-hidden">
        <ChatHistory chatData={chat} avatar={user?.user_metadata?.avatar_url} />
      </div>
    </div>
  );
}
