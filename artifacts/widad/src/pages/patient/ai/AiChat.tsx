// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the chat interface to feel like a premium AI assistant (similar to modern AI chat apps).
// Implemented glowing input fields, frosted glass headers, and animated message bubbles.
// Added a beautiful layout for chat message staging.

import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { Send, Bot, User, Sparkles, AlertCircle, Mic } from 'lucide-react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureGate } from '@/components/subscription/FeatureGate'
import { fadeUpVariant, staggerContainer, customEase } from '@/lib/animations'
import { cn } from '@/lib/utils'

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
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: customEase }}
        className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col glass-panel rounded-[2rem] shadow-[var(--shadow-glow)] border border-border overflow-hidden relative" dir="rtl"
      >
        
        {/* Animated Background Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-accent/15 rounded-full blur-[70px] pointer-events-none animate-float" style={{ animationDuration: '10s' }} />

        {/* Header */}
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-2xl border-b border-border p-4 flex items-center justify-between shrink-0 relative z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full animate-spin-slow opacity-50 blur-[8px]" />
              <div className="w-14 h-14 bg-white dark:bg-black rounded-full flex items-center justify-center p-1 relative z-10 border border-border shadow-sm">
                <img src={`${import.meta.env.BASE_URL}images/ai-avatar.png`} alt="Widad AI" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-black rounded-full z-20" />
            </div>
            <div>
              <h2 className="font-bold font-display text-xl flex items-center gap-2 text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x">وداد الذكية</span>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </h2>
              <p className="text-muted-foreground text-xs font-bold leading-none mt-1">مبني على بروتوكولات طبية معتمدة</p>
            </div>
          </div>
          {isBasic && (
            <div className="glass-card px-4 py-1.5 rounded-full text-sm font-bold border border-warning/30 text-warning-foreground font-display flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              المتبقي اليوم: 5 رسائل
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-transparent relative z-10 scrollbar-hide">
          
          {/* Risk warning for Pro accounts if applicable */}
          {user?.mockData?.dashboardStats?.riskFlag && (
            <m.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="bg-destructive/10 border border-destructive/20 p-5 rounded-[1.5rem] flex items-start gap-4 shadow-sm backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-secondary-foreground text-sm font-bold mb-1">تنبيه من تحليل البيانات:</p>
                <p className="text-foreground text-sm leading-relaxed">"لاحظت من قياساتك الأخيرة للمتتبعات وجود أمور تحتاج لتدخل. أرجو عدم تجاهل ذلك واستشارة طبيبتك في أقرب وقت."</p>
                <Link to="/patient/consultations" className="text-destructive font-bold text-xs underline mt-2 inline-block hover:text-destructive/80 transition-colors">احجزي استشارة فورية الآن</Link>
              </div>
            </m.div>
          )}

          {messages.map((msg, i) => (
            <m.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 15, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: customEase }}
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'mr-auto flex-row' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={cn(
                    "p-4 text-sm md:text-base leading-relaxed break-words shadow-sm relative",
                    msg.role === 'user' 
                      ? "bg-gradient-to-tr from-primary to-primary/90 text-primary-foreground rounded-[1.5rem] rounded-tr-sm shadow-[var(--shadow-glow)] border border-primary/20" 
                      : "glass-card text-foreground rounded-[1.5rem] rounded-tl-sm border border-border"
                  )}
                >
                  {msg.text}
                </div>
              </div>
              
              <div className={cn(
                "w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-sm border",
                msg.role === 'user' ? "bg-white dark:bg-black border-border mt-auto" : "bg-gradient-to-tr from-primary/20 to-accent/20 border-white/40 mt-auto"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-muted-foreground" /> : <Bot className="w-5 h-5 text-primary" />}
              </div>
            </m.div>
          ))}

          {isTyping && (
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
              <div className="p-4 glass-card rounded-[1.5rem] rounded-tl-sm flex items-center gap-2 border border-border h-[52px]">
                 <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                 <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              <div className="w-10 h-10 shrink-0 mt-auto rounded-full flex items-center justify-center bg-gradient-to-tr from-primary/20 to-accent/20 border border-white/40 shadow-sm">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            </m.div>
          )}
          <div ref={bottomRef} className="h-4" />
        </div>

        {/* Suggested Questions & Input Wrapper */}
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border-t border-white/20 relative z-20">
          
          {/* Suggested Questions */}
          {messages.length === 1 && (
            <m.div 
              variants={staggerContainer} initial="hidden" animate="show"
              className="px-4 pt-4 pb-2 flex flex-wrap gap-2 overflow-x-auto scrollbar-hide"
            >
              {STAGE_QUESTIONS[stage].map(q => (
                <m.button 
                  key={q}
                  variants={fadeUpVariant}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2 glass-card hover:border-primary/50 border-border rounded-full text-sm font-bold text-foreground transition-all whitespace-nowrap shadow-sm hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
                >
                  {q}
                </m.button>
              ))}
            </m.div>
          )}

          {/* Input Area */}
          <div className="p-4 pt-3 shrink-0">
            <div className="mb-4">
              <FeatureGate feature="ai_chat_voice">
                <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-bold px-5 py-2.5 rounded-[1.25rem] transition-all hover:shadow-[var(--shadow-glow)] hover:border-primary/40 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <div className="relative">
                    <Mic className="w-5 h-5 relative z-10" />
                    <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-75"></span>
                  </div>
                  تحويل الصوت إلى نص
                </button>
              </FeatureGate>
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
              className="flex items-end gap-3 relative"
            >
              <div className="relative w-full group">
                {/* Glowing glow effect on focus */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-[1.75rem] blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend(input)
                    }
                  }}
                  placeholder="اسألي وداد عن أي شيء..."
                  className="relative w-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-border rounded-[1.5rem] py-4 px-6 pr-16 outline-none focus:border-white/50 focus:bg-white dark:focus:bg-black resize-none min-h-[60px] max-h-32 transition-all shadow-sm text-foreground text-base placeholder:text-muted-foreground"
                  rows={1}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute left-3 bottom-2.5 w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all shadow-[var(--shadow-glow)] hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  <Send className="w-5 h-5 -ml-1 transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
                </button>
              </div>
            </form>
            <p className="text-center text-xs text-muted-foreground mt-3 font-medium">وداد هي مساعد ذكي وليست بديلاً عن الاستشارة الطبية المتخصصة.</p>
          </div>
        </div>

      </m.div>
    </LazyMotion>
  )
}
