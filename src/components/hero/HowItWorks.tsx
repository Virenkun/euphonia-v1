import { Button } from "@/components/ui/button"
import Image from 'next/image'

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and set up your profile with your preferences and goals."
  },
  {
    title: "Choose Your Focus",
    description: "Select the areas of your mental health you'd like to work on, such as stress, anxiety, or personal growth."
  },
  {
    title: "Start Talking",
    description: "Begin your voice conversation with our AI therapist, available anytime you need support."
  },
  {
    title: "Receive Insights",
    description: "Get personalized insights, coping strategies, and progress tracking based on your conversations."
  },
  {
    title: "Track Progress",
    description: "Monitor your mental health journey with detailed analytics and progress reports."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Getting started with AITherapist is easy. Follow these simple steps to begin your journey to better mental health.
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg mr-4">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
          <Button size="lg" className="mt-6">Get Started Now</Button>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full filter blur-3xl opacity-30"></div>
            <Image 
              src="/placeholder.svg?height=500&width=500&text=How+It+Works" 
              alt="How It Works Illustration" 
              width={500} 
              height={500} 
              className="relative rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

