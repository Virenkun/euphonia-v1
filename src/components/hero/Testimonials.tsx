import { MarqueeDemo } from "./ReviewCard";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">
        What Our <span className="text-indigo-600">Users</span> Say
      </h2>
      <MarqueeDemo />
    </section>
  );
}
