"use client";

import { useState, useMemo, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Lock, Search, MessageSquare, Trash2 } from "lucide-react";
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
import { RainbowButton } from "../ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSessionById } from "@/services/chats/action";

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface ChatData {
  [sessionId: string]: Message[];
}

export default function ChatHistory({
  chatData: initialChatData,
  avatar,
}: {
  chatData: ChatData;
  avatar?: string;
}) {
  const [chatData, setChatData] = useState(initialChatData);
  const chatsPresent = Object.keys(chatData).length > 0;
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setChatData(initialChatData);
  }, [initialChatData]);

  const sessions = useMemo(() => {
    if (!chatsPresent) return [];
    return Object.keys(chatData)?.map((sessionId) => ({
      id: sessionId,
      topic: "Therapy Session", // You might want to modify this
      date: parseISO(chatData[sessionId][0].created_at),
      unread: false, // You can implement unread logic if needed
      messageCount: chatData[sessionId].length,
    }));
  }, [chatData, chatsPresent]);

  const [selectedSessionId, setSelectedSessionId] = useState(
    sessions[0]?.id || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [sidebarCollapsed] = useState(false);

  const filteredSessions = useMemo(() => {
    if (!chatsPresent || !sessions) return [];
    return sessions.filter(
      (session) =>
        session.topic.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDate === "all" ||
          format(session.date, "yyyy-MM-dd") === filterDate)
    );
  }, [chatsPresent, sessions, searchTerm, filterDate]);

  const sessionMessages = useMemo(() => {
    if (!chatsPresent || !selectedSessionId) return [];
    return chatData[selectedSessionId]?.map((message) => ({
      id: message.id,
      sender: message.role === "user" ? "You" : "AI",
      message: message.content.trim(),
      timestamp: parseISO(message.created_at),
    }));
  }, [chatsPresent, selectedSessionId, chatData]);

  const handleDeleteSession = async (sessionId: string) => {
    setLoadingDelete(true);
    await deleteSessionById(sessionId);
    if (selectedSessionId === sessionId) {
      setSelectedSessionId(
        filteredSessions.find((s) => s.id !== sessionId)?.id || ""
      );
    }
    setLoadingDelete(false);
  };

  if (!chatsPresent) {
    return (
      <div className="flex items-center justify-center min-h-[89vh] bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No therapy sessions found
          </h2>
          <p className="text-gray-600 mb-6">
            Start a new session to begin your journey
          </p>
          <RainbowButton className="text-lg py-3 px-6" onClick={() => {}}>
            Start a new session
          </RainbowButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-16" : "w-80"
        }`}
      >
        <div className="p-6 flex items-center justify-between bg-gray-50">
          {!sidebarCollapsed && (
            <h2 className="text-2xl font-bold text-gray-800 bg-gray-50">
              Sessions
            </h2>
          )}
        </div>
        {!sidebarCollapsed && (
          <div className="p-4 space-y-4 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                {sessions.slice(0, 10)?.map((session) => (
                  <SelectItem
                    key={session.id}
                    value={format(session.date, "yyyy-MM-dd")}
                  >
                    {format(session.date, "MMMM d, yyyy")}
                  </SelectItem>
                ))}
                {sessions.length > 10 && (
                  <SelectItem value="more">
                    And {sessions.length - 10} more...
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
        <ScrollArea className="h-[calc(100vh-8rem)] bg-gray-50">
          {filteredSessions?.map((session) => (
            <div key={session.id} className="flex items-center">
              <Button
                variant="ghost"
                className={`flex-grow justify-start px-4 py-3 h-auto text-left ${
                  selectedSessionId === session.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedSessionId(session.id)}
              >
                {sidebarCollapsed ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Calendar className="h-6 w-6 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{format(session.date, "MMMM d, yyyy")}</p>
                        <p>{session.topic}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="flex items-center w-full">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div className="flex-1 truncate">
                      <div className="font-medium text-gray-700">
                        {session.topic}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(session.date, "MMMM d, yyyy")}
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {session.messageCount}
                    </Badge>
                  </div>
                )}
              </Button>
              {!sidebarCollapsed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete session</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the session and all its messages.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () =>
                          await handleDeleteSession(session.id)
                        }
                        disabled={loadingDelete}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800">
            {sessions.find((s) => s.id === selectedSessionId)?.topic}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {format(
              sessions.find((s) => s.id === selectedSessionId)?.date ||
                new Date(),
              "MMMM d, yyyy"
            )}
          </p>
        </div>
        <ScrollArea className="flex-1 p-6">
          {sessionMessages?.map((message) => (
            <div
              key={message.id}
              className={`flex items-start mb-6 ${
                message.sender === "You" ? "justify-end" : ""
              }`}
            >
              {message.sender !== "You" && (
                <Avatar className="mr-4">
                  <AvatarImage src="/euphonia.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex-1 max-w-[70%] ${
                  message.sender === "You" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-lg shadow ${
                    message.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-end">
                  <span>{format(message.timestamp, "h:mm a")}</span>
                </div>
              </div>
              {message.sender === "You" && (
                <Avatar className="ml-4">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Lock className="h-4 w-4 mr-2" />
            <span>Your conversations are private and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
