import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "SL",
    title: "Busy Professional",
    quote:
      "AITherapist has been a game-changer for my mental health. It's like having a supportive friend available 24/7.",
  },
  {
    name: "Michael R.",
    avatar: "MR",
    title: "Student",
    quote:
      "I was skeptical at first, but the AI's ability to understand and respond to my concerns is truly impressive.",
  },
  {
    name: "Emily T.",
    avatar: "ET",
    title: "Parent",
    quote:
      "As a busy parent, finding time for therapy was challenging. AITherapist provides the flexibility I need.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">
        What Our <span className="text-indigo-600">Users</span> Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white/50 backdrop-blur-sm border-indigo-100 hover:border-indigo-300 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?text=${testimonial.avatar}`}
                  />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 italic">{testimonial.quote}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
