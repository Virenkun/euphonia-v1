"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, FileText, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { getMeetings } from "@/services/meetings/action";
import Spinner from "../spinner";

interface Meeting {
  id: number;
  date: string;
  time: string;
  "duration (in seconds)": string;
  status: "upcoming" | "completed" | "canceled";
  notes?: string;
  therapist_id: {
    name: string;
    specialization: string;
  };
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState<Meeting[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    setIsLoading(true);
    const meetings = await getMeetings();
    setSessions(meetings);
    setIsLoading(false);
  }, []);

  const upcomingSessions = sessions?.filter(
    (session) => session.status === "upcoming"
  );
  const pastSessions = sessions?.filter(
    (session) => session.status === "completed" || session.status === "canceled"
  );

  return (
    <>
      {isLoading ? (
        <div className="flex flex-1 align-middle justify-center items-center min-h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-4">
            <TabsTrigger value="upcoming" className="px-3">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="px-3">
              Past
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions?.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastSessions?.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}

function SessionCard({ session }: { readonly session: Meeting }) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-semibold">
              {session?.therapist_id?.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {session?.therapist_id?.specialization}
            </p>
          </div>
          <Badge
            variant={
              session.status === "upcoming"
                ? "default"
                : session?.status === "completed"
                ? "secondary"
                : "destructive"
            }
          >
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{new Date(session.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center">
            <Tag className="mr-1 h-3 w-3" />
            <span>{Number(session["duration (in seconds)"]) / 60} minutes</span>
          </div>
        </div>
        {session.notes && (
          <div className="mt-2 text-xs text-muted-foreground">
            <FileText className="inline mr-1 h-3 w-3" />
            <span>{session.notes}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted p-3">
        {session.status === "upcoming" && (
          <div className="flex w-full space-x-2">
            <Button size="sm" className="flex-1">
              <Video className="mr-1 h-3 w-3" />
              Join
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Reschedule
            </Button>
          </div>
        )}
        {session.status === "completed" && (
          <div className="flex w-full space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              <FileText className="mr-1 h-3 w-3" />
              View Notes
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <User className="mr-1 h-3 w-3" />
              Book Again
            </Button>
          </div>
        )}
        {session.status === "canceled" && (
          <Button size="sm" variant="outline" className="w-full">
            Reschedule
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
