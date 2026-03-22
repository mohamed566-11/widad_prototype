// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Implemented parallax scrolling with Framer Motion `useScroll` and `useTransform`.
// Hero features staggered text split-reveals and animated glowing orbs.
// Cards utilize magnetic hover physics and translucent glass layers.

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation, useScroll, useTransform } from 'framer-motion'
import { Heart, Activity, Shield, ArrowLeft, Bot, Stethoscope, Users, BookOpenText, Sparkles } from 'lucide-react'
import { fadeUpVariant, staggerContainer, customEase, textSplitVariant } from '@/lib/animations'

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const [logoHovered, setLogoHovered] = useState(false)

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // ❤️ Heart particle config
  const HEART_PARTICLES = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2
    const dist = 80 + Math.random() * 120
    const colors = ['#ec4899', '#f43f5e', '#fb7185', '#e879f9', '#c084fc', '#f472b6', '#fda4af']
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      size: 0.6 + Math.random() * 1.2,
      px: 14 + Math.floor(Math.random() * 18),
      color: colors[i % colors.length],
      rotate: -180 + Math.random() * 360,
      duration: 0.7 + Math.random() * 0.6,
      delay: Math.random() * 0.2,
    }
  })

  // Split text for hero
  const titleText = "رفيقتك الصحية في"
  const subtitleText = "كل مرحلة من حياتك"


  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20 font-sans" dir="rtl">

        {/* Animated Orbs */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        {/* 🌟 Hero Section */}
        <section className="relative min-h-[95vh] flex items-center justify-center px-6 overflow-hidden">
          <m.div style={{ y: yBg, opacity: opacityHero }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50 mixing-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </m.div>

          <div className="max-w-5xl mx-auto relative z-10 text-center mt-20">
            <m.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center">

              {/* ======= LOGO + HEART BURST ======= */}
              <m.div
                variants={fadeUpVariant}
                className="mb-16 w-full max-w-3xl px-4 relative flex items-center justify-center"
                onHoverStart={() => setLogoHovered(true)}
                onHoverEnd={() => setLogoHovered(false)}
              >
                {/* Glow halo behind logo */}
                <m.div
                  animate={logoHovered ? { opacity: 1, scale: 1.3 } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] pointer-events-none"
                />

                {/* Logo image — no box */}
                <m.img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="Widad Logo"
                  animate={{ y: [0, -18, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.06 }}
                  className="w-full h-auto object-contain relative z-10 cursor-pointer"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(236,72,153,0.35)) brightness(1.1) saturate(1.15)' }}
                />

                {/* Heart particle burst on hover */}
                {logoHovered && HEART_PARTICLES.map((p) => (
                  <m.div
                    key={p.id}
                    className="absolute pointer-events-none z-20"
                    style={{ left: '50%', top: '50%' }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [1, 1, 0],
                      scale: [0, p.size, 0],
                      rotate: [0, p.rotate],
                    }}
                    transition={{ duration: p.duration, ease: 'easeOut', delay: p.delay }}
                  >
                    <Heart
                      className="fill-current"
                      style={{ color: p.color, width: `${p.px}px`, height: `${p.px}px` }}
                    />
                  </m.div>
                ))}
              </m.div>

              <m.div variants={fadeUpVariant} className="px-5 py-2.5 rounded-full glass-panel text-primary font-bold text-sm mb-8 inline-flex items-center gap-2 shadow-[var(--shadow-glow)] border border-primary/20">
                <Sparkles className="w-4 h-4" />
                المنصة الأولى لصحة المرأة العربية
              </m.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display text-foreground leading-[1.1] mb-6 tracking-tight drop-shadow-sm flex flex-col items-center gap-2">
                <div className="flex flex-wrap justify-center overflow-hidden pb-2">
                  {titleText.split(" ").map((word, i) => (
                    <m.span key={i} custom={i} variants={textSplitVariant} className="mx-2 inline-block">
                      {word}
                    </m.span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center overflow-hidden">
                  {subtitleText.split(" ").map((word, i) => (
                    <m.span key={i} custom={i + 4} variants={textSplitVariant} className="mx-2 inline-block text-transparent bg-clip-text bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x p-1">
                      {word}
                    </m.span>
                  ))}
                </div>
              </h1>

              <m.p variants={fadeUpVariant} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                منصة متكاملة تدعمك بالذكاء الاصطناعي والاستشارات الطبية والمجتمع الآمن، من قبل الزواج وحتى الأمومة.
              </m.p>

              <m.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link to="/demo" className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-[1.25rem] font-bold text-lg bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-lg transition-all flex items-center justify-center gap-3">
                  <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  ابدئي رحلتك الآن
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link to="/auth" className="w-full sm:w-auto px-8 py-4 rounded-[1.25rem] font-bold text-lg glass-card text-foreground transition-all flex items-center justify-center">
                  تسجيل الدخول للمنصة
                </Link>
              </m.div>

              <m.div variants={fadeUpVariant} className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
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
