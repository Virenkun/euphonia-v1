import ChatHistory from "@/components/chat-history/chat-history";
import { ChatNav } from "@/components/chat-history/chat-nav";
import { getChatsBySession } from "@/services/chats/action";

export default async function Page() {
  const chat = await getChatsBySession();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <ChatNav />
      <div className="flex-1 overflow-hidden">
        <ChatHistory chatData={chat} />
      </div>
    </div>
  );
}
