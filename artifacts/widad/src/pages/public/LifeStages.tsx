// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { Activity, Users, Settings2, HeartPulse, Sparkles, Map } from 'lucide-react'

export default function LifeStages() {
  const stages = [
    {
      key: 'pre_marriage',
      title: 'قبل الزواج',
      desc: 'محتوى وفحوصات وتحضيرات صحية متخصصة قبل بداية الحياة الزوجية.',
      icon: <Sparkles className="w-10 h-10 text-pink-500" />,
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/20',
      hoverBorder: 'hover:border-pink-500/40',
    },
    {
      key: 'marriage',
      title: 'مرحلة الزواج',
      desc: 'متابعة الخصوبة والحمل والاستشارات الطبية مع توصيات ذكية.',
      icon: <Users className="w-10 h-10 text-purple-500" />,
      color: 'from-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/40',
    },
    {
      key: 'post_marriage',
      title: 'بعد الأمومة',
      desc: 'دعم الأم بعد الولادة وصحة الطفل والتوازن النفسي والتعافي.',
      icon: <HeartPulse className="w-10 h-10 text-blue-500" />,
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/40',
    },
  ]

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto relative z-10">
          <m.div variants={fadeUpVariant} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black font-display text-foreground mb-6 drop-shadow-sm flex items-center justify-center gap-3">
              <Map className="w-10 h-10 text-primary" />
              مراحل الحياة
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              وداد ترافقك بخدمات مخصصة بدقة لكل مرحلة. اختاري المرحلة لتستكشفي أدواتك الذكية المصممة من أجلك.
            </p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stages.map((stage) => (
              <m.div key={stage.key} variants={fadeUpVariant}>
                <Link to={`/life-stages/${stage.key}`} className={`block h-full glass-card rounded-[2.5rem] p-8 border ${stage.borderColor} ${stage.hoverBorder} shadow-sm hover:shadow-[var(--shadow-glow)] transition-all duration-500 group relative overflow-hidden flex flex-col`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white/50 dark:bg-black/20 flex items-center justify-center mb-6 shadow-inner border border-white/40 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10">
                    {stage.icon}
                  </div>
                  
                  <h2 className="text-2xl font-black font-display mb-3 text-foreground group-hover:text-primary transition-colors relative z-10">{stage.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1 relative z-10 font-medium">{stage.desc}</p>
                  
                  <div className="mt-auto relative z-10">
                    <span className="inline-flex items-center justify-center w-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/40 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:border-transparent text-foreground rounded-2xl py-3.5 font-bold transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                      عرض تفاصيل المرحلة
                    </span>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>

          <m.div variants={fadeUpVariant} className="bg-gradient-to-l from-primary/10 to-accent/5 glass-panel border border-primary/20 rounded-[2.5rem] p-8 md:p-10 shadow-[var(--shadow-glass)] flex flex-col sm:flex-row items-center justify-between gap-8 group">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Settings2 className="w-8 h-8 text-primary animate-[spin_10s_linear_infinite]" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-display text-foreground mb-2">المتتبعات الصحية الشاملة</h2>
                <p className="text-muted-foreground font-medium">استكشفي متتبعات المزاج، الوزن، والدورة الشهرية.</p>
              </div>
            </div>
            <Link to="/trackers" className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all">
              <Activity className="w-5 h-5" />
              عرض المتتبعات
            </Link>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
