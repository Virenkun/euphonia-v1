"use client";

import { useState } from "react";
import TherapistCard from "./TherapistCard";
import TherapistModal from "./TherapistModal";

export interface Therapist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
  education: string;
  languages: string[];
  availability: string;
  price: string;
  insurance: string[];
  tags: string[];
}

export default function TherapistList({
  therapists,
}: {
  readonly therapists: readonly Therapist[] | null;
}) {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Our Therapists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists?.map((therapist) => (
          <TherapistCard
            key={therapist.id}
            therapist={therapist}
            onSelect={() => setSelectedTherapist(therapist)}
          />
        ))}
      </div>
      {selectedTherapist && (
        <TherapistModal
          therapist={selectedTherapist}
          onClose={() => setSelectedTherapist(null)}
        />
      )}
    </div>
  );
}
