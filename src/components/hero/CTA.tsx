import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
          Experience the power of AI-driven therapy and take the first step towards better mental health today.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
          Begin Your Free Trial
        </Button>
      </div>
    </section>
  )
}

