// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Pricing Page to reflect premium offerings with glowing glass cards, 3D hover effects, and a custom animated toggle switch.

import { useState } from 'react'
import { MOCK_PLANS } from '@/mock/data/subscriptions'
import { useAuthStore } from '@/store/auth.store'
import { Check, Info, Sparkles, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [isYearly, setIsYearly] = useState(false)
  const currentPlan = user?.mockData?.subscription?.plan

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-7xl mx-auto py-10 px-4 md:px-8 space-y-16" dir="rtl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          
          <m.div variants={fadeUpVariant} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-6 border border-primary/20 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
            استثمري في صحتك
          </m.div>
          <m.h1 variants={fadeUpVariant} className="text-4xl md:text-6xl font-black font-display text-foreground mb-6 drop-shadow-sm leading-tight">باقات وداد — <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-accent">اختاري ما يناسبك</span></m.h1>
          <m.p variants={fadeUpVariant} className="text-lg md:text-xl text-muted-foreground mb-12" style={{ lineHeight: '1.8' }}>باقات مصممة خصيصاً لتلبي احتياجاتك في كل مرحلة من مراحل حياتك، مع رعاية طبية مستمرة ومساعد ذكي متاح دائماً.</m.p>
          
          {/* Custom Animated Toggle */}
          <m.div variants={fadeUpVariant} className="inline-flex bg-white/50 dark:bg-black/20 p-2 rounded-full relative shadow-inner border border-border/50 backdrop-blur-md overflow-hidden">
            <div 
              className="absolute top-2 bottom-2 w-[calc(50%-8px)] z-0 bg-gradient-to-l from-primary to-accent rounded-full transition-all duration-500 shadow-[var(--shadow-glow)] shadow-primary/40" 
              style={{ 
                right: isYearly ? 'calc(50% + 4px)' : '4px' 
              }}
            ></div>
            <button 
              onClick={() => setIsYearly(false)} 
              className={cn(
                "relative z-10 px-10 py-3 rounded-full font-bold font-display text-base transition-colors duration-300 w-40",
                !isYearly ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              شهري
            </button>
            <button 
              onClick={() => setIsYearly(true)} 
              className={cn(
                "relative z-10 px-10 py-3 rounded-full font-bold font-display text-base transition-colors duration-300 w-40 flex items-center justify-center gap-2",
                isYearly ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              سنوي
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full leading-none whitespace-nowrap transition-colors border",
                isYearly ? "bg-white/20 text-white border-white/30" : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700"
              )}>
                شهران مجاناً
              </span>
            </button>
          </m.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 md:gap-6 relative z-10">
          <AnimatePresence mode="wait">
            {MOCK_PLANS.map((plan, index) => {
              const isCurrent = currentPlan === plan.name
              const price = isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
              
              // Determine card styling based on whether it's the "featured" plan
              const isFeatured = !!plan.badge;
              
              const baseCardClasses = "relative glass-card rounded-[2.5rem] p-8 shadow-sm border transition-all duration-500 hover:shadow-xl flex flex-col h-full overflow-hidden group/card bg-white/70 dark:bg-black/40";
              const featuredCardClasses = "transform md:-translate-y-6 lg:scale-105 border-primary/50 shadow-[var(--shadow-glow)] shadow-primary/20 z-10 overflow-visible";
              
              return (
                <m.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(baseCardClasses, isFeatured ? featuredCardClasses : "border-border/50 hover:border-border mt-4 lg:mt-0")}
                >
                  {/* Background Accents */}
                  {isFeatured && (
                    <>
                       <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[50px] pointer-events-none group-hover/card:bg-primary/20 transition-colors duration-500 -z-10"></div>
                       <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none -z-10"></div>
                    </>
                  )}
                  
                  {!isFeatured && (
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 pointer-events-none -z-10" style={{ backgroundColor: plan.color }}></div>
                  )}

                  {plan.badge && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-black font-display shadow-lg shadow-primary/30 whitespace-nowrap z-20 flex items-center gap-2 border border-white/20">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      {plan.badge}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-black font-display mb-3 tracking-wide" style={{ color: plan.color }}>{plan.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground min-h-[40px] mb-8">{(plan as any).description || "باقة تمنحك الأمان الصحي بأسعار تنافسية."}</p>
                    
                    <div className="mb-10 flex items-baseline gap-1.5 h-16">
                      {plan.isFree ? (
                        <span className="text-4xl lg:text-5xl font-black font-display text-foreground">مجاناً</span>
                      ) : (
                        <m.div 
                          key={`${plan.id}-${isYearly}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-baseline gap-2"
                        >
                          <span className="text-4xl lg:text-5xl font-black font-display text-foreground tracking-tight">{price}</span>
                          <span className="text-muted-foreground text-base font-bold flex flex-col justify-end h-full mb-1">
                            <span>ج.م</span>
                            <span className="text-xs opacity-80 border-t border-border/50 pt-0.5 mt-0.5">/ {isYearly ? 'سنة' : 'شهر'}</span>
                          </span>
                        </m.div>
                      )}
                    </div>

                    <ul className="space-y-5 mb-10">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-foreground font-medium leading-relaxed">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm border",
                            isFeatured ? "bg-primary/20 text-primary border-primary/30" : "bg-green-500/10 text-green-600 border-green-500/20"
                          )}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 relative z-10">
                    <button 
                      disabled={isCurrent}
                      onClick={() => {
                        subscriptionsMock.setPendingPlan(user, plan.id, isYearly)
                        navigate('/patient/checkout')
                      }}
                      className={cn(
                        "w-full py-4 rounded-[1.25rem] font-black font-display text-base transition-all duration-300 relative overflow-hidden group/btn",
                        isCurrent 
                          ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed border border-border/30 backdrop-blur-sm' 
                          : isFeatured 
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1' 
                            : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 backdrop-blur-sm'
                      )}
                    >
                      {!isCurrent && isFeatured && <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isCurrent ? 'باقتك الحالية' : 'اختاري الباقة'}
                        {!isCurrent && <TrendingUp className={cn("w-4 h-4", isFeatured ? "text-white" : "text-primary")} />}
                      </span>
                    </button>
                    {isYearly && plan.yearlyPrice && !isCurrent && (
                        <p className="text-center text-xs font-bold text-success mt-3 font-display">توفرين {plan.monthlyPrice * 12 - plan.yearlyPrice} ج.م سنوياً!</p>
                    )}
                  </div>
                </m.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        {/* Info Box */}
        <m.div variants={fadeUpVariant} className="max-w-4xl mx-auto glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-sm text-foreground border border-border/60 shadow-sm mt-16 group hover:border-primary/30 transition-colors">
          <div className="w-14 h-14 bg-secondary/80 rounded-[1.25rem] flex items-center justify-center shrink-0 border border-border/50 shadow-inner group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
             <Info className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h4 className="font-black font-display text-lg mb-2">سياسة الشفافية والإلغاء</h4>
            <p className="text-muted-foreground leading-relaxed text-base">
              يمكنك ترقية أو إلغاء أو تغيير باقتك في أي وقت بسهولة من إعدادات حسابك. الاستشارات المجانية و الفوائد الأخرى لا تُرحل للشهر التالي وتتجدد تلقائياً مع بداية كل دورة دفع جديدة لضمان حصولك على أقصى استفادة.
            </p>
          </div>
        </m.div>
        
      </m.div>
    </LazyMotion>
  )
}
