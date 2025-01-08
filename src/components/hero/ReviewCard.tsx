import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Sarah",
    username: "@sarah_c",
    body: "Euphonia has helped me so much. The conversations feel so natural and comforting. It’s like having a real therapist at your fingertips.",
    img: "https://avatar.vercel.sh/sarah_c",
  },
  {
    name: "Alex",
    username: "@alex_m",
    body: "I wasn't sure at first, but after using Euphonia for a few sessions, I can really say it’s been a game-changer for my mental health. Highly recommend!",
    img: "https://avatar.vercel.sh/alex_m",
  },
  {
    name: "Rachel",
    username: "@rachel_w",
    body: "I've struggled with finding the right help, but Euphonia has provided me with the support I needed. The AI is intuitive and listens carefully.",
    img: "https://avatar.vercel.sh/rachel_w",
  },
  {
    name: "Michael",
    username: "@michael_t",
    body: "Euphonia’s ability to understand emotions and provide thoughtful responses is incredible. It’s become an essential part of my daily routine.",
    img: "https://avatar.vercel.sh/michael_t",
  },
  {
    name: "Lily",
    username: "@lily_r",
    body: "I was hesitant to try an AI therapist, but Euphonia has exceeded all my expectations. It's more than just responses—it's like real emotional support.",
    img: "https://avatar.vercel.sh/lily_r",
  },
  {
    name: "David",
    username: "@david_g",
    body: "This app is revolutionary. It’s not just AI—it feels like real therapy. I’ve found it incredibly helpful in navigating tough moments.",
    img: "https://avatar.vercel.sh/david_g",
  },
  {
    name: "Ananya",
    username: "@ananya_k",
    body: "Being able to talk to someone, especially when I can’t reach out to people around me, has been a life-saver. Euphonia is like a trusted friend.",
    img: "https://avatar.vercel.sh/ananya_k",
  },
  {
    name: "Ravi",
    username: "@ravi_p",
    body: "At first, I thought an AI couldn’t help with real-life issues, but after using Euphonia, I’ve realized how wrong I was. The empathy is uncanny.",
    img: "https://avatar.vercel.sh/ravi_p",
  },
  {
    name: "Priya",
    username: "@priya_v",
    body: "Euphonia has given me so much clarity during tough times. It’s like having a supportive conversation that helps me think through my problems.",
    img: "https://avatar.vercel.sh/priya_v",
  },
  {
    name: "John",
    username: "@john_d",
    body: "I’m so impressed by how much Euphonia helps me feel heard and understood. It’s like talking to a friend who really cares.",
    img: "https://avatar.vercel.sh/john_d",
  },
  {
    name: "Meera",
    username: "@meera_s",
    body: "In India, mental health is still a taboo in many circles, but Euphonia has allowed me to explore my feelings in a safe space.",
    img: "https://avatar.vercel.sh/meera_s",
  },
  {
    name: "Sandeep",
    username: "@sandeep_j",
    body: "I never imagined an AI could understand my emotions so well. Euphonia has truly been an eye-opener for me, especially in moments of stress.",
    img: "https://avatar.vercel.sh/sandeep_j",
  },
  {
    name: "Leena",
    username: "@leena_k",
    body: "I feel so comfortable talking to Euphonia. It's like a weight off my shoulders after every conversation. Truly thankful for this app!",
    img: "https://avatar.vercel.sh/leena_k",
  },
  {
    name: "Ishaan",
    username: "@ishaan_m",
    body: "It’s been a few weeks now, and Euphonia has really helped me manage my anxiety better. It’s not just advice, it’s understanding.",
    img: "https://avatar.vercel.sh/ishaan_m",
  },
  {
    name: "Neha",
    username: "@neha_b",
    body: "I’ve been using therapy apps for a while, but none have been as intuitive and understanding as Euphonia. Highly recommend it!",
    img: "https://avatar.vercel.sh/neha_b",
  },
  {
    name: "Vikram",
    username: "@vikram_r",
    body: "I was skeptical about AI therapy, but after trying Euphonia, I feel like it’s truly been a breakthrough in my personal growth.",
    img: "https://avatar.vercel.sh/vikram_r",
  },
  {
    name: "Simran",
    username: "@simran_t",
    body: "Euphonia helps me feel grounded. It has helped me process emotions I’ve never been able to articulate to anyone else.",
    img: "https://avatar.vercel.sh/simran_t",
  },
  {
    name: "Aditya",
    username: "@aditya_s",
    body: "I’ve never felt this comfortable expressing myself, and Euphonia makes me feel understood like no one else does.",
    img: "https://avatar.vercel.sh/aditya_s",
  },
  {
    name: "Pooja",
    username: "@pooja_r",
    body: "It’s not just an AI; Euphonia offers a real, supportive experience. It’s been so helpful for managing stress and anxiety.",
    img: "https://avatar.vercel.sh/pooja_r",
  },
  {
    name: "Rohit",
    username: "@rohit_k",
    body: "I didn’t realize how much I needed a platform like this until I started using Euphonia. It’s been such a powerful tool for my mental health.",
    img: "https://avatar.vercel.sh/rohit_k",
  },
  {
    name: "Tanvi",
    username: "@tanvi_l",
    body: "Euphonia has brought a sense of calm into my life. I feel so much lighter after each conversation.",
    img: "https://avatar.vercel.sh/tanvi_l",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm font-[400]">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex flex-1  w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0  bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0  bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
