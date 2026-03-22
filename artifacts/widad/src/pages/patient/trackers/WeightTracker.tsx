import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_WEIGHT_DATA } from '@/mock/data/trackers';
import { Scale, TrendingDown, TrendingUp } from 'lucide-react';

export default function WeightTracker() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentWeight = MOCK_WEIGHT_DATA[MOCK_WEIGHT_DATA.length - 1];
  const prevWeight = MOCK_WEIGHT_DATA[MOCK_WEIGHT_DATA.length - 2];
  const diff = currentWeight.weight - prevWeight.weight;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">متتبع الوزن</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-gray-500 font-bold text-sm">الوزن الحالي</p>
          </div>
          <p className="text-3xl font-black text-gray-900">{currentWeight.weight} <span className="text-base text-gray-500 font-medium">كجم</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${diff <= 0 ? 'bg-green-100' : 'bg-orange-100'}`}>
              {diff <= 0 ? <TrendingDown className="w-5 h-5 text-green-600" /> : <TrendingUp className="w-5 h-5 text-orange-600" />}
            </div>
            <p className="text-gray-500 font-bold text-sm">التغير الأخير</p>
          </div>
          <p className={`text-2xl font-black ${diff <= 0 ? 'text-green-600' : 'text-orange-600'}`}>
            {diff > 0 ? '+' : ''}{diff.toFixed(1)} <span className="text-base font-medium">كجم</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-sm">
              BMI
            </div>
            <p className="text-gray-500 font-bold text-sm">مؤشر كتلة الجسم</p>
          </div>
          <p className="text-3xl font-black text-gray-900">{currentWeight.bmi}</p>
          <p className="text-sm font-medium text-green-600 mt-1">وزن طبيعي</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">الوزن (كجم)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" placeholder="مثال: 65" step="0.1" />
        </div>
        <div className="w-full flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">التاريخ</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
        </div>
        <button className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
          تسجيل
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">سجل الوزن</h3>
        <div className="h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_WEIGHT_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} كجم`, 'الوزن']}
              />
              <Area type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}