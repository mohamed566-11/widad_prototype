import { MOCK_FERTILITY_DATA } from '@/mock/data/trackers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Sprout, Info, Heart } from 'lucide-react';

export default function FertilityTracker() {
  const data = MOCK_FERTILITY_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">متتبع الخصوبة</h1>

      {/* Ovulation Status */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl p-8 text-white shadow-xl shadow-green-500/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sprout className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <p className="text-green-100 font-bold mb-2">اليوم في دورتك</p>
          <div className="text-5xl font-black mb-2">اليوم {data.cycleDay}</div>
          <p className="text-xl font-bold bg-white/20 inline-block px-6 py-2 rounded-full backdrop-blur-sm mt-4">
            فرصة الحمل: عالية جداً 🌟
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border flex flex-col justify-center">
          <h3 className="font-bold text-gray-500 mb-2">نافذة الخصوبة</h3>
          <p className="text-2xl font-black text-gray-900">{new Date(data.fertilityWindow.start).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})} - {new Date(data.fertilityWindow.end).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})}</p>
          <div className="mt-4 flex gap-1">
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i >= 2 && i <= 6 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border flex flex-col justify-center">
          <h3 className="font-bold text-gray-500 mb-2">يوم التبويض المتوقع</h3>
          <p className="text-2xl font-black text-primary">{new Date(data.ovulationDay).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long'})}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
            <Heart className="w-4 h-4 text-pink-500" />
            يفضل العلاقة الزوجية في هذا اليوم والأيام التي تسبقه
          </div>
        </div>
      </div>

      {/* BBT Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">درجة حرارة الجسم الأساسية (BBT)</h3>
          <button className="text-primary bg-primary/10 p-2 rounded-full">
            <Info className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-6">ارتفاع درجة الحرارة يؤكد حدوث التبويض.</p>
        
        <div className="h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.bbtData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis domain={[36.0, 37.5]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value}°C`, 'درجة الحرارة']}
              />
              <ReferenceLine y={36.4} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'خط الأساس', fill: '#EF4444', fontSize: 12 }} />
              <Area type="monotone" dataKey="temp" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}