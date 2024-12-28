import ChatInsightsDashboard from "./mood-tracker-dashboard";

export const metadata = {
  title: "Chat Insights | Euphonia",
  description:
    "Gain valuable insights into your conversations with Euphonia's AI therapist.",
};

export default function ChatInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Chat Insights</h1>
      <p className="text-muted-foreground mb-8">
        Analyze your conversations and track your progress with Euphonia
      </p>
      <ChatInsightsDashboard />
    </div>
  );
}
