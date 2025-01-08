import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Clock, Shield, Zap, Sparkles } from "lucide-react";

const features = [
  {
    title: "Personalized AI Care",
    description:
      "Euphonia’s advanced AI delivers tailored therapeutic insights designed to meet your unique emotional needs.",
    icon: Brain,
  },
  {
    title: "Compassionate Conversations",
    description:
      "Engage in empathetic, human-like dialogues that understand your emotions and provide meaningful support.",
    icon: Heart,
  },
  {
    title: "Always Here for You",
    description:
      "Access therapy anytime, day or night, without the need for appointments or wait times.",
    icon: Clock,
  },
  {
    title: "Your Privacy, Guaranteed",
    description:
      "Enjoy secure, anonymous sessions backed by state-of-the-art encryption to ensure your trust.",
    icon: Shield,
  },
  {
    title: "Instant Support",
    description:
      "Experience real-time responses and solutions to your concerns, whenever you need them most.",
    icon: Zap,
  },
  {
    title: "Evolving to Support You Better",
    description:
      "Euphonia’s AI continuously learns and grows, refining its ability to provide meaningful and effective care.",
    icon: Sparkles,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <h2 className="text-4xl md:text-5xl font-[700] text-gray-900 mb-4 text-center">
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
