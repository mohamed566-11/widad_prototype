// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Consultations List with interactive frosted glass cards, glow effects, and staggered animations.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CONSULTATIONS } from '@/mock/data/consultations';
import { Calendar, Clock, Video, Phone, MessageSquare, ChevronLeft, Stethoscope, CopyPlus } from 'lucide-react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function ConsultationsList() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filtered = MOCK_CONSULTATIONS.filter(c => 
    activeTab === 'upcoming' ? c.status === 'upcoming' || c.status === 'pending' : c.status === activeTab
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header Hero */}
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none -z-10 text-transparent">glow</div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-3 border border-primary/20 shadow-sm">
              <Stethoscope className="w-4 h-4" />
              العيادة الافتراضية
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm mb-2">استشاراتي</h1>
            <p className="text-muted-foreground text-lg">تتبعي مواعيدك الطبية واستشاراتك القادمة بكل سهولة.</p>
          </div>
          
          <Link 
            to="/patient/doctors" 
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-4 rounded-2xl font-bold font-display text-lg shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300 relative group overflow-hidden w-full md:w-auto justify-center"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <CopyPlus className="w-6 h-6 relative z-10" />
            <span className="relative z-10 whitespace-nowrap">حجز استشارة جديدة</span>
          </Link>
        </m.div>

        {/* Tabs */}
        <m.div variants={fadeUpVariant} className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar px-1 -mx-1">
          {[
            { id: 'upcoming', label: 'القادمة' },
            { id: 'completed', label: 'المكتملة' },
            { id: 'cancelled', label: 'الملغاة' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-8 py-4 rounded-[1.5rem] font-bold font-display text-lg whitespace-nowrap transition-all duration-300 border backdrop-blur-md shadow-sm",
                activeTab === tab.id 
                  ? 'border-border/50 bg-foreground/5 dark:bg-foreground hover:bg-foreground/10 dark:hover:bg-foreground/90 text-foreground dark:text-background shadow-md backdrop-blur-xl scale-105' 
                  : 'border-border/50 bg-white/50 dark:bg-black/20 text-muted-foreground hover:bg-white/80 dark:hover:bg-black/40 hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </m.div>

        {/* Consultations List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((consultation, index) => {
              const statusColors = {
                upcoming: 'bg-primary/10 text-primary border-primary/20',
                pending: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
                completed: 'bg-green-500/10 text-green-600 border-green-500/20',
                cancelled: 'bg-red-500/10 text-red-600 border-red-500/20'
              };
              const statusLabels = {
                upcoming: 'مؤكدة',
                pending: 'قيد الانتظار',
                completed: 'مكتملة',
                cancelled: 'ملغاة'
              };
              
              const isUpcoming = activeTab === 'upcoming';
              
              return (
                <m.div 
                  key={consultation.id} 
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "glass-card rounded-[2rem] p-6 lg:p-8 shadow-sm border border-border flex flex-col md:flex-row gap-6 lg:items-center group relative overflow-hidden transition-all duration-500 hover:shadow-md",
                    isUpcoming ? "hover:border-primary/30" : "hover:border-border/80"
                  )}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-[40px] pointer-events-none group-hover:from-primary/10 transition-colors"></div>
                  
                  <div className="flex items-start md:items-center gap-5 flex-1 relative z-10">
                    <div className="relative">
                       <img src={consultation.doctorAvatar} alt={consultation.doctorName} className="w-20 h-20 rounded-[1.5rem] object-cover border-[3px] border-background shadow-md relative z-10" />
                       <div className="absolute inset-0 rounded-[1.5rem] bg-primary/20 blur-md -z-0 translate-y-1"></div>
                    </div>
                    <div>
                      <h3 className="font-black font-display text-xl text-foreground mb-1">{consultation.doctorName}</h3>
                      <p className="text-sm font-bold text-muted-foreground mb-4">{consultation.doctorSpecialty}</p>
                      
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/50 shadow-sm backdrop-blur-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(consultation.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/50 shadow-sm backdrop-blur-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span dir="ltr">{consultation.time}</span>
                        </span>
                        <span className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border shadow-sm backdrop-blur-sm",
                          consultation.type === 'فيديو' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                          consultation.type === 'صوت' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 
                          'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                        )}>
                          {consultation.type === 'فيديو' && <Video className="w-4 h-4" />}
                          {consultation.type === 'صوت' && <Phone className="w-4 h-4" />}
                          {consultation.type === 'نص' && <MessageSquare className="w-4 h-4" />}
                          {consultation.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4 border-t md:border-t-0 md:border-r border-border/50 pt-5 md:pt-0 md:pr-8 relative z-10 w-full md:w-auto shrink-0 min-h-full">
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-sm font-black border shadow-sm",
                      statusColors[consultation.status as keyof typeof statusColors] || statusColors.upcoming
                    )}>
                      {statusLabels[consultation.status as keyof typeof statusLabels] || 'غير محدد'}
                    </span>
                    
                    <Link 
                      to={`/patient/consultations/${consultation.id}`} 
                      className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-5 py-3 rounded-xl font-bold font-display text-sm transition-all duration-300 border border-border/50 shadow-sm group/btn"
                    >
                      التفاصيل
                      <div className="bg-background rounded-md p-1 group-hover/btn:bg-primary group-hover/btn:text-white transition-colors">
                        <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                  
                </m.div>
              );
            })}
          </AnimatePresence>
          
          {filtered.length === 0 && (
            <m.div variants={fadeUpVariant} className="text-center py-20 px-6 glass-panel rounded-[3rem] border border-dashed border-border/80 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 -z-10"></div>
              <div className="w-24 h-24 bg-secondary/80 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-border/50 rotate-3 group-hover:-rotate-3 transition-transform duration-500">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-black font-display text-foreground mb-3">لا توجد استشارات {activeTab === 'upcoming' ? 'قادمة' : activeTab === 'completed' ? 'مكتملة' : 'ملغاة'}</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">يبدو أنه لا يوجد أي نشاط حالي في هذه القائمة. يمكنك حجز استشارة جديدة متى شئت.</p>
              
              {activeTab === 'upcoming' && (
                <Link to="/patient/doctors" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-2xl font-bold font-display text-lg shadow-xl hover:scale-105 transition-all duration-300">
                  <CopyPlus className="w-6 h-6" />
                  حجز استشارة الآن
                </Link>
              )}
            </m.div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}