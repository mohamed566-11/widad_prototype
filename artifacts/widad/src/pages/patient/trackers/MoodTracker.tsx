import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_MOOD_DATA } from '@/mock/data/trackers';

const MOODS = [
  { value: 1, emoji: '😢', label: 'حزينة جداً', color: 'bg-red-100 text-red-600 border-red-200' },
  { value: 2, emoji: '😞', label: 'مكتئبة', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { value: 3, emoji: '😐', label: 'عادية', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { value: 4, emoji: '😊', label: 'جيدة', color: 'bg-green-100 text-green-600 border-green-200' },
  { value: 5, emoji: '😄', label: 'سعيدة جداً', color: 'bg-teal-100 text-teal-600 border-teal-200' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">متتبع المزاج</h1>
        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-orange-100">
          🔥 5 أيام متتالية
        </div>
      </div>

      {/* Log Today */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">كيف تشعرين اليوم؟</h2>
        
        <div className="flex justify-center gap-3 md:gap-6 mb-8 flex-wrap">
          {MOODS.map(m => (
            <button
              key={m.value}
              onClick={() => setSelectedMood(m.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${selectedMood === m.value ? m.color + ' scale-110 shadow-md' : 'bg-gray-50 border-transparent hover:bg-gray-100 grayscale hover:grayscale-0'}`}
            >
              <span className="text-4xl">{m.emoji}</span>
              <span className="text-xs font-bold">{m.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="هل تريدين إضافة ملاحظة؟ (اختياري)"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary resize-none h-24 mb-4"
            />
            <button 
              onClick={handleSave}
              className={`w-full font-bold py-3.5 rounded-xl transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'}`}
            >
              {isSaved ? 'تم الحفظ بنجاح! ✅' : 'حفظ المزاج'}
            </button>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <h3 className="text-xl font-bold text-gray-900 mb-6">تاريخ المزاج (آخر 30 يوم)</h3>
        <div className="h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_MOOD_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => MOODS.find(m => m.value === val)?.emoji || ''} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [MOODS.find(m => m.value === value)?.label, 'المزاج']}
              />
              <Line type="monotone" dataKey="mood" stroke="#8B5CF6" strokeWidth={4} dot={{ r: 6, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}