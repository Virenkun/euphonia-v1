import ChatHistory from "@/components/chat-history/chat-history";
import { ChatNav } from "@/components/chat-history/chat-nav";

export default function Page() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <ChatNav />
      <div className="flex-1 overflow-hidden">
        <ChatHistory />
      </div>
    </div>
  );
}
