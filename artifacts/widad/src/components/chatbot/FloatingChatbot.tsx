import { useState } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { askGemini } from '@/lib/gemini'

type ChatMessage = {
  id: string
  role: 'user' | 'bot'
  text: string
}

const WELCOME = 'أهلاً بكِ في وداد. اسأليني عن الصحة النسائية، الحمل، أو نمط الحياة الصحي.'

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'welcome', role: 'bot', text: WELCOME }])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const reply = await askGemini(text)
      setMessages((prev) => [...prev, { id: `${Date.now()}-bot`, role: 'bot', text: reply }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-[70] w-14 h-14 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
        aria-label="Open chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[70] w-[min(92vw,380px)] h-[540px] bg-white border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col" dir="rtl">
          <div className="px-4 py-3 bg-primary text-white flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <p className="font-bold">شات وداد الذكي</p>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] text-sm leading-relaxed px-3 py-2 rounded-2xl ${message.role === 'user' ? 'mr-auto bg-primary text-white' : 'ml-auto bg-white border border-gray-200 text-gray-800'}`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="ml-auto bg-white border border-gray-200 text-gray-500 text-sm px-3 py-2 rounded-2xl">
                جاري التفكير...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    send()
                  }
                }}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="اكتبي سؤالك..."
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-white disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
