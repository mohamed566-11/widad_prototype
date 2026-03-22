import { useState } from 'react';
import { MOCK_PREGNANCY_DATA } from '@/mock/data/trackers';
import { Baby, Footprints, Calendar, Pill } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PregnancyTracker() {
  const data = MOCK_PREGNANCY_DATA;
  const [kicks, setKicks] = useState(data.kickCount.today);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleKick = () => {
    setKicks(prev => prev + 1);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">متابعة الحمل</h1>

      {/* Week Card */}
      <div className="bg-pink-50 border-2 border-pink-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-40 h-40 rounded-full bg-white shadow-xl border-4 border-pink-200 flex items-center justify-center text-7xl relative">
          🍌
          <div className="absolute -bottom-4 bg-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full border-2 border-white shadow-sm">
            {data.babyWeight}
          </div>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-3xl font-black text-pink-900 mb-2">الأسبوع {data.currentWeek}</h2>
          <p className="text-pink-700 text-xl font-bold mb-4">طفلك الآن بحجم {data.babySize}!</p>
          <p className="text-pink-800 leading-relaxed bg-white/50 p-4 rounded-2xl">
            في هذا الأسبوع، يبدأ طفلك في سماع الأصوات من حوله. حاسة التذوق تتطور أيضاً! يمكنك البدء في التحدث والغناء له.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Kick Counter */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border text-center flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">عداد حركة الجنين</h3>
          <p className="text-gray-500 text-sm mb-6">الهدف اليومي: {data.kickCount.goal} حركات</p>
          
          <button 
            onClick={handleKick}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 text-white font-bold transition-all shadow-xl ${showAnimation ? 'scale-95 bg-primary/80' : 'bg-primary hover:scale-105'}`}
          >
            <Footprints className="w-10 h-10" />
            <span className="text-3xl">{kicks}</span>
          </button>
          
          <div className="w-full bg-gray-100 h-3 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min((kicks / data.kickCount.goal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Appointments */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              المواعيد القادمة
            </h3>
            <div className="space-y-3">
              {data.appointments.map((apt, i) => (
                <div key={i} className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{apt.type}</p>
                    <p className="text-xs text-gray-500">{apt.doctor}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">
                    {new Date(apt.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-green-500" />
              الأدوية والمكملات
            </h3>
            <div className="space-y-3">
              {data.medications.map((med, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-bold text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-500">{med.dosage}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{med.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">زيادة الوزن أثناء الحمل</h3>
        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.weightHistory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} tickFormatter={(val) => `أسبوع ${val}`} />
              <YAxis domain={['dataMin - 2', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} كجم`, 'الوزن']}
                labelFormatter={(label) => `الأسبوع ${label}`}
              />
              <Line type="monotone" dataKey="weight" stroke="#EC4899" strokeWidth={4} dot={{ r: 6, fill: '#EC4899', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}