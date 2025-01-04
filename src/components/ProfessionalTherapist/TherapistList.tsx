"use client";

import { useState } from "react";
import TherapistCard from "./TherapistCard";
import TherapistModal from "./TherapistModal";

const therapists = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialization: "Cognitive Behavioral Therapy",
    experience: "10 years",
    rating: 4.8,
    image: "/thimg.jpg",
    bio: "Dr. Jane Smith is a licensed psychologist specializing in cognitive behavioral therapy. With 10 years of experience, she has helped numerous clients overcome anxiety, depression, and stress-related issues.",
    education: "Ph.D. in Clinical Psychology, Stanford University",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri, 9 AM - 5 PM",
    price: "$150 per session",
    insurance: ["Blue Cross", "Aetna", "Cigna"],
    tags: ["Anxiety", "Depression", "Stress Management"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Family Therapy",
    experience: "15 years",
    rating: 4.9,
    image: "/thimg.jpg",
    bio: "Dr. Michael Chen is an experienced family therapist who helps families improve communication and resolve conflicts. He has a particular interest in multicultural family dynamics.",
    education:
      "Psy.D. in Family Psychology, University of California, Berkeley",
    languages: ["English", "Mandarin"],
    availability: "Tue-Sat, 10 AM - 6 PM",
    price: "$180 per session",
    insurance: ["UnitedHealthcare", "Kaiser Permanente"],
    tags: ["Family Counseling", "Multicultural Issues", "Conflict Resolution"],
  },
  {
    id: 3,
    name: "Sarah Johnson, LMFT",
    specialization: "Couples Counseling",
    experience: "8 years",
    rating: 4.7,
    image: "/thimg.jpg",
    bio: "Sarah Johnson is a Licensed Marriage and Family Therapist specializing in couples counseling. She helps couples improve their relationships through effective communication and conflict resolution techniques.",
    education: "M.S. in Marriage and Family Therapy, Northwestern University",
    languages: ["English"],
    availability: "Mon-Thu, 11 AM - 7 PM",
    price: "$130 per session",
    insurance: ["Anthem", "Humana"],
    tags: ["Couples Therapy", "Relationship Issues", "Communication Skills"],
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialization: "Child Psychology",
    experience: "12 years",
    rating: 4.9,
    image: "/thimg.jpg",
    bio: "Dr. Emily Rodriguez is a child psychologist with expertise in developmental disorders and childhood trauma. She uses play therapy and other child-friendly techniques to help young clients.",
    education: "Ph.D. in Child Psychology, Columbia University",
    languages: ["English", "Spanish"],
    availability: "Mon, Wed, Fri, 9 AM - 5 PM",
    price: "$160 per session",
    insurance: ["Blue Shield", "Cigna", "Aetna"],
    tags: ["Child Therapy", "Developmental Disorders", "Trauma"],
  },
  {
    id: 5,
    name: "Dr. Alex Thompson",
    specialization: "LGBTQ+ Affirming Therapy",
    experience: "9 years",
    rating: 4.8,
    image: "/thimg.jpg",
    bio: "Dr. Alex Thompson specializes in LGBTQ+ affirming therapy, helping clients navigate issues related to gender identity, sexual orientation, and coming out. They create a safe and supportive environment for all clients.",
    education: "Ph.D. in Counseling Psychology, University of Michigan",
    languages: ["English"],
    availability: "Tue-Sat, 12 PM - 8 PM",
    price: "$140 per session",
    insurance: ["Optum", "Aetna", "Blue Cross"],
    tags: ["LGBTQ+ Issues", "Gender Identity", "Coming Out Support"],
  },
  {
    id: 6,
    name: "Dr. Olivia Patel",
    specialization: "Mindfulness-Based Therapy",
    experience: "11 years",
    rating: 4.7,
    image: "/thimg.jpg",
    bio: "Dr. Olivia Patel integrates mindfulness techniques into her therapy practice, helping clients manage stress, anxiety, and depression through present-moment awareness and meditation practices.",
    education: "Psy.D. in Clinical Psychology, Rutgers University",
    languages: ["English", "Hindi"],
    availability: "Mon-Fri, 8 AM - 4 PM",
    price: "$170 per session",
    insurance: ["UnitedHealthcare", "Cigna", "Humana"],
    tags: ["Mindfulness", "Stress Reduction", "Meditation"],
  },
];

export default function TherapistList() {
  interface Therapist {
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

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Our Therapists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
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
