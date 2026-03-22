import { useAuthStore } from '@/store/auth.store';
import { Link } from 'react-router-dom';
import { Users, Calendar, Star, DollarSign, Clock, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  if (!user.isApproved) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">حسابك قيد المراجعة</h1>
        <p className="text-lg text-gray-600 mb-8">{user.mockData.message}</p>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border text-right">
          <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">حالة المستندات</h3>
          <div className="space-y-4">
            {user.mockData.submittedDocs.map((doc: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-green-700 bg-green-50 p-3 rounded-xl border border-green-100">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">{doc}</span>
              </div>
            ))}
            {user.mockData.pendingDocs.map((doc: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-orange-700 bg-orange-50 p-3 rounded-xl border border-orange-100">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{doc} (جاري التحقق)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = user.mockData.stats;
  const schedule = user.mockData.todaySchedule;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">أهلاً بك، {user.name} 👨‍⚕️</h1>
          <p className="text-muted-foreground">إليك نظرة سريعة على يومك</p>
        </div>
        {stats.pendingRequests > 0 && (
          <Link to="/doctor/consultations" className="bg-orange-50 text-orange-600 px-6 py-3 rounded-full font-bold border border-orange-200 flex items-center gap-2 hover:bg-orange-100 transition-colors">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            {stats.pendingRequests} طلبات استشارة معلقة
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">استشارات اليوم</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.consultationsToday}</h3>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">استشارات الشهر</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.consultationsMonth}</h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">التقييم العام</p>
          <h3 className="text-3xl font-black text-gray-900 flex items-end gap-1">
            {stats.rating} <span className="text-sm text-gray-400 font-medium mb-1">/ 5</span>
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-gray-500 font-bold text-sm mb-1">أرباح الشهر</p>
          <h3 className="text-3xl font-black text-gray-900 flex items-end gap-1">
            {stats.revenue.toLocaleString()} <span className="text-sm text-gray-400 font-medium mb-1">ج.م</span>
          </h3>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">جدول اليوم</h2>
          <Link to="/doctor/calendar" className="text-primary font-bold text-sm hover:underline">عرض التقويم</Link>
        </div>
        
        <div className="divide-y divide-gray-50">
          {schedule.map((apt: any, i: number) => (
            <div key={i} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-24 shrink-0 font-bold text-gray-500">
                {apt.time}
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{apt.patient}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${apt.type === 'فيديو' ? 'bg-blue-50 text-blue-700' : apt.type === 'صوت' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'}`}>
                    {apt.type}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${apt.status === 'confirmed' ? 'bg-primary/10 text-primary' : 'bg-orange-50 text-orange-600'}`}>
                    {apt.status === 'confirmed' ? 'مؤكدة' : 'قيد الانتظار'}
                  </span>
                </div>
              </div>
              
              <div className="shrink-0 flex gap-2">
                {apt.status === 'confirmed' ? (
                  <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-colors text-sm flex items-center gap-2">
                    بدء الاستشارة
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <Link to="/doctor/consultations" className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm">
                    مراجعة الطلب
                  </Link>
                )}
              </div>
            </div>
          ))}
          {schedule.length === 0 && (
            <div className="p-12 text-center text-gray-500 font-medium">
              لا توجد استشارات مجدولة لهذا اليوم.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}