// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Elevated the Admin Dashboard with frosted glass panels, an animated header, and clean Recharts integration.

import { useAuthStore } from '@/store/auth.store';
import { Users, Stethoscope, DollarSign, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, customEase } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  if (!user || !user.mockData.overview) return null;

  const stats = user.mockData.overview;
  const chartData = user.mockData.revenueChart;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header Hero */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-sm border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <m.div variants={fadeUpVariant} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-primary/20">
              <ShieldCheck className="w-4 h-4" />
              صلاحيات الإدارة
            </m.div>
            <m.h1 variants={fadeUpVariant} className="text-3xl md:text-5xl font-black font-display text-foreground mb-2">لوحة التحكم المركزية</m.h1>
            <m.p variants={fadeUpVariant} className="text-muted-foreground text-lg font-medium">نظرة شاملة على أداء منصة وداد والمؤشرات الحيوية.</m.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-pink-500/30 transition-all duration-300 hover:shadow-glass relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-pink-500/20" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-pink-500/20">
                <Users className="w-7 h-7 text-pink-500" />
              </div>
              <p className="text-muted-foreground font-bold text-sm mb-2">إجمالي المستخدمات</p>
              <div className="flex flex-wrap items-end gap-2">
                <h3 className="text-3xl font-black font-display text-foreground">{stats.totalUsers.toLocaleString()}</h3>
                <span className="text-xs font-bold font-display text-green-600 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md mb-1 animate-pulse">+{stats.newUsersToday} اليوم</span>
              </div>
            </div>
          </m.div>

          <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-blue-500/30 transition-all duration-300 hover:shadow-glass relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-blue-500/20" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-blue-500/20">
                <Stethoscope className="w-7 h-7 text-blue-500" />
              </div>
              <p className="text-muted-foreground font-bold text-sm mb-2">الأطباء المعتمدين</p>
              <div className="flex flex-wrap items-end gap-2">
                <h3 className="text-3xl font-black font-display text-foreground">{stats.totalDoctors}</h3>
                {stats.pendingDoctors > 0 && (
                  <span className="text-xs font-bold font-display text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded-md mb-1">{stats.pendingDoctors} في الانتظار</span>
                )}
              </div>
            </div>
          </m.div>

          <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-green-500/30 transition-all duration-300 hover:shadow-glass relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-green-500/20" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-green-500/20">
                <DollarSign className="w-7 h-7 text-green-500" />
              </div>
              <p className="text-muted-foreground font-bold text-sm mb-2">إيرادات الشهر</p>
              <div className="flex flex-wrap items-end gap-2">
                <h3 className="text-3xl font-black font-display text-foreground">{stats.monthlyRevenue.toLocaleString()}</h3>
                <span className="text-xs font-bold font-display text-green-600 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md mb-1">{stats.revenueGrowth}</span>
              </div>
            </div>
          </m.div>

          <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group hover:border-purple-500/30 transition-all duration-300 hover:shadow-glass relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-purple-500/20" />
             <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-purple-500/20">
                  <Activity className="w-7 h-7 text-purple-500" />
                </div>
                <p className="text-muted-foreground font-bold text-sm mb-2">الاشتراكات النشطة</p>
                <h3 className="text-3xl font-black font-display text-foreground">{stats.activeSubscriptions.toLocaleString()}</h3>
             </div>
          </m.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Chart */}
          <m.div variants={fadeUpVariant} className="lg:col-span-2 glass-panel rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-black font-display text-foreground mb-8">نمو الإيرادات السنوي</h3>
            <div className="h-[350px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold', fontFamily: 'var(--font-display)' }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 'bold' }} dx={-15} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--primary) / 0.05)' }}
                    contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-glass)', color: 'hsl(var(--foreground))', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
                    formatter={(value: number) => [`${value.toLocaleString()} ج.م`, 'الإيرادات']}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 4, 4]} maxBarSize={40} className="hover:opacity-80 transition-opacity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </m.div>

          {/* Quick Actions */}
          <m.div variants={fadeUpVariant} className="space-y-6">
            <div className="bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden h-full shadow-sm">
              <div className="absolute top-0 left-0 w-32 h-32 bg-warning/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <h3 className="font-black font-display text-foreground text-2xl">تنبيهات النظام</h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                <button className="w-full glass-card p-5 rounded-[1.5rem] flex items-center justify-between shadow-sm border border-warning/30 hover:shadow-[var(--shadow-glow)] hover:border-warning/50 hover:-translate-y-1 transition-all group">
                  <span className="font-bold font-display text-foreground group-hover:text-warning transition-colors">عضويات أطباء في الانتظار</span>
                  <span className="bg-warning text-warning-foreground px-3 py-1.5 rounded-xl text-sm font-black shadow-sm">{stats.pendingDoctors}</span>
                </button>
                <button className="w-full glass-card p-5 rounded-[1.5rem] flex items-center justify-between shadow-sm border border-warning/30 hover:shadow-[var(--shadow-glow)] hover:border-warning/50 hover:-translate-y-1 transition-all group">
                  <span className="font-bold font-display text-foreground group-hover:text-warning transition-colors">بلاغات مجتمعية جديدة</span>
                  <span className="bg-warning text-warning-foreground px-3 py-1.5 rounded-xl text-sm font-black shadow-sm flex items-center gap-2">
                    {stats.communityReports}
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </span>
                </button>
              </div>
            </div>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
}