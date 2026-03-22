// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Elevated the Profile Page with a frosted hero section, modern tab navigation, and animated detail cards.

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { User, Phone, Activity, Heart, Contact, Edit2, CheckCircle2, Shield, CalendarDays } from 'lucide-react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'medical' | 'emergency'>('basic');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header Hero */}
        <m.div variants={scaleIn} className="glass-panel rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/20 transition-colors duration-700"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-700"></div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 left-6 z-20 p-3 bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-2xl hover:shadow-glass hover:-translate-y-1 transition-all duration-300 border border-border/50"
            title={isEditing ? 'حفظ التعديلات' : 'تعديل الملف'}
          >
            {isEditing ? <CheckCircle2 className="w-6 h-6 text-green-500 animate-pulse" /> : <Edit2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />}
          </button>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group/avatar">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-0 group-hover/avatar:opacity-100 blur-md transition-opacity duration-500 scale-110"></div>
              <img src={user.avatar} alt={user.name} className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-xl" />
              <div className="absolute bottom-1 right-3 bg-green-500 w-7 h-7 rounded-full border-[3px] border-background flex items-center justify-center shadow-sm" title="متصل الآن">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-right md:mt-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-3 border border-primary/20 shadow-sm">
                <Shield className="w-4 h-4" />
                حساب موثق
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-display text-foreground mb-2 drop-shadow-sm">{user.name}</h1>
              <p className="text-muted-foreground text-lg font-medium mb-4">{user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 text-pink-600 dark:text-pink-400 px-5 py-2 rounded-[1rem] text-sm font-bold border border-pink-500/20 shadow-sm flex items-center gap-2">
                  ✨ {user.label}
                </span>
                <span className="bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-border px-5 py-2 rounded-[1rem] text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                  <CalendarDays className="w-4 h-4" />
                  العمر: {user.age} سنة
                </span>
              </div>
            </div>
          </div>
        </m.div>

        {/* Custom Tabs */}
        <m.div variants={fadeUpVariant} className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar px-1">
          <button 
            onClick={() => setActiveTab('basic')}
            className={cn(
              "px-6 py-4 rounded-[1.5rem] font-bold font-display text-base md:text-lg whitespace-nowrap transition-all duration-300 flex items-center gap-3 shadow-sm",
              activeTab === 'basic' 
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-[var(--shadow-glow)] scale-105 border-0' 
                : 'glass-card text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border'
            )}
          >
            <User className="w-5 h-5" />
            المعلومات الأساسية
          </button>
          <button 
            onClick={() => setActiveTab('medical')}
            className={cn(
              "px-6 py-4 rounded-[1.5rem] font-bold font-display text-base md:text-lg whitespace-nowrap transition-all duration-300 flex items-center gap-3 shadow-sm",
              activeTab === 'medical' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/30 scale-105 border-0' 
                : 'glass-card text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border'
            )}
          >
            <Activity className="w-5 h-5" />
            المعلومات الطبية
          </button>
          <button 
            onClick={() => setActiveTab('emergency')}
            className={cn(
              "px-6 py-4 rounded-[1.5rem] font-bold font-display text-base md:text-lg whitespace-nowrap transition-all duration-300 flex items-center gap-3 shadow-sm",
              activeTab === 'emergency' 
                ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-500/30 scale-105 border-0' 
                : 'glass-card text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border'
            )}
          >
            <Contact className="w-5 h-5" />
            الطوارئ
          </button>
        </m.div>

        {/* Tab Content */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] shadow-sm border border-border relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'basic' && (
              <m.div 
                key="basic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-10 space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  <h2 className="text-2xl font-black font-display text-foreground">البيانات الشخصية</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">الاسم بالكامل</label>
                    {isEditing ? (
                      <input type="text" defaultValue={user.name} className="w-full bg-white/50 dark:bg-black/20 input-focus border border-border rounded-[1.25rem] px-5 py-4 outline-none font-bold text-lg" />
                    ) : (
                      <p className="font-bold font-display text-xl text-foreground glass-card px-5 py-4 rounded-[1.25rem]">{user.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">رقم الهاتف</label>
                    {isEditing ? (
                      <input type="text" defaultValue={user.phone} className="w-full bg-white/50 dark:bg-black/20 input-focus border border-border rounded-[1.25rem] px-5 py-4 outline-none font-bold text-lg" dir="ltr" />
                    ) : (
                      <p className="font-bold font-display text-xl text-foreground glass-card px-5 py-4 rounded-[1.25rem]" dir="ltr">{user.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">تاريخ الميلاد</label>
                    {isEditing ? (
                      <input type="date" defaultValue="1998-05-15" className="w-full bg-white/50 dark:bg-black/20 input-focus border border-border rounded-[1.25rem] px-5 py-4 outline-none font-bold text-lg" />
                    ) : (
                      <p className="font-bold font-display text-xl text-foreground glass-card px-5 py-4 rounded-[1.25rem]">15 مايو 1998 (26 سنة)</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">المرحلة الحياتية</label>
                    <div className="glass-card px-5 py-4 rounded-[1.25rem] border border-border font-bold font-display text-xl text-foreground">
                      {user.label.split('—')[0]}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">نبذة عنكِ</label>
                    {isEditing ? (
                      <textarea defaultValue={user.bio} className="w-full bg-white/50 dark:bg-black/20 input-focus border border-border rounded-[1.25rem] px-5 py-4 outline-none font-bold text-lg h-32 resize-none" />
                    ) : (
                      <p className="font-medium text-lg leading-relaxed text-muted-foreground glass-card p-6 rounded-[1.5rem] border border-border relative">
                        <span className="absolute -top-3 -right-3 text-3xl opacity-50">✨</span>
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>
              </m.div>
            )}

            {activeTab === 'medical' && (
              <m.div 
                key="medical"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-10 space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-black font-display text-foreground">السجل الطبي الأساسي</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 relative z-10">
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">فصيلة الدم</label>
                    <div className="font-black font-display text-3xl text-blue-500 bg-blue-500/10 px-6 py-4 rounded-[1.25rem] inline-block border border-blue-500/20 shadow-sm shadow-blue-500/10">O+</div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block font-bold text-muted-foreground px-1">الطول والوزن الأخير</label>
                    <div className="font-black font-display text-xl text-foreground glass-card px-6 py-4 rounded-[1.25rem] flex items-center justify-between">
                      <span>165 سم</span>
                      <span className="w-px h-6 bg-border"></span>
                      <span>65 كجم</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <label className="block font-bold text-muted-foreground px-1 flex items-center gap-2">
                       <Activity className="w-4 h-4" /> الأمراض المزمنة
                    </label>
                    <div className="glass-card p-6 rounded-[1.5rem] border-dashed border-2 flex items-center justify-center min-h-[100px]">
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-5 py-2.5 rounded-xl text-base font-bold border border-emerald-500/20 shadow-sm">
                        لا يوجد تاريخ مرضي مسجل ✅
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <label className="block font-bold text-muted-foreground px-1 flex items-center gap-2">
                       <Shield className="w-4 h-4" /> الحساسية
                    </label>
                    <div className="glass-card p-6 rounded-[1.5rem] flex flex-wrap gap-3">
                      <span className="bg-warning/10 text-warning px-5 py-2.5 rounded-xl text-base font-bold border border-warning/20 shadow-sm">البنسلين</span>
                      <span className="bg-warning/10 text-warning px-5 py-2.5 rounded-xl text-base font-bold border border-warning/20 shadow-sm">الفراولة</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <label className="block font-bold text-muted-foreground px-1 flex items-center gap-2">
                       <span className="text-xl">💊</span> الأدوية الحالية المستمرة
                    </label>
                    <div className="glass-card p-6 rounded-[1.5rem] space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-black/20 rounded-xl border border-border/50">
                        <span className="font-bold text-foreground">فيتامينات متعددة</span>
                        <span className="text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-lg">يومياً</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-black/20 rounded-xl border border-border/50">
                        <span className="font-bold text-foreground">حمض الفوليك</span>
                        <span className="text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-lg">يومياً</span>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {activeTab === 'emergency' && (
              <m.div 
                key="emergency"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-10 space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-1.5 h-8 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-black font-display text-foreground">جهة اتصال الطوارئ</h2>
                </div>
                
                <div className="bg-gradient-to-br from-red-500/10 to-transparent border-2 border-red-500/20 rounded-[2rem] p-8 relative z-10 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-red-500/20">
                      <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                    </div>
                    
                    <div className="flex-1 w-full relative">
                      {isEditing ? (
                        <div className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-sm font-bold text-red-800 dark:text-red-400 mb-2 px-1">الاسم الكامل للمرافق</label>
                            <input type="text" defaultValue="أحمد محمود (زوج)" className="w-full bg-white/80 dark:bg-black/40 border border-red-500/30 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-bold" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-red-800 dark:text-red-400 mb-2 px-1">رقم الهاتف للاتصال السريع</label>
                            <input type="text" defaultValue="+20 100 999 8888" className="w-full bg-white/80 dark:bg-black/40 border border-red-500/30 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-bold" dir="ltr" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <h3 className="text-2xl font-black font-display text-red-600 dark:text-red-400 mb-2">أحمد محمود</h3>
                            <span className="inline-block bg-white/50 dark:bg-black/20 text-red-800 dark:text-red-300 px-4 py-1.5 rounded-lg text-sm font-bold border border-red-500/10 backdrop-blur-sm">القرابة: زوج</span>
                          </div>
                          <a 
                            href="tel:+201009998888" 
                            className="inline-flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl font-bold font-display text-lg shadow-lg shadow-red-500/30 hover:-translate-y-1 transition-all duration-300 w-full md:w-auto overflow-hidden relative group" 
                            dir="ltr"
                          >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <Phone className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">+20 100 999 8888</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            )}

          </AnimatePresence>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}