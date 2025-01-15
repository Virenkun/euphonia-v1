"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  ArrowRight,
  ArrowLeft,
  Brain,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AI_CHECK_IN_PROMPT } from "@/constant/constants";
import { groq } from "@/utils/groq/client";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/spinner";

export default function AICheckinForm({
  setStartCheckin,
}: {
  setStartCheckin: (value: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  interface FormData {
    mood: string;
    energy: string;
    sleep: string;
    appetite: string;
    socialInteraction: string;
    workProductivity: string;
    stressLevel: string;
    selfCare: string[];
    gratitude: string;
    challenge: string;
    goal: string;
    journal: string;
    [key: string]: string | string[];
  }

  const [formData, setFormData] = useState<FormData>({
    mood: "",
    energy: "",
    sleep: "",
    appetite: "",
    socialInteraction: "",
    workProductivity: "",
    stressLevel: "",
    selfCare: [],
    gratitude: "",
    challenge: "",
    goal: "",
    journal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const totalSteps = 9;

  const updateFormData = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const questions: Question[] = [
    {
      title: "How are you feeling today?",
      key: "mood",
      type: "buttons" as const,
      options: [
        { value: "great", emoji: "😊", label: "Great" },
        { value: "good", emoji: "🙂", label: "Good" },
        { value: "okay", emoji: "😐", label: "Okay" },
        { value: "not-great", emoji: "😟", label: "Not Great" },
      ],
    },
    {
      title: "How's your energy level?",
      key: "energy",
      type: "buttons",
      options: [
        { value: "energized", icon: Sun, label: "Energized" },
        { value: "steady", icon: Cloud, label: "Steady" },
        { value: "tired", icon: CloudRain, label: "Tired" },
        { value: "exhausted", icon: CloudLightning, label: "Exhausted" },
      ],
    },
    {
      title: "How did you sleep last night?",
      key: "sleep",
      type: "buttons",
      options: [
        { value: "great", emoji: "😴", label: "Great" },
        { value: "okay", emoji: "😌", label: "Okay" },
        { value: "poor", emoji: "😫", label: "Poor" },
        { value: "insomnia", emoji: "🦉", label: "Couldn't Sleep" },
      ],
    },
    {
      title: "How's your appetite today?",
      key: "appetite",
      type: "buttons",
      options: [
        { value: "increased", emoji: "🍽️", label: "Increased" },
        { value: "normal", emoji: "🍴", label: "Normal" },
        { value: "decreased", emoji: "🍽️", label: "Decreased" },
        { value: "no-appetite", emoji: "🚫", label: "No Appetite" },
      ],
    },
    {
      title: "How much have you interacted socially in the past day?",
      key: "socialInteraction",
      type: "radio",
      options: [
        { value: "none", label: "No interaction" },
        { value: "minimal", label: "Minimal interaction" },
        { value: "moderate", label: "Moderate interaction" },
        { value: "lot", label: "A lot of interaction" },
      ],
    },
    {
      title: "How would you describe your work productivity today?",
      key: "workProductivity",
      type: "radio",
      options: [
        { value: "veryProductive", label: "Very productive" },
        { value: "productive", label: "Productive" },
        { value: "somewhatProductive", label: "Somewhat productive" },
        { value: "notProductive", label: "Not productive" },
      ],
    },
    {
      title: "How would you describe your stress level today?",
      key: "stressLevel",
      type: "radio",
      options: [
        { value: "veryLow", label: "Very low" },
        { value: "manageable", label: "Manageable" },
        { value: "high", label: "High" },
        { value: "overwhelming", label: "Overwhelming" },
      ],
    },
    {
      title: "Have you engaged in any self-care activities?",
      key: "selfCare",
      type: "multiSelect",
      options: [
        { value: "exercise", emoji: "🏋️", label: "Exercise" },
        { value: "meditation", emoji: "🧘", label: "Meditation" },
        { value: "reading", emoji: "📚", label: "Reading" },
        { value: "nature", emoji: "🌳", label: "Nature Walk" },
        { value: "hobby", emoji: "🎨", label: "Hobby" },
        { value: "social", emoji: "👥", label: "Socializing" },
      ],
    },
    {
      title: "Reflection",
      type: "text",
      questions: [
        {
          key: "gratitude",
          label: "What's one thing you're grateful for today?",
        },
        { key: "challenge", label: "What's one challenge you're facing?" },
        { key: "goal", label: "What's one goal you have for tomorrow?" },
      ],
      key: "",
    },
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
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

    setAiResponse(response);
    setIsSubmitting(false);
  };

  interface Question {
    title: string;
    key: string;
    type: "buttons" | "radio" | "multiSelect" | "text";
    options?: Array<{
      value: string;
      emoji?: string;
      icon?: React.ComponentType;
      label: string;
    }>;
    questions?: Array<{
      key: string;
      label: string;
    }>;
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "buttons":
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options &&
              question.options.map(
                (option: {
                  value: string;
                  emoji?: string;
                  icon?: React.ComponentType;
                  label: string;
                }) => (
                  <Button
                    key={option.value}
                    variant={
                      formData[question.key] === option.value
                        ? "default"
                        : "outline"
                    }
                    className="h-60 flex flex-col items-center justify-center"
                    onClick={() => updateFormData(question.key, option.value)}
                    type="button"
                  >
                    {option.emoji ? (
                      <span className="text-4xl mb-2">{option.emoji}</span>
                    ) : option.icon ? (
                      <option.icon />
                    ) : null}
                    <span>{option.label}</span>
                  </Button>
                )
              )}
          </div>
        );
      case "radio":
        return (
          <RadioGroup
            onValueChange={(value) => updateFormData(question.key, value)}
            value={
              typeof formData[question.key] === "string"
                ? (formData[question.key] as string)
                : undefined
            }
          >
            {question.options &&
              question.options.map(
                (option: { value: string; label: string }) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-4"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${question.key}-${option.value}`}
                      className="h-6 w-6 gap-8 m-1"
                    />
                    <Label
                      htmlFor={`${question.key}-${option.value}`}
                      className="cursor-pointer text-md"
                      onClick={() =>
                        updateFormData(
                          question.key,
                          formData[question.key] === option.value
                            ? ""
                            : option.value
                        )
                      }
                    >
                      {option.label}
                    </Label>
                  </div>
                )
              )}
          </RadioGroup>
        );
      case "multiSelect":
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options &&
              question.options.map(
                (option: { value: string; emoji?: string; label: string }) => (
                  <Button
                    key={option.value}
                    variant={
                      formData[question.key].includes(option.value)
                        ? "default"
                        : "outline"
                    }
                    className="h-60 flex flex-col items-center justify-center"
                    type="button"
                    onClick={() => {
                      const newValue = formData[question.key].includes(
                        option.value
                      )
                        ? Array.isArray(formData[question.key])
                          ? (formData[question.key] as string[]).filter(
                              (v: string) => v !== option.value
                            )
                          : []
                        : [...formData[question.key], option.value];
                      updateFormData(question.key, newValue);
                    }}
                  >
                    <span className="text-4xl mb-2">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Button>
                )
              )}
          </div>
        );
      case "text":
        return (
          <div className="space-y-4">
            {question.questions &&
              question.questions.map((q: { key: string; label: string }) => (
                <div key={q.key} className="space-y-2">
                  <Label htmlFor={q.key}>{q.label}</Label>
                  <Input
                    id={q.key}
                    value={formData[q.key]}
                    onChange={(e) => updateFormData(q.key, e.target.value)}
                  />
                </div>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {aiResponse ? (
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
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setStartCheckin(false);
                setAiResponse("");
              }}
            >
              Start a New Check-in
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <form className="max-w-4xl mx-auto">
          <Card className="w-full">
            {isSubmitting ? (
              <div className="flex flex-col justify-center items-center h-96">
                <Spinner className="w-8 h-8 mx-auto mt-8 flex justify-center items-center" />
                <p className="text-center mt-4 text-gray-600 font-medium">
                  Euphonia Thinking... <br />
                  Analyzing your responses, Please wait.
                </p>
              </div>
            ) : (
              <CardContent className="pt-6">
                <Progress value={(step / totalSteps) * 100} className="mb-4" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step < questions.length ? (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">
                          {questions[step].title}
                        </h2>
                        {renderQuestion(questions[step])}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">
                          Any final thoughts?
                        </h2>
                        <textarea
                          className="w-full h-32 p-2 border rounded-md"
                          placeholder="Share anything else on your mind... (optional)"
                          value={formData.journal}
                          onChange={(e) =>
                            updateFormData("journal", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    disabled={step === 0}
                    variant="outline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {step < totalSteps ? (
                    <Button type="button" onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="button" onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </form>
      )}
    </>
  );
}
