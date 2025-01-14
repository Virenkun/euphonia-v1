"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { groq } from "@/utils/groq/client";
import { AI_CHECK_IN_PROMPT } from "@/constant/constants";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";

export default function AICheckinForm() {
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [focus, setFocus] = useState(5);
  const [motivation, setMotivation] = useState(5);
  const [sleep, setSleep] = useState("");
  const [sleepQuality, setSleepQuality] = useState(5);
  const [appetite, setAppetite] = useState("");
  const [socialInteraction, setSocialInteraction] = useState("");
  const [exercise, setExercise] = useState("");
  const [stressLevel, setStressLevel] = useState(5);
  const [selfEsteem, setSelfEsteem] = useState(5);
  const [physicalHealth, setPhysicalHealth] = useState(5);
  const [workLifeBalance, setWorkLifeBalance] = useState(5);
  const [copingMechanisms, setCopingMechanisms] = useState<string[]>([]);
  const [journal, setJournal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = {
      mood,
      energy,
      anxiety,
      focus,
      motivation,
      sleep,
      sleepQuality,
      appetite,
      socialInteraction,
      exercise,
      stressLevel,
      selfEsteem,
      physicalHealth,
      workLifeBalance,
      copingMechanisms,
      journal,
    };
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: AI_CHECK_IN_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify(formData),
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const response = chatCompletion.choices[0]?.message?.content ?? "";
    console.log("====================================");
    console.log(response, "resss");
    console.log("====================================");

    setAiResponse(response);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Emotional State</CardTitle>
          <CardDescription>How are you feeling right now?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 w-1/2">
          {[
            {
              id: "mood",
              label: "Overall Mood",
              value: mood,
              setValue: setMood,
            },
            {
              id: "energy",
              label: "Energy Level",
              value: energy,
              setValue: setEnergy,
            },
            {
              id: "anxiety",
              label: "Anxiety Level",
              value: anxiety,
              setValue: setAnxiety,
            },
            {
              id: "focus",
              label: "Ability to Focus",
              value: focus,
              setValue: setFocus,
            },
            {
              id: "motivation",
              label: "Motivation",
              value: motivation,
              setValue: setMotivation,
            },
          ].map((item) => (
            <div key={item.id} className="space-y-2">
              <Label htmlFor={item.id}>{item.label}</Label>
              <Slider
                id={item.id}
                min={1}
                max={10}
                step={0.1}
                value={[item.value]}
                onValueChange={(value) => item.setValue(value[0])}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Low</span>
                <span>{item.value.toFixed(1)}</span>
                <span>High</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Physical Well-being</CardTitle>
          <CardDescription>
            Tell us about your recent physical state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 w-1/2">
          <div className="space-y-2">
            <Label htmlFor="sleep">
              How many hours did you sleep last night?
            </Label>
            <Select value={sleep} onValueChange={setSleep}>
              <SelectTrigger id="sleep">
                <SelectValue placeholder="Select sleep duration" />
              </SelectTrigger>
              <SelectContent>
                {["Less than 4", "4-6", "6-8", "8-10", "More than 10"].map(
                  (value) => (
                    <SelectItem key={value} value={value.toLowerCase()}>
                      {value} hours
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepQuality">Sleep Quality</Label>
            <Slider
              id="sleepQuality"
              min={1}
              max={10}
              step={0.1}
              value={[sleepQuality]}
              onValueChange={(value) => setSleepQuality(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Poor</span>
              <span>{sleepQuality.toFixed(1)}</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appetite">
              How has your appetite been recently?
            </Label>
            <Select value={appetite} onValueChange={setAppetite}>
              <SelectTrigger id="appetite">
                <SelectValue placeholder="Select your appetite level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="decreased">Decreased</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="increased">Increased</SelectItem>
                <SelectItem value="fluctuating">Fluctuating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exercise">
              How often have you exercised in the past week?
            </Label>
            <Select value={exercise} onValueChange={setExercise}>
              <SelectTrigger id="exercise">
                <SelectValue placeholder="Select your exercise frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="1-2times">1-2 times</SelectItem>
                <SelectItem value="3-4times">3-4 times</SelectItem>
                <SelectItem value="5+times">5+ times</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalHealth">Overall Physical Health</Label>
            <Slider
              id="physicalHealth"
              min={1}
              max={10}
              step={0.1}
              value={[physicalHealth]}
              onValueChange={(value) => setPhysicalHealth(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Poor</span>
              <span>{physicalHealth.toFixed(1)}</span>
              <span>Excellent</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social and Environmental Factors</CardTitle>
          <CardDescription>
            {`How's your social life and environment?`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 w-1/2">
          <div className="space-y-2">
            <Label htmlFor="socialInteraction">
              How much have you interacted socially in the past week?
            </Label>
            <Select
              value={socialInteraction}
              onValueChange={setSocialInteraction}
            >
              <SelectTrigger id="socialInteraction">
                <SelectValue placeholder="Select your social interaction level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veryLittle">Very little</SelectItem>
                <SelectItem value="some">Some</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="alot">A lot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stressLevel">Current Stress Level</Label>
            <Slider
              id="stressLevel"
              min={1}
              max={10}
              step={0.1}
              value={[stressLevel]}
              onValueChange={(value) => setStressLevel(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Low</span>
              <span>{stressLevel.toFixed(1)}</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workLifeBalance">Work-Life Balance</Label>
            <Slider
              id="workLifeBalance"
              min={1}
              max={10}
              step={0.1}
              value={[workLifeBalance]}
              onValueChange={(value) => setWorkLifeBalance(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Poor</span>
              <span>{workLifeBalance.toFixed(1)}</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="selfEsteem">Self-Esteem</Label>
            <Slider
              id="selfEsteem"
              min={1}
              max={10}
              step={0.1}
              value={[selfEsteem]}
              onValueChange={(value) => setSelfEsteem(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Low</span>
              <span>{selfEsteem.toFixed(1)}</span>
              <span>High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coping Mechanisms</CardTitle>
          <CardDescription>
            What strategies have you been using to manage your mental health?
          </CardDescription>
        </CardHeader>
        <CardContent className="w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "meditation", label: "Meditation or Mindfulness" },
              { id: "exercise", label: "Physical Exercise" },
              { id: "therapy", label: "Therapy or Counseling" },
              { id: "journaling", label: "Journaling" },
              { id: "socialSupport", label: "Seeking Social Support" },
              { id: "hobbies", label: "Engaging in Hobbies" },
              { id: "relaxationTechniques", label: "Relaxation Techniques" },
              { id: "medication", label: "Medication (as prescribed)" },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={copingMechanisms.includes(item.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCopingMechanisms([...copingMechanisms, item.id]);
                    } else {
                      setCopingMechanisms(
                        copingMechanisms.filter((id) => id !== item.id)
                      );
                    }
                  }}
                />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entry</CardTitle>
          <CardDescription>
            {`Share any thoughts or feelings you'd like (optional)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your thoughts here..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing
          </>
        ) : (
          <>
            <Brain className="mr-2 h-4 w-4" />
            Get AI Insights
          </>
        )}
      </Button>

      {aiResponse && (
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription>
              Based on your responses, here are personalized insights and
              recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg text-lg font-[400] dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="mt-8 mb-4 font-semibold text-4xl"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="mt-6 mb-3 font-semibold text-3xl"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="mt-5 mb-2 font-medium text-2xl" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-4 leading-relaxed text-lg" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="mb-4 list-disc list-inside" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="mb-4 list-decimal list-inside" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400"
                      {...props}
                    />
                  ),
                  code: ({
                    inline,
                    ...props
                  }: React.HTMLAttributes<HTMLElement> & {
                    inline?: boolean;
                  }) =>
                    inline ? (
                      <code
                        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                        {...props}
                      />
                    ) : (
                      <pre
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto"
                        {...props}
                      />
                    ),
                  strong: ({ ...props }) => (
                    <strong
                      className="font-bold text-gray-800 dark:text-gray-200"
                      {...props}
                    />
                  ),
                }}
              >
                {aiResponse}
              </ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Schedule AI Therapy Session
            </Button>
          </CardFooter>
        </Card>
      )}
    </form>
  );
}
