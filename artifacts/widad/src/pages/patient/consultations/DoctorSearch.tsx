// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Star, Clock, Video, FileText, ChevronLeft, UserCheck } from 'lucide-react'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { doctorMatchesStage, STAGE_META, type StageKey } from '@/mock/data/stage-mapping'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function DoctorSearch() {
  const location = useLocation()
  const isPublicRoute = location.pathname.startsWith('/doctors')

  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('الكل')
  const [stage, setStage] = useState<StageKey | 'all'>('all')

  const specialties = ['الكل', ...Array.from(new Set(MOCK_DOCTORS.map(d => d.specialty)))]

  const filteredDoctors = MOCK_DOCTORS.filter(d => {
    const matchesSearch = d.name.includes(searchTerm) || d.specialty.includes(searchTerm)
    const matchesSpecialty = specialty === 'الكل' || d.specialty === specialty
    const matchesStage = doctorMatchesStage(d, stage)
    return matchesSearch && matchesSpecialty && matchesStage
  })

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("space-y-8", isPublicRoute && "pt-10 pb-16")} dir="rtl">
        {/* Animated Background only if PublicRoute to avoid messing up nested layouts */}
        {isPublicRoute && (
          <>
            <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
            <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
          </>
        )}

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-8 relative z-10 px-4 md:px-0">
          
          {/* Header & Search */}
          <m.div variants={fadeUpVariant} className="glass-panel p-8 rounded-[2.5rem] shadow-[var(--shadow-glass)] border border-white/40">
            <h1 className="text-3xl font-black font-display text-foreground mb-8 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-primary" />
              احجزي استشارتك مع نخبة الأطباء
            </h1>
            <div className="flex flex-col md:flex-row gap-5 mb-6">
              <div className="relative flex-1 group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="ابحثي عن دكتور أو تخصص..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 rounded-[1.5rem] py-4 pr-14 pl-5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-lg shadow-sm placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar snap-x">
                {specialties.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSpecialty(spec)}
                    className={cn(
                      "px-6 py-4 rounded-[1.5rem] font-bold text-sm whitespace-nowrap transition-all snap-start shadow-sm border",
                      specialty === spec 
                        ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-[var(--shadow-glow)]' 
                        : 'bg-white/50 dark:bg-black/20 border-white/40 text-foreground hover:bg-white/80 dark:hover:bg-black/40 hover:border-border'
                    )}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pt-4 border-t border-border/50 hide-scrollbar snap-x">
              <button
                onClick={() => setStage('all')}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold border transition-all snap-start",
                  stage === 'all' 
                    ? 'bg-primary/10 text-primary border-primary/30 shadow-sm' 
                    : 'bg-white/30 dark:bg-black/10 text-muted-foreground border-transparent hover:bg-white/50 hover:text-foreground'
                )}
              >
                كل المراحل
              </button>
              {(['pre_marriage', 'marriage', 'post_marriage'] as StageKey[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setStage(item)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-bold border transition-all snap-start flex items-center gap-2",
                    stage === item 
                      ? 'bg-primary/10 text-primary border-primary/30 shadow-sm' 
                      : 'bg-white/30 dark:bg-black/10 text-muted-foreground border-transparent hover:bg-white/50 hover:text-foreground'
                  )}
                >
                  <span className="text-lg">{STAGE_META[item].icon}</span>
                  {STAGE_META[item].title}
                </button>
              ))}
            </div>
          </m.div>

          {/* Doctor List */}
          <m.div variants={staggerContainer} className="grid lg:grid-cols-2 gap-6">
            {filteredDoctors.map(doctor => (
              <m.div key={doctor.id} variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-white/40 hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row gap-6 group">
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-inner border border-border/50 group-hover:-rotate-3 transition-transform duration-300">
                    <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&auto=format&q=80&seed=${doctor.id}`} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {doctor.isOnline && (
                    <div className="absolute -bottom-2 -left-2 bg-white dark:bg-black p-1 rounded-full shadow-sm z-10">
                      <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-black animate-pulse" title="متاح الآن"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black font-display text-foreground group-hover:text-primary transition-colors mb-1">{doctor.name}</h3>
                      <p className="text-primary font-bold text-sm bg-primary/5 w-fit px-2 py-0.5 rounded-md">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2.5 py-1.5 rounded-lg text-sm font-bold border border-orange-500/20">
                      <Star className="w-4 h-4 fill-current" />
                      {doctor.rating}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-5 line-clamp-2 font-medium leading-relaxed">{doctor.about}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-bold text-muted-foreground bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-white/20 shadow-inner">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary/70" /> رد: {doctor.responseTime}</div>
                    <div className="flex items-center gap-2"><Video className="w-4 h-4 text-secondary/70" /> استشارة فيديو</div>
                    <div className="flex items-center gap-2 col-span-2"><FileText className="w-4 h-4 text-accent/70" /> وصفة طبية (روشتة)</div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="font-black font-display text-2xl text-foreground drop-shadow-sm flex items-end gap-1">
                      {doctor.price} <span className="text-sm text-muted-foreground font-bold mb-1.5 ml-1">ج.م</span>
                    </span>
                    <Link
                      to={`${isPublicRoute ? '/doctors' : '/patient/doctors'}/${doctor.id}`}
                      className="bg-primary/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent text-primary hover:text-white px-5 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 hover:shadow-[var(--shadow-glow)] hover:-translate-y-1"
                    >
                      عرض الملف والحجز
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </m.div>
            ))}
            {filteredDoctors.length === 0 && (
              <m.div variants={fadeUpVariant} className="col-span-full text-center py-20 glass-panel rounded-[2.5rem] border border-white/40">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-muted-foreground">لا يوجد أطباء مطابقين لبحثك</h3>
                <button onClick={() => { setSearchTerm(''); setSpecialty('الكل'); setStage('all'); }} className="mt-6 text-primary font-bold hover:underline">إعادة ضبط البحث</button>
              </m.div>
            )}
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
