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
import * as Yup from "yup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { Separator } from "../ui/separator";
import DeleteAccountDialog from "./delete-account-dailog";
import { useFormik } from "formik";
import { phoneRegExp } from "@/constant/regex";
import { updateUserInfo } from "@/services/users/action";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
  avatar: Yup.string().nullable(),
  country: Yup.string().nullable(),
  preferred_language: Yup.string().required("Language preference is required"),
  required_cookies: Yup.boolean(),
  analytics_cokkies: Yup.boolean(),
});

export function AccountModal({
  open,
  onOpenChange,
  userInfo,
  avatar,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avatar: string | undefined;
  userInfo: {
    name?: string;
    age?: number;
    email?: string;
    phone?: string;
    communication_style?: string;
    primary_goals?: string;
    interest?: string;
    avatar?: string;
    sessions?: null;
    subscription?: string;
    is_onboarded?: boolean;
    auth_id: string;
    country?: string;
    preferred_language: string;
    notification_frequency: string;
    required_cookies: boolean;
    analytics_cookies: boolean;
  } | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      avatar: avatar ?? userInfo?.avatar,
      country: userInfo?.country,
      preferred_language: userInfo?.preferred_language,
      required_cookies: userInfo?.required_cookies,
      analytics_cookies: userInfo?.analytics_cookies,
      notification_frequency: userInfo?.notification_frequency ?? "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        await updateUserInfo(values);
        resetForm();
        onOpenChange(false);
        setIsSubmitting(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

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
                        <AvatarImage
                          src={avatar ?? userInfo?.avatar}
                          alt={userInfo?.name}
                        />
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
                          // {...formik.getFieldProps("avatar")}
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
                        <Input id="name" {...formik.getFieldProps("name")} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...formik.getFieldProps("email")}
                          disabled
                          className="disabled:text-black disabled:opacity-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">
                          Phone Number (with country code)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="e.g. 916789452382"
                          {...formik.getFieldProps("phone")}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <p className="text-xs text-red-500">
                            {formik.errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Country</Label>
                        <Input
                          id="country"
                          {...formik.getFieldProps("country")}
                          disabled
                          className="disabled:text-black disabled:opacity-100"
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="font-medium">Account Preferences</h4>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Required Cookies</Label>
                            <p className="text-sm text-muted-foreground">
                              These cookies are necessary for the website to
                              function and cannot be switched off in our
                              systems.
                            </p>
                          </div>
                          <Switch
                            checked={formik.values.required_cookies}
                            onCheckedChange={(checked) =>
                              formik.setFieldValue("required_cookies", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Analytics Cookies</Label>
                            <p className="text-sm text-muted-foreground">
                              These cookies allow us to count visits and traffic
                              sources so we can measure and improve the
                              performance of our site.
                            </p>
                          </div>
                          <Switch
                            checked={formik.values.analytics_cookies}
                            onCheckedChange={(checked) =>
                              formik.setFieldValue("analytics_cookies", checked)
                            }
                          />
                        </div>

                        {/* Accessibility Preferences */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dark Mode (Coming Soon)</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable dark mode for a better viewing experience.
                            </p>
                          </div>
                          <Switch disabled />
                        </div>

                        {/* Language Preference */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Language</Label>
                            <p className="text-sm text-muted-foreground">
                              Set your preferred language for the app.
                            </p>
                          </div>
                          <select
                            className="border text-sm px-2 py-1 rounded-md"
                            {...formik.getFieldProps("preferred_language")}
                          >
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
                              Choose how often you want to receive notifications
                              om email or phone to remind you of sessions.
                            </p>
                          </div>
                          <select
                            className="border text-sm px-2 py-1 rounded-md"
                            {...formik.getFieldProps("notification_frequency")}
                          >
                            <option value="immediate">Immediate</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                          </select>
                        </div>

                        {/* Download Data */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Download My Data (Coming Soon)</Label>
                            <p className="text-sm text-muted-foreground">
                              Download a copy of your data for your records.
                            </p>
                          </div>
                          <button disabled className="text-sm text-gray-600">
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
            <Button
              onClick={() => formik.handleSubmit()}
              disabled={!formik.dirty || !formik.isValid || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
