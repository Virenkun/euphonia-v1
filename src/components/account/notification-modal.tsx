"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Bell, Search, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/client";

interface Notification {
  id: string; // UUID type in JavaScript/TypeScript
  user_id: string; // UUID type for referencing the user
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string; // Timestamp type (ISO string)
}

export function NotificationModal({
  open,
  onOpenChange,
  setAllRead,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setAllRead: (allRead: boolean) => void;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const filteredNotifications = notifications.filter(
    (notif) =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allRead = notifications.every((notif) => notif.is_read);

  useEffect(() => {
    setAllRead(allRead);
  }, [allRead]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] h-[80vh] flex flex-col p-0 gap-0 bg-white dark:bg-gray-900">
        <DialogHeader className="px-4 py-2 border-b sticky top-0 z-10 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Notifications
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        <div className="px-4 py-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-100 dark:bg-gray-800 border-none"
            />
          </div>
        </div>
        <ScrollArea className="flex-grow px-4 py-2">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center p-4"
              >
                <Bell className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {`You're all caught up!`}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 rounded-lg ${
                      notification.is_read
                        ? "bg-white dark:bg-gray-900"
                        : "bg-blue-50 dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <Bell className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {notification.message}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(notification.created_at)}
                          </p>
                          {!notification.is_read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="w-full text-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all notifications
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
