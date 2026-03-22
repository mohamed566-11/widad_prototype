// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Combining warm feminine notes (blush/peach/soft blue) with sleek frosted glass layouts. 
// Used Framer Motion `staggerContainer` and `fadeUpVariant` for a seamless cascaded entry.
// Replaced harsh shadows with layered `shadow-soft` and `shadow-glass`. 
// Enhanced visual hierarchy with new display and sans-serif typography.

import { Link } from 'react-router-dom';
import { User, Stethoscope, Settings } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { fadeUpVariant, staggerContainer, customEase } from '@/lib/animations';

export default function RoleSelect() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden selection:bg-primary/20" dir="rtl">
        
        {/* ✨ Animated Floating Orbs / Nebulas */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[90px] -translate-y-1/2 pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        {/* 🌟 Header */}
        <m.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="px-6 py-4 flex items-center justify-between glass-panel shadow-sm relative z-50 w-full fixed top-0 h-20"
        >
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative overflow-hidden rounded-xl bg-white p-1 shadow-glass transition-transform group-hover:scale-105 duration-300">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Widad Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x">
              وداد تك
            </span>
          </Link>
          <Link 
            to="/demo" 
            className="relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold bg-white text-primary hover:text-white transition-all duration-300 border border-primary/20 shadow-soft group z-10"
          >
            <span className="absolute inset-0 w-full h-full bg-primary -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-[-1]" />
            تجربة سريعة (Demo)
          </Link>
        </m.header>

        {/* 💫 Main Content */}
        <main className="flex-1 flex items-center justify-center p-6 mt-20 relative z-10">
          <div className="max-w-5xl w-full">
            <m.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center mb-16 space-y-4"
            >
              <m.h1 variants={fadeUpVariant} className="text-5xl md:text-6xl font-black font-display text-foreground tracking-tight drop-shadow-sm">
                أهلاً بكِ في منصة <span className="text-primary text-glow drop-shadow-md">وداد</span>
              </m.h1>
              <m.p variants={fadeUpVariant} className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                اكتشفي بُعدًا جديدًا في الرعاية الصحية، حيث يلتقي الطب المتقدم بالذكاء الاصطناعي الدافئ ليقدم لكِ تجربة لا مثيل لها. الرجاء اختيار دوركِ للمتابعة:
              </m.p>
            </m.div>

            <m.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Patient Card */}
              <m.div variants={fadeUpVariant} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.4, ease: customEase }}>
                <Link to="/auth/patient/login" className="glass-card rounded-[2rem] p-8 group flex flex-col items-center text-center relative overflow-hidden h-full border border-white/60 dark:border-white/10 outline outline-1 outline-transparent hover:outline-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-primary/10 rounded-full flex items-center justify-center mb-8 shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-glow)] group-hover:scale-110 transition-all duration-500 border border-white/80 relative z-10">
                    <User className="w-10 h-10 text-primary drop-shadow-md" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-4 relative z-10">مريضة</h2>
                  <p className="text-muted-foreground text-base leading-relaxed relative z-10">متابعة صحية مخصصة، متتبعات ذكية للحمل والدورة، وتواصل مجتمعي آمن.</p>
                </Link>
              </m.div>

              {/* Doctor Card */}
              <m.div variants={fadeUpVariant} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.4, ease: customEase }}>
                <Link to="/auth/doctor/login" className="glass-card rounded-[2rem] p-8 group flex flex-col items-center text-center relative overflow-hidden h-full border border-white/60 dark:border-white/10 outline outline-1 outline-transparent hover:outline-secondary/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-secondary/20 rounded-full flex items-center justify-center mb-8 shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-glow)] group-hover:scale-110 transition-all duration-500 border border-white/80 relative z-10">
                    <Stethoscope className="w-10 h-10 text-secondary-foreground drop-shadow-md" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-foreground group-hover:text-secondary-foreground transition-colors mb-4 relative z-10">طبيبة</h2>
                  <p className="text-muted-foreground text-base leading-relaxed relative z-10">إدارة استشارات متطورة، متابعة المرضى عبر سجل طبي آمن، ومشاركة متخصصة.</p>
                </Link>
              </m.div>

              {/* Admin Card */}
              <m.div variants={fadeUpVariant} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.4, ease: customEase }}>
                <Link to="/auth/admin/login" className="glass-card rounded-[2rem] p-8 group flex flex-col items-center text-center relative overflow-hidden h-full border border-white/60 dark:border-white/10 outline outline-1 outline-transparent hover:outline-gray-400">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 via-transparent to-transparent dark:from-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-100 dark:to-gray-800 rounded-full flex items-center justify-center mb-8 shadow-[var(--shadow-soft)] group-hover:shadow-md group-hover:scale-110 transition-all duration-500 border border-white/80 relative z-10">
                    <Settings className="w-10 h-10 text-gray-700 dark:text-gray-300 drop-shadow-md" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-foreground group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mb-4 relative z-10">الإدارة</h2>
                  <p className="text-muted-foreground text-base leading-relaxed relative z-10">لوحة تحكم مركزية متكاملة لضمان جودة الأداء وإدارة شاملة للمنصة.</p>
                </Link>
              </m.div>
            </m.div>
          </div>
        </main>
      </div>
    </LazyMotion>
  );
}