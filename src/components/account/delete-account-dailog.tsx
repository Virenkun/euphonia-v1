"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { deleteUser } from "@/services/users/action";
import { useRouter } from "next/router";

const deleteReasons = [
  { value: "no-longer-needed", label: "No longer needed" },
  { value: "too-complicated", label: "Too complicated to use" },
  { value: "found-alternative", label: "Found a better alternative" },
  { value: "privacy-concerns", label: "Privacy concerns" },
  { value: "other", label: "Other" },
];

export default function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();

  const handleDeleteAccount = async () => {
    console.log(`Account deleted. Reason: ${reason}`);
    setIsOpen(false);
    await deleteUser();
    router.push("/");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-1/2">
          Delete My Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a reason for leaving" />
            </SelectTrigger>
            <SelectContent>
              {deleteReasons.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount} disabled={!reason}>
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
