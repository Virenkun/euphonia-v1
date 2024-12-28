import { Metadata } from "next";
import AICheckinForm from "./ai-checkin-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AI Check-in | Euphonia",
  description:
    "Perform a comprehensive mental health check-in with our AI-powered assessment tool.",
};

export default function AICheckinPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-4xl font-bold mb-2">AI Check-in</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Take a comprehensive moment to assess your mental well-being with our
        advanced AI assistant
      </p> */}
      <nav className="flex flex-col items-start justify-between p-4 z-10">
        <h1 className="text-2xl font-bold">AI Check-in</h1>
        <p className="text-md text-muted-foreground">
          Take a comprehensive moment to assess your mental well-being with our
          advanced AI assistant
        </p>
      </nav>

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
              Our AI analyzes your responses to generate personalized insights.
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

      <AICheckinForm />
    </div>
  );
}
