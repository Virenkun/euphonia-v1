"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

export function AccountModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
        >
          <TabsList className="px-6 border-b">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="px-6 py-4 space-y-6">
                <TabsContent value="profile">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>VS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Profile Picture
                        </h4>
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Viren Soni" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="virendrasonivs07@gmail.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="New York, NY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about your experience and expertise..."
                          defaultValue="Experienced therapist specializing in cognitive behavioral therapy and trauma recovery. Passionate about helping individuals overcome challenges and achieve personal growth."
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="professional">
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Select defaultValue="cognitive">
                          <SelectTrigger id="specialization">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Therapy
                            </SelectItem>
                            <SelectItem value="cognitive">
                              Cognitive Behavioral Therapy
                            </SelectItem>
                            <SelectItem value="trauma">
                              Trauma Therapy
                            </SelectItem>
                            <SelectItem value="relationship">
                              Relationship Counseling
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          defaultValue="8"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="rate">Hourly Rate ($)</Label>
                        <Input
                          id="rate"
                          type="number"
                          min="0"
                          defaultValue="150"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="education">Education</Label>
                        <Textarea
                          id="education"
                          placeholder="List your degrees and certifications..."
                          defaultValue="Ph.D. in Clinical Psychology, University of California, Berkeley
M.A. in Counseling Psychology, Stanford University
Licensed Clinical Psychologist (License #12345)"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="languages">Languages Spoken</Label>
                        <Input id="languages" defaultValue="English, Spanish" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="preferences">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Account Preferences</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Available for New Clients</Label>
                          <p className="text-sm text-muted-foreground">
                            Show your profile to potential new clients
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about new messages and
                            appointments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive SMS reminders for upcoming appointments
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Session Preferences</h4>
                      <div className="grid gap-2">
                        <Label htmlFor="session-duration">
                          Default Session Duration
                        </Label>
                        <Select defaultValue="60">
                          <SelectTrigger id="session-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="buffer-time">
                          Buffer Time Between Sessions
                        </Label>
                        <Select defaultValue="15">
                          <SelectTrigger id="buffer-time">
                            <SelectValue placeholder="Select buffer time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No buffer</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="schedule">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Availability Calendar</h4>
                      <Button variant="outline" size="sm">
                        Set Recurring Availability
                      </Button>
                    </div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    <div className="space-y-4">
                      <h4 className="font-medium">Upcoming Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">
                              Dec 15, 2024 - 2:00 PM
                            </p>
                          </div>
                          <Badge>Upcoming</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-sm text-muted-foreground">
                              Dec 16, 2024 - 10:00 AM
                            </p>
                          </div>
                          <Badge>Upcoming</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
        <DialogFooter className="px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
