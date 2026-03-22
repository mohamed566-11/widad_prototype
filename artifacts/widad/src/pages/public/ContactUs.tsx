// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { useState } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { Send, CheckCircle2, MessageSquare, Mail } from 'lucide-react'

export default function ContactUs() {
  const [sent, setSent] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl mx-auto relative z-10">
          <m.div variants={fadeUpVariant} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black font-display text-foreground mb-6 drop-shadow-sm flex items-center justify-center gap-3">
              <MessageSquare className="w-10 h-10 text-primary" />
              تواصل معنا
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              نحن هنا للاستماع إليك. يسعدنا استقبال استفساراتك، مقترحاتك، أو مجرد إلقاء التحية.
            </p>
          </m.div>

          {sent ? (
            <m.div variants={fadeUpVariant} className="glass-panel border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent rounded-[2.5rem] p-12 text-center shadow-[var(--shadow-glow)] mx-auto max-w-lg">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black font-display mb-4 text-foreground">وصلتنا رسالتك</h2>
              <p className="text-muted-foreground text-lg font-medium">شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
            </m.div>
          ) : (
            <m.form
              variants={fadeUpVariant}
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="glass-panel border border-white/40 rounded-[2.5rem] p-8 md:p-12 shadow-[var(--shadow-glass)] space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground px-1">الاسم الكريم</label>
                <input required placeholder="الاسم" className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50 shadow-sm" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground px-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input required type="email" dir="ltr" placeholder="name@example.com" className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50 shadow-sm text-left" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground px-1">كيف يمكننا مساعدتك؟</label>
                <textarea required rows={5} placeholder="اكتب رسالتك هنا..." className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50 shadow-sm resize-none" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:-translate-y-1 group flex items-center justify-center gap-3">
                إرسال الرسالة
                <Send className="w-5 h-5 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform" />
              </button>
            </m.form>
          )}
        </m.div>
      </div>
    </LazyMotion>
  )
}
