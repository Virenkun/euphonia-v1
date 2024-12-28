"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface ChatData {
  [sessionId: string]: Message[];
}

export default function ChatHistory({ chatData }: { chatData: ChatData }) {
  // Extract unique sessions from the chat data
  const sessions = Object.keys(chatData).map((sessionId) => ({
    id: sessionId,
    topic: "Therapy Session", // You might want to modify this
    date: parseISO(chatData[sessionId][0].created_at),
    unread: false, // You can implement unread logic if needed
  }));

  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");

  // Filter sessions
  const filteredSessions = sessions.filter(
    (session) =>
      session.topic.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDate === "all" ||
        format(session.date, "yyyy-MM-dd") === filterDate)
  );

  // Get messages for the selected session
  const sessionMessages = chatData[selectedSessionId].map((message) => ({
    id: message.id,
    sender: message.role === "user" ? "You" : "AI",
    message: message.content.trim(),
    timestamp: parseISO(message.created_at),
  }));

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white shadow-sm">
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800">
            Therapy Sessions
          </h2>
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select value={filterDate} onValueChange={setFilterDate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              {sessions.map((session) => (
                <SelectItem
                  key={session.id}
                  value={format(session.date, "yyyy-MM-dd")}
                >
                  {format(session.date, "MMMM d, yyyy")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {filteredSessions.map((session) => (
            <Button
              key={session.id}
              variant="ghost"
              className="w-full justify-start px-4 py-3 h-auto text-left"
              onClick={() => setSelectedSessionId(session.id)}
            >
              <div className="flex items-center w-full">
                <Calendar className="h-5 w-5 mr-3 text-slate-500" />
                <div className="flex-1 truncate">
                  <div className="font-medium text-slate-700">
                    {session.topic}
                  </div>
                  <div className="text-sm text-slate-500">
                    {format(session.date, "MMMM d, yyyy")}
                  </div>
                </div>
                {session.unread && (
                  <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full" />
                )}
              </div>
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold text-slate-800">
            {sessions.find((s) => s.id === selectedSessionId)?.topic}
          </h2>
          <p className="text-sm text-slate-500">
            {format(
              sessions.find((s) => s.id === selectedSessionId)?.date ||
                new Date(),
              "MMMM d, yyyy"
            )}
          </p>
        </div>
        <ScrollArea className="flex-1 p-4">
          {sessionMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start mb-4 ${
                message.sender === "You" ? "justify-end" : ""
              }`}
            >
              {message.sender !== "You" && (
                <Avatar className="mr-2">
                  <AvatarImage src="/happy.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex-1 max-w-[80%] ${
                  message.sender === "You" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === "You"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {format(message.timestamp, "h:mm a")}
                </div>
              </div>
              {message.sender === "You" && (
                <Avatar className="ml-2">
                  <AvatarImage src={"/girl.png"} />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t bg-slate-50">
          <div className="flex items-center mt-2 text-sm text-slate-500">
            <Lock className="h-4 w-4 mr-2" />
            <span>Your conversations are private and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
