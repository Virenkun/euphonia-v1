"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New appointment request",
    description: "John Doe has requested an appointment for tomorrow at 2 PM.",
    date: "2024-12-14T14:00:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Reminder: Upcoming session",
    description: "You have a session with Jane Smith in 30 minutes.",
    date: "2024-12-14T15:30:00Z",
    read: false,
  },
  {
    id: "3",
    title: "New message",
    description: "You have a new message from Michael Johnson.",
    date: "2024-12-14T10:00:00Z",
    read: true,
  },
  {
    id: "4",
    title: "Payment received",
    description: "Payment of $150 received for session with Emily Brown.",
    date: "2024-12-13T16:45:00Z",
    read: true,
  },
  {
    id: "5",
    title: "Profile update reminder",
    description: "Don't forget to update your profile information.",
    date: "2024-12-13T09:00:00Z",
    read: true,
  },
];

export function NotificationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 py-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-background" : "bg-muted"
                } flex items-start`}
              >
                {!notification.read && (
                  <Circle className="w-2 h-2 mt-1.5 mr-2 fill-blue-500 text-blue-500 flex-shrink-0" />
                )}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer ml-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(notification.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="px-6 py-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
