"use client";
import AICheckinForm from "./ai-checkin-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";

export default function AICheckinPage() {
  const [startCheckin, setStartCheckin] = useState(false);
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex flex-col items-start justify-between p-4 z-10">
        <h1 className="text-2xl font-bold">AI Check-in</h1>
        <p className="text-md text-muted-foreground">
          Take a comprehensive moment to assess your mental well-being with our
          advanced AI assistant
        </p>
      </nav>

      {startCheckin ? (
        <AICheckinForm setStartCheckin={setStartCheckin} />
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Answer questions about your current emotional state, physical
                  well-being, and social factors.
                </li>
                <li>
                  Provide information on your recent experiences and coping
                  mechanisms.
                </li>
                <li>
                  Our AI analyzes your responses to generate personalized
                  insights.
                </li>
                <li>
                  Receive tailored recommendations for Euphonia resources and
                  activities.
                </li>
                <li>
                  Track your progress over time to identify patterns and
                  improvements in your mental health journey.
                </li>
              </ol>
            </CardContent>
          </Card>
          <ShimmerButton
            className="shadow-2xl"
            onClick={() => setStartCheckin(true)}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Start Check-in
            </span>
          </ShimmerButton>
        </>
      )}
    </div>
  );
}
