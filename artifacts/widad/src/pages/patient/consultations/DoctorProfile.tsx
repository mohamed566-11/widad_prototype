// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { useParams, Link, useLocation } from 'react-router-dom';
import { MOCK_DOCTORS } from '@/mock/data/doctors';
import { Star, Clock, Video, Languages, GraduationCap, ShieldCheck, ChevronLeft, Calendar, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function DoctorProfile() {
  const { id } = useParams();
  const location = useLocation();
  const { isAuth } = useAuthStore();
  const doctor = MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0];
  const isPublicRoute = location.pathname.startsWith('/doctors');
  const backPath = isPublicRoute ? '/doctors' : '/patient/doctors';
  const bookPath = `/patient/book/${doctor.id}`;

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("max-w-5xl mx-auto space-y-8 relative", isPublicRoute && "pt-10 pb-16")} dir="rtl">
        {/* Animated Background only if PublicRoute */}
        {isPublicRoute && (
          <>
            <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
            <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
          </>
        )}

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 px-4 md:px-0">
          <m.div variants={fadeUpVariant} className="mb-6">
            <Link to={backPath} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm bg-white/50 dark:bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-[var(--shadow-glow)]">
              <ChevronLeft className="w-4 h-4" />
              عودة للبحث
            </Link>
          </m.div>

          {/* Profile Header */}
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-6 md:p-10 shadow-[var(--shadow-glass)] border border-white/40 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden group mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>
            
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden shadow-inner border border-white/50 group-hover:scale-[1.02] transition-transform duration-500">
                <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format&q=80&seed=${doctor.id}`} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              {doctor.isOnline && (
                <div className="absolute -bottom-3 -left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10 border border-border">
                  <div className="bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-black animate-pulse"></div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-right w-full z-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black font-display text-foreground flex items-center justify-center md:justify-start gap-3 drop-shadow-sm mb-2">
                    {doctor.name}
                    <ShieldCheck className="w-8 h-8 text-primary drop-shadow-[var(--shadow-glow)]" />
                  </h1>
                  <p className="text-primary font-bold text-lg bg-primary/5 w-fit px-3 py-1 rounded-lg mx-auto md:mx-0">{doctor.specialty}</p>
                </div>
                
                <div className="flex flex-col items-center md:items-end gap-2">
                  <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-xl text-sm font-bold border border-orange-500/20">
                    <Star className="w-4 h-4 fill-current" />
                    {doctor.rating} <span className="text-muted-foreground mr-1">({doctor.reviewsCount} تقييم)</span>
                  </div>
                  <p className="text-3xl font-black font-display text-foreground flex items-baseline gap-1 mt-2">
                    {doctor.price} <span className="text-sm text-muted-foreground font-bold">ج.م</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-white/40 dark:bg-black/20 px-4 py-2 rounded-xl border border-white/20 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 transition-all cursor-default">
                  <Clock className="w-4 h-4 text-primary/70" />
                  وقت الرد: {doctor.responseTime}
                </span>
                <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-white/40 dark:bg-black/20 px-4 py-2 rounded-xl border border-white/20 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-secondary/30 transition-all cursor-default">
                  <Video className="w-4 h-4 text-secondary/70" />
                  استشارة فيديو، صوت، نص
                </span>
                <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-white/40 dark:bg-black/20 px-4 py-2 rounded-xl border border-white/20 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-accent/30 transition-all cursor-default">
                  <FileText className="w-4 h-4 text-accent/70" />
                  شاملة وصفة طبية
                </span>
              </div>
            </div>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            <m.div variants={staggerContainer} className="md:col-span-2 space-y-8">
              {/* About */}
              <m.div variants={fadeUpVariant} className="glass-panel rounded-[2rem] p-8 md:p-10 shadow-sm border border-white/40">
                <h2 className="text-2xl font-black font-display text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </span>
                  نبذة عن الطبيب
                </h2>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg">{doctor.about}</p>
              </m.div>

              {/* Details */}
              <div className="grid sm:grid-cols-2 gap-6">
                <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-8 shadow-sm border border-white/40 hover:shadow-[var(--shadow-glow)] hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <GraduationCap className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-black font-display text-foreground text-xl">المؤهلات</h3>
                  </div>
                  <ul className="space-y-3">
                    {doctor.qualifications.map((q, i) => (
                      <li key={i} className="text-muted-foreground font-medium flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                        {q}
                      </li>
                    ))}
                  </ul>
                </m.div>
                
                <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-8 shadow-sm border border-white/40 hover:shadow-[var(--shadow-glow)] hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <Languages className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="font-black font-display text-foreground text-xl">اللغات</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {doctor.languages.map((l, i) => (
                      <span key={i} className="bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-xl text-sm font-bold border border-purple-500/20 shadow-sm">
                        {l}
                      </span>
                    ))}
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* Booking Card */}
            <m.div variants={fadeUpVariant} className="h-fit sticky top-24">
              <div className="glass-panel rounded-[2.5rem] p-8 shadow-[var(--shadow-glass)] border border-white/40 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h3 className="text-xl font-black font-display text-foreground mb-6 flex items-center gap-2 relative z-10">
                  احجزي استشارتك
                </h3>
                
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                      <p className="font-black text-green-800 dark:text-green-400 text-sm mb-1">أقرب موعد متاح</p>
                      <p className="text-green-700 dark:text-green-300 font-medium text-sm">
                        {new Date(doctor.nextAvailable).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                </div>

                <Link 
                  to={isAuth ? bookPath : '/auth/patient/login'}
                  state={isAuth ? undefined : { redirectTo: bookPath }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-2xl shadow-[var(--shadow-glow)] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg relative z-10"
                >
                  {isAuth ? 'المتابعة للحجز' : 'تسجيل الدخول للحجز'}
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <div className="mt-5 text-center relative z-10 flex flex-col items-center justify-center gap-1.5 opacity-70">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <p className="text-xs font-bold text-muted-foreground">الدفع آمن ومحمي 100%</p>
                </div>
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}