import { TeamMember } from "@/components/team-member";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Viren Soni",
      role: "Founder & Visionary",
      description:
        "A tech innovator dedicated to transforming mental health support through AI-driven solutions.",
      imageUrl: "/t2.png",
    },
    {
      name: "Adamya Dubey",
      role: "Design Thinking",
      description:
        "Crafting user-centric experiences to ensure Euphonia's AI conversations are intuitive and engaging.",
      imageUrl: "/t1.png",
    },
    // {
    //   name: "Sarah Johnson",
    //   role: "Mental Health Expert",
    //   description:
    //     "Guiding the integration of evidence-based practices to ensure meaningful and compassionate AI interactions.",
    //   imageUrl: "/closeup.png",
    // },
    // {
    //   name: "Michael Lee",
    //   role: "Platform Architect",
    //   description:
    //     "Building the backbone of Euphonia's secure and scalable digital platform to support user needs.",
    //   imageUrl: "/closeup.png",
    // },
    // {
    //   name: "Dr. Olivia Taylor",
    //   role: "Ethics and Compliance Advisor",
    //   description:
    //     "Championing ethical AI development to prioritize user trust, well-being, and privacy.",
    //   imageUrl: "/closeup.png",
    // },
    // {
    //   name: "David Patel",
    //   role: "Chief Security Officer",
    //   description:
    //     "Fortifying Euphonia's infrastructure with cutting-edge security measures to safeguard sensitive user data.",
    //   imageUrl: "/closeup.png",
    // },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        Meet the Minds Behind Euphonia
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-12">
        Our passionate team of innovators, and technologists dedicated to
        redefining mental well-being through AI-powered conversations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
}
