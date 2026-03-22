import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, Loader2, ShieldCheck } from 'lucide-react'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'
import { useAuthStore } from '@/store/auth.store'

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
      <div className="max-w-xl mx-auto py-10" dir="rtl">
        <div className="bg-white rounded-3xl border border-border shadow-sm p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">لا توجد باقة محددة</h1>
          <p className="text-muted-foreground">اختاري باقة أولاً من صفحة الأسعار ثم عودي لإتمام الاشتراك.</p>
          <Link to="/patient/subscriptions" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-bold hover:bg-primary/90 transition-colors">
            الذهاب لصفحة الباقات
          </Link>
        </div>
      </div>
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
      await new Promise((resolve) => setTimeout(resolve, 600))

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
    <div className="max-w-4xl mx-auto py-8 space-y-6" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إتمام الاشتراك</h1>

      <div className="grid grid-cols-4 gap-2">
        {['مراجعة الباقة', 'بيانات الفاتورة', 'الدفع', 'تم بنجاح'].map((label, index) => {
          const step = index + 1
          const active = step <= currentStep
          return (
            <div key={label} className={`rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-center border ${active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white border-gray-200 text-gray-500'}`}>
              {label}
            </div>
          )
        })}
      </div>

      {done ? (
        <div className="bg-white rounded-3xl border border-border shadow-sm p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">تم تفعيل اشتراكك بنجاح</h2>
          <p className="text-muted-foreground">
            رقم الفاتورة: <span dir="ltr" className="font-bold text-foreground">{done.invoiceNumber}</span> • المبلغ: <span className="font-bold text-foreground">{done.amount} ج.م</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onClick={() => navigate('/patient/subscription')} className="rounded-xl bg-primary px-5 py-3 text-white font-bold hover:bg-primary/90 transition-colors">
              عرض اشتراكي
            </button>
            <button onClick={() => navigate('/patient/invoices')} className="rounded-xl bg-white border border-gray-200 px-5 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              عرض الفواتير
            </button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">بيانات الفاتورة</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">طريقة الدفع</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'بطاقة بنكية' },
                  { id: 'wallet', label: 'محفظة إلكترونية' },
                  { id: 'cash', label: 'تحويل يدوي' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMethod(item.id as PaymentMethod)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                      method === item.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800 font-medium">
                هذه تجربة Mock فقط. لا يتم إجراء أي عملية دفع حقيقية.
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-bold text-center">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4 sticky top-24">
              <h2 className="text-lg font-bold text-foreground">ملخص الطلب</h2>
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-2">
                <p className="font-bold text-foreground">{plan.name}</p>
                <p className="text-sm text-gray-600">الدورة: {billingLabel}</p>
                <p className="text-2xl font-extrabold text-primary">{amount} ج.م</p>
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 flex items-start gap-2 text-xs text-primary">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                اشتراكك يُفعَّل فورًا بعد التأكيد، والفاتورة تُضاف تلقائيًا في صفحة الفواتير.
              </div>

              <button
                type="button"
                disabled={loading || !fullName.trim() || !phone.trim()}
                onClick={handleCheckout}
                className="w-full rounded-xl bg-primary text-white py-3.5 font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-4 h-4" /> تأكيد الاشتراك</>}
              </button>

              <button
                type="button"
                onClick={() => navigate('/patient/subscriptions')}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                العودة للباقات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
