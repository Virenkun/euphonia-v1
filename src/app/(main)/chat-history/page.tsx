import ChatHistory from "@/components/chat-history/chat-history";
import { getChatsBySession } from "@/services/chats/action";

export default async function Page() {
  const chat = await getChatsBySession();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="flex flex-col items-start justify-between p-4 z-10 bg-white border-b">
        <h1 className="text-2xl font-bold">AI Check-in</h1>
        <p className="text-md text-muted-foreground">
          Take a comprehensive moment to assess your mental well-being with our
          advanced AI assistant
        </p>
      </nav>
      <div className="flex-1 overflow-hidden">
        <ChatHistory chatData={chat} />
      </div>
    </div>
  );
}
