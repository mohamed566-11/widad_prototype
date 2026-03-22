// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Fertility Tracker with vibrant green/emerald glass effects and elegant charts.

import { MOCK_FERTILITY_DATA } from '@/mock/data/trackers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Sprout, Info, Heart, Activity } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function FertilityTracker() {
  const data = MOCK_FERTILITY_DATA;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1.25rem] bg-green-500/10 flex items-center justify-center p-2 shadow-inner">
            <Sprout className="w-full h-full text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">متتبع الخصوبة</h1>
            <p className="text-muted-foreground font-medium">خططي لمستقبلك بثقة</p>
          </div>
        </m.div>

        {/* Ovulation Status Hero */}
        <m.div variants={scaleIn} className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[var(--shadow-glow)] shadow-green-500/30 text-center relative overflow-hidden group">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-700 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Sprout className="w-64 h-64 -rotate-12" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 inline-flex items-center gap-2 mb-6 shadow-sm border border-white/30">
              <Activity className="w-4 h-4 text-green-200 animate-pulse" />
              <p className="text-green-50 font-bold tracking-wide">اليوم في دورتك</p>
            </div>

            <h2 className="text-6xl md:text-8xl font-black font-display mb-6 drop-shadow-lg">اليوم {data.cycleDay}</h2>
            
            <p className="text-xl md:text-2xl font-black font-display bg-white/10 inline-flex items-center gap-2 px-8 py-4 rounded-full backdrop-blur-md border border-white/20 shadow-glass group-hover:bg-white/20 transition-colors">
              فرصة الحمل: عالية جداً <span className="animate-bounce inline-block">🌟</span>
            </p>
          </div>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          <m.div variants={fadeUpVariant} className="glass-panel p-6 md:p-8 rounded-[2rem] shadow-sm border border-border flex flex-col justify-center relative overflow-hidden group hover:border-green-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold font-display text-muted-foreground mb-4 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-green-500" />
                نافذة الخصوبة
              </h3>
              <p className="text-2xl md:text-3xl font-black font-display text-foreground mb-6">
                {new Date(data.fertilityWindow.start).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})} - {new Date(data.fertilityWindow.end).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})}
              </p>
              <div className="mt-4 flex gap-1.5 h-3">
                {Array.from({length: 7}).map((_, i) => (
                  <div key={i} className={cn(
                    "flex-1 rounded-full overflow-hidden relative", 
                    i >= 2 && i <= 6 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-secondary'
                  )}>
                    {i >= 2 && i <= 6 && (
                       <span className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </m.div>
          
          <m.div variants={fadeUpVariant} className="glass-panel p-6 md:p-8 rounded-[2rem] shadow-sm border border-border flex flex-col justify-center relative overflow-hidden group hover:border-pink-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold font-display text-muted-foreground mb-4">يوم التبويض المتوقع</h3>
              <p className="text-3xl font-black font-display text-primary mb-6">{new Date(data.ovulationDay).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})}</p>
              <div className="flex items-center gap-3 text-sm font-medium text-pink-700 dark:text-pink-400 bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20">
                <Heart className="w-5 h-5 text-pink-500 shrink-0 animate-pulse" />
                يفضل العلاقة الزوجية في هذا اليوم والأيام التي تسبقه
              </div>
            </div>
          </m.div>
        </div>

        {/* BBT Chart */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black font-display text-foreground">درجة حرارة الجسم الأساسية (BBT)</h3>
            <button className="text-primary bg-primary/10 p-2.5 rounded-full hover:bg-primary/20 transition-colors">
              <Info className="w-6 h-6" />
            </button>
          </div>
          <p className="text-muted-foreground font-medium text-sm mb-8">ارتفاع درجة الحرارة يؤكد حدوث التبويض بنجاح.</p>
          
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.bbtData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dy={15} />
                <YAxis domain={[36.0, 37.5]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dx={-15} />
                <Tooltip 
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-glass)', color: 'hsl(var(--foreground))', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
                  formatter={(value: number) => [`${value}°C`, 'درجة الحرارة']}
                />
                <ReferenceLine y={36.4} stroke="hsl(var(--warning))" strokeDasharray="4 4" label={{ position: 'insideTopLeft', value: 'خط الأساس', fill: 'hsl(var(--warning))', fontSize: 13, fontWeight: 'bold' }} />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                  activeDot={{ r: 8, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}