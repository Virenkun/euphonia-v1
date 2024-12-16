'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send } from 'lucide-react'

export default function AIDemo() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: 'Thank you for sharing. I understand that can be challenging. How does this situation make you feel?' }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Experience AI Therapy</h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Try a demo of our AI therapist and see how it can help you. Start a conversation below.
      </p>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md p-4 rounded-lg ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

