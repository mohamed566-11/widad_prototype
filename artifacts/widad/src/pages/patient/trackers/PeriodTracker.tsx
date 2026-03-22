// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Period Tracker to feel luxurious and supportive.
// Used deep pink/rose gradients, animated background elements, and floating cards.
// Implemented Framer Motion for a stunning entrance sequence.

import { MOCK_PERIOD_DATA } from '@/mock/data/trackers';
import { CalendarDays, Droplet, Sprout, AlertCircle, Sparkles } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn, customEase } from '@/lib/animations';

export default function PeriodTracker() {
  const data = MOCK_PERIOD_DATA;
  
  // Calculate days until next period
  const today = new Date();
  const nextDate = new Date(data.nextPeriodExpected);
  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1.25rem] bg-pink-500/10 flex items-center justify-center p-2 shadow-inner">
            <Droplet className="w-full h-full text-pink-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">متتبع الدورة</h1>
            <p className="text-muted-foreground font-medium">افهمي جسمكِ خطوة بخطوة</p>
          </div>
        </m.div>

        {/* Main Status */}
        <m.div variants={scaleIn} className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[var(--shadow-glow)] shadow-pink-500/30 text-center relative overflow-hidden group">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-700 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none">
            <Droplet className="w-64 h-64 -rotate-12" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 inline-flex items-center gap-2 mb-6 shadow-sm border border-white/30">
              <Sparkles className="w-4 h-4 text-pink-200 animate-pulse" />
              <p className="text-pink-50 font-bold tracking-wide">الدورة القادمة متوقعة بعد</p>
            </div>
            
            <m.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="text-7xl md:text-8xl font-black font-display mb-6 drop-shadow-lg flex items-baseline gap-2 justify-center"
            >
              {diffDays} <span className="text-3xl font-bold opacity-80">أيام</span>
            </m.div>
            
            <p className="text-lg font-bold font-display bg-white/10 inline-block px-8 py-3 rounded-full backdrop-blur-md border border-white/20 shadow-glass">
              {new Date(data.nextPeriodExpected).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </m.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <m.div variants={fadeUpVariant} className="glass-panel p-6 rounded-[2rem] shadow-sm border border-border group hover:border-purple-500/30 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-[1.25rem] bg-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                <CalendarDays className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-bold text-muted-foreground mb-2">طول الدورة</h3>
              <p className="text-3xl font-black font-display text-foreground flex items-baseline gap-1">
                {data.cycleLength} <span className="text-base text-muted-foreground font-medium">يوم</span>
              </p>
            </div>
          </m.div>
          
          <m.div variants={fadeUpVariant} className="glass-panel p-6 rounded-[2rem] shadow-sm border border-border group hover:border-pink-500/30 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-[1.25rem] bg-pink-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                  <Droplet className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-bold text-muted-foreground mb-2">فترة الحيض</h3>
                <p className="text-3xl font-black font-display text-foreground flex items-baseline gap-1">
                  {data.periodLength} <span className="text-base text-muted-foreground font-medium">أيام</span>
                </p>
             </div>
          </m.div>

          <m.div variants={fadeUpVariant} className="glass-panel p-6 rounded-[2rem] shadow-sm border border-border group hover:border-green-500/30 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[1.25rem] bg-green-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Sprout className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-muted-foreground mb-2">نافذة التبويض</h3>
                  <p className="text-xl font-black font-display text-foreground">12 - 17 مارس</p>
                </div>
                <div className="mt-4 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 w-fit">
                  <p className="text-xs font-bold font-display text-green-600 dark:text-green-400">احتمالية حمل عالية قريباً</p>
                </div>
             </div>
          </m.div>
        </div>

        {/* History */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2rem] p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-2xl font-black font-display text-foreground mb-6">سجل الدورات السابقة</h3>
          <div className="space-y-4">
            {data.history.map((h, i) => (
              <m.div 
                key={i} 
                variants={fadeUpVariant}
                custom={i}
                className="flex items-center justify-between p-5 bg-white/50 dark:bg-black/20 rounded-[1.5rem] border border-border/50 hover:bg-white dark:hover:bg-black/40 hover:shadow-sm hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-[1rem] flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-colors">
                    <Droplet className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-bold font-display text-foreground mb-1">
                      {new Date(h.start).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })} - {new Date(h.end).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">{h.cycleLength} يوم دورة</p>
                  </div>
                </div>
                {h.cycleLength !== 28 && (
                  <div className="text-warning bg-warning/10 p-2.5 rounded-xl border border-warning/20 flex items-center justify-center" title="تغير طفيف في طول الدورة المعتاد">
                    <AlertCircle className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </m.div>
            ))}
          </div>
        </m.div>

      </m.div>
    </LazyMotion>
  );
}