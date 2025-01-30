import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyMatters() {
  return (
    <main className="flex flex-col items-center justify-center mb-12 px-4">
      <section className="w-full py-16 md:py-24">
        <div className="container px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your <span className="text-indigo-600">Privacy</span> is Our{" "}
                <span className="text-indigo-600">Commitment</span>
              </h1>
              <p className="max-w-lg text-lg text-zinc-700 dark:text-zinc-400 md:text-xl">
                Your trust means everything to us. At Euphonia, your
                conversations stay private—always. With state-of-the-art
                security, you can speak freely, knowing your thoughts are safe.
                Focus on your well-being; we’ll take care of the rest.
              </p>
            </div>

            {/* Right Content - Features */}
            <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {features.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                >
                  <Icon className="w-12 h-12 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Features Data
const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Your conversations are fully encrypted, ensuring complete privacy.",
  },
  {
    icon: Lock,
    title: "Anonymous Therapy",
    description:
      "Join sessions without revealing personal details for total anonymity.",
  },
  {
    icon: Eye,
    title: "You Control Your Data",
    description:
      "Easily delete or manage your data whenever you choose—your privacy, your rules.",
  },
];
