import { Link } from 'react-router-dom'
import { MOCK_PLANS } from '@/mock/data/subscriptions'

export default function PublicPricing() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">الخطط والأسعار</h1>
        <p className="text-lg text-muted-foreground mb-10">اختاري الخطة المناسبة لك، ويمكنك الترقية في أي وقت.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_PLANS.map((plan) => (
            <div key={plan.id} className="bg-white border border-border rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                {plan.badge && <span className="inline-block mt-2 text-xs bg-primary/10 text-primary font-bold px-2 py-1 rounded-full">{plan.badge}</span>}
              </div>
              <div className="text-3xl font-black mb-4">
                {plan.monthlyPrice === 0 ? 'مجاني' : `${plan.monthlyPrice} ج.م`}
                {plan.monthlyPrice !== 0 && <span className="text-sm text-gray-500 font-medium"> / شهري</span>}
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6 flex-1">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature}>✅ {feature}</li>
                ))}
              </ul>
              <Link to="/auth" className="text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
                ابدئي الآن
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
