// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Checkout page for a premium, trustworthy payment experience with elegant glass panels and smooth transitions.

import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, Loader2, ShieldCheck, Wallet, Banknote, Sparkles } from 'lucide-react'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'
import { useAuthStore } from '@/store/auth.store'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant, scaleIn, customEase } from '@/lib/animations'
import { cn } from '@/lib/utils'

type PaymentMethod = 'card' | 'wallet' | 'cash'

export default function Checkout() {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()

  const pending = subscriptionsMock.getPendingPlan(user)
  const plan = useMemo(() => {
    if (!pending) return null
    return subscriptionsMock.listPlans().find((item) => item.id === pending.planId) ?? null
  }, [pending])

  const [fullName, setFullName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<null | { invoiceNumber: string; amount: number }>(null)

  if (!pending || !plan) {
    return (
      <LazyMotion features={domAnimation}>
        <m.div variants={fadeUpVariant} initial="hidden" animate="show" className="max-w-xl mx-auto py-20 px-4" dir="rtl">
          <div className="glass-panel text-center relative overflow-hidden group p-10 md:p-14 rounded-[2.5rem] border border-border shadow-sm">
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 -z-10"></div>
             <div className="w-24 h-24 bg-secondary/80 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-border/50 rotate-3 group-hover:-rotate-3 transition-transform duration-500">
               <CreditCard className="w-10 h-10 text-muted-foreground" />
             </div>
            <h1 className="text-3xl font-black font-display text-foreground mb-4">لا توجد باقة محددة</h1>
            <p className="text-muted-foreground text-lg mb-10">اختاري باقة أولاً من صفحة الأسعار ثم عودي لإتمام الاشتراك.</p>
            <Link to="/patient/subscriptions/pricing" className="inline-flex items-center justify-center rounded-[1.5rem] bg-gradient-to-r from-primary to-accent px-8 py-4 text-white font-black font-display shadow-md shadow-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              الذهاب لصفحة الباقات
            </Link>
          </div>
        </m.div>
      </LazyMotion>
    )
  }

  const amount = pending.isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
  const billingLabel = pending.isYearly ? 'سنوي' : 'شهري'

  const currentStep = done ? 4 : 3

  const handleCheckout = async () => {
    if (!fullName.trim() || !phone.trim() || loading) return

    setLoading(true)
    setError('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const result = subscriptionsMock.checkout(user, {
        purchaserName: fullName,
        paymentMethod: method,
      })

      const freeConsultsTotal = plan.id === 'plus' ? 1 : plan.id === 'pro' ? 3 : plan.id === 'pro-plus' ? 5 : 0
      const consultationDiscount = plan.id === 'plus' || plan.id === 'pro' ? 20 : plan.id === 'pro-plus' ? 25 : 0

      setUser({
        ...user,
        name: fullName,
        phone,
        plan: plan.id,
        mockData: {
          ...user?.mockData,
          subscription: {
            ...(user?.mockData?.subscription ?? {}),
            plan: plan.name,
            status: 'active',
            billingCycle: pending.isYearly ? 'yearly' : 'monthly',
            renewsAt: pending.isYearly ? '2027-03-22' : '2026-04-22',
            freeConsultsUsed: 0,
            freeConsultsTotal,
            consultationDiscount,
            weeklyReportEnabled: plan.id === 'pro' || plan.id === 'pro-plus',
            customJourneyEnabled: plan.id === 'pro-plus',
          },
        },
      })

      setDone({ invoiceNumber: result.invoiceNumber, amount: result.amount })
    } catch (e: any) {
      setError(e?.message ?? 'تعذر إتمام عملية الدفع، حاولي مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto py-10 px-4 space-y-10" dir="rtl">
        
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground mb-2 drop-shadow-sm">إتمام الاشتراك</h1>
            <p className="text-muted-foreground font-medium text-lg">أكملي عملية الدفع للبدء في استخدام باقتك الجديدة</p>
          </div>
          
          <div className="flex gap-2">
            {['مراجعة الباقة', 'بيانات الدفع', 'تأكيد الطلب', 'تم'].map((label, index) => {
              const step = index + 1
              const active = step <= currentStep
              const isPast = step < currentStep
              
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-sm transition-all duration-500",
                    active ? "bg-primary text-white shadow-md shadow-primary/30 scale-110" : "bg-secondary text-muted-foreground border border-border/50",
                    isPast && "bg-primary text-white"
                  )}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  <span className={cn("text-xs font-bold transition-colors hidden sm:block", active ? "text-primary" : "text-muted-foreground")}>{label}</span>
                </div>
              )
            })}
          </div>
        </m.div>

        {done ? (
          <m.div variants={scaleIn} className="glass-panel text-center relative overflow-hidden group p-10 md:p-14 rounded-[2.5rem] border border-border shadow-sm max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors duration-500 -z-10"></div>
            
            <m.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-28 h-28 mx-auto rounded-[2.5rem] bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-green-500/30"
            >
              <CheckCircle2 className="w-14 h-14" />
            </m.div>
            
            <h2 className="text-4xl font-black font-display text-foreground mb-4">تم تفعيل اشتراكك بنجاح! 🎉</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              رقم الفاتورة: <span dir="ltr" className="font-bold text-foreground bg-secondary/80 px-3 py-1 rounded-lg mr-1 inline-block">{done.invoiceNumber}</span><br className="sm:hidden" />
              المبلغ المدفوع: <span className="font-bold text-green-600 dark:text-green-400 text-2xl mr-1">{done.amount} ج.م</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={() => navigate('/patient/subscriptions')} className="w-full sm:w-auto rounded-[1.5rem] bg-gradient-to-r from-primary to-accent px-8 py-4 text-white font-black font-display shadow-md shadow-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                عرض اشتراكي
              </button>
              <button onClick={() => navigate('/patient/subscriptions/invoices')} className="w-full sm:w-auto rounded-[1.5rem] bg-white/50 dark:bg-black/20 border border-border/50 px-8 py-4 font-black font-display text-foreground hover:bg-white dark:hover:bg-black/40 hover:-translate-y-1 transition-all duration-300">
                عرض الفواتير
              </button>
            </div>
          </m.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              {/* Billing Info */}
              <m.div variants={fadeUpVariant} className="glass-panel p-8 rounded-[2.5rem] border border-border shadow-sm">
                <h2 className="text-2xl font-black font-display text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <span className="text-xl">📝</span>
                  </div>
                  بيانات الفاتورة
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground mr-1">الاسم الكامل</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="أدخلي اسمك الكامل"
                      className="w-full bg-white/50 dark:bg-black/20 border border-border/50 rounded-2xl py-3.5 px-5 font-medium text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground mr-1">رقم الهاتف</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                      placeholder="+20 100 000 0000"
                      className="w-full bg-white/50 dark:bg-black/20 border border-border/50 rounded-2xl py-3.5 px-5 font-medium text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50 text-right"
                    />
                  </div>
                </div>
              </m.div>

              {/* Payment Method */}
              <m.div variants={fadeUpVariant} className="glass-panel p-8 rounded-[2.5rem] border border-border shadow-sm">
                <h2 className="text-2xl font-black font-display text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                     <CreditCard className="w-5 h-5 text-purple-500" />
                  </div>
                  طريقة الدفع
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { id: 'card', label: 'بطاقة بنكية', icon: CreditCard },
                    { id: 'wallet', label: 'محفظة إلكترونية', icon: Wallet },
                    { id: 'cash', label: 'فوري / أمان', icon: Banknote },
                  ].map((item) => {
                    const isSelected = method === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setMethod(item.id as PaymentMethod)}
                        className={cn(
                          "rounded-[1.5rem] border-2 p-5 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden group",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border/50 bg-white/30 dark:bg-black/10 hover:border-border hover:bg-white/50 dark:hover:bg-black/30"
                        )}
                      >
                         {isSelected && <div className="absolute inset-0 bg-primary/10 animate-pulse-glow" />}
                         <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-colors relative z-10", isSelected ? "bg-primary text-white shadow-sm" : "bg-secondary text-muted-foreground group-hover:text-foreground")}>
                           <item.icon className="w-6 h-6" />
                         </div>
                        <span className={cn("font-bold text-sm relative z-10", isSelected ? "text-primary" : "text-foreground")}>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-sm text-amber-600 dark:text-amber-400 font-bold flex items-start gap-3 w-full">
                  <span className="text-xl shrink-0 mt-0.5">ℹ️</span>
                  <span>هذه الحسابات تجريبية (Mock). لن يتم خصم أي مبالغ حقيقية إطلاقاً في هذه النسخة من التطبيق.</span>
                </div>
              </m.div>

              {error && (
                <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-destructive/10 text-destructive p-5 rounded-[1.5rem] text-center font-bold border border-destructive/20 shadow-sm flex items-center justify-center gap-2">
                  <span className="text-xl">⚠️</span> {error}
                </m.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 max-lg:order-first">
              <m.div variants={scaleIn} className="glass-card p-8 rounded-[2.5rem] border border-primary/20 shadow-[var(--shadow-glow)] shadow-primary/20 sticky top-24 bg-gradient-to-br from-white/80 to-primary/5 dark:from-black/60 dark:to-primary/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none -z-10"></div>
                
                <h2 className="text-2xl font-black font-display text-foreground mb-6">ملخص الطلب</h2>
                
                <div className="rounded-[1.5rem] bg-white/60 dark:bg-black/40 border border-border/50 p-6 space-y-4 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Sparkles className="w-24 h-24" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 border-b border-border/50 pb-6">
                       <div>
                         <p className="font-bold text-muted-foreground text-sm mb-1">الباقة المختارة</p>
                         <p className="text-2xl font-black font-display tracking-wide" style={{ color: plan.color }}>{plan.name}</p>
                       </div>
                       <span className="bg-secondary/80 text-foreground px-3 py-1 rounded-lg text-xs font-bold border border-border/50 shadow-sm">
                         {billingLabel}
                       </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-base font-bold text-muted-foreground">
                        <span>السعر الأساسي</span>
                        <span dir="ltr">{amount} ج.م</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-green-600 dark:text-green-400">
                        <span>الخصم ({pending.isYearly ? 'سنوي' : 'لا يوجد'})</span>
                        <span dir="ltr">0 ج.م</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xl font-black font-display text-primary pt-6 border-t border-border/50 p-2 bg-primary/5 rounded-xl border-dashed">
                      <span>الإجمالي</span>
                      <span className="text-3xl text-foreground" dir="ltr">{amount} ج.م</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.25rem] bg-primary/5 border border-primary/10 p-4 mb-8 flex items-start gap-3 text-sm text-primary font-medium">
                  <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 opacity-80" />
                  اشتراكك يُفعَّل فورًا ويتمتع بالتجديد التلقائي لضمان عدم انقطاع الخدمة (يمكنك الإلغاء لاحقاً).
                </div>

                <button
                  type="button"
                  disabled={loading || !fullName.trim() || !phone.trim()}
                  onClick={handleCheckout}
                  className="w-full rounded-[1.5rem] bg-gradient-to-l from-primary to-accent text-white py-4.5 font-black font-display text-lg hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden h-16"
                >
                  {!loading && <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10">تأكيد ودفع</span>
                      <CreditCard className="w-5 h-5 relative z-10" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/patient/subscriptions/pricing')}
                  className="w-full mt-4 rounded-[1.5rem] border border-border/50 bg-white/50 dark:bg-black/20 py-4 font-bold text-muted-foreground hover:bg-white dark:hover:bg-black/40 hover:text-foreground transition-all duration-300"
                >
                  تعديل الباقة
                </button>
              </m.div>
            </div>
            
          </div>
        )}
      </m.div>
    </LazyMotion>
  )
}
