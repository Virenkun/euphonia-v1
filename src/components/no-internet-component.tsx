import {
  WifiOff,
  Coffee,
  Pizza,
  Book,
  Gamepad2,
  Dumbbell,
  Rabbit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoInternetComponent() {
  const offlineActivities = [
    {
      icon: Coffee,
      text: "Perfect your latte art skills (foam mustaches count)",
      color: "text-amber-600",
    },
    {
      icon: Pizza,
      text: "Invent a pizza topping that makes pineapple seem boring",
      color: "text-red-500",
    },
    {
      icon: Book,
      text: "Finally read War and Peace (or at least convincingly pretend to)",
      color: "text-emerald-600",
    },
    {
      icon: Gamepad2,
      text: "Become the undisputed champion of the offline dinosaur game",
      color: "text-blue-500",
    },
    {
      icon: Dumbbell,
      text: "Do one push-up for every second you're offline (results may vary)",
      color: "text-purple-600",
    },
    {
      icon: Rabbit,
      text: "Learn to pull a rabbit out of a hat (hat and rabbit not included)",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-800 to-indigo-600  p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <WifiOff className="h-16 w-16 text-red-500" />
            <div className="ml-4 h-16 w-1 bg-gray-300"></div>
            <div className="ml-4 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              404
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Oops! The Internet Has Left the Building
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 text-lg text-center">
            {` Don't worry, it's not you. It's the internet. While we wait for it to find its way back home, why not try one of these totally productive activities:`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offlineActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <activity.icon className={`h-6 w-6 ${activity.color}`} />
                <span className="text-sm text-gray-700">{activity.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600  text-white font-bold py-6 px-6 rounded-full text-lg transition-all duration-300"
          >
            Summon the Internet Spirits
          </Button>
          <p className="mt-4 text-sm text-gray-500 italic text-center">
            Warning: Excessive button clicking may result in finger fatigue,
            mild frustration, or spontaneous interpretive dance.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
