"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Calendar,
  GraduationCap,
  Globe,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";
import Image from "next/image";
import ScheduleDialog from "./ScheduleDialog";
import ChatDialog from "./ChatDialog";

interface Therapist {
  name: string;
  specialization: string;
  image: string;
  rating: number;
  experience: string;
  education: string;
  languages: string[];
  availability: string;
  price: string;
  bio: string;
  tags: string[];
  insurance: string[];
}

interface TherapistModalProps {
  readonly therapist: Therapist;
  readonly onClose: () => void;
}

export default function TherapistModal({
  therapist,
  onClose,
}: TherapistModalProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{therapist.name}</DialogTitle>
            <DialogDescription>{therapist.specialization}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-start space-x-6">
              <Image
                src={therapist.image}
                alt={therapist.name}
                width={120}
                height={120}
                className="rounded-full"
              />
              <div className="space-y-2">
                <p className="text-sm flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  {therapist.rating} • {therapist.experience} experience
                </p>
                <p className="text-sm flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {therapist.education}
                </p>
                <p className="text-sm flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {therapist.languages.join(", ")}
                </p>
                <p className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {therapist.availability}
                </p>
                <p className="text-sm flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {therapist.price}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm">{therapist.bio}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accepted Insurance</h3>
              <ul className="list-disc list-inside text-sm">
                {therapist.insurance.map((ins, index) => (
                  <li key={index}>{ins}</li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter className="sm:justify-start space-x-2">
            <Button variant="default" onClick={() => setIsChatOpen(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="outline" onClick={() => setIsScheduleOpen(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ScheduleDialog
        therapist={therapist}
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
      <ChatDialog
        therapist={therapist}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}
