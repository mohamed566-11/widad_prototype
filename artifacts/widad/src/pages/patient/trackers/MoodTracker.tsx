// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Mood Tracker with emotional vibrant colors, floating glass elements, and interactive mood selection.

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_MOOD_DATA } from '@/mock/data/trackers';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { Smile, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOODS = [
  { value: 1, emoji: '😢', label: 'حزينة جداً', color: 'from-rose-500/20 to-red-500/20 text-rose-500 border-rose-500/30 ring-rose-500/50 shadow-rose-500/20' },
  { value: 2, emoji: '😞', label: 'مكتئبة', color: 'from-orange-500/20 to-amber-500/20 text-orange-500 border-orange-500/30 ring-orange-500/50 shadow-orange-500/20' },
  { value: 3, emoji: '😐', label: 'عادية', color: 'from-amber-500/20 to-yellow-500/20 text-amber-500 border-amber-500/30 ring-amber-500/50 shadow-amber-500/20' },
  { value: 4, emoji: '😊', label: 'جيدة', color: 'from-emerald-500/20 to-green-500/20 text-emerald-500 border-emerald-500/30 ring-emerald-500/50 shadow-emerald-500/20' },
  { value: 5, emoji: '😄', label: 'سعيدة جداً', color: 'from-cyan-500/20 to-blue-500/20 text-cyan-500 border-cyan-500/30 ring-cyan-500/50 shadow-cyan-500/20' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-purple-500/10 flex items-center justify-center p-2 shadow-inner">
              <Smile className="w-full h-full text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">متتبع المزاج</h1>
              <p className="text-muted-foreground font-medium">افهمي مشاعرك وحافظي على توازنك</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 border border-orange-500/20 shadow-sm relative overflow-hidden group hover:border-orange-500/40 transition-colors">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/10 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            5 أيام متتالية
          </div>
        </m.div>

        {/* Log Today Hero */}
        <m.div variants={scaleIn} className="glass-panel rounded-[3rem] p-8 md:p-12 shadow-[var(--shadow-glow)] border border-border text-center relative overflow-hidden">
          {selectedMood ? (
             <div className="absolute inset-0 transition-opacity duration-1000 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 50% -20%, var(--tw-gradient-stops))`}}>
               <div className={cn("w-full h-full bg-gradient-to-b opacity-50 blur-[60px]", MOODS.find(m => m.value === selectedMood)?.color.split(' ')[0], MOODS.find(m => m.value === selectedMood)?.color.split(' ')[1])} />
             </div>
          ) : (
            <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-primary/5 to-transparent blur-[40px] pointer-events-none"></div>
          )}
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black font-display text-foreground mb-10">كيف تشعرين اليوم؟</h2>
            
            <div className="flex justify-center gap-4 md:gap-8 mb-10 flex-wrap">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMood(m.value)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 w-24 h-28 md:w-32 md:h-36 rounded-[2rem] border-2 transition-all duration-300 relative group overflow-hidden",
                    selectedMood === m.value 
                      ? `bg-gradient-to-br ${m.color.split(' ')[0]} ${m.color.split(' ')[1]} ${m.color.split(' ')[3]} ring-4 md:ring-8 ${m.color.split(' ')[4]} scale-110 shadow-lg ${m.color.split(' ')[5]} z-10` 
                      : `bg-white/40 dark:bg-black/20 border-border hover:border-primary/30 hover:bg-white/60 dark:hover:bg-black/40 ${selectedMood === null ? 'hover:-translate-y-2' : 'scale-95 opacity-60 grayscale hover:grayscale-0'}`
                  )}
                >
                  <span className={cn("text-5xl md:text-6xl drop-shadow-sm transition-transform duration-300", selectedMood === m.value ? 'scale-110 animate-bounce' : 'group-hover:scale-110')}>{m.emoji}</span>
                  <span className={cn("text-sm font-bold font-display z-10", selectedMood === m.value ? m.color.split(' ')[2] : 'text-muted-foreground group-hover:text-foreground transition-colors')}>{m.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selectedMood && (
                <m.div 
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                  className="max-w-xl mx-auto overflow-hidden mt-8"
                >
                  <div className="p-1">
                    <textarea
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder="هل تريدين إضافة ملاحظة أو وصف لمشاعرك؟ (اختياري)"
                      className="w-full bg-white/50 dark:bg-black/20 input-focus rounded-[1.5rem] p-6 outline-none font-medium placeholder:text-muted-foreground/60 resize-none h-32 mb-6"
                    />
                    <button 
                      onClick={handleSave}
                      className={cn(
                        "w-full font-bold font-display text-lg py-5 rounded-[1.5rem] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-glow)] flex items-center justify-center gap-2",
                        isSaved 
                          ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-green-500/30' 
                          : 'bg-gradient-to-r from-primary to-accent text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30'
                      )}
                      disabled={isSaved}
                    >
                      {isSaved ? (
                        <>
                          تم حفظ مزاجك بنجاح <span className="text-2xl animate-bounce">✨</span>
                        </>
                      ) : (
                        'حفظ وتسجيل المزاج'
                      )}
                    </button>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>

        {/* Chart */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-border">
          <h3 className="text-2xl font-black font-display text-foreground mb-8">تاريخ مشاعركِ (آخر 30 يوم)</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_MOOD_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dy={15} />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 20 }} 
                  tickFormatter={(val) => MOODS.find(m => m.value === val)?.emoji || ''} 
                  dx={-15} 
                />
                <Tooltip 
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-glass)', color: 'hsl(var(--foreground))', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
                  formatter={(value: number) => [MOODS.find(m => m.value === value)?.label, 'المزاج']}
                  labelStyle={{ marginBottom: "8px", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "4px" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={5} 
                  dot={{ r: 6, fill: 'hsl(var(--background))', strokeWidth: 3, stroke: 'hsl(var(--primary))' }} 
                  activeDot={{ r: 9, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </m.div>

      </m.div>
    </LazyMotion>
  );
}