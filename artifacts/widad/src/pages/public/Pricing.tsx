// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { Link } from 'react-router-dom'
import { MOCK_PLANS } from '@/mock/data/subscriptions'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { Check, Flame, Star, Sparkles, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PublicPricing() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
        
        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto relative z-10">
          <m.div variants={fadeUpVariant} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black font-display text-foreground mb-6 drop-shadow-sm flex items-center justify-center gap-3">
              <Star className="w-10 h-10 text-primary" />
              الخطط والأسعار
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              اختاري الخطة المناسبة لك واحصلي على دعم احترافي لمسيرتك الصحية. يمكنك الترقية في أي وقت بكل سهولة.
            </p>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PLANS.map((plan, index) => {
              const isPopular = plan.id === 'pro'
              const isPremium = plan.id === 'vip'
              
              return (
                <m.div 
                  key={plan.id}
                  variants={fadeUpVariant}
                  className={cn(
                    "glass-card rounded-[2.5rem] p-8 flex flex-col relative group transition-all duration-500 overflow-hidden",
                    isPopular ? "border-primary/50 shadow-[var(--shadow-glow)] scale-105 z-10" : "border-white/40 shadow-sm hover:shadow-lg hover:-translate-y-2",
                    isPremium ? "border-orange-500/50" : ""
                  )}
                >
                  {/* Glow effects for popular/premium plans */}
                  {isPopular && <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />}
                  {isPremium && <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none -z-10" />}
                  
                  <div className="mb-6 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className={cn("text-2xl font-black font-display", isPopular ? "text-primary" : isPremium ? "text-orange-600 dark:text-orange-400" : "text-foreground")}>
                        {plan.name}
                      </h2>
                      {plan.badge && (
                        <span className={cn(
                          "text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm",
                          isPopular ? "bg-primary text-white" : "bg-orange-500 text-white"
                        )}>
                          {isPopular ? <Flame className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-8 relative z-10">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black font-display text-foreground drop-shadow-sm">
                        {plan.monthlyPrice === 0 ? 'مجاناً' : plan.monthlyPrice}
                      </span>
                      {plan.monthlyPrice !== 0 && <span className="text-lg font-bold text-muted-foreground mr-1 mb-1">ج.م / شهرياً</span>}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 text-base text-muted-foreground mb-8 flex-1 relative z-10">
                    {plan.features.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className={cn(
                          "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors",
                          isPopular ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/50 dark:bg-black/20 border-border text-primary group-hover/item:border-primary/30"
                        )}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="flex items-center gap-2 text-sm text-primary font-bold mt-2">
                        <AlertCircle className="w-4 h-4" />
                        ومميزات إضافية عديدة...
                      </li>
                    )}
                  </ul>
                  
                  <div className="relative z-10 mt-auto">
                    <Link 
                      to="/auth" 
                      className={cn(
                        "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/40 shadow-sm",
                        isPopular 
                          ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-[var(--shadow-glow)] hover:shadow-lg hover:-translate-y-1" 
                          : "text-foreground hover:bg-white/80 dark:hover:bg-black/50 hover:border-border hover:-translate-y-1"
                      )}
                    >
                      {plan.monthlyPrice === 0 ? 'ابدئي مجاناً' : 'اشتركي الآن'}
                    </Link>
                  </div>
                </m.div>
              )
            })}
          </div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
