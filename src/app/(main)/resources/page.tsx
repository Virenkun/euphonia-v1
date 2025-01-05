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
import { groq } from "@/utils/groq/client";
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { RESOURCE_PROMPT } from "@/constant/constants";
import Spinner from "@/components/spinner";

interface Resource {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  link: string;
  category: string;
}

const categories = [
  { id: "all", name: "All Resources" },
  { id: "tools", name: "AI Tools" },
  { id: "content", name: "Educational Content" },
  { id: "community", name: "Community" },
  { id: "lifestyle", name: "Lifestyle" },
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(async () => {
    setLoading(true);
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: RESOURCE_PROMPT,
        },

        {
          role: "user",
          content: "Generate a list of resources focused on mental health.",
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      max_tokens: 2024,
      top_p: 1,
      stream: false,
    });
    const content = response.choices[0]?.message?.content;
    if (content) {
      console.log(JSON.parse(content));
      setResources(JSON.parse(content));
    } else {
      console.error("Content is null");
    }
    setLoading(false);
  }, []);

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
              {loading ? (
                <div className="flex flex-col flex-1 justify-center items-center min-h-[600px]">
                  <Spinner />

                  <p className="text-sm font-normal mt-4">
                    Please wait preparing resources for you...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources
                    .filter(
                      (resource) =>
                        category.id === "all" ||
                        resource.category === category.id
                    )
                    .map((resource, index) => (
                      <Card
                        key={`${resource.title}-${index}`}
                        className="flex flex-col h-full"
                      >
                        <CardHeader>
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {renderIcon(resource.icon)}
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
                              <Badge
                                key={`${tag}-${tagIndex}`}
                                variant="secondary"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <div className="px-6 pb-6">
                          <Button className="w-full" asChild>
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Explore <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
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

const iconComponents = {
  Brain,
  Book,
  Video,
  Headphones,
  Users,
  Robot,
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
};

function renderIcon(iconString: string) {
  const match = /<(\w+)\s/.exec(iconString);
  const componentName = match ? match[1] : null;

  if (componentName && componentName in iconComponents) {
    const Component =
      iconComponents[componentName as keyof typeof iconComponents];
    return <Component className="w-6 h-6" />;
  }

  return null; // Fallback if the icon is not found
}
