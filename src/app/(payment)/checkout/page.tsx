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
import { Zap, Users, Briefcase, Building2, BadgeCheck } from "lucide-react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import RazorpayButton from "@/components/razorpay-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    id: 1,
    created_at: "2024-12-30 05:11:32.577762+00",
    features: {
      sessions: 5,
      dashboardAccess: true,
      chatHistoryAccess: true,
      aiResourceAccess: true,
      professionalTherapistAccess: true,
      aiCheckInAccess: true,
    },
    features_map: [
      "5 Sessions",
      "Dashboard Access",
      "Chat History Access",
      "AI Resource Access",
      "AI Check-In Access",
    ],
    price: "0",
    duration: "Free Forever",
    name: "Harmonic",
    is_trial: true,
    plan_type: "HARMONIC",
    description: "A free or basic plan for casual users exploring therapy.",
    icon: Users,
    priceId: "0",
  },
  {
    id: 2,
    created_at: "2024-12-30 05:11:32.577762+00",
    features: {
      sessions: 25,
      support: "Chat and Email",
    },
    features_map: ["25 Sessions", "Chat and Email Support"],
    price: "5",
    duration: "Monthly",
    name: "Melody",
    is_trial: false,
    plan_type: "MELODY",
    description:
      "A mid-tier plan offering essential features for regular users.",
    icon: Zap,
    priceId: "price_1Qf5VuRvCtMaecfiyiZG8ami",
  },
  {
    id: 3,
    created_at: "2024-12-30 05:11:32.577762+00",
    features: {
      sessions: 99,
      support: "Priority Support",
    },
    features_map: ["499 Sessions", "Advanced Tools"],
    price: "9",
    duration: "Monthly",
    name: "Symphony",
    is_trial: false,
    plan_type: "SYMPHONY",
    description: "A premium plan with advanced tools and personalized support.",
    icon: Briefcase,
    priceId: "price_1Qf5WiRvCtMaecfijjwoxkvu",
  },
  {
    id: 4,
    created_at: "2024-12-30 05:11:32.577762+00",
    features: {
      sessions: 499,
      tools: "Advanced",
    },
    features_map: ["499 Sessions", "Advanced Tools"],
    price: "49",
    duration: "Monthly",
    name: "Serenade",
    is_trial: false,
    plan_type: "SERENADE",
    description:
      "A specialized plan with exclusive benefits for dedicated users.",
    icon: Building2,
    priceId: "price_1Qf5XSRvCtMaecfiNQPzdWoG",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();
  // const handleSubscribe = async (priceId: string, planId: string) => {
  //   setLoading(true);
  //   if (priceId === "0") {
  //     router.push("/main");
  //     return;
  //   }

  //   try {
  //     const userId = "user-id";
  //     const response = await CheckoutSession({ priceId, userId, planId });
  //     console.log(response);

  //     const data = response;

  //     if (data.sessionUrl) {
  //       window.location.href = data.sessionUrl;
  //     } else {
  //       console.error("Failed to redirect to Stripe:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during subscription:", error);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B4ACF] to-[#7A79FF] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-indigo-100">
            Select the perfect plan for your needs and start creating amazing
            projects today.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <span className="text-white font-medium">Monthly</span>
          <ToggleSwitch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className="text-white font-medium">Yearly</span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Save 20%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                {plan.icon && (
                  <div
                    className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4`}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>
                )}
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold mb-6">
                  $
                  {isYearly
                    ? (Number(plan.price) * 12 * 0.8).toFixed(0)
                    : plan.price}
                  <span className="text-lg font-normal">
                    /{isYearly ? "year" : "month"}
                  </span>
                </p>
                <ul className="space-y-2">
                  {plan.features_map.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <BadgeCheck className="w-4 h-4 rounded-full" />
                      <div className={`w-4 h-4 rounded-full`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.price === "0" ? (
                  <Link href="/main">
                    <Button className="h-12 w-full bg-[#4B4ACF] text-white text-lg font-semibold hover:bg-[#4B4AEF]">
                      Continue with {plan.name}
                    </Button>
                  </Link>
                ) : (
                  <RazorpayButton
                    amount={
                      isYearly
                        ? Number((Number(plan.price) * 12 * 0.8).toFixed(0))
                        : Number(plan.price)
                    }
                    currency="USD"
                    productId={plan.id.toString()}
                    productName={plan.name}
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-indigo-100">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
