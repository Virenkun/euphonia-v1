"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Calendar,
  Star,
  DollarSign,
  Shield,
} from "lucide-react";
import Image from "next/image";
import ScheduleDialog from "./ScheduleDialog";
import ChatDialog from "./ChatDialog";

interface Therapist {
  image: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  price: string;
  insurance: string[];
  tags: string[];
}

interface TherapistCardProps {
  readonly therapist: Therapist;
  readonly onSelect: () => void;
}

export default function TherapistCard({
  therapist,
  onSelect,
}: TherapistCardProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-row items-center mb-4">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative">
            <Image
              src={therapist.image}
              alt={therapist.name}
              layout="fill" // Ensures the image covers the container
              objectFit="cover" // Maintains the image aspect ratio
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center">
              {therapist.name}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {therapist.specialization}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {therapist.rating} • {therapist.experience} experience
          </p>
          <p className="text-sm flex items-center">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
            {therapist.price}
          </p>
          <div className="flex items-center text-sm">
            <Shield className="w-4 h-4 text-blue-500 mr-1" />
            <span className="mr-1">Insurance:</span>
            <span className="text-gray-600">
              {therapist.insurance.slice(0, 2).join(", ")}
            </span>
            {therapist.insurance.length > 2 && (
              <span className="text-gray-600">
                +{therapist.insurance.length - 2}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {therapist.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={onSelect}>
          More Info
        </Button>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(true)}>
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsScheduleOpen(true)}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Schedule
          </Button>
        </div>
      </CardFooter>
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
    </Card>
  );
}
