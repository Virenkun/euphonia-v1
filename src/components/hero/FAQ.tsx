import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Euphonia, and how does it work?",
    answer:
      "Euphonia is an AI-powered therapy assistant designed to provide emotional support and personalized guidance. It uses advanced natural language processing to understand your concerns, offer coping strategies, and suggest exercises tailored to your needs.",
  },
  {
    question: "Is Euphonia a replacement for traditional therapy?",
    answer:
      "Euphonia is a supportive tool that complements traditional therapy. While it’s highly effective for mild to moderate concerns, it is not intended to replace licensed therapists. For more severe or complex issues, we recommend consulting a professional therapist.",
  },
  {
    question: "How secure and private is my data?",
    answer:
      "Your privacy is our top priority. Euphonia uses end-to-end encryption to protect your data. Your personal information and conversations are never shared without your consent. You can also opt for anonymous sessions for additional privacy.",
  },
  {
    question: "Can Euphonia help if I’m already seeing a therapist?",
    answer:
      "Yes, Euphonia works seamlessly alongside traditional therapy. It helps you track progress, practice exercises between sessions, and maintain emotional balance. Share insights from Euphonia with your therapist for enhanced collaboration.",
  },
  {
    question: "Can I access Euphonia 24/7?",
    answer:
      "Yes, Euphonia is available anytime, anywhere, to provide support whenever you need it. Whether it’s a stressful moment or simply a need to vent, Euphonia is just a tap away.",
  },
  {
    question: "What if I need immediate crisis support?",
    answer:
      "Euphonia is not designed for crisis situations. If you are in immediate danger or require urgent help, please contact emergency services or a crisis hotline in your area.",
  },
  {
    question: "What kind of issues can Euphonia help with?",
    answer:
      "Euphonia is effective for a variety of concerns, including stress and anxiety management, building healthy habits, coping with sadness or mild depression, boosting self-esteem, and improving mindfulness and emotional resilience.",
  },
  {
    question: "How personalized is the support Euphonia provides?",
    answer:
      "Euphonia tailors its responses and suggestions based on your inputs, emotions, and preferences. Over time, it learns from your interactions to provide even more relevant and helpful guidance.",
  },
  {
    question: "Can Euphonia handle multiple users on one account?",
    answer:
      "For privacy reasons, we recommend that each user create their own account. This ensures personalized support and data protection for everyone.",
  },
  {
    question: "What platforms does Euphonia support?",
    answer:
      "Euphonia is available on iOS, Android, and web platforms, making it accessible on your favorite devices.",
  },
  {
    question: "How much does Euphonia cost?",
    answer:
      "Euphonia offers a free tier with basic features. For advanced capabilities like progress tracking, in-depth exercises, and tailored insights, we offer a premium subscription plan.",
  },
  {
    question: "Does Euphonia use my data for training AI?",
    answer:
      "No, your data is never used to train or improve our AI. Our algorithms are pre-trained and do not process your personal data beyond providing you with immediate support.",
  },
  {
    question: "Can I delete my data or account?",
    answer:
      "Yes, you have full control over your data. You can delete your conversations, personal information, or your account at any time through the app settings.",
  },
  {
    question: "Does Euphonia offer support in multiple languages?",
    answer:
      "Currently, Euphonia supports English, but we are actively working to add more languages to provide support for a diverse user base.",
  },
  {
    question: "Can Euphonia suggest exercises or activities?",
    answer:
      "Absolutely! Euphonia provides actionable exercises, mindfulness practices, journaling prompts, and breathing techniques tailored to your emotional state.",
  },
  {
    question: "How can I provide feedback about Euphonia?",
    answer:
      "We value your input! You can provide feedback through the app or email us at support@euphonia.ai. Your suggestions help us improve and serve you better.",
  },
  {
    question: "Is there a free trial for premium features?",
    answer:
      "Yes, we offer a 7-day free trial for new users to explore all premium features before deciding on a subscription.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <h2 className="text-4xl font-[700] text-center text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Find answers to common questions about Euphonia and how it can help you
        on your mental health journey.
      </p>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-md font-[600]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-md font-[400]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
