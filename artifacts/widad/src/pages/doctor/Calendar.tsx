import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Phone, MessageSquare, Plus, Ban } from 'lucide-react';

const INITIAL_WORKING_HOURS = {
  sunday: { start: '09:00', end: '17:00', active: true },
  monday: { start: '09:00', end: '17:00', active: true },
  tuesday: { start: '09:00', end: '14:00', active: true },
  wednesday: { start: '09:00', end: '17:00', active: true },
  thursday: { start: '09:00', end: '14:00', active: true },
  friday: { start: '--:--', end: '--:--', active: false },
  saturday: { start: '--:--', end: '--:--', active: false },
};

const INITIAL_BLOCKED_DATES = [
  { date: '2026-03-25', reason: 'إجازة' },
  { date: '2026-03-26', reason: 'مؤتمر طبي' },
];

const UPCOMING = [
  { date: '2026-03-20', time: '10:00', patient: 'سارة محمد', type: 'video' },
  { date: '2026-03-20', time: '11:00', patient: 'فاطمة علي', type: 'audio' },
  { date: '2026-03-21', time: '09:00', patient: 'مروة أحمد', type: 'video' },
  { date: '2026-03-23', time: '14:00', patient: 'هناء إبراهيم', type: 'text' },
];

const DAY_LABELS: Record<string, string> = {
  sunday: 'الأحد',
  monday: 'الإثنين',
  tuesday: 'الثلاثاء',
  wednesday: 'الأربعاء',
  thursday: 'الخميس',
  friday: 'الجمعة',
  saturday: 'السبت',
};

export default function DoctorCalendar() {
  const [workingHours, setWorkingHours] = useState(INITIAL_WORKING_HOURS);
  const [blockedDates, setBlockedDates] = useState(INITIAL_BLOCKED_DATES);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [newBlockedReason, setNewBlockedReason] = useState('');

  const days = Array.from({ length: 35 });
  const today = 15;

  const blockedDaysInMonth = useMemo(() => {
    return new Set(
      blockedDates
        .filter((item) => item.date.startsWith('2026-03-'))
        .map((item) => Number(item.date.split('-')[2]))
    );
  }, [blockedDates]);

  const addBlockedDate = () => {
    if (!newBlockedDate || !newBlockedReason.trim()) return;

    if (blockedDates.some((d) => d.date === newBlockedDate)) return;

    setBlockedDates((prev) => [...prev, { date: newBlockedDate, reason: newBlockedReason.trim() }]);
    setNewBlockedDate('');
    setNewBlockedReason('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">التقويم والمواعيد</h1>
        <div className="flex gap-2">
          <button className="p-2 border border-border rounded-xl hover:bg-gray-50"><ChevronRight className="w-5 h-5" /></button>
          <button className="p-2 border border-border rounded-xl hover:bg-gray-50"><ChevronLeft className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">مارس 2026</h2>
            <div className="flex gap-4 text-sm font-bold">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> فيديو</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> صوت</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> نص</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> يوم محظور</span>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-100 text-center font-bold text-gray-500">
            {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((d) => (
              <div key={d} className="py-4 border-l border-gray-100 last:border-0">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-sm">
            {days.map((_, i) => {
              const dayNum = (i % 31) + 1;
              const isToday = dayNum === today;
              const isBlocked = blockedDaysInMonth.has(dayNum);
              const hasVideo = dayNum % 5 === 0;
              const hasAudio = dayNum % 8 === 0;
              const hasText = dayNum % 12 === 0;

              return (
                <div key={i} className={`min-h-[120px] p-2 border-l border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${isToday ? 'bg-primary/5' : ''}`}>
                  <div className={`font-bold w-8 h-8 flex items-center justify-center rounded-full mb-2 ${isToday ? 'bg-primary text-white' : 'text-gray-700'}`}>
                    {dayNum}
                  </div>

                  <div className="space-y-1">
                    {isBlocked && (
                      <div className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Ban className="w-3 h-3" /> محظور
                      </div>
                    )}
                    {!isBlocked && hasVideo && (
                      <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Video className="w-3 h-3" /> 2 موعد
                      </div>
                    )}
                    {!isBlocked && hasAudio && (
                      <div className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Phone className="w-3 h-3" /> 1 موعد
                      </div>
                    )}
                    {!isBlocked && hasText && (
                      <div className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> 3 موعد
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-border p-5">
            <h3 className="font-bold text-lg mb-4">ساعات العمل</h3>
            <div className="space-y-3">
              {Object.entries(workingHours).map(([dayKey, value]) => (
                <div key={dayKey} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-sm">{DAY_LABELS[dayKey]}</p>
                    <label className="text-xs flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value.active}
                        onChange={(e) =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [dayKey]: { ...prev[dayKey as keyof typeof prev], active: e.target.checked },
                          }))
                        }
                      />
                      متاح
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      disabled={!value.active}
                      value={value.start}
                      onChange={(e) =>
                        setWorkingHours((prev) => ({
                          ...prev,
                          [dayKey]: { ...prev[dayKey as keyof typeof prev], start: e.target.value },
                        }))
                      }
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm disabled:bg-gray-100"
                    />
                    <input
                      disabled={!value.active}
                      value={value.end}
                      onChange={(e) =>
                        setWorkingHours((prev) => ({
                          ...prev,
                          [dayKey]: { ...prev[dayKey as keyof typeof prev], end: e.target.value },
                        }))
                      }
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm disabled:bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-border p-5">
            <h3 className="font-bold text-lg mb-4">حظر يوم جديد</h3>
            <div className="space-y-2">
              <input type="date" value={newBlockedDate} onChange={(e) => setNewBlockedDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2" />
              <input value={newBlockedReason} onChange={(e) => setNewBlockedReason(e.target.value)} placeholder="سبب الحظر (إجازة، مؤتمر...)" className="w-full border border-gray-200 rounded-xl px-3 py-2" />
              <button type="button" onClick={addBlockedDate} className="w-full bg-primary text-white py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {blockedDates.map((item) => (
                <div key={item.date} className="text-sm bg-red-50 text-red-700 border border-red-100 rounded-lg px-3 py-2">
                  {item.date} - {item.reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-border p-5">
        <h3 className="font-bold text-lg mb-4">الاستشارات القادمة</h3>
        <div className="space-y-2">
          {UPCOMING.map((item, idx) => (
            <div key={`${item.date}-${item.time}-${idx}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <div>
                <p className="font-bold text-sm">{item.patient}</p>
                <p className="text-xs text-gray-500">{item.date} - {item.time}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.type === 'video' ? 'bg-blue-100 text-blue-700' : item.type === 'audio' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                {item.type === 'video' ? 'فيديو' : item.type === 'audio' ? 'صوت' : 'نص'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}