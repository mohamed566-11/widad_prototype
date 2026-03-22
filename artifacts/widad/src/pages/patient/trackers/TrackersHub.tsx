// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Transformed standard feature grid into a dynamic staggered layout with glowing glass cards.
// Added a hero header section with parallax-like background blur.

import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Smile, Scale, Calendar as CalendarIcon, Sprout, Baby, ChevronLeft, Activity } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function TrackersHub() {
  const { user } = useAuthStore();
  
  const trackers = [
    { id: 'mood', title: 'متتبع المزاج', desc: 'سجلي مشاعرك يومياً لفهم نمط حالتك النفسية وتلقي الدعم.', icon: Smile, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/40', link: '/patient/trackers/mood', streak: 5 },
    { id: 'weight', title: 'متتبع الوزن', desc: 'تابعي تغيرات وزنك بطريقة صحية واستقبلي تقارير دورية.', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/40', link: '/patient/trackers/weight', streak: 2 },
    { id: 'period', title: 'الدورة الشهرية', desc: 'توقعي دورتك القادمة وافهمي طبيعة جسمك وهرموناتك.', icon: CalendarIcon, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/40', link: '/patient/trackers/period', streak: 12 },
    { id: 'fertility', title: 'متتبع الخصوبة', desc: 'حددي أيام التبويض لزيادة فرص الحمل بخوارزميات دقيقة.', icon: Sprout, color: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500/40', link: '/patient/trackers/fertility', streak: 8 },
  ];

  if (user?.lifeStage === 'marriage') {
    trackers.push({ id: 'pregnancy', title: 'متتبع الحمل', desc: 'تابعي تطور جنينك أسبوعاً بأسبوع واستعدي للأمومة.', icon: Baby, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/40', link: '/patient/trackers/pregnancy', streak: 15 });
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-10 pb-10" dir="rtl">
        
        {/* Header Hero */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/90 to-accent/90 p-8 md:p-12 text-primary-foreground shadow-[var(--shadow-glow)]">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 animate-pulse-glow" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] animate-float" style={{ animationDuration: '12s' }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <m.div variants={fadeUpVariant} className="flex items-center gap-3 mb-4 text-white/80">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="font-bold tracking-wider text-sm uppercase">مركز المراقبة</span>
              </m.div>
              <m.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl font-black font-display mb-3 drop-shadow-md">المتتبعات الصحية</m.h1>
              <m.p variants={fadeUpVariant} className="text-primary-foreground/90 text-lg md:text-xl max-w-xl leading-relaxed mix-blend-overlay font-medium">تابعي كل تفاصيل صحتك في مكان واحد. ذكاء اصطناعي يحلل بياناتك ليمنحك رؤى دقيقة.</m.p>
            </div>
          </div>
        </div>

        {/* Trackers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackers.map((t, i) => (
            <m.div key={t.id} variants={fadeUpVariant} custom={i} className="h-full">
              <Link to={t.link} className={cn("glass-panel block h-full rounded-[2rem] p-6 shadow-sm border border-border transition-all duration-300 group hover:-translate-y-1 hover:shadow-glass relative overflow-hidden", t.border)}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: t.color.replace('text-', '') }} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(`w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-inner`, t.bg)}>
                      <t.icon className={cn("w-8 h-8", t.color)} />
                    </div>
                    {t.streak > 0 && (
                      <div className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-xs font-bold font-display flex items-center gap-1.5 border border-orange-500/20 backdrop-blur-sm shadow-sm group-hover:bg-orange-500/20 transition-colors">
                        <span className="animate-pulse">🔥</span> {t.streak} أيام متتالية
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed flex-1">{t.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-between font-bold text-sm bg-secondary/10 text-secondary-foreground p-3.5 rounded-[1.25rem] group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <span className="translate-x-2 group-hover:translate-x-0 transition-transform">دخول للمتتبع</span>
                    <ChevronLeft className="w-5 h-5 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </m.div>
    </LazyMotion>
  );
}