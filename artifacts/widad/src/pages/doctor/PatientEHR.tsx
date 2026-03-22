import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '@/mock/data/consultations';
import { ChevronLeft, User, Activity, Calendar, FileText, Plus, AlertCircle } from 'lucide-react';

export default function PatientEHR() {
  const { id } = useParams();
  const patient = MOCK_PATIENTS.find(p => p.id === id) || MOCK_PATIENTS[0];
  const [activeTab, setActiveTab] = useState<'basic' | 'medical' | 'visits' | 'notes'>('basic');

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Link to="/doctor/patients" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm mb-4">
        <ChevronLeft className="w-4 h-4" />
        عودة لقائمة المريضات
      </Link>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <img src={patient.avatar} alt={patient.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" />
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{patient.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">العمر: {patient.age} سنة</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{patient.diagnosis}</span>
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-colors">
          حجز موعد
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {[
          { id: 'basic', label: 'المعلومات الأساسية', icon: User },
          { id: 'medical', label: 'السجل الطبي', icon: Activity },
          { id: 'visits', label: 'الزيارات السابقة', icon: Calendar },
          { id: 'notes', label: 'ملاحظاتي', icon: FileText }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border min-h-[400px]">
        {activeTab === 'basic' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">رقم الهاتف</p>
                <p className="font-medium text-lg" dir="ltr">+20 100 123 4567</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">فصيلة الدم</p>
                <p className="font-medium text-lg text-primary font-bold">O+</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">تاريخ الميلاد</p>
                <p className="font-medium text-lg">15 مايو 1998</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">الحالة الاجتماعية</p>
                <p className="font-medium text-lg">متزوجة</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                الحساسية
              </h3>
              <div className="flex gap-2">
                <span className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-sm font-bold border border-red-100">البنسلين</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <Activity className="w-5 h-5 text-blue-500" />
                الأمراض المزمنة
              </h3>
              <p className="text-gray-600 font-medium">لا يوجد أمراض مزمنة مسجلة.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <FileText className="w-5 h-5 text-green-500" />
                الأدوية الحالية
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium">
                <li>فيتامينات متعددة للحمل (مرة يومياً)</li>
                <li>حديد (مرة يومياً)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">متابعة شهرية</h4>
                  <span className="text-sm font-bold text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                    {i === 1 ? '10 مارس 2026' : '10 فبراير 2026'}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">المريضة بصحة جيدة. تم قياس الضغط والوزن وهما في المعدلات الطبيعية. الجنين ينمو بشكل سليم حسب السونار.</p>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                  <span className="font-bold text-gray-600">الوصفة الطبية:</span>
                  <span className="text-gray-800 mr-2">تجديد نفس الفيتامينات</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <button className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors">
              <Plus className="w-4 h-4" />
              إضافة ملاحظة جديدة
            </button>
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
              <p className="text-sm text-yellow-800 font-bold mb-2">10 مارس 2026</p>
              <p className="text-yellow-900 leading-relaxed">المريضة تعاني من قلق بسيط بخصوص الولادة. يجب طمأنتها في الزيارة القادمة وتوضيح خطوات الولادة بالتفصيل.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}