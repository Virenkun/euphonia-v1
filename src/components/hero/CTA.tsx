import InteractiveHoverButton from "../ui/interactive-hover-button";

export default function CTA() {
  return (
    <section className="min-w-full py-20 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg shadow-4xl px-4">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-[700] mb-6 text-white">
          Ready to Begin Your Path to Peace with Euphonia?
        </h2>
        <p className="text-xl mb-8 font-[500]  mx-auto text-indigo-100">
          No fees, no wait times, no downloads—just instant, hassle-free therapy
          with an empathetic AI, available whenever and wherever you need it.
        </p>
        <InteractiveHoverButton text="Let’s Begin the Conversation" />
      </div>
    </section>
  );
}
