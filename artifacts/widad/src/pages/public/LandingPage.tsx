// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Hero features side-by-side logo + content layout with subtle animations.
// Cards utilize magnetic hover physics and translucent glass layers.

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation, useScroll, useTransform } from 'framer-motion'
import { Heart, Activity, Shield, ArrowLeft, Bot, Stethoscope, Users, BookOpenText, Sparkles } from 'lucide-react'
import { fadeUpVariant, staggerContainer, customEase, textSplitVariant } from '@/lib/animations'

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20 font-sans" dir="rtl">

        {/* Animated Orbs */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        {/* 🌟 Hero Section */}
        <section className="relative min-h-[95vh] flex items-start justify-center px-6 pt-7 overflow-hidden">
          <m.div style={{ y: yBg, opacity: opacityHero }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50 mixing-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </m.div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <m.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center">

              {/* ======= Badge - Centered above both sections ======= */}
              <m.div variants={fadeUpVariant} className="px-6 py-3 rounded-full glass-panel text-primary font-bold text-base md:text-lg mt-10 mb-2 inline-flex items-center gap-2 shadow-[var(--shadow-glow)] border border-primary/20">
                <Sparkles className="w-5 h-5" />
                المنصة الأولى لصحة المرأة العربية
              </m.div>

              {/* ======= Side by side layout ======= */}
              <div className="flex flex-col lg:flex-row items-center justify-between w-full">

                {/* ======= LOGO (Right side in RTL) ======= */}
                <m.div
                  variants={fadeUpVariant}
                  className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-[80px] self-center"
                >
                  <m.img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="Widad Logo"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03 }}
                    className="w-full max-w-[450px] lg:max-w-[550px] h-auto object-contain cursor-pointer"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.2)) brightness(1.05) saturate(1.1)' }}
                  />
                </m.div>

                {/* ======= Content (Left side in RTL) ======= */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right mt-12 lg:-mt-[280px] lg:self-center">

                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-display text-foreground leading-[1.15] mb-6 tracking-tight drop-shadow-sm flex flex-col items-center lg:items-end gap-2 text-right">
                    <div className="flex flex-wrap justify-center lg:justify-end overflow-hidden pb-2">
                      {["رفيقتك", "الصحية", "في"].map((word, i) => (
                        <m.span key={i} custom={i} variants={textSplitVariant} className="mx-2 inline-block">
                          {word}
                        </m.span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-end overflow-hidden">
                      {["كل", "مرحلة", "من", "حياتك"].map((word, i) => (
                        <m.span key={i} custom={i + 3} variants={textSplitVariant} className="mx-2 inline-block text-transparent bg-clip-text bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x p-1">
                          {word}
                        </m.span>
                      ))}
                    </div>
                  </h1>

                  <m.p variants={fadeUpVariant} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed lg:text-right">
                    منصة متكاملة تدعمك بالذكاء الاصطناعي والاستشارات الطبية والمجتمع الآمن، من قبل الزواج وحتى الأمومة.
                  </m.p>

                  <m.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto lg:self-end">
                    <Link to="/demo" className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-[1.25rem] font-bold text-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-lg transition-all flex items-center justify-center gap-3">
                      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      ابدئي رحلتك الآن
                      <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                    </Link>
                    <Link to="/auth" className="w-full sm:w-auto px-8 py-4 rounded-[1.25rem] font-bold text-xl glass-card text-foreground transition-all flex items-center justify-center">
                      تسجيل الدخول للمنصة
                    </Link>
                  </m.div>

                </div>

              </div>{/* end side-by-side */}

            </m.div>

            {/* Stats row - full width below the hero split */}
            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <m.div variants={fadeUpVariant} className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
                {[
                  { k: '95%', v: 'رضا المستخدمين' },
                  { k: '24/7', v: 'مساعد ذكي متاح' },
                  { k: '150+', v: 'طبيب معتمد' },
                  { k: '3', v: 'مراحل حياة مخصصة' },
                ].map((stat, i) => (
                  <m.div
                    key={stat.v}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-white/40 dark:border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-4xl font-black font-display text-foreground drop-shadow-sm mb-1 relative z-10">{stat.k}</p>
                    <p className="text-sm text-muted-foreground font-bold relative z-10">{stat.v}</p>
                  </m.div>
                ))}
              </m.div>
            </m.div>

          </div>
        </section>

        {/* 💫 Features Matrix */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <m.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black font-display text-foreground mb-4 drop-shadow-sm">كل ما تحتاجينه في مكان واحد</h2>
              <p className="text-muted-foreground text-xl">صممنا وداد لتكون المنصة الشاملة الوحيدة التي تحتاجينها</p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Bot className="w-8 h-8 text-primary" />, title: 'مساعد طبي AI', desc: 'إجابات فورية لأسئلتك الصحية في أي وقت وبكل سرية.' },
                { icon: <Stethoscope className="w-8 h-8 text-secondary-foreground" />, title: 'استشارات طبية', desc: 'نخبة من أفضل الأطباء في مختلف التخصصات متوفرين أونلاين.' },
                { icon: <Activity className="w-8 h-8 text-accent-foreground" />, title: 'متتبعات ذكية', desc: 'تتبع للدورة، الخصوبة، الحمل، والمزاج مع تقارير مخصصة.' },
                { icon: <Users className="w-8 h-8 text-purple-500 flex-shrink-0" />, title: 'مجتمع آمن', desc: 'مساحة فضفضة آمنة مع نساء يمرون بنفس تجربتك.' },
                { icon: <Shield className="w-8 h-8 text-orange-500 flex-shrink-0" />, title: 'خصوصية تامة', desc: 'بياناتك مشفرة ومحمية بأعلى معايير الأمان والتشفير.' },
                { icon: <Heart className="w-8 h-8 text-pink-500 flex-shrink-0" />, title: 'محتوى موثوق', desc: 'آلاف المقالات الطبية المراجعة من قبل متخصصين حصرياً لكِ.' },
              ].map((f, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: customEase }}
                  whileHover={{ y: -8 }}
                  className="glass-card p-8 rounded-[2rem] group"
                >
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white/80 dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm border border-white/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{f.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🧬 Life Stages (Horizontal or Gridded Scroll) */}
        <section className="py-24 px-6 relative z-10 bg-white/30 dark:bg-black/20 backdrop-blur-3xl border-y border-white/20">
          <div className="max-w-7xl mx-auto">
            <m.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16"
            >
              <m.div variants={fadeUpVariant}>
                <h2 className="text-4xl md:text-5xl font-black font-display text-foreground mb-4 drop-shadow-sm">خريطة رحلتك الصحية</h2>
                <p className="text-muted-foreground text-xl max-w-2xl">اختاري مرحلتك لعرض المتتبعات والأطباء والمقالات المخصصة بدقة لاحتياجاتك الحالية.</p>
              </m.div>
              <m.div variants={fadeUpVariant}>
                <Link to="/life-stages" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold hover:bg-primary transition-colors hover:text-white group">
                  كل المراحل
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </m.div>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { key: 'pre_marriage', icon: '💍', title: 'قبل الزواج', desc: 'فحوصات شاملة، استعداد صحي، ونصائح لبداية حياة جديدة.', color: 'from-pink-500/10 to-transparent' },
                { key: 'marriage', icon: '💑', title: 'مرحلة الزواج', desc: 'متابعة دقيقة للخصوبة، الحمل أسبوعاً بأسبوع، ونصائح الشراكة.', color: 'from-purple-500/10 to-transparent' },
                { key: 'post_marriage', icon: '👶', title: 'بعد الحمل', desc: 'روتين التعافي بعد الولادة، العناية بالطفل، والدعم النفسي.', color: 'from-blue-500/10 to-transparent' },
              ].map((stage, i) => (
                <m.div
                  key={stage.key}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: customEase }}
                >
                  <Link to={`/life-stages/${stage.key}`} className="block h-full glass-card rounded-[2rem] p-8 group relative overflow-hidden border border-white/60 dark:border-white/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 `} />
                    <p className="text-6xl mb-6 relative z-10 group-hover:scale-110 transition-transform origin-bottom-right duration-500">{stage.icon}</p>
                    <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors relative z-10">{stage.title}</h3>
                    <p className="text-muted-foreground text-base relative z-10">{stage.desc}</p>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 📖 Public Explore Grid */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/doctors', icon: <Stethoscope className="w-10 h-10 text-primary mb-6" />, title: 'الأطباء المتاحون', desc: 'استعرضي ملفات الأطباء والتخصصات المختلفة بحرية. الحجز يتطلب التسجيل فقط.' },
                { to: '/articles', icon: <BookOpenText className="w-10 h-10 text-secondary-foreground mb-6" />, title: 'مكتبة المقالات', desc: 'آلاف المقالات الطبية الموثوقة مصنفة بعناية وسهلة التصفح لجميع زوارنا.' },
                { to: '/trackers', icon: <Activity className="w-10 h-10 text-accent-foreground mb-6" />, title: 'أدوات ومتتبعات', desc: 'ألقِ نظرة على متتبعات الخصوبة والحمل. ابدئي الاستخدام الشخصي عند التسجيل.' }
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link to={item.to} className="block h-full glass-panel rounded-[2rem] p-8 hover:shadow-[var(--shadow-glow)] transition-all duration-300 group border border-white/30">
                    <div className="group-hover:scale-110 transition-transform duration-300 origin-right inline-block">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-base">{item.desc}</p>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  )
}
