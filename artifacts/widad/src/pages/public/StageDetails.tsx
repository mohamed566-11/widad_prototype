// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { Link, useParams } from 'react-router-dom'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { STAGE_META, TRACKERS_BY_STAGE, doctorMatchesStage, type StageKey } from '@/mock/data/stage-mapping'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { ArrowRight, Star, Clock, Wallet, PenTool, LayoutGrid, ArrowLeft, Heart, Users, Baby } from 'lucide-react'

const STAGES: StageKey[] = ['pre_marriage', 'marriage', 'post_marriage']

const TRACKER_IMAGE: Record<string, string> = {
  mood: `${import.meta.env.BASE_URL}images/trackers/mood.svg`,
  weight: `${import.meta.env.BASE_URL}images/trackers/weight.svg`,
  period: `${import.meta.env.BASE_URL}images/trackers/period.svg`,
  fertility: `${import.meta.env.BASE_URL}images/trackers/fertility.svg`,
  pregnancy: `${import.meta.env.BASE_URL}images/trackers/pregnancy.svg`,
}

function StageIcon({ icon, className = 'w-8 h-8' }: { icon: string; className?: string }) {
  if (icon === 'Heart') return <Heart className={`${className} text-pink-500`} />
  if (icon === 'Users') return <Users className={`${className} text-purple-500`} />
  if (icon === 'Baby') return <Baby className={`${className} text-blue-500`} />
  return null
}

export default function StageDetails() {
  const { stage = '' } = useParams()
  const key = STAGES.includes(stage as StageKey) ? (stage as StageKey) : null

  if (!key) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden flex items-center justify-center" dir="rtl">
        <div className="glass-panel border border-white/40 p-10 rounded-[2.5rem] shadow-[var(--shadow-glow)] text-center relative z-10 max-w-md w-full">
          <h1 className="text-3xl font-black font-display text-foreground mb-4">المرحلة غير موجودة</h1>
          <p className="text-muted-foreground mb-8 text-lg font-medium">عذراً، لا يمكننا العثور على المرحلة المحددة. يرجى العودة لصفحة المراحل.</p>
          <Link to="/life-stages" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-bold hover:-translate-y-1 transition-transform w-full shadow-sm">
            <ArrowRight className="w-5 h-5" />
            العودة لمراحل الحياة
          </Link>
        </div>
      </div>
    )
  }

  const doctors = MOCK_DOCTORS.filter((doctor) => doctorMatchesStage(doctor, key))
  const articles = MOCK_ARTICLES.filter((article) => article.lifeStage === key)
  const trackers = TRACKERS_BY_STAGE[key]

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
        
        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-10 relative z-10">
          
          <m.header variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-10 border border-white/40 shadow-[var(--shadow-glass)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>
            
            <Link to="/life-stages" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:-translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" /> العودة للمراحل
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center border border-white/40 shadow-sm">
                <StageIcon icon={STAGE_META[key].icon} />
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm">
                {STAGE_META[key].title}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl">{STAGE_META[key].desc}</p>
          </m.header>

          <m.section variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 border border-white/40 shadow-[var(--shadow-glass)]">
            <h2 className="text-2xl font-black font-display mb-6 text-foreground flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-primary" />
              المتتبعات المناسبة
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {trackers.map((tracker) => (
                <m.article key={tracker.id} variants={fadeUpVariant} className="glass-card rounded-[2rem] border border-white/40 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col group">
                  <div className="h-32 bg-white/50 dark:bg-black/20 p-4 shrink-0 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img src={TRACKER_IMAGE[tracker.id]} alt={tracker.title} className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-sm" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{tracker.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-6 flex-1 line-clamp-2 leading-relaxed">{tracker.desc}</p>
                    <Link to="/auth" state={{ redirectTo: tracker.route }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary px-4 py-3 text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm">
                      يجب تسجيل الدخول
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </m.article>
              ))}
            </div>
          </m.section>

          <m.section variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 border border-white/40 shadow-[var(--shadow-glass)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black font-display text-foreground">الأطباء المناسبون للمرحلة</h2>
                <p className="text-muted-foreground font-medium mt-1">نخبة من المختصين لتقديم الرعاية المثلى في هذه المرحلة</p>
              </div>
              <Link to="/doctors" className="inline-flex bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                عرض المختصين
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="glass-card group rounded-[2rem] border border-white/40 p-6 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/50 shadow-inner shrink-0 group-hover:-rotate-3 transition-transform duration-300">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="font-black font-display text-lg text-foreground group-hover:text-primary transition-colors mb-1">{doctor.name}</h3>
                      <p className="text-xs font-bold text-primary/80 mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500 bg-orange-500/10 w-fit px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{doctor.rating}</span>
                        <span className="text-muted-foreground ml-1">({doctor.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-2 text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary/70" />
                      متاح خلال: {doctor.responseTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-green-500/70" />
                      الكشفية: {doctor.price} ج.م
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </m.section>

          <m.section variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 border border-white/40 shadow-[var(--shadow-glass)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black font-display text-foreground">مصادر تثقيفية للمرحلة</h2>
                <p className="text-muted-foreground font-medium mt-1">أحدث المقالات والنصائح الطبية لحالتك الحالية</p>
              </div>
              <Link to="/articles" className="inline-flex bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                مكتبة وداد الشاملة
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.id} to={`/articles/${article.id}`} className="glass-card group rounded-[2rem] border border-white/40 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all overflow-hidden flex flex-col duration-300">
                  <div className="h-44 bg-gray-100 relative overflow-hidden">
                    <img src={article.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary border border-white/20 shadow-sm">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold font-display text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-5 line-clamp-2 leading-relaxed flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mt-auto pt-4 border-t border-border/50">
                      <span className="flex items-center gap-1.5 bg-secondary/80 px-2 py-1.5 rounded-md">
                        <PenTool className="w-3.5 h-3.5" /> {article.author}
                      </span>
                      <span className="flex items-center gap-1.5 bg-secondary/80 px-2 py-1.5 rounded-md">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime} دقائق
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </m.section>
        </m.div>
      </div>
    </LazyMotion>
  )
}
