"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

interface Therapist {
  name: string;
  // Add other properties as needed
}

interface ScheduleDialogProps {
  readonly therapist: Therapist;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ScheduleDialog({
  therapist,
  isOpen,
  onClose,
}: ScheduleDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      // Here you would typically send this data to your backend
      console.log(
        `Booking session with ${therapist.name} on ${format(
          selectedDate instanceof Date ? selectedDate : new Date(),
          "PP"
        )} at ${selectedTime}`
      );
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Session with {therapist.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="date" className="text-sm font-medium">
              Select Date
            </label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="time" className="text-sm font-medium">
              Select Time
            </label>
            <Select onValueChange={setSelectedTime} value={selectedTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleBookSession}
            disabled={!selectedDate || !selectedTime}
          >
            Book Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
