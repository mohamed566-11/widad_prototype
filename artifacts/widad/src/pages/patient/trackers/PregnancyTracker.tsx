// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Pregnancy Tracker to feel magical and informative.
// Soft glowing backgrounds, floating emojis, and interactive animated buttons for kick counting.

import { useState } from 'react';
import { MOCK_PREGNANCY_DATA } from '@/mock/data/trackers';
import { Baby, Footprints, Calendar, Pill, ScanFace, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function PregnancyTracker() {
  const data = MOCK_PREGNANCY_DATA;
  const [kicks, setKicks] = useState(data.kickCount.today);
  const [isKicking, setIsKicking] = useState(false);

  const handleKick = () => {
    setKicks(prev => prev + 1);
    setIsKicking(true);
    setTimeout(() => setIsKicking(false), 600);
  };

  const kickProgress = Math.min((kicks / data.kickCount.goal) * 100, 100);

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header */}
        <m.div variants={fadeUpVariant} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1.25rem] bg-orange-500/10 flex items-center justify-center p-2 shadow-inner">
            <Baby className="w-full h-full text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">متابعة الحمل</h1>
            <p className="text-muted-foreground font-medium">رحلة نمو طفلكِ لحظة بلحظة</p>
          </div>
        </m.div>

        {/* Week Card Hero */}
        <m.div variants={scaleIn} className="relative overflow-hidden glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-[var(--shadow-glow)] border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-orange-500/5 to-transparent">
          {/* Animated Background Splashes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-glow" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            <div className="relative">
              <m.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-glass border-4 border-white/50 dark:border-white/10 flex items-center justify-center text-8xl md:text-9xl relative z-10"
              >
                🍌
                <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-base md:text-lg font-black px-6 py-2 rounded-full border-[3px] border-white dark:border-black shadow-lg shadow-pink-500/30 whitespace-nowrap">
                  {data.babyWeight}
                </div>
              </m.div>
              {/* Decorative ripples */}
              <div className="absolute inset-0 rounded-full border border-pink-500/30 scale-[1.15] animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.3] animate-ping opacity-10 pointer-events-none" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-pink-500/20">
                <ScanFace className="w-4 h-4" />
                تطور الجنين
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-display text-foreground mb-3">الأسبوع {data.currentWeek}</h2>
              <p className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-6 drop-shadow-sm">طفلك الآن بحجم {data.babySize}!</p>
              <p className="text-muted-foreground text-lg leading-relaxed bg-white/50 dark:bg-black/20 p-6 rounded-[1.5rem] border border-border/50 shadow-sm backdrop-blur-sm relative glass-panel">
                <span className="absolute -top-3 -right-3 text-3xl">✨</span>
                في هذا الأسبوع، يبدأ طفلك في سماع الأصوات من حوله. حاسة التذوق تتطور أيضاً! يمكنك البدء في التحدث والغناء له.
              </p>
            </div>
          </div>
        </m.div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
          {/* Kick Counter */}
          <m.div variants={fadeUpVariant} className="md:col-span-5 glass-card rounded-[2.5rem] p-8 shadow-sm border border-border text-center flex flex-col justify-center items-center relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent opacity-50"></div>
            
            <h3 className="text-2xl font-black font-display text-foreground mb-2 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              عداد حركة الجنين
            </h3>
            <p className="text-muted-foreground text-sm font-medium mb-10">الهدف اليومي: تسجيل {data.kickCount.goal} حركات</p>
            
            <div className="relative mb-8">
              {/* Outer pulsing ring tied to goal progress */}
              {kickProgress >= 100 && (
                 <div className="absolute inset-[-20px] rounded-full bg-green-500/20 animate-ping opacity-70"></div>
              )}
              
              <button 
                onClick={handleKick}
                className={cn(
                  "w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center gap-2 font-bold transition-all duration-300 shadow-[var(--shadow-glow)] relative z-10 border-[6px] border-background",
                  isKicking 
                    ? 'scale-95 bg-accent text-white shadow-lg shadow-accent/40' 
                    : kickProgress >= 100 
                      ? 'bg-gradient-to-br from-green-400 to-green-600 text-white hover:scale-105 hover:shadow-green-500/40' 
                      : 'bg-gradient-to-br from-primary to-accent text-white hover:scale-105 hover:shadow-primary/40'
                )}
              >
                <m.div
                  animate={isKicking ? { y: [-5, 5, 0], rotate: [-10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Footprints className="w-12 h-12 md:w-14 md:h-14" />
                </m.div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl md:text-5xl font-black font-display">{kicks}</span>
                </div>
              </button>
            </div>
            
            <div className="w-full pt-4">
              <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2 px-1">
                <span>0</span>
                <span className={kickProgress >= 100 ? 'text-green-500' : ''}>{Math.floor(kickProgress)}%</span>
                <span>{data.kickCount.goal}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-4 overflow-hidden border border-border shadow-inner">
                <m.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${kickProgress}%` }}
                  transition={{ duration: 1, ease: customEase }}
                  className={cn(
                    "h-full rounded-full transition-colors duration-500",
                    kickProgress >= 100 ? "bg-green-500" : "bg-gradient-to-r from-primary to-accent"
                  )}
                  style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)' }}
                />
              </div>
              {kickProgress >= 100 && <p className="text-green-500 font-bold text-sm mt-4 animate-pulse">رائع! لقد حققتِ الهدف اليومي 🎉</p>}
            </div>
          </m.div>

          {/* Info Cards Column */}
          <div className="md:col-span-7 space-y-6 md:space-y-8 flex flex-col">
            {/* Appointments */}
            <m.div variants={fadeUpVariant} className="flex-1 glass-panel rounded-[2rem] p-6 shadow-sm border border-border">
              <h3 className="font-black font-display text-xl text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                المواعيد القادمة
              </h3>
              <div className="space-y-3">
                {data.appointments.map((apt, i) => (
                  <div key={i} className="bg-white/50 dark:bg-black/20 border border-border/50 hover:border-blue-500/30 p-4 rounded-[1.25rem] flex justify-between items-center transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-10 rounded-full bg-blue-400"></div>
                      <div>
                        <p className="font-bold font-display text-foreground text-base mb-1">{apt.type}</p>
                        <p className="text-sm text-muted-foreground font-medium">{apt.doctor}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      {new Date(apt.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Medications */}
            <m.div variants={fadeUpVariant} className="flex-1 glass-panel rounded-[2rem] p-6 shadow-sm border border-border">
              <h3 className="font-black font-display text-xl text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-green-500" />
                </div>
                الأدوية والمكملات
              </h3>
              <div className="space-y-3">
                {data.medications.map((med, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/50 dark:bg-black/20 border border-border/50 hover:border-green-500/30 p-4 rounded-[1.25rem] transition-colors group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-green-500/5 flex items-center justify-center border border-green-500/10">
                         <span className="text-xl">💊</span>
                       </div>
                      <div>
                        <p className="font-bold font-display text-foreground text-base mb-1">{med.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{med.dosage}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 group-hover:bg-green-500/20 transition-colors">{med.time}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>

        {/* Weight Chart */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-border">
          <h3 className="text-2xl font-black font-display text-foreground mb-8">منحنى زيادة الوزن أثناء الحمل</h3>
          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weightHistory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dy={15} tickFormatter={(val) => `أسبوع ${val}`} />
                <YAxis domain={['dataMin - 2', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dx={-15} />
                <Tooltip 
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-glass)', color: 'hsl(var(--foreground))', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
                  formatter={(value: number) => [`${value} كجم`, 'الوزن']}
                  labelFormatter={(label) => `الأسبوع ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={5} 
                  dot={{ r: 6, fill: 'hsl(var(--background))', strokeWidth: 3, stroke: 'hsl(var(--primary))' }} 
                  activeDot={{ r: 8, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </m.div>

      </m.div>
    </LazyMotion>
  );
}