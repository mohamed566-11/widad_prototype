import { useParams, Link } from 'react-router-dom';
import { MOCK_CONSULTATIONS } from '@/mock/data/consultations';
import { Calendar, Clock, Video, FileText, ChevronLeft, AlertCircle } from 'lucide-react';

export default function ConsultationDetail() {
  const { id } = useParams();
  const consultation = MOCK_CONSULTATIONS.find(c => c.id === id) || MOCK_CONSULTATIONS[0];

  const isUpcoming = consultation.status === 'upcoming';
  const isCompleted = consultation.status === 'completed';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <Link to="/patient/consultations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm">
        <ChevronLeft className="w-4 h-4" />
        عودة للاستشارات
      </Link>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <img src={consultation.doctorAvatar} alt={consultation.doctorName} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{consultation.doctorName}</h1>
              <p className="text-primary font-medium">{consultation.doctorSpecialty}</p>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
            isUpcoming ? 'bg-primary/10 text-primary border-primary/20' :
            isCompleted ? 'bg-green-50 text-green-600 border-green-200' :
            'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {isUpcoming ? 'مؤكدة' : isCompleted ? 'مكتملة' : 'حالة أخرى'}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="font-bold text-sm">التاريخ</span>
            </div>
            <p className="font-bold text-gray-900">{new Date(consultation.date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Clock className="w-4 h-4" />
              <span className="font-bold text-sm">الوقت</span>
            </div>
            <p className="font-bold text-gray-900">{consultation.time}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Video className="w-4 h-4" />
              <span className="font-bold text-sm">النوع</span>
            </div>
            <p className="font-bold text-gray-900">استشارة {consultation.type}</p>
          </div>
        </div>

        {isUpcoming && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">رابط الاستشارة</h3>
            <p className="text-gray-500 text-sm mb-6">سيتم تفعيل الزر قبل الموعد بـ 10 دقائق</p>
            <button className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors w-full sm:w-auto">
              الانضمام للمكالمة
            </button>
          </div>
        )}

        {isCompleted && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                ملاحظات الطبيب
              </h3>
              <div className="bg-yellow-50/50 border border-yellow-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                {consultation.notes || 'لا توجد ملاحظات مسجلة.'}
              </div>
            </div>

            {consultation.prescription && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  الوصفة الطبية (الروشتة)
                </h3>
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
                  <p className="font-bold text-gray-800 mb-4">{consultation.prescription}</p>
                  <button className="text-primary font-bold text-sm hover:underline">تحميل كـ PDF</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}