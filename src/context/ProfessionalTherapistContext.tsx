"use client";
import { createContext, useContext } from "react";

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

const ProfessionalTherapistContext = createContext<Therapist[] | null>(null);

const ProfessionalTherapistContextProvider =
  ProfessionalTherapistContext.Provider;

export const useProfessionalTherapistData = () => {
  const context = useContext(ProfessionalTherapistContext);
  if (context === null) {
    throw new Error(
      "useLayoutData must be used within ProfessionalTherapistContext"
    );
  }
  return context;
};

export default ProfessionalTherapistContextProvider;
