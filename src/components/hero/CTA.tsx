import InteractiveHoverButton from "../ui/interactive-hover-button";

export default function CTA() {
  return (
    <section className="min-w-full py-20 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg shadow-4xl">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-[700] mb-6 text-white">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 font-[600]  mx-auto text-indigo-100">
          Experience the power of AI-driven therapy and take the first step
          towards better mental health today.
        </p>
        <InteractiveHoverButton text="Begin Your Free Trial" />
      </div>
    </section>
  );
}
