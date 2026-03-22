import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CONSULTATIONS } from '@/mock/data/consultations';
import { Calendar, Clock, Video, Phone, MessageSquare, ChevronLeft } from 'lucide-react';

export default function ConsultationsList() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filtered = MOCK_CONSULTATIONS.filter(c => 
    activeTab === 'upcoming' ? c.status === 'upcoming' || c.status === 'pending' : c.status === activeTab
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">استشاراتي</h1>
        <Link to="/patient/doctors" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-colors text-center">
          حجز استشارة جديدة
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {[
          { id: 'upcoming', label: 'القادمة' },
          { id: 'completed', label: 'المكتملة' },
          { id: 'cancelled', label: 'الملغاة' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(consultation => (
          <div key={consultation.id} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-border flex flex-col md:flex-row gap-6 md:items-center group hover:shadow-md transition-shadow">
            
            <div className="flex items-center gap-4 flex-1">
              <img src={consultation.doctorAvatar} alt={consultation.doctorName} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{consultation.doctorName}</h3>
                <p className="text-sm text-gray-500 mb-2">{consultation.doctorSpecialty}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(consultation.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {consultation.time}
                  </span>
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
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end gap-4 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 md:pr-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                consultation.status === 'upcoming' ? 'bg-primary/10 text-primary border-primary/20' :
                consultation.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                consultation.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' :
                'bg-red-50 text-red-600 border-red-200'
              }`}>
                {consultation.status === 'upcoming' ? 'مؤكدة' :
                 consultation.status === 'pending' ? 'قيد الانتظار' :
                 consultation.status === 'completed' ? 'مكتملة' : 'ملغاة'}
              </span>
              
              <Link to={`/patient/consultations/${consultation.id}`} className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                التفاصيل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
            
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا توجد استشارات {activeTab === 'upcoming' ? 'قادمة' : activeTab === 'completed' ? 'مكتملة' : 'ملغاة'}</h3>
          </div>
        )}
      </div>
    </div>
  );
}