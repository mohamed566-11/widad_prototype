import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '@/store/auth.store';
import { Download } from 'lucide-react';

const PLAN_DIST = [
  { name: 'وداد Basic', value: 45 },
  { name: 'وداد Plus', value: 30 },
  { name: 'وداد Pro', value: 15 },
  { name: 'وداد Pro+', value: 10 },
];
const COLORS = ['#6B7280', '#EC4899', '#8B5CF6', '#F59E0B'];

export default function AdminFinancial() {
  const { user } = useAuthStore();
  const chartData = user?.mockData?.overview?.revenueChart || [];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">التقارير المالية</h1>
        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          تصدير تقرير
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">الإيرادات (آخر 6 شهور)</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value.toLocaleString()} ج.م`, 'الإيرادات']}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-6">توزيع الباقات المباعة</h3>
          <div className="flex-1 relative min-h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLAN_DIST} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {PLAN_DIST.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'النسبة']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {PLAN_DIST.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}