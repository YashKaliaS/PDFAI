'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, User, Bot } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get a response from the server')
      }

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.answer }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error fetching chat response:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, an error occurred while fetching the response.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Chat with Your Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'bg-gray-100 text-gray-900'
                } p-3 rounded-lg`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 mt-1" />
                ) : (
                  <Bot className="w-5 h-5 mt-1" />
                )}
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the uploaded document..."
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
