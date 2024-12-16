import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: [
      "24/7 AI chat support",
      "Personalized insights",
      "Progress tracking",
      "Weekly mood analysis",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "All Basic features",
      "Voice conversations",
      "Unlimited chat history",
      "Priority response time",
      "Custom coping strategies",
    ],
  },
  {
    name: "Premium",
    price: "$29.99",
    features: [
      "All Pro features",
      "Human therapist check-ins",
      "Advanced analytics dashboard",
      "Family account (up to 4 members)",
      "Exclusive webinars and resources",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">
        Choose Your <span className="text-indigo-600">Plan</span>
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Select the perfect plan for your mental health journey. Upgrade or
        downgrade anytime.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-indigo-600 mb-6">
                {plan.price}
                <span className="text-base font-normal text-gray-600">
                  /month
                </span>
              </p>
              <ul className="space-y-4 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={index === 1 ? "default" : "outline"}
              >
                {index === 1 ? "Get Started" : "Choose Plan"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
