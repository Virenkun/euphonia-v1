"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { Separator } from "../ui/separator";
import DeleteAccountDialog from "./delete-account-dailog";

export function AccountModal({
  open,
  onOpenChange,
  userInfo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userInfo: {
    name?: string;
    age?: number;
    email?: string;
    phone?: string;
    location?: string;
    communication_style?: string;
    primary_goals?: string;
    interest?: string;
    avatar?: string;
    sessions?: null;
    subscription?: string;
    is_onboarded?: boolean;
    auth_id: string;
  } | null;
}) {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4">
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Update your account settings and preferences
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="profile"
          className="flex-1 flex flex-col overflow-hidden"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="px-4 py-2 border-b justify-start">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="danger" className="text-red-500">
              Delete Zone
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="px-6 py-4 space-y-6">
                <TabsContent value="profile">
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={userInfo?.avatar ?? undefined} />
                        <AvatarFallback>
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          // onChange={handleImageUpload}
                          className="hidden"
                          id="picture-upload"
                        />
                        <label
                          htmlFor="picture-upload"
                          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                          {"Upload Picture"}
                        </label>
                        {/* {profilePicture && !isUploading && (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleRemoveImage}
                          >
                            Remove
                          </Button>
                        )} */}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Optional: Upload a profile picture
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userInfo?.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={userInfo?.email}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={userInfo?.phone}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          defaultValue={userInfo?.location}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about your experience and expertise..."
                          defaultValue="Experienced therapist specializing in cognitive behavioral therapy and trauma recovery. Passionate about helping individuals overcome challenges and achieve personal growth."
                          className="h-24"
                        />
                      </div>
                      <div className="space-y-6">
                        <h4 className="font-medium">Account Preferences</h4>

                        {/* Sessions Reminder */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sessions Reminder</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive reminders for upcoming sessions.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        {/* Email Notifications */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Get email notifications about new messages and
                              appointments.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        {/* SMS Reminders */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Reminders</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive SMS reminders for upcoming appointments.
                            </p>
                          </div>
                          <Switch />
                        </div>

                        {/* Accessibility Preferences */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable dark mode for a better viewing experience.
                            </p>
                          </div>
                          <Switch />
                        </div>

                        {/* Language Preference */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Language</Label>
                            <p className="text-sm text-muted-foreground">
                              Set your preferred language for the app.
                            </p>
                          </div>
                          <select className="border text-sm px-2 py-1 rounded-md">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>

                        {/* Notification Frequency */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Notification Frequency</Label>
                            <p className="text-sm text-muted-foreground">
                              Choose how often you want to receive
                              notifications.
                            </p>
                          </div>
                          <select className="border text-sm px-2 py-1 rounded-md">
                            <option value="immediate">Immediate</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                          </select>
                        </div>

                        {/* Privacy Settings */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Personalized Recommendations</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow us to personalize your experience based on
                              your preferences.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        {/* Download Data */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Download My Data</Label>
                            <p className="text-sm text-muted-foreground">
                              Download a copy of your data for your records.
                            </p>
                          </div>
                          <button className="text-sm text-blue-500 hover:underline">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="danger">
                  <div className="flex flex-col gap-3 border border-red-500 p-4 rounded-lg">
                    <div className="font-semibold text-lg">Delete Account</div>
                    <div>
                      {" "}
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </div>
                    <Separator />
                    <DeleteAccountDialog />
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
        {activeTab !== "danger" && (
          <DialogFooter className="px-6 py-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
