import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_DOCTORS } from '@/mock/data/doctors';
import { Calendar, Clock, Video, Phone, MessageSquare, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const DATES = [
  { date: '2026-03-20', label: 'الجمعة، 20 مارس' },
  { date: '2026-03-21', label: 'السبت، 21 مارس' },
  { date: '2026-03-22', label: 'الأحد، 22 مارس' },
];

const TIMES = ['10:00 ص', '10:30 ص', '11:00 ص', '01:00 م', '02:30 م', '04:00 م'];

export default function BookConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0];
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(DATES[0].date);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('فيديو');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/patient/consultations');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white rounded-3xl p-10 shadow-xl border border-border text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">تم الحجز بنجاح!</h2>
        <p className="text-gray-500 mb-8">تم تأكيد موعدك مع {doctor.name}. سيتم تحويلك لصفحة الاستشارات...</p>
        <div className="bg-gray-50 rounded-2xl p-4 text-sm font-bold text-gray-700">
          <p>{DATES.find(d => d.date === selectedDate)?.label} — {selectedTime}</p>
          <p className="text-primary mt-1">استشارة {selectedType}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Progress Bar */}
      <div className="flex items-center justify-between relative mb-12">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-100 -z-10 rounded-full"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 border-white shadow-sm ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            {i}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          
          {step === 1 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border animate-in fade-in slide-in-from-right-8 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                اختيار الموعد
              </h2>
              
              <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar mb-6">
                {DATES.map(d => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${selectedDate === d.date ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                الأوقات المتاحة
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {TIMES.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${selectedTime === t ? 'border-primary bg-primary text-white shadow-md shadow-primary/20' : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-primary/30'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  disabled={!selectedTime}
                  onClick={() => setStep(2)}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  التالي
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border animate-in fade-in slide-in-from-right-8 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">نوع الاستشارة</h2>
              
              <div className="space-y-4">
                <button onClick={() => setSelectedType('فيديو')} className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${selectedType === 'فيديو' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedType === 'فيديو' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">استشارة فيديو</h3>
                    <p className="text-sm text-gray-500">مكالمة فيديو مباشرة مع الطبيب عبر التطبيق</p>
                  </div>
                </button>
                
                <button onClick={() => setSelectedType('صوت')} className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${selectedType === 'صوت' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedType === 'صوت' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">مكالمة صوتية</h3>
                    <p className="text-sm text-gray-500">مكالمة صوتية فقط عبر التطبيق</p>
                  </div>
                </button>

                <button onClick={() => setSelectedType('نص')} className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${selectedType === 'نص' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedType === 'نص' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">محادثة نصية</h3>
                    <p className="text-sm text-gray-500">دردشة نصية مفتوحة لمدة 24 ساعة</p>
                  </div>
                </button>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="text-gray-500 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  رجوع
                </button>
                <button onClick={() => setStep(3)} className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  التالي
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border animate-in fade-in slide-in-from-right-8 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">تفاصيل إضافية للطببيب (اختياري)</h2>
              <textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="صفي باختصار سبب الاستشارة أو أي أعراض تشعرين بها..."
                className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary resize-none mb-8"
              />

              <h3 className="font-bold text-gray-900 mb-4">طريقة الدفع</h3>
              <div className="p-4 border-2 border-primary bg-primary/5 rounded-2xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-bold italic">VISA</div>
                  <span className="font-bold">البطاقة الائتمانية (**** 1234)</span>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-primary"></div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(2)} className="text-gray-500 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  رجوع
                </button>
                <button onClick={handleConfirm} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/25 hover:bg-green-600 transition-colors">
                  تأكيد ودفع {doctor.price} ج.م
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Summary Sidebar */}
        <div className="bg-gray-50 rounded-3xl p-6 border border-border h-fit">
          <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">ملخص الحجز</h3>
          
          <div className="flex items-center gap-3 mb-6">
            <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&auto=format&q=80&seed=${doctor.id}`} className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white" />
            <div>
              <p className="font-bold text-gray-900">{doctor.name}</p>
              <p className="text-xs text-primary font-bold">{doctor.specialty}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">الموعد:</span>
              <span className="font-bold text-gray-900">{selectedTime ? `${DATES.find(d => d.date === selectedDate)?.label} - ${selectedTime}` : '-'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">النوع:</span>
              <span className="font-bold text-gray-900">استشارة {selectedType}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-900">الإجمالي:</span>
            <span className="text-2xl font-black text-gray-900">{doctor.price} <span className="text-xs font-medium text-gray-500">ج.م</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}