import { MOCK_PERIOD_DATA } from '@/mock/data/trackers';
import { CalendarDays, Droplet, Sprout, AlertCircle } from 'lucide-react';

export default function PeriodTracker() {
  const data = MOCK_PERIOD_DATA;
  
  // Calculate days until next period
  const today = new Date();
  const nextDate = new Date(data.nextPeriodExpected);
  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">متتبع الدورة الشهرية</h1>

      {/* Main Status */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-3xl p-8 text-white shadow-xl shadow-pink-500/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Droplet className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <p className="text-pink-100 font-bold mb-2">الدورة القادمة متوقعة بعد</p>
          <div className="text-6xl md:text-7xl font-black mb-4">{diffDays} <span className="text-2xl font-bold">أيام</span></div>
          <p className="text-lg font-medium bg-white/20 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
            {new Date(data.nextPeriodExpected).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold">طول الدورة</h3>
          </div>
          <p className="text-3xl font-black text-gray-900">{data.cycleLength} <span className="text-base text-gray-500 font-medium">يوم</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <Droplet className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold">فترة الحيض</h3>
          </div>
          <p className="text-3xl font-black text-gray-900">{data.periodLength} <span className="text-base text-gray-500 font-medium">أيام</span></p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <Sprout className="w-5 h-5 text-green-500" />
            <h3 className="font-bold">نافذة الخصوبة</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">12 - 17 مارس</p>
          <p className="text-sm font-medium text-green-600 mt-1">احتمالية حمل عالية</p>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">سجل الدورات السابقة</h3>
        <div className="space-y-4">
          {data.history.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                  <Droplet className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{new Date(h.start).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })} - {new Date(h.end).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-500">{h.cycleLength} يوم دورة</p>
                </div>
              </div>
              {h.cycleLength !== 28 && (
                <div className="text-orange-500" title="تغير في طول الدورة">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}