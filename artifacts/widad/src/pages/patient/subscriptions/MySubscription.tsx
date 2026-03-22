// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Subscription page with premium glass panels, vibrant glowing gradients, and smooth entrance animations.

import { useAuthStore } from '@/store/auth.store';
import { CreditCard, Zap, CheckCircle, AlertCircle, Sparkles, TrendingUp, Settings } from 'lucide-react';
import { MOCK_PLANS } from '@/mock/data/subscriptions';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function MySubscription() {
  const { user } = useAuthStore();
  
  if (!user || !user.mockData.subscription) return null;
  
  const sub = user.mockData.subscription;
  const currentPlan = MOCK_PLANS.find(p => p.name === sub.plan);

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1.25rem] bg-amber-500/10 flex items-center justify-center p-2 shadow-inner">
            <CreditCard className="w-full h-full text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground mb-1 drop-shadow-sm">اشتراكي الحالي</h1>
            <p className="text-muted-foreground font-medium text-lg">إدارة باقتك ومتابعة استهلاكك</p>
          </div>
        </m.div>

        {/* Current Plan Card Hero */}
        <m.div variants={scaleIn} className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2.5rem] p-8 md:p-10 text-white shadow-[var(--shadow-glow)] shadow-amber-500/20 relative overflow-hidden group">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/30 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <CreditCard className="w-64 h-64 -rotate-12" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-amber-500/30 shadow-sm backdrop-blur-md">
                <Sparkles className="w-4 h-4 animate-pulse" />
                باقتك الحالية
              </div>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-4xl md:text-5xl font-black font-display text-white drop-shadow-md">{sub.plan}</h2>
                <span className={cn(
                  "px-4 py-1.5 rounded-xl text-sm font-black border shadow-sm backdrop-blur-md",
                  sub.status === 'active' ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
                )}>
                  {sub.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-[1.25rem] border border-white/10 inline-block shadow-glass">
                {sub.renewsAt ? (
                  <p className="text-gray-200 font-bold text-lg">يتجدد في: <span className="text-white">{new Date(sub.renewsAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                ) : (
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 font-black text-lg flex items-center gap-2">
                    باقة مجانية مدى الحياة <Sparkles className="w-5 h-5 text-yellow-400 inline" />
                  </p>
                )}
              </div>
            </div>
            
            {currentPlan?.isFree && (
              <Link to="/patient/pricing" className="bg-gradient-to-l from-amber-400 to-yellow-600 text-gray-900 px-8 py-4 rounded-[1.5rem] font-black font-display text-lg shadow-[var(--shadow-glow)] shadow-amber-500/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn flex items-center gap-2">
                <span className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                <TrendingUp className="w-6 h-6 relative z-10" />
                <span className="relative z-10">ترقية الباقة الآن</span>
              </Link>
            )}
          </div>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Usage Stats */}
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 shadow-sm border border-border group hover:border-amber-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black font-display text-foreground mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-[1.25rem] bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                استهلاك الباقة
              </h3>
              
              <div className="space-y-8">
                {sub.freeConsultsTotal !== undefined && (
                  <div>
                    <div className="flex justify-between text-base font-bold text-foreground mb-3">
                      <span>الاستشارات المجانية المتبقية</span>
                      <span className="text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">{sub.freeConsultsUsed} / {sub.freeConsultsTotal}</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden border border-border shadow-inner">
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(sub.freeConsultsUsed / sub.freeConsultsTotal) * 100}%` }}
                        transition={{ duration: 1, ease: customEase }}
                        className="h-full bg-gradient-to-r from-primary to-accent relative"
                      >
                         <span className="absolute inset-0 bg-white/20 animate-pulse" />
                      </m.div>
                    </div>
                  </div>
                )}
                
                {sub.aiChatsLimit && (
                  <div>
                    <div className="flex justify-between text-base font-bold text-foreground mb-3">
                      <span>رسائل المساعد الذكي (اليوم)</span>
                      <span className="text-purple-500 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">{sub.aiChatsToday} / {sub.aiChatsLimit}</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden border border-border shadow-inner">
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(sub.aiChatsToday / sub.aiChatsLimit) * 100}%` }}
                        transition={{ duration: 1, ease: customEase }}
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 relative"
                      >
                        <span className="absolute inset-0 bg-white/20 animate-pulse" />
                      </m.div>
                    </div>
                  </div>
                )}
                
                {sub.consultationDiscount && (
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-5 rounded-[1.5rem] border border-green-500/30 flex items-center gap-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-green-500 text-white font-black text-2xl rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-lg shadow-green-500/30 rotate-3 group-hover:-rotate-3 transition-transform">
                      %
                    </div>
                    <div>
                      <p className="font-black font-display text-lg text-green-700 dark:text-green-400 mb-1">خصم دائم {sub.consultationDiscount}%</p>
                      <p className="text-sm font-bold text-green-600/80 dark:text-green-500">يطبق تلقائياً على استشاراتك المدفوعة</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </m.div>

          {/* Features Included */}
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 shadow-sm border border-border relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-black font-display text-foreground mb-8">مميزات باقتك</h3>
              <ul className="space-y-5 flex-1">
                {currentPlan?.features.map((feature, i) => (
                  <m.li 
                    key={i} 
                    custom={i}
                    variants={fadeUpVariant}
                    className="flex items-start gap-4 text-foreground font-medium text-lg bg-white/40 dark:bg-black/20 p-4 rounded-2xl border border-border/50 hover:bg-white dark:hover:bg-black/40 hover:border-primary/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    {feature}
                  </m.li>
                ))}
              </ul>
            </div>
          </m.div>
        </div>
        
        {/* Settings */}
        {!currentPlan?.isFree && (
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-black font-display text-foreground mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.25rem] bg-secondary flex items-center justify-center border border-border/50">
                <Settings className="w-6 h-6 text-muted-foreground" />
              </div>
              إعدادات الاشتراك
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-white/50 dark:bg-black/20 border border-border/50 rounded-[1.5rem] hover:bg-white dark:hover:bg-black/40 transition-colors">
                <div>
                  <p className="font-bold text-lg text-foreground mb-1">التجديد التلقائي</p>
                  <p className="text-sm font-medium text-muted-foreground">تجديد الاشتراك تلقائياً في نهاية المدة لتجنب انقطاع الخدمة</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-14 h-7 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:right-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>
              
              <button className="flex items-center justify-center gap-2 text-destructive font-bold p-5 bg-destructive/5 hover:bg-destructive text-destructive hover:text-white rounded-[1.5rem] transition-all duration-300 w-full border border-destructive/20 hover:shadow-lg hover:shadow-destructive/30">
                <AlertCircle className="w-5 h-5" />
                إلغاء الاشتراك
              </button>
            </div>
          </m.div>
        )}
      </m.div>
    </LazyMotion>
  );
}