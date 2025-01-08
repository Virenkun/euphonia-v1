"use client";

import React from "react";
import { Check, Music, Headphones, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutSession } from "@/services/payment/action";

const plans = [
  {
    name: "Harmony",
    description: "Explore the basics of AI therapy",
    price: "Free",
    features: [
      "2 daily AI therapy sessions (5-min cap)",
      "Basic speech-to-text transcription",
      "General mental wellness prompts",
      "Save up to 3 conversation logs",
      "Community forum support",
    ],
    icon: Music,
    color: "bg-blue-100",
  },
  {
    name: "Melody",
    description: "Regular support for your mental health journey",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited daily AI sessions (20-min cap)",
      "Advanced speech-to-text transcription",
      "Mood tracking & weekly reports",
      "Save up to 30 conversation logs",
      "Priority email support",
    ],
    icon: Headphones,
    color: "bg-blue-300",
  },
  {
    name: "Symphony",
    description: "Comprehensive tools for mental wellness",
    price: "$19.99",
    period: "/month",
    features: [
      "Unlimited session duration",
      "AI-generated coping strategies",
      "Daily affirmations & mindfulness",
      "Wearable device integration",
      "Export conversation logs",
      "Exclusive content access",
      "Priority real-time chat support",
    ],
    icon: Users,
    color: "bg-blue-500",
  },
];

export default function PricingPlan() {
  const handleSubscribe = async (planId: string) => {
    try {
      const userId = "user-id"; // Replace with the logged-in user's ID
      const response = await CheckoutSession({ planId, userId });
      console.log(response);

      const data = response;

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        console.error("Failed to redirect to Stripe:", data.error);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-xl"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Choose the perfect plan for your journey to mental wellness with
            Euphonia.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <Card
              key={plan.name}
              className={`
                ${
                  planIdx === 1
                    ? "relative z-10 scale-105 shadow-2xl"
                    : "bg-white/60 backdrop-blur-lg"
                }
                flex flex-col justify-between rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:scale-105 hover:z-20
                ${planIdx === 1 ? "hover:scale-110" : ""}
              `}
            >
              <div>
                <CardHeader>
                  <div className={`${plan.color} inline-flex rounded-full p-3`}>
                    <plan.icon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base leading-7 text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-6">
                  <div className="flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-base text-gray-500">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                  >
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check
                          className="h-6 w-5 flex-none text-blue-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="mt-8">
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full ${
                    planIdx === 1
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {plan.name === "Harmony" ? "Get started" : "Subscribe now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
