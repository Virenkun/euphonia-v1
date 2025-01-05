"use client";
import Header from "@/components/ProfessionalTherapist/Header";
import SessionsTab from "@/components/ProfessionalTherapist/SessionTab";
import TherapistList, {
  Therapist,
} from "@/components/ProfessionalTherapist/TherapistList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { getMeetings } from "@/services/meetings/action";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("therapists");
  const [therapists, setTherapists] = useState<Therapist[] | null>([]);
  const supabase = createClient();
  useAsyncEffect(async () => {
    const { data: therapists } = await supabase.from("therapists").select("*");
    setTherapists(therapists);
  }, []);

  useAsyncEffect(async () => {
    await getMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[20px] pb-8 px-4">
        <div className="container mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-8">
              <TabsTrigger value="therapists" className="px-3">
                Therapists
              </TabsTrigger>
              <TabsTrigger value="sessions" className="px-3">
                Sessions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="therapists">
              <TherapistList therapists={therapists} />
            </TabsContent>
            <TabsContent value="sessions">
              <SessionsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
