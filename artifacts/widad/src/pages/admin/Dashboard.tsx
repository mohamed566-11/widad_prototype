import { useAuthStore } from '@/store/auth.store';
import { Users, Stethoscope, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  if (!user || !user.mockData.overview) return null;

  const stats = user.mockData.overview;
  const chartData = user.mockData.revenueChart;

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">لوحة التحكم الإدارية</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-pink-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">إجمالي المستخدمات</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">+{stats.newUsersToday} اليوم</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Stethoscope className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">الأطباء المعتمدين</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-gray-900">{stats.totalDoctors}</h3>
            {stats.pendingDoctors > 0 && (
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-1">{stats.pendingDoctors} في الانتظار</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">إيرادات الشهر</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-gray-900">{stats.monthlyRevenue.toLocaleString()}</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">{stats.revenueGrowth}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">الاشتراكات النشطة</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.activeSubscriptions.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">نمو الإيرادات</h3>
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

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h3 className="font-bold text-orange-900 text-lg">تنبيهات النظام</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-orange-200/50 hover:border-orange-300 transition-colors">
                <span className="font-bold text-gray-700">أطباء في الانتظار</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm font-black">{stats.pendingDoctors}</span>
              </button>
              <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-orange-200/50 hover:border-orange-300 transition-colors">
                <span className="font-bold text-gray-700">بلاغات المجتمع</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm font-black">{stats.communityReports}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}