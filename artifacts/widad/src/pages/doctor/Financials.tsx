import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ArrowUpRight, Wallet } from 'lucide-react';

const MOCK_REVENUE = [
  { name: 'أكتوبر', amount: 8500 },
  { name: 'نوفمبر', amount: 10200 },
  { name: 'ديسمبر', amount: 9800 },
  { name: 'يناير', amount: 11500 },
  { name: 'فبراير', amount: 12000 },
  { name: 'مارس', amount: 12500 },
];

export default function DoctorFinancials() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">الأرباح والماليات</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-8 text-white shadow-lg shadow-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <DollarSign className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <p className="text-green-100 font-bold mb-2">الرصيد المتاح للسحب</p>
            <div className="text-4xl font-black mb-4">4,500 <span className="text-xl">ج.م</span></div>
            <button className="bg-white text-green-600 font-bold px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors w-full shadow-sm">
              طلب سحب الأرباح
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Wallet className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold">أرباح هذا الشهر</h3>
          </div>
          <p className="text-3xl font-black text-gray-900 mb-2">12,500 <span className="text-base text-gray-500 font-medium">ج.م</span></p>
          <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg w-fit">
            <ArrowUpRight className="w-4 h-4" />
            +4.1% عن الشهر الماضي
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border flex flex-col justify-center">
          <h3 className="font-bold text-gray-500 mb-4">ملخص الاستشارات (مارس)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">استشارات فيديو</span>
              <span className="font-black text-gray-900">8,500 ج.م</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">استشارات صوتية</span>
              <span className="font-black text-gray-900">2,400 ج.م</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">محادثات نصية</span>
              <span className="font-black text-gray-900">1,600 ج.م</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">سجل الأرباح آخر 6 شهور</h3>
        <div className="h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_REVENUE} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val/1000}k`} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} ج.م`, 'الأرباح']}
              />
              <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}