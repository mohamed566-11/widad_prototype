import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const USER_GROWTH = [
  { month: 'أكتوبر', users: 1200, doctors: 18 },
  { month: 'نوفمبر', users: 2100, doctors: 24 },
  { month: 'ديسمبر', users: 3800, doctors: 31 },
  { month: 'يناير', users: 6200, doctors: 45 },
  { month: 'فبراير', users: 9800, doctors: 67 },
  { month: 'مارس', users: 15420, doctors: 89 },
];

const LIFE_STAGE = [
  { stage: 'قبل الزواج', users: 4200, percent: 27, color: '#EC4899' },
  { stage: 'مرحلة الزواج', users: 7100, percent: 46, color: '#8B5CF6' },
  { stage: 'بعد الجواز', users: 4120, percent: 27, color: '#14B8A6' },
];

const PLAN_BREAKDOWN = [
  { plan: 'Basic', count: 8900, revenue: 0 },
  { plan: 'Plus', count: 4200, revenue: 625800 },
  { plan: 'Pro', count: 2100, revenue: 627900 },
  { plan: 'Pro+', count: 890, revenue: 399610 },
];

const TOP_SPECIALTIES = [
  { name: 'أمراض النساء', consultations: 3240 },
  { name: 'طب الأطفال', consultations: 1890 },
  { name: 'التغذية', consultations: 1560 },
  { name: 'الصحة النفسية', consultations: 980 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">تحليلات المنصة</h1>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-primary font-medium text-sm">
          <option>آخر 6 شهور</option>
          <option>سنة 2026</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">نمو المستخدمين والأطباء</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={USER_GROWTH} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 6px 20px rgba(0,0,0,.08)' }} />
                <Line type="monotone" dataKey="users" stroke="#EC4899" strokeWidth={3} dot={{ r: 5 }} name="المستخدمات" />
                <Line type="monotone" dataKey="doctors" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} name="الأطباء" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">توزيع المراحل الحياتية</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={LIFE_STAGE} dataKey="users" nameKey="stage" cx="50%" cy="50%" outerRadius={110} label>
                  {LIFE_STAGE.map((entry) => (
                    <Cell key={entry.stage} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">الخطط والإيراد</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLAN_BREAKDOWN} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="plan" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="عدد المشتركين" />
                <Bar yAxisId="right" dataKey="revenue" fill="#EC4899" radius={[8, 8, 0, 0]} name="الإيراد" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">أعلى التخصصات</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={TOP_SPECIALTIES} margin={{ top: 10, right: 10, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={90} />
                <Tooltip />
                <Bar dataKey="consultations" fill="#14B8A6" radius={[0, 8, 8, 0]} name="الاستشارات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص سريع</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-bold mb-1">إجمالي رسائل AI</p>
            <p className="text-2xl font-black text-gray-900">145k</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-bold mb-1">نسبة حل البلاغات</p>
            <p className="text-2xl font-black text-green-600">98%</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-bold mb-1">متوسط زمن الاستجابة</p>
            <p className="text-2xl font-black text-primary">8 دقائق</p>
          </div>
        </div>
      </div>
    </div>
  );
}