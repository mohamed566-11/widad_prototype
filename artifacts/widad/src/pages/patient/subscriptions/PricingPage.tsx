import { useState } from 'react'
import { MOCK_PLANS } from '@/mock/data/subscriptions'
import { useAuthStore } from '@/store/auth.store'
import { Check, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'

export default function PricingPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [isYearly, setIsYearly] = useState(false)
  const currentPlan = user?.mockData?.subscription?.plan

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">باقات وداد — اختاري ما يناسبك</h1>
        <p className="text-lg text-muted-foreground mb-8">استثمري في صحتك مع باقات مصممة خصيصاً لاحتياجاتك</p>
        
        {/* Toggle */}
        <div className="inline-flex bg-gray-100 p-1.5 rounded-full relative">
          <div className="absolute inset-0 z-0 bg-primary rounded-full transition-transform duration-300 w-1/2" style={{ transform: isYearly ? 'translateX(-100%)' : 'translateX(0)' }}></div>
          <button onClick={() => setIsYearly(false)} className={`relative z-10 px-8 py-2.5 rounded-full font-bold text-sm transition-colors ${!isYearly ? 'text-white' : 'text-gray-600'}`}>شهري</button>
          <button onClick={() => setIsYearly(true)} className={`relative z-10 px-8 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${isYearly ? 'text-white' : 'text-gray-600'}`}>
            سنوي <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full leading-none">شهران مجاناً</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {MOCK_PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.name
          const price = isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
          
          return (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-3xl p-6 shadow-sm border-2 transition-all hover:shadow-xl ${
                plan.badge ? 'border-primary shadow-primary/10 transform md:-translate-y-4' : 'border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2" style={{ color: plan.color }}>{plan.name}</h3>
              <div className="mb-6 flex items-baseline gap-1">
                {plan.isFree ? (
                  <span className="text-3xl font-extrabold text-gray-900">مجاناً</span>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold text-gray-900">{price}</span>
                    <span className="text-gray-500 text-sm font-medium">ج.م / {isYearly ? 'سنة' : 'شهر'}</span>
                  </>
                )}
              </div>

              <button 
                disabled={isCurrent}
                onClick={() => {
                  subscriptionsMock.setPendingPlan(user, plan.id, isYearly)
                  navigate('/patient/checkout')
                }}
                className={`w-full py-3 rounded-xl font-bold mb-8 transition-all ${
                  isCurrent 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : plan.badge 
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {isCurrent ? 'باقتك الحالية' : 'اختاري الباقة'}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      
      <div className="mt-12 bg-gray-50 rounded-2xl p-6 flex items-start gap-4 text-sm text-gray-600 border border-gray-200">
        <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        <p>
          <strong>سياسة الإلغاء:</strong> يمكنك إلغاء أو تغيير باقتك في أي وقت. الاستشارات المجانية لا تُرحل للشهر التالي وتتجدد تلقائياً مع بداية كل دورة دفع.
        </p>
      </div>
    </div>
  )
}
