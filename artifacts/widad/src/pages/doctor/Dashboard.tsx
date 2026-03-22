// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Doctor Dashboard to be professional yet stunning.
// Used clean, frosted glass cards for statistics and schedule lists, with elegant staggered reveals.

import { useAuthStore } from '@/store/auth.store';
import { Link } from 'react-router-dom';
import { Users, Calendar, Star, DollarSign, Clock, CheckCircle2, ChevronLeft, AlertCircle, PlayCircle, Sparkles } from 'lucide-react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function DoctorDashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  if (!user.isApproved) {
    return (
      <LazyMotion features={domAnimation}>
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto py-10 text-center" dir="rtl">
          <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-50"></div>
            <AlertCircle className="w-12 h-12 text-warning relative z-10" />
          </div>
          <h1 className="text-4xl font-black font-display text-foreground mb-4">حسابك قيد المراجعة 👨‍⚕️</h1>
          <p className="text-xl text-muted-foreground mb-10">{user.mockData.message}</p>
          
          <div className="glass-panel rounded-[2rem] p-8 md:p-10 shadow-sm border border-border text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
            <h3 className="text-2xl font-bold font-display text-foreground mb-8 border-b border-border/50 pb-5">حالة المستندات المرفقة</h3>
            <div className="space-y-4">
              {user.mockData.submittedDocs.map((doc: string, i: number) => (
                <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-center gap-4 text-green-700 dark:text-green-400 bg-green-500/10 p-4 rounded-[1.25rem] border border-green-500/20 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span className="font-bold">{doc}</span>
                </m.div>
              ))}
              {user.mockData.pendingDocs.map((doc: string, i: number) => (
                <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (user.mockData.submittedDocs.length + i) * 0.1 }} key={i} className="flex items-center gap-4 text-warning bg-warning/10 p-4 rounded-[1.25rem] border border-warning/20 shadow-sm">
                  <Clock className="w-6 h-6 shrink-0 animate-pulse" />
                  <span className="font-bold">{doc} (جاري التحقق)</span>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </LazyMotion>
    );
  }

  const stats = user.mockData.stats;
  const schedule = user.mockData.todaySchedule;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header Section */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-sm border border-border">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-right">
            <div>
              <m.div variants={fadeUpVariant} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                صباح الخير دكتور
              </m.div>
              <m.h1 variants={fadeUpVariant} className="text-3xl md:text-5xl font-black font-display text-foreground mb-3">أهلاً بك، د. {user.name} 👨‍⚕️</m.h1>
              <m.p variants={fadeUpVariant} className="text-muted-foreground text-lg md:text-xl font-medium">إليك نظرة سريعة على يومك ومواعيدك</m.p>
            </div>
            
            {stats.pendingRequests > 0 && (
              <m.div variants={fadeUpVariant} className="mt-4 md:mt-0">
                <Link to="/doctor/consultations" className="bg-warning/10 text-warning px-6 md:px-8 py-3.5 md:py-4 rounded-[1.25rem] font-bold border border-warning/20 flex items-center justify-center gap-3 hover:bg-warning hover:text-warning-foreground transition-all duration-300 shadow-sm hover:shadow-[var(--shadow-glow)] group">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
                  </span>
                  {stats.pendingRequests} طلبات استشارة معلقة
                </Link>
              </m.div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: 'استشارات اليوم', value: stats.consultationsToday, icon: <Calendar className="w-7 h-7" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/40' },
            { title: 'استشارات الشهر', value: stats.consultationsMonth, icon: <Users className="w-7 h-7" />, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-500/40' },
            { title: 'التقييم العام', value: `${stats.rating} / 5`, icon: <Star className="w-7 h-7" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', hoverBorder: 'hover:border-yellow-500/40' },
            { title: 'أرباح الشهر', value: `${stats.revenue.toLocaleString()} ج.م`, icon: <DollarSign className="w-7 h-7" />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', hoverBorder: 'hover:border-green-500/40' },
          ].map((stat, i) => (
            <m.div key={i} variants={fadeUpVariant} className={cn("glass-card rounded-[2rem] p-6 shadow-sm border border-border transition-all duration-300 group hover:-translate-y-1 hover:shadow-glass relative overflow-hidden", stat.hoverBorder)}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: stat.color.replace('text-', '') }} />
              
              <div className="relative z-10">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner border", stat.bg, stat.color, stat.border)}>
                  {stat.icon}
                </div>
                <p className="text-muted-foreground font-bold text-sm mb-2">{stat.title}</p>
                <h3 className="text-3xl font-black font-display text-foreground">{stat.value}</h3>
              </div>
            </m.div>
          ))}
        </div>

        {/* Today's Schedule */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] shadow-sm border border-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50 dark:bg-black/20">
            <h2 className="text-2xl font-black font-display text-foreground flex items-center gap-3">
              جدول اليوم
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-bold">{schedule.length} استشارات</span>
            </h2>
            <Link to="/doctor/calendar" className="text-primary font-bold hover:underline flex items-center gap-1 group">
              عرض التقويم كاملاً 
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
          
          <div className="divide-y divide-border/50">
            {schedule.map((apt: any, i: number) => (
              <m.div key={i} variants={fadeUpVariant} custom={i} className="p-6 md:p-8 hover:bg-white/50 dark:hover:bg-black/30 transition-colors flex flex-col md:flex-row md:items-center gap-6 group">
                
                {/* Time Badge */}
                <div className="w-32 shrink-0">
                  <div className="bg-secondary/20 text-secondary-foreground font-black font-display text-xl px-4 py-2.5 rounded-[1.25rem] text-center border border-secondary/20 group-hover:bg-secondary/30 transition-colors">
                    {apt.time}
                  </div>
                </div>
                
                {/* Patient Info */}
                <div className="flex-1">
                  <h3 className="font-bold font-display text-xl text-foreground mb-2">{apt.patient}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1.5 rounded-lg border",
                      apt.type === 'فيديو' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' : 
                      apt.type === 'صوت' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 
                      'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                    )}>
                      {apt.type}
                    </span>
                    <span className={cn(
                      "text-xs font-bold px-3 py-1.5 rounded-lg border",
                      apt.status === 'confirmed' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-warning/10 text-warning border-warning/20'
                    )}>
                      {apt.status === 'confirmed' ? 'مؤكدة' : 'قيد الانتظار'}
                    </span>
                  </div>
                </div>
                
                {/* Action button */}
                <div className="shrink-0 flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                  {apt.status === 'confirmed' ? (
                    <button className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-[1.25rem] font-bold shadow-[var(--shadow-glow)] hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group/btn">
                      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      <PlayCircle className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">بدء الجلسة</span>
                    </button>
                  ) : (
                    <Link to="/doctor/consultations" className="w-full glass-card text-foreground px-8 py-4 rounded-[1.25rem] font-bold border border-border hover:border-primary/50 transition-all hover:bg-white/50 dark:hover:bg-black/50 text-center hover:-translate-y-1 shadow-sm">
                      مراجعة الطلب
                    </Link>
                  )}
                </div>
              </m.div>
            ))}
            {schedule.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-muted-foreground opacity-50" />
                </div>
                <p className="text-xl text-muted-foreground font-bold font-display">لا توجد استشارات مجدولة لهذا اليوم.</p>
                <p className="text-sm text-gray-400 mt-2">استمتع بيومك المريح!</p>
              </div>
            )}
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}