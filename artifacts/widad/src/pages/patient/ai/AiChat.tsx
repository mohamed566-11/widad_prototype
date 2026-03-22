import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { Send, Bot, User, Sparkles, AlertCircle, Mic } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureGate } from '@/components/subscription/FeatureGate'

const STAGE_QUESTIONS = {
  pre_marriage: ['ما هي الفحوصات الضرورية قبل الزواج؟', 'كيف أستعد نفسياً للزواج؟', 'ما هي أفضل وسائل تنظيم الأسرة؟'],
  marriage: ['ما هي أعراض الحمل المبكرة؟', 'كيف أحسب أيام التبويض؟', 'هل هذا الألم طبيعي في الحمل؟'],
  post_marriage: ['كيف أنظم نوم طفلي؟', 'أعاني من الحزن بعد الولادة، ماذا أفعل؟', 'هل حليبي يكفي طفلي؟'],
}

export default function AiChat() {
  const { user } = useAuthStore()
  const stage = user?.lifeStage as keyof typeof STAGE_QUESTIONS || 'marriage'
  
  const [messages, setMessages] = useState<{id: string, role: 'ai'|'user', text: string}[]>([
    { id: '1', role: 'ai', text: `أهلاً بكِ يا ${user?.name.split(' ')[0]}. أنا وداد، مساعدتك الطبية الذكية. كيف يمكنني مساعدتك اليوم؟` }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return
    
    setMessages(p => [...p, { id: Date.now().toString(), role: 'user', text }])
    setInput('')
    setIsTyping(true)
    
    // Mock AI response
    await new Promise(r => setTimeout(r, 1200))
    setIsTyping(false)
    setMessages(p => [...p, { 
      id: Date.now().toString(), 
      role: 'ai', 
      text: 'هذه إجابة تجريبية من الذكاء الاصطناعي. في التطبيق الحقيقي، سيتم الرد بناءً على بروتوكولات طبية معتمدة مع مراعاة تاريخك الصحي وحالتك الحالية (باقات Pro توفر تحليلاً أعمق).' 
    }])
  }

  const isBasic = user?.mockData?.subscription?.plan === 'وداد Basic'

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl shadow-lg border border-border overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center p-1">
            <img src={`${import.meta.env.BASE_URL}images/ai-avatar.png`} alt="Widad AI" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">وداد المساعد الذكي <Sparkles className="w-4 h-4 text-yellow-300" /></h2>
            <p className="text-white/80 text-xs font-medium">مبني على بروتوكولات طبية معتمدة</p>
          </div>
        </div>
        {isBasic && (
          <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold border border-white/30 backdrop-blur-sm">
            المتبقي اليوم: 5 رسائل
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        
        {/* Risk warning for Pro accounts if applicable */}
        {user?.mockData?.dashboardStats?.riskFlag && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 text-sm font-bold mb-1">وداد تحلل بياناتك وتقول:</p>
              <p className="text-red-700 text-sm">"لاحظت من قياساتك الأخيرة وجود ارتفاع في ضغط الدم. أرجو عدم تجاهل ذلك واستشارة طبيبتك في أقرب وقت."</p>
              <Link to="/patient/consultations" className="text-red-600 font-bold text-xs underline mt-2 inline-block">احجزي استشارة الآن</Link>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
          >
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-sm ${m.role === 'user' ? 'bg-gray-100' : 'bg-primary/10'}`}>
              {m.role === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5 text-primary" />}
            </div>
            <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-primary text-white rounded-tr-sm' 
                : 'bg-white border border-border text-gray-800 rounded-tl-sm'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%] ml-auto">
             <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-primary/10">
               <Bot className="w-5 h-5 text-primary" />
             </div>
             <div className="p-4 bg-white border border-border rounded-3xl rounded-tl-sm flex items-center gap-1.5">
               <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
               <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
               <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
             </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-4 bg-white border-t border-border flex flex-wrap gap-2">
          {STAGE_QUESTIONS[stage].map(q => (
            <button 
              key={q}
              onClick={() => handleSend(q)}
              className="px-4 py-2 bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-200 hover:border-primary/30 rounded-full text-sm font-medium text-gray-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-border shrink-0">
        <div className="mb-3">
          <FeatureGate feature="ai_chat_voice">
            <button className="w-full sm:w-auto inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors">
              <Mic className="w-4 h-4" />
              ابدأي محادثة صوتية
            </button>
          </FeatureGate>
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
          className="flex items-end gap-2 relative"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(input)
              }
            }}
            placeholder="اسألي وداد عن أي شيء يشغلك..."
            className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-3 px-5 pr-14 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none min-h-[52px] max-h-32 transition-all"
            rows={1}
            dir="rtl"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute left-2 bottom-1.5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="w-5 h-5 -ml-1" />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2">وداد هي مساعد ذكي وليست بديلاً عن الاستشارة الطبية المتخصصة.</p>
      </div>

    </div>
  )
}
