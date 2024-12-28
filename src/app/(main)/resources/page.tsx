"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Book,
  Video,
  Headphones,
  Users,
  BotIcon as Robot,
  ArrowRight,
  Search,
  Zap,
  Calendar,
  Sparkles,
  Lightbulb,
  Puzzle,
  Heart,
  Leaf,
  Coffee,
  Moon,
  Sun,
  Palette,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// export const metadata = {
//   title: "Resources | Euphonia",
//   description:
//     "Explore AI-powered resources to support your mental health journey.",
// };

const categories = [
  { id: "all", name: "All Resources" },
  { id: "tools", name: "AI Tools" },
  { id: "content", name: "Educational Content" },
  { id: "community", name: "Community" },
  { id: "lifestyle", name: "Lifestyle" },
];

const resources = [
  {
    title: "AI-Guided Meditation",
    description:
      "Experience personalized meditation sessions tailored by our AI to your current emotional state.",
    icon: <Brain className="w-6 h-6" />,
    tags: ["Meditation", "AI", "Personalized"],
    link: "#",
    category: "tools",
  },
  {
    title: "Interactive CBT Workbook",
    description:
      "Engage with our AI-powered Cognitive Behavioral Therapy workbook for practical exercises and insights.",
    icon: <Book className="w-6 h-6" />,
    tags: ["CBT", "Interactive", "Self-help"],
    link: "#",
    category: "tools",
  },
  {
    title: "Virtual Reality Therapy",
    description:
      "Immerse yourself in AI-generated environments designed to help you face and overcome specific challenges.",
    icon: <Video className="w-6 h-6" />,
    tags: ["VR", "Immersive", "Exposure Therapy"],
    link: "#",
    category: "tools",
  },
  {
    title: "AI Mood Music",
    description:
      "Listen to AI-composed music that adapts in real-time to your mood and helps regulate your emotions.",
    icon: <Headphones className="w-6 h-6" />,
    tags: ["Music Therapy", "Adaptive", "Mood Regulation"],
    link: "#",
    category: "tools",
  },
  {
    title: "Peer Support Network",
    description:
      "Connect with others on similar journeys, with AI-facilitated matching and conversation starters.",
    icon: <Users className="w-6 h-6" />,
    tags: ["Community", "Support", "AI-Matched"],
    link: "#",
    category: "community",
  },
  {
    title: "AI Therapist Training",
    description:
      "Learn about the AI technologies powering Euphonia and how they complement human therapy.",
    icon: <Robot className="w-6 h-6" />,
    tags: ["Education", "AI", "Therapy"],
    link: "#",
    category: "content",
  },
  {
    title: "Personalized Goal Tracker",
    description:
      "Set and track your mental health goals with AI-powered insights and recommendations.",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Goals", "Progress", "AI-Insights"],
    link: "#",
    category: "tools",
  },
  {
    title: "AI-Powered Journal",
    description:
      "Write freely while our AI analyzes your entries to provide emotional insights and track your progress.",
    icon: <Book className="w-6 h-6" />,
    tags: ["Journaling", "Analysis", "Self-reflection"],
    link: "#",
    category: "tools",
  },
  {
    title: "Mental Health Webinars",
    description:
      "Attend live and recorded webinars featuring AI and human experts on various mental health topics.",
    icon: <Video className="w-6 h-6" />,
    tags: ["Education", "Expert Talks", "Live Sessions"],
    link: "#",
    category: "content",
  },
  {
    title: "AI Scheduling Assistant",
    description:
      "Optimize your daily routine for better mental health with our AI scheduling tool.",
    icon: <Calendar className="w-6 h-6" />,
    tags: ["Productivity", "Routine", "Work-life Balance"],
    link: "#",
    category: "tools",
  },
  {
    title: "Emotion Recognition Training",
    description:
      "Improve your emotional intelligence with our AI-powered facial and vocal emotion recognition exercises.",
    icon: <Sparkles className="w-6 h-6" />,
    tags: ["EQ", "Recognition", "Social Skills"],
    link: "#",
    category: "tools",
  },
  {
    title: "AI Research Digest",
    description:
      "Stay updated with the latest mental health research, summarized and explained by our AI.",
    icon: <Lightbulb className="w-6 h-6" />,
    tags: ["Research", "Updates", "Education"],
    link: "#",
    category: "content",
  },
  {
    title: "Cognitive Games",
    description:
      "Engage in AI-generated puzzles and games designed to improve cognitive function and reduce stress.",
    icon: <Puzzle className="w-6 h-6" />,
    tags: ["Games", "Cognitive Training", "Stress Relief"],
    link: "#",
    category: "tools",
  },
  {
    title: "Community Challenges",
    description:
      "Join AI-curated group challenges to build healthy habits and connect with others.",
    icon: <Users className="w-6 h-6" />,
    tags: ["Challenges", "Community", "Habit Building"],
    link: "#",
    category: "community",
  },
  {
    title: "AI-Powered Nutrition Planner",
    description:
      "Get personalized meal plans and nutrition advice to support your mental health through diet.",
    icon: <Coffee className="w-6 h-6" />,
    tags: ["Nutrition", "Personalized", "Wellness"],
    link: "#",
    category: "lifestyle",
  },
  {
    title: "Virtual Nature Walks",
    description:
      "Experience AI-generated nature scenes and guided walks for relaxation and stress relief.",
    icon: <Leaf className="w-6 h-6" />,
    tags: ["Nature", "Relaxation", "Virtual Reality"],
    link: "#",
    category: "tools",
  },
  {
    title: "Relationship Harmony AI",
    description:
      "Receive AI-powered insights and advice to improve your relationships and communication skills.",
    icon: <Heart className="w-6 h-6" />,
    tags: ["Relationships", "Communication", "AI-Advice"],
    link: "#",
    category: "tools",
  },
  {
    title: "Sleep Optimization Program",
    description:
      "Improve your sleep quality with AI-generated soundscapes, schedules, and relaxation techniques.",
    icon: <Moon className="w-6 h-6" />,
    tags: ["Sleep", "Relaxation", "Wellness"],
    link: "#",
    category: "lifestyle",
  },
  {
    title: "Mindful Breathing Coach",
    description:
      "Learn and practice breathing techniques with real-time AI feedback for stress reduction.",
    icon: <Sun className="w-6 h-6" />,
    tags: ["Breathing", "Mindfulness", "Stress Relief"],
    link: "#",
    category: "tools",
  },
  {
    title: "AI Art Therapy",
    description:
      "Express yourself through AI-assisted art creation, with emotional analysis and guided sessions.",
    icon: <Palette className="w-6 h-6" />,
    tags: ["Art Therapy", "Creativity", "Emotional Expression"],
    link: "#",
    category: "tools",
  },
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">AI-Powered Resources</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Explore cutting-edge tools to support your mental health journey
      </p>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter(
                    (resource) =>
                      category.id === "all" || resource.category === category.id
                  )
                  .map((resource, index) => (
                    <Card key={index} className="flex flex-col h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            {resource.icon}
                          </div>
                          <CardTitle>{resource.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="mb-4">
                          {resource.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6">
                        <Button className="w-full" asChild>
                          <a href={resource.link}>
                            Explore <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">
            Personalized AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Based on your recent activity and progress, our AI suggests the
            following resources:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              AI-Guided Meditation - to help manage your reported stress levels
            </li>
            <li>Cognitive Games - to improve focus and cognitive function</li>
            <li>
              AI Mood Music - to support emotional regulation throughout your
              day
            </li>
            <li>Virtual Nature Walks - for relaxation and stress relief</li>
            <li>
              Mindful Breathing Coach - to practice stress-reduction techniques
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Need more personalized support?
        </h2>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Schedule an AI Therapy Session
        </Button>
      </div>
    </div>
  );
}
