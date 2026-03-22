import { useState } from 'react'
import { Video, Mic, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react'

const ADMIN_CONSULTATIONS = [
  { id: 'c1', patientName: 'نور خالد', doctorName: 'د. سارة أحمد', type: 'فيديو', date: '2026-03-18', time: '10:00', status: 'مكتملة', price: 350 },
  { id: 'c2', patientName: 'ياسمين سامي', doctorName: 'د. منى حسين', type: 'صوت', date: '2026-03-18', time: '11:30', status: 'قادمة', price: 300 },
  { id: 'c3', patientName: 'دينا وليد', doctorName: 'د. هبة علي', type: 'نص', date: '2026-03-17', time: '14:00', status: 'مكتملة', price: 250 },
  { id: 'c4', patientName: 'ريهام طارق', doctorName: 'د. سارة أحمد', type: 'فيديو', date: '2026-03-17', time: '16:00', status: 'ملغاة', price: 350 },
  { id: 'c5', patientName: 'لمياء عمر', doctorName: 'د. نادية حسن', type: 'صوت', date: '2026-03-16', time: '09:00', status: 'مكتملة', price: 380 },
  { id: 'c6', patientName: 'سمر فؤاد', doctorName: 'د. هبة علي', type: 'نص', date: '2026-03-16', time: '13:00', status: 'مكتملة', price: 250 },
  { id: 'c7', patientName: 'هنا كريم', doctorName: 'د. ليلى مصطفى', type: 'فيديو', date: '2026-03-19', time: '15:00', status: 'قادمة', price: 400 },
]

const STATUS_COLORS: Record<string, string> = {
  'مكتملة': 'bg-green-100 text-green-700',
  'قادمة': 'bg-blue-100 text-blue-700',
  'ملغاة': 'bg-red-100 text-red-700',
  'معلقة': 'bg-yellow-100 text-yellow-700',
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'فيديو': <Video className="w-4 h-4" />,
  'صوت': <Mic className="w-4 h-4" />,
  'نص': <MessageSquare className="w-4 h-4" />,
}

const TABS = ['الكل', 'مكتملة', 'قادمة', 'ملغاة']

export default function AdminConsultations() {
  const [tab, setTab] = useState('الكل')
  const [search, setSearch] = useState('')

  const filtered = ADMIN_CONSULTATIONS.filter(c => {
    const matchTab = tab === 'الكل' || c.status === tab
    const matchSearch = !search || c.patientName.includes(search) || c.doctorName.includes(search)
    return matchTab && matchSearch
  })

  const total = ADMIN_CONSULTATIONS.length
  const completed = ADMIN_CONSULTATIONS.filter(c => c.status === 'مكتملة').length
  const totalRevenue = ADMIN_CONSULTATIONS.filter(c => c.status === 'مكتملة').reduce((sum, c) => sum + c.price, 0)

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إدارة الاستشارات</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">{total}</p>
          <p className="text-sm text-muted-foreground">إجمالي الاستشارات</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">{completed}</p>
          <p className="text-sm text-muted-foreground">مكتملة</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <XCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">{totalRevenue.toLocaleString()} ج.م</p>
          <p className="text-sm text-muted-foreground">الإيرادات</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="ابحث عن مريضة أو طبيب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="flex gap-2 flex-wrap">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">المريضة</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">الطبيب</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">النوع</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">التاريخ</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">السعر</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground">{c.patientName}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.doctorName}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      {TYPE_ICONS[c.type]} {c.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{c.date} — {c.time}</td>
                  <td className="py-3 px-4 font-bold text-foreground">{c.price} ج.م</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">لا توجد نتائج</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
