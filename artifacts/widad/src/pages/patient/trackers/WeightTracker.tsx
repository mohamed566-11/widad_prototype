// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Weight Tracker with soft blue glass effects, glowing buttons, and robust layout.

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_WEIGHT_DATA } from '@/mock/data/trackers';
import { Scale, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function WeightTracker() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentWeight = MOCK_WEIGHT_DATA[MOCK_WEIGHT_DATA.length - 1];
  const prevWeight = MOCK_WEIGHT_DATA[MOCK_WEIGHT_DATA.length - 2];
  const diff = currentWeight.weight - prevWeight.weight;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-blue-500/10 flex items-center justify-center p-2 shadow-inner">
              <Scale className="w-full h-full text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">متتبع الوزن</h1>
              <p className="text-muted-foreground font-medium">خطوات ثابتة نحو صحة أفضل</p>
            </div>
          </div>
        </m.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-blue-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform border border-blue-500/20 shadow-inner">
                  <Scale className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-muted-foreground font-bold text-sm">الوزن الحالي</p>
              </div>
              <p className="text-4xl font-black font-display text-foreground flex items-baseline gap-1">
                {currentWeight.weight} <span className="text-base text-muted-foreground font-medium">كجم</span>
              </p>
            </div>
          </m.div>
          
          <m.div variants={fadeUpVariant} className={cn("glass-card rounded-[2rem] p-6 shadow-sm border border-border group transition-all duration-300 relative overflow-hidden", diff <= 0 ? "hover:border-green-500/30" : "hover:border-warning/30")}>
            <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", diff <= 0 ? "bg-green-500/20" : "bg-warning/20")} />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border", diff <= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-warning/10 border-warning/20')}>
                  {diff <= 0 ? <TrendingDown className="w-6 h-6 text-green-500" /> : <TrendingUp className="w-6 h-6 text-warning" />}
                </div>
                <p className="text-muted-foreground font-bold text-sm">التغير الأخير</p>
              </div>
              <p className={cn("text-3xl lg:text-4xl font-black font-display flex items-baseline gap-1", diff <= 0 ? 'text-green-500 dark:text-green-400' : 'text-warning')}>
                {diff > 0 ? '+' : ''}{diff.toFixed(1)} <span className="text-base font-medium opacity-80">كجم</span>
              </p>
            </div>
          </m.div>

          <m.div variants={fadeUpVariant} className="col-span-2 md:col-span-1 glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-purple-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center font-black font-display text-purple-600 dark:text-purple-400 text-sm border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform">
                  BMI
                </div>
                <p className="text-muted-foreground font-bold text-sm">مؤشر كتلة الجسم</p>
              </div>
              <div>
                <p className="text-4xl font-black font-display text-foreground">{currentWeight.bmi}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-3 py-1 rounded-lg border border-green-500/20 text-xs">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> طبيعي
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Input Form */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-border relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-4 items-end relative z-10">
            <div className="w-full flex-1">
              <label className="block text-sm font-bold text-muted-foreground mb-2 px-1">الوزن (كجم)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
                className="w-full bg-white/50 dark:bg-black/20 input-focus rounded-[1.25rem] px-5 py-4 outline-none font-bold placeholder:font-medium placeholder:text-muted-foreground/70" 
                placeholder="أدخلي وزنك الحالي، مثال: 65" 
                step="0.1" 
              />
            </div>
            <div className="w-full flex-1">
              <label className="block text-sm font-bold text-muted-foreground mb-2 px-1">التاريخ</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                className="w-full bg-white/50 dark:bg-black/20 input-focus rounded-[1.25rem] px-5 py-4 outline-none font-bold" 
              />
            </div>
            <button className="w-full md:w-auto relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-10 rounded-[1.25rem] hover:-translate-y-1 transition-all shadow-[var(--shadow-glow)] hover:shadow-lg flex items-center justify-center gap-2 group">
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">تسجيل الوزن</span>
            </button>
          </div>
        </m.div>

        {/* Chart */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-border">
          <h3 className="text-2xl font-black font-display text-foreground mb-8">سجل تقدمكِ</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_WEIGHT_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dy={15} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dx={-15} />
                <Tooltip 
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-glass)', color: 'hsl(var(--foreground))', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
                  formatter={(value: number) => [`${value} كجم`, 'الوزن']}
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
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