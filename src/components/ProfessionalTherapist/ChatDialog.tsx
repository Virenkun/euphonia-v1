"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "therapist";
  content: string;
  timestamp: Date;
}

interface Therapist {
  name: string;
  image: string;
}

interface ChatDialogProps {
  readonly therapist: Therapist;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ChatDialog({
  therapist,
  isOpen,
  onClose,
}: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "therapist",
      content: `Hello! I'm ${therapist.name}. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate therapist response (in a real app, this would be handled by a backend)
      setTimeout(() => {
        const therapistMessage: Message = {
          id: messages.length + 2,
          sender: "therapist",
          content:
            "Thank you for your message. I'm here to help. Can you tell me more about what's on your mind?",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, therapistMessage]);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat with {therapist.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        message.sender === "therapist"
                          ? therapist.image
                          : "/placeholder.svg?height=40&width=40"
                      }
                    />
                    <AvatarFallback>
                      {message.sender === "therapist" ? therapist.name[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
