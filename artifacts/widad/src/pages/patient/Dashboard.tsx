// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Transformed standard dashboard cards into glowing glass panels with floating elements.
// Integrated staggered Framer Motion variants for a satisfying entrance animation.

import { useAuthStore } from '@/store/auth.store'
import { AlertCircle, Calendar, MessageSquare, Activity, ChevronLeft, ArrowUpRight, TrendingUp, Sparkles, Bot, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { FeatureGate } from '@/components/subscription/FeatureGate'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant, scaleIn, customEase } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function PatientDashboard() {
  const { user } = useAuthStore()
  if (!user) return null

  const stats = user.mockData.dashboardStats

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8 pb-10" dir="rtl">
        
        {/* Risk Alert */}
        {stats.riskFlag && (
          <m.div variants={fadeUpVariant} className="bg-destructive/10 backdrop-blur-md border border-destructive/30 rounded-[2rem] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-destructive/20 flex items-center justify-center shrink-0 shadow-inner">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-destructive mb-1">تنبيه صحي هام ⚠️</h3>
                <p className="text-destructive/80 font-medium">{stats.riskType} — ننصحك بمراجعة طبيبك المختص في أقرب وقت.</p>
              </div>
            </div>
            <Link to="/patient/consultations" className="bg-destructive text-destructive-foreground px-8 py-4 rounded-[1.25rem] font-bold shadow-lg shadow-destructive/25 hover:bg-destructive/90 transition-all hover:-translate-y-1 whitespace-nowrap w-full md:w-auto text-center group relative overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              احجزي استشارة عاجلة
            </Link>
          </m.div>
        )}

        {/* Welcome & Featured */}
        <div className="grid lg:grid-cols-3 gap-6">
          <m.div variants={fadeUpVariant} className="lg:col-span-2 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-[2rem] p-8 md:p-10 text-primary-foreground shadow-[var(--shadow-glow)] relative overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <m.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-black font-display mb-3 drop-shadow-md">أهلاً بكِ، {user.name.split(' ')[0]} 🌸</m.h2>
                <m.p variants={fadeUpVariant} className="text-primary-foreground/90 text-lg md:text-xl mb-8 max-w-lg leading-relaxed mix-blend-overlay font-medium">كيف تشعرين اليوم؟ نحن هنا لنرافقك خطوة بخطوة في رحلتك الصحية.</m.p>
              </div>
              
              <m.div variants={scaleIn} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-6 inline-block w-fit shadow-glass mt-auto">
                <p className="text-primary-foreground/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                  توصية وداد لليوم
                </p>
                <p className="font-bold font-display text-2xl drop-shadow-sm">{stats.featuredSection}</p>
              </m.div>
            </div>
          </m.div>

          {/* Action Card */}
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2rem] p-8 border border-border shadow-glass flex flex-col justify-between group hover:border-primary/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-muted-foreground">الاستشارة القادمة</h3>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              {stats.nextConsultation ? (
                <div className="bg-primary/5 rounded-[1.5rem] p-5 border border-primary/10 group-hover:bg-primary/10 transition-colors">
                  <p className="font-bold font-display text-xl text-foreground mb-1">د. سارة أحمد</p>
                  <p className="text-primary font-bold">20 مارس • 10:00 صباحاً</p>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50/50 dark:bg-white/5 rounded-[1.5rem] border border-dashed border-border group-hover:border-primary/30 transition-colors">
                  <p className="text-muted-foreground font-medium">لا توجد استشارات مجدولة حالياً</p>
                </div>
              )}
            </div>
            <Link to="/patient/doctors" className="mt-6 w-full flex items-center justify-center gap-2 bg-foreground text-background font-bold py-4 rounded-[1.25rem] hover:bg-foreground/90 transition-all hover:shadow-lg hover:-translate-y-1">
              <Calendar className="w-5 h-5" />
              احجزي موعد جديد
            </Link>
          </m.div>
        </div>

        {/* Pregnancy / Stage Specific Info */}
        {user.lifeStage === 'marriage' && user.pregnancyWeek && (
          <m.div variants={fadeUpVariant} className="relative overflow-hidden bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <m.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-md shadow-glass border-4 border-pink-200/50 flex items-center justify-center text-6xl relative z-10 shrink-0"
            >
              {stats.babySize?.includes('موزة') ? '🍌' : stats.babySize?.includes('خيار') ? '🥒' : '🍆'}
            </m.div>
            
            <div className="flex-1 text-center md:text-right relative z-10">
              <h3 className="text-3xl font-black font-display text-pink-900 dark:text-pink-100 mb-2">أنتِ في الأسبوع الـ {user.pregnancyWeek} من الحمل! ✨</h3>
              <p className="text-pink-700 dark:text-pink-300 font-bold text-xl">طفلك الآن بحجم {stats.babySize}</p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="glass-card px-5 py-2.5 rounded-full text-pink-700 dark:text-pink-300 font-bold border border-pink-200/50 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  وزنك: {stats.weight} كجم {stats.weightGain && <span className="text-xs opacity-80">({stats.weightGain})</span>}
                </span>
                <span className="glass-card px-5 py-2.5 rounded-full text-pink-700 dark:text-pink-300 font-bold border border-pink-200/50 flex items-center gap-2">
                   <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  حركات الجنين اليوم: {stats.kicksToday}
                </span>
              </div>
            </div>
            <Link to="/patient/trackers/pregnancy" className="relative z-10 p-5 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-pink-500 shadow-glass border border-white/40 hover:scale-110 hover:bg-white transition-all">
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </m.div>
        )}

        {/* Quick Actions Grid */}
        <div>
          <m.h3 variants={fadeUpVariant} className="text-2xl font-black font-display text-foreground mb-6">وصول سريع</m.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { to: '/patient/ai', icon: <Bot className="w-7 h-7" />, title: 'المساعد الذكي', desc: 'اسألي وداد عن أي شيء', color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/30' },
              { to: '/patient/trackers', icon: <Activity className="w-7 h-7" />, title: 'المتتبعات', desc: 'المزاج، الوزن، الدورة', color: 'text-teal-600', bg: 'bg-teal-500/10', border: 'hover:border-teal-500/30' },
              { to: '/patient/community', icon: <MessageSquare className="w-7 h-7" />, title: 'مجتمع وداد', desc: 'شاركي تجربتك بأمان', color: 'text-orange-600', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/30' },
            ].map((item, i) => (
              <m.div key={i} variants={fadeUpVariant}>
                <Link to={item.to} className={cn("block h-full glass-panel p-6 rounded-[1.5rem] border border-border shadow-sm hover:shadow-glass transition-all group", item.border)}>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300", item.bg, item.color)}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                </Link>
              </m.div>
            ))}
            
            <m.div variants={fadeUpVariant} className="h-full">
              <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-[1.5rem] shadow-lg text-white relative overflow-hidden group cursor-pointer border border-gray-700 hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-30 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                      <TrendingUp className="w-7 h-7 text-yellow-400 drop-shadow-sm" />
                    </div>
                    <h4 className="font-bold text-lg text-white mb-1">باقتك الحالية</h4>
                    <p className="text-sm text-gray-300 font-bold">{user.mockData.subscription.plan}</p>
                  </div>
                  <ArrowUpRight className="absolute bottom-5 left-5 text-white/40 w-6 h-6 group-hover:text-white group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-all" />
                </div>
              </div>
            </m.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FeatureGate feature="ai_weekly_reports">
            <m.div variants={fadeUpVariant} className="glass-card rounded-[1.5rem] border border-border p-6 md:p-8 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary font-bold mb-1 tracking-wide">تقرير AI الأسبوعي</p>
                  <h4 className="text-xl font-bold font-display text-foreground mb-2">ملخص صحتك هذا الأسبوع جاهز</h4>
                  <p className="text-muted-foreground leading-relaxed">يتضمن تحليل المزاج، تطور الوزن، ومستوى النشاط الصحي بناءً على متتبعاتك.</p>
                </div>
              </div>
            </m.div>
          </FeatureGate>

          <FeatureGate feature="ai_custom_journey">
            <m.div variants={fadeUpVariant} className="glass-card rounded-[1.5rem] border border-border p-6 md:p-8 relative overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent/20 transition-colors"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-accent font-bold mb-1 tracking-wide">رحلة AI المخصصة</p>
                  <h4 className="text-xl font-bold font-display text-foreground mb-2">خطة مخصصة لمرحلتك الحالية</h4>
                  <p className="text-muted-foreground leading-relaxed">توصيات أسبوعية دقيقة مبنية على مقاييس صحتك وأهدافك الخاصة.</p>
                </div>
              </div>
            </m.div>
          </FeatureGate>
        </div>

        {/* Suggested Articles */}
        <m.div variants={fadeUpVariant}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black font-display text-foreground">اخترنا لكِ بحب 📚</h3>
            <Link to="/patient/articles" className="text-primary font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_ARTICLES.slice(0, 3).map((article, i) => (
              <m.div key={article.id} variants={fadeUpVariant} custom={i}>
                <Link to={`/patient/articles/${article.id}`} className="block h-full glass-panel rounded-[2rem] overflow-hidden border border-border shadow-sm hover:shadow-[var(--shadow-glow)] transition-all group">
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                     {/* Placeholder gradient replacement for unsplash until assets are loaded */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-multiply z-10"></div>
                     <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop`} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out relative z-0" />
                     <span className="absolute top-4 right-4 z-20 glass-panel px-3 py-1.5 text-xs font-bold text-foreground border-white/50 rounded-full shadow-sm backdrop-blur-md">
                       {article.category}
                     </span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold font-display text-lg text-foreground mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{article.title}</h4>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-bold border-t border-border/50 pt-4">
                      <span className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary/20" />
                        {article.author}
                      </span>
                      <span className="bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-md">{article.readTime} دقائق قراءة</span>
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </m.div>

      </m.div>
    </LazyMotion>
  )
}
