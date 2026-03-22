import { useState } from 'react';
import { MOCK_DOCTOR_CONSULTATIONS } from '@/mock/data/consultations';
import { Calendar, Clock, Video, Phone, MessageSquare, Check, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DoctorConsultations() {
  const [activeTab, setActiveTab] = useState<'pending' | 'upcoming' | 'completed' | 'cancelled'>('pending');

  const filtered = MOCK_DOCTOR_CONSULTATIONS.filter(c => c.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">الاستشارات</h1>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {[
          { id: 'pending', label: 'طلبات معلقة' },
          { id: 'upcoming', label: 'القادمة' },
          { id: 'completed', label: 'المكتملة' },
          { id: 'cancelled', label: 'الملغاة' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(consultation => (
          <div key={consultation.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={consultation.patientAvatar} alt={consultation.patientName} className="w-14 h-14 rounded-full object-cover border-2 border-gray-50" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{consultation.patientName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(consultation.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {consultation.time}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${
                consultation.type === 'فيديو' ? 'bg-blue-50 text-blue-700' :
                consultation.type === 'صوت' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'
              }`}>
                {consultation.type === 'فيديو' && <Video className="w-3.5 h-3.5" />}
                {consultation.type === 'صوت' && <Phone className="w-3.5 h-3.5" />}
                {consultation.type === 'نص' && <MessageSquare className="w-3.5 h-3.5" />}
                {consultation.type}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl mb-6 flex-1">
              <p className="text-sm font-bold text-gray-600 mb-1">سبب الاستشارة:</p>
              <p className="text-gray-800">{consultation.notes || 'لم يتم ذكر تفاصيل إضافية.'}</p>
            </div>

            {activeTab === 'pending' ? (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
                  <Check className="w-5 h-5" />
                  قبول
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                  <X className="w-5 h-5" />
                  رفض
                </button>
              </div>
            ) : activeTab === 'upcoming' ? (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm">
                  دخول للاستشارة
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Link to={`/doctor/patients/`} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                  ملف المريضة
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا توجد استشارات في هذا القسم</h3>
          </div>
        )}
      </div>
    </div>
  );
}