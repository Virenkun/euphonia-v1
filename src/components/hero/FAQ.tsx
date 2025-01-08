import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AI therapy work?",
    answer:
      "AI therapy uses advanced natural language processing to understand your concerns and provide personalized support. It analyzes your conversations to offer insights, coping strategies, and exercises tailored to your needs.",
  },
  {
    question: "Is AI therapy as effective as traditional therapy?",
    answer:
      "While AI therapy can be highly effective for many issues, it's not a complete replacement for human therapists in all situations. It's an excellent tool for ongoing support, mild to moderate concerns, and as a complement to traditional therapy.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take your privacy very seriously. All conversations are encrypted end-to-end, and we never share your personal information. You can also opt for anonymous sessions for added privacy.",
  },
  {
    question: "Can I use AITherapist with my existing therapist?",
    answer:
      "AITherapist can be a great complement to traditional therapy, providing additional support between sessions and helping you track your progress over time.",
  },
  {
    question: "What if I need immediate crisis support?",
    answer:
      "While AITherapist is available 24/7, it's not designed for crisis situations. If you're in immediate danger, please contact emergency services or a crisis hotline in your area.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <h2 className="text-4xl font-[700] text-center text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Find answers to common questions about AITherapist and how it can help
        you on your mental health journey.
      </p>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-md font-[600]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-md font-[600]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
