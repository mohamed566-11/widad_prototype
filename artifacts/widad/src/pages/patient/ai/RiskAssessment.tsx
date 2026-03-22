// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the AI Risk Assessment page with data-viz aesthetics, glowing charts, and serious yet calming glass UI.

import { useAuthStore } from '@/store/auth.store';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { AlertTriangle, Info, ShieldAlert, Activity, ShieldCheck } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function RiskAssessment() {
  const { user } = useAuthStore();
  
  if (user?.lifeStage !== 'marriage') {
    return (
      <LazyMotion features={domAnimation}>
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-20 px-6 glass-panel rounded-[3rem] mt-10 shadow-sm border border-border"
        >
          <div className="w-24 h-24 bg-secondary/80 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-border">
            <Info className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-black font-display text-foreground mb-4">هذه الخاصية غير متاحة حالياً</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            تقييم المخاطر بالذكاء الاصطناعي مخصص حالياً لمرحلة الحمل ومتابعة الأمراض والمضاعفات المرتبطة به لضمان سلامة الأم والجنين.
          </p>
        </m.div>
      </LazyMotion>
    );
  }

  const results = user?.mockData?.aiRiskResults || {
    ptb: { score: 15, level: 'low', shap: ['العمر 40%', 'الوزن 30%', 'التاريخ الطبي 30%'] },
    pe: { score: 12, level: 'low', shap: ['ضغط الدم 50%', 'الوزن 30%', 'العمر 20%'] },
    gdm: { score: 18, level: 'low', shap: ['التغذية 45%', 'الوزن 35%', 'العمر 20%'] },
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': 
        return { 
          text: 'text-red-600 dark:text-red-400', 
          bg: 'bg-red-500/10', 
          border: 'border-red-500/30', 
          ring: 'ring-red-500/20',
          shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.15)]',
          hex: '#ef4444', 
          label: 'مرتفع',
          icon: ShieldAlert
        };
      case 'medium': 
        return { 
          text: 'text-orange-600 dark:text-orange-400', 
          bg: 'bg-orange-500/10', 
          border: 'border-orange-500/30', 
          ring: 'ring-orange-500/20',
          shadow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
          hex: '#f97316', 
          label: 'متوسط',
          icon: Activity
        };
      default: 
        return { 
          text: 'text-green-600 dark:text-green-400', 
          bg: 'bg-green-500/10', 
          border: 'border-green-500/30', 
          ring: 'ring-green-500/20',
          shadow: 'shadow-[0_0_30px_rgba(34,197,94,0.1)]',
          hex: '#22c55e', 
          label: 'منخفض',
          icon: ShieldCheck
        };
    }
  };

  const models = [
    { id: 'ptb', title: 'الولادة المبكرة (PTB)', data: results.ptb, description: 'التنبؤ باحتمالية الولادة قبل الأسبوع 37.' },
    { id: 'pe', title: 'تسمم الحمل (PE)', data: results.pe, description: 'تقييم مخاطر ارتفاع ضغط الدم والبروتين في البول.' },
    { id: 'gdm', title: 'سكر الحمل (GDM)', data: results.gdm, description: 'تحليل احتمالية الإصابة بمرض السكري أثناء الحمل.' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header */}
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           
           <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-3 border border-primary/20 shadow-sm transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Widad AI™ Cortex
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground mb-3">التقييم الذكي للمخاطر</h1>
            <p className="text-muted-foreground text-lg max-w-xl">تحليل استباقي مبني على خوارزميات الذكاء الاصطناعي لبياناتك الطبية (لأغراض استرشادية بحتة).</p>
          </div>

          {user?.mockData?.dashboardStats?.riskFlag && (
            <div className="relative z-10 bg-gradient-to-l from-red-500/20 to-rose-500/10 text-red-700 dark:text-red-400 px-6 py-4 rounded-[1.25rem] font-bold font-display text-lg border border-red-500/30 flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse backdrop-blur-md">
              <AlertTriangle className="w-6 h-6" />
              <span>يرجى استشارة طبيبك المتابع في أقرب وقت</span>
            </div>
          )}
        </m.div>

        {/* Risk Models Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {models.map((model) => {
            const colors = getLevelColor(model.data.level);
            const chartData = [{ name: 'risk', value: model.data.score, fill: colors.hex }];
            const StatusIcon = colors.icon;
            
            return (
              <m.div key={model.id} variants={scaleIn} className={cn("glass-card rounded-[2.5rem] p-8 transition-all duration-500 group relative overflow-hidden border-2", colors.border, colors.shadow)}>
                <div className={cn("absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-50 z-0 pointer-events-none")}></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black font-display text-foreground mb-1">{model.title}</h2>
                    <p className="text-sm text-muted-foreground mr-1">{model.description}</p>
                  </div>
                  <div className={cn("flex flex-col items-center justify-center p-3 rounded-2xl border backdrop-blur-md shadow-sm", colors.bg, colors.border)}>
                     <StatusIcon className={cn("w-6 h-6 mb-1", colors.text)} />
                    <span className={cn("text-xs font-black", colors.text)}>
                      {colors.label}
                    </span>
                  </div>
                </div>

                <div className="relative h-56 mb-8 group-hover:scale-105 transition-transform duration-500" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" cy="50%" 
                      innerRadius="70%" outerRadius="100%" 
                      barSize={18} 
                      data={chartData} 
                      startAngle={220} endAngle={-40}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar 
                        background={{ fill: 'hsl(var(--secondary))', opacity: 0.5 }} 
                        dataKey="value" 
                        cornerRadius={20} 
                        animationDuration={1500}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
                    <span className={cn("text-5xl font-black font-display drop-shadow-sm", colors.text)}>{model.data.score}<span className="text-2xl ml-1">%</span></span>
                    <span className="text-sm font-bold text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border mt-2 backdrop-blur-sm">مؤشر الخطورة</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-secondary">
                      <Activity className="w-4 h-4 text-foreground" />
                    </div>
                    أهم العوامل المؤثرة (SHAP Values):
                  </h3>
                  <ul className="space-y-3">
                    {model.data.shap.map((factor: string, i: number) => {
                      const [name, percent] = factor.split(' ');
                      return (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold bg-white/50 dark:bg-black/20 px-4 py-3 rounded-xl border border-border/50 shadow-sm relative overflow-hidden group/item hover:border-primary/30 transition-colors">
                           <div className="absolute left-0 top-0 bottom-0 bg-primary/10 w-0 group-hover/item:w-full transition-all duration-500 -z-10"></div>
                           <div className="w-2 h-2 rounded-full shrink-0 bg-gradient-to-r from-primary to-accent shadow-[var(--shadow-glow)]"></div>
                          <span className="text-foreground flex-1">{name}</span>
                          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs border border-primary/20">{percent}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <m.div variants={fadeUpVariant} className="glass-panel border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-inner group relative">
             <div className="absolute inset-0 rounded-[1.5rem] ring-4 ring-blue-500/20 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Info className="w-8 h-8 text-blue-500" />
          </div>
          <div className="relative z-10 text-center md:text-right">
            <h3 className="text-xl font-black font-display text-blue-900 dark:text-blue-300 mb-2">كيف يعمل هذا التقييم؟ إخلاء مسؤولية</h3>
            <p className="text-blue-800/80 dark:text-blue-200/70 text-base leading-relaxed font-medium">
              يستخدم نموذج <strong className="text-blue-600 dark:text-blue-400">Widad AI™</strong> تقنيات تعلم آلي متقدمة تحلل تاريخك الطبي، قياساتك الحالية، ونتائج التحاليل لتقديم تقييم مبدئي مبني على احتمالات إحصائية. 
              هذا التقييم يعتبر أداة مساعدة للرصد المبكر و <strong className="underline decoration-blue-400 decoration-2 underline-offset-4">لا يغني أبداً تحت أي ظرف عن الاستشارة الطبية المتخصصة</strong> أو التشخيص من قبل طبيبك المعالج المستند إلى الفحوصات السريرية والمخبرية.
            </p>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}