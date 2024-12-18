import Link from "next/link";
import { MessageCircle, Calendar, User, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatNav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <Link
        href="/"
        className="text-2xl font-bold text-slate-800 flex items-center"
      >
        <Brain className="w-6 h-6 mr-2 text-blue-500" />
        Chat History
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat
        </Button>
        <Button variant="ghost" size="sm">
          <Calendar className="h-5 w-5 mr-2" />
          Schedule
        </Button>
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5 mr-2" />
          Profile
        </Button>
      </div>
    </nav>
  );
}
