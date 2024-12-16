import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-28">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Therapy<br />
            <span className="text-indigo-600">For Your Mind</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of mental wellness with our AI voice therapist. Compassionate, accessible, and always here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg bg-indigo-600 hover:bg-indigo-700">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30"></div>
            <Image 
              src="/placeholder.svg?height=500&width=500&text=AI+Therapist" 
              alt="AI Therapist Illustration" 
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

