import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Clock, Shield, Zap, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI-Powered Insights",
    description:
      "Advanced algorithms provide personalized therapeutic support tailored to your unique needs.",
    icon: Brain,
  },
  {
    title: "Empathetic Conversations",
    description:
      "Natural language processing for compassionate, human-like interactions that understand context and emotion.",
    icon: Heart,
  },
  {
    title: "24/7 Availability",
    description:
      "Access support whenever you need it, day or night, without scheduling or waiting.",
    icon: Clock,
  },
  {
    title: "Secure & Confidential",
    description:
      "Your privacy is our top priority with end-to-end encryption and anonymous sessions.",
    icon: Shield,
  },
  {
    title: "Rapid Response",
    description:
      "Get immediate support and answers to your concerns without delay.",
    icon: Zap,
  },
  {
    title: "Continuous Learning",
    description:
      "Our AI constantly improves, learning from interactions to provide better support over time.",
    icon: Sparkles,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        Why Choose <span className="text-indigo-600">Euphonia</span>?
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Discover the unique benefits of our AI-powered therapy platform that
        sets us apart from traditional methods.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white/50 backdrop-blur-sm border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
