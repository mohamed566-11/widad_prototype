// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { Link } from 'react-router-dom'
import { TRACKERS_BY_STAGE, STAGE_META, type StageKey } from '@/mock/data/stage-mapping'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { Activity, Star, Clock, Wallet, PenTool, LayoutGrid, ArrowLeft, Heart, Users, Baby } from 'lucide-react'

const STAGES: StageKey[] = ['pre_marriage', 'marriage', 'post_marriage']

const TRACKER_IMAGE: Record<string, string> = {
  mood: `${import.meta.env.BASE_URL}images/trackers/mood.svg`,
  weight: `${import.meta.env.BASE_URL}images/trackers/weight.svg`,
  period: `${import.meta.env.BASE_URL}images/trackers/period.svg`,
  fertility: `${import.meta.env.BASE_URL}images/trackers/fertility.svg`,
  pregnancy: `${import.meta.env.BASE_URL}images/trackers/pregnancy.svg`,
}

const STAGE_TONE: Record<StageKey, { bg: string; border: string }> = {
  pre_marriage: { bg: 'from-pink-500/10 to-transparent', border: 'border-pink-500/20' },
  marriage: { bg: 'from-purple-500/10 to-transparent', border: 'border-purple-500/20' },
  post_marriage: { bg: 'from-blue-500/10 to-transparent', border: 'border-blue-500/20' },
}

function StageIcon({ icon }: { icon: string }) {
  if (icon === 'Heart') return <Heart className="w-7 h-7 text-pink-500" />
  if (icon === 'Users') return <Users className="w-7 h-7 text-purple-500" />
  if (icon === 'Baby') return <Baby className="w-7 h-7 text-blue-500" />
  return null
}

export default function TrackersPublic() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-10 relative z-10">

          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-10 border border-white/40 shadow-[var(--shadow-glass)] flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-display text-foreground mb-4 drop-shadow-sm flex items-center gap-3">
                <Activity className="w-10 h-10 text-primary" />
                المتتبعات الصحية
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                استكشفي المتتبعات المناسبة لكل مرحلة من حياتك. التصفح مفتوح، وعند بدء الاستخدام الفعلي سيتم تحويلك لتسجيل الدخول بأمان.
              </p>
            </div>
          </m.div>

          <div className="space-y-10">
            {STAGES.map((stage) => (
              <m.section key={stage} variants={fadeUpVariant} className="glass-panel border border-white/40 rounded-[2.5rem] p-8 shadow-[var(--shadow-glass)] overflow-hidden">
                <div className={`rounded-[2rem] bg-gradient-to-r ${STAGE_TONE[stage].bg} border ${STAGE_TONE[stage].border} px-8 py-6 mb-8 shadow-inner flex items-center gap-4`}>
                  <div className="bg-white/50 dark:bg-black/20 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-white/40">
                    <StageIcon icon={STAGE_META[stage].icon} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black font-display text-foreground mb-1">
                      {STAGE_META[stage].title}
                    </h2>
                    <p className="text-muted-foreground font-medium">{STAGE_META[stage].desc}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {TRACKERS_BY_STAGE[stage].map((tracker) => (
                    <m.article key={tracker.id} variants={fadeUpVariant} className="glass-card flex flex-col border border-white/40 bg-white/50 dark:bg-black/20 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300 group">
                      <div className="h-40 overflow-hidden bg-white/60 dark:bg-black/40 flex items-center justify-center relative p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src={TRACKER_IMAGE[tracker.id]} alt={tracker.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm relative z-10" />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="inline-flex items-center w-fit rounded-full bg-primary/10 text-primary px-3 py-1.5 text-xs font-bold mb-4 shadow-sm">
                          <LayoutGrid className="w-3.5 h-3.5 ml-1.5" />
                          متتبع ذكي
                        </div>
                        <h3 className="text-xl font-black font-display text-foreground mb-2 group-hover:text-primary transition-colors">{tracker.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed flex-1">{tracker.desc}</p>

                        <Link
                          to="/auth/patient/login"
                          state={{ redirectTo: tracker.route }}
                          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent text-white px-5 py-3 text-sm font-bold hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all"
                        >
                          تفعيل المتتبع
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </m.article>
                  ))}
                </div>
              </m.section>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* قسم الأطباء المميزين */}
            <m.section variants={fadeUpVariant} className="glass-panel bg-gradient-to-br from-white/60 to-white/30 dark:from-black/40 dark:to-black/20 border border-white/40 rounded-[2.5rem] p-8 shadow-[var(--shadow-glass)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-black font-display text-foreground flex items-center gap-2">
                    <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
                    أطباء متميزون
                  </h2>
                  <p className="text-muted-foreground font-medium mt-1">تحدثي مع نخبة الأطباء الآن بكل خصوصية</p>
                </div>
                <Link to="/doctors" className="inline-flex bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-border text-foreground px-5 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-colors shadow-sm">كل الأطباء</Link>
              </div>
              <div className="flex flex-col gap-5">
                {MOCK_DOCTORS.slice(0, 3).map((doctor) => (
                  <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[1.5rem] border border-white/40 glass-card p-5 hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/50 shadow-inner shrink-0 group-hover:-rotate-3 transition-transform duration-300">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h3 className="font-bold font-display text-lg text-foreground group-hover:text-primary transition-colors mb-1">{doctor.name}</h3>
                        <p className="text-xs font-bold text-primary/80 mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500 bg-orange-500/10 w-fit px-2 py-1 rounded-md">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right sm:text-left shrink-0 bg-white/50 dark:bg-black/20 border border-border/50 rounded-xl px-4 py-3 sm:px-0 sm:py-0 sm:border-0 sm:bg-transparent">
                      <span className="flex sm:block items-center gap-2 text-xs font-bold text-muted-foreground sm:mb-1">
                        <Wallet className="w-4 h-4 text-green-500 sm:hidden" />
                        السعر
                      </span>
                      <span className="block text-sm font-black text-foreground">{doctor.price} ر.س</span>
                    </div>
                  </Link>
                ))}
              </div>
            </m.section>

            {/* قسم المقالات المميزة */}
            <m.section variants={fadeUpVariant} className="glass-panel bg-gradient-to-br from-white/60 to-white/30 dark:from-black/40 dark:to-black/20 border border-white/40 rounded-[2.5rem] p-8 shadow-[var(--shadow-glass)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-black font-display text-foreground flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-primary" />
                    أحدث المقالات
                  </h2>
                  <p className="text-muted-foreground font-medium mt-1">نصائح ومقالات طبية موثوقة لحياة صحية أفضل</p>
                </div>
                <Link to="/articles" className="inline-flex bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-border text-foreground px-5 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-colors shadow-sm">كل المقالات</Link>
              </div>
              <div className="flex flex-col gap-5">
                {MOCK_ARTICLES.slice(0, 3).map((article) => (
                  <Link key={article.id} to={`/articles/${article.id}`} className="group flex gap-5 rounded-[1.5rem] border border-white/40 glass-card p-4 hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300">
                    <div className="w-28 h-28 rounded-[1rem] overflow-hidden shrink-0 bg-gray-100 relative">
                      <img src={article.image || 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&q=80'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col py-1 justify-between">
                      <div>
                        <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-xs font-bold text-primary mb-2 shadow-sm">{article.category}</span>
                        <h3 className="font-bold font-display text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">{article.title}</h3>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mt-3">
                        <span className="flex items-center gap-1.5 bg-secondary/80 px-2 py-1 rounded-md">
                          <PenTool className="w-3 h-3" /> {article.author}
                        </span>
                        <span className="flex items-center gap-1.5 bg-secondary/80 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3" /> {article.readTime} د
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </m.section>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
