import { MOCK_PLANS } from '@/mock/data/subscriptions'
import { CreditCard, TrendingUp, Users, Star } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const SUBSCRIPTION_DATA = [
  { name: 'Basic', value: 8240, color: '#6B7280', revenue: 0 },
  { name: 'Plus', value: 1840, color: '#EC4899', revenue: 274160 },
  { name: 'Pro', value: 980, color: '#8B5CF6', revenue: 293020 },
  { name: 'Pro+', value: 420, color: '#F59E0B', revenue: 188580 },
]

const MOCK_RECENT = [
  { name: 'نور خالد', plan: 'Plus', date: '2026-03-18', amount: 149, status: 'مدفوع' },
  { name: 'ياسمين سامي', plan: 'Pro+', date: '2026-03-17', amount: 449, status: 'مدفوع' },
  { name: 'دينا وليد', plan: 'Pro', date: '2026-03-17', amount: 299, status: 'مدفوع' },
  { name: 'ريهام طارق', plan: 'Pro+', date: '2026-03-16', amount: 449, status: 'مدفوع' },
  { name: 'لمياء عمر', plan: 'Plus', date: '2026-03-16', amount: 149, status: 'مدفوع' },
]

export default function AdminSubscriptions() {
  const totalRevenue = SUBSCRIPTION_DATA.reduce((s, d) => s + d.revenue, 0)
  const totalPaid = SUBSCRIPTION_DATA.slice(1).reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إدارة الاشتراكات</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <CreditCard className="w-6 h-6 text-primary mb-3" />
          <p className="text-2xl font-black text-foreground">{SUBSCRIPTION_DATA.reduce((s,d)=>s+d.value,0).toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">إجمالي المشتركات</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <Users className="w-6 h-6 text-green-500 mb-3" />
          <p className="text-2xl font-black text-foreground">{totalPaid.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">اشتراكات مدفوعة</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <TrendingUp className="w-6 h-6 text-blue-500 mb-3" />
          <p className="text-2xl font-black text-foreground">{(totalRevenue/1000).toFixed(0)}K ج.م</p>
          <p className="text-sm text-muted-foreground">إيرادات الاشتراكات</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <Star className="w-6 h-6 text-yellow-500 mb-3" />
          <p className="text-2xl font-black text-foreground">{SUBSCRIPTION_DATA[3].value}</p>
          <p className="text-sm text-muted-foreground">مشتركات Pro+</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">توزيع الاشتراكات</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={SUBSCRIPTION_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {SUBSCRIPTION_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v.toLocaleString()} مشتركة`, '']} />
              <Legend formatter={(v) => v} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4">الباقات</h2>
          <div className="space-y-3">
            {MOCK_PLANS.map((plan, i) => {
              const d = SUBSCRIPTION_DATA[i]
              return (
                <div key={plan.id} className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="font-bold text-sm text-foreground">{plan.name}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-foreground">{d.value.toLocaleString()} مشتركة</p>
                    <p className="text-xs text-muted-foreground">{plan.isFree ? 'مجاني' : `${plan.monthlyPrice} ج.م/شهر`}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">أحدث الاشتراكات</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-2 px-4 text-muted-foreground font-bold">المستخدمة</th>
                <th className="text-right py-2 px-4 text-muted-foreground font-bold">الباقة</th>
                <th className="text-right py-2 px-4 text-muted-foreground font-bold">التاريخ</th>
                <th className="text-right py-2 px-4 text-muted-foreground font-bold">المبلغ</th>
                <th className="text-right py-2 px-4 text-muted-foreground font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_RECENT.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-bold text-foreground">{r.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.plan}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.date}</td>
                  <td className="py-3 px-4 font-bold text-foreground">{r.amount} ج.م</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
