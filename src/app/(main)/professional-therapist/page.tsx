import Header from "@/components/ProfessionalTherapist/Header";
import TherapistList from "@/components/ProfessionalTherapist/TherapistList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TherapistList />
      </main>
    </div>
  );
}
