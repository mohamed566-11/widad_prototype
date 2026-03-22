import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '@/mock/data/consultations';
import { Search, ChevronLeft, Activity } from 'lucide-react';

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.includes(searchTerm) || p.diagnosis.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">قائمة المريضات</h1>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو التشخيص..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map(patient => (
          <Link key={patient.id} to={`/doctor/patients/${patient.id}`} className="bg-white rounded-3xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/50 transition-all group flex flex-col h-full">
            <div className="flex items-start gap-4 mb-6">
              <img src={patient.avatar} alt={patient.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50" />
              <div>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">{patient.name}</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">{patient.age} سنة</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="bg-gray-50 p-3 rounded-xl flex items-start gap-3">
                <Activity className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">التشخيص / الحالة</p>
                  <p className="text-sm font-bold text-gray-900">{patient.diagnosis}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm px-1">
                <span className="text-gray-500 font-medium">آخر زيارة:</span>
                <span className="font-bold text-gray-900">{new Date(patient.lastVisit).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between text-primary font-bold text-sm bg-primary/5 p-3 rounded-xl">
              <span>عرض الملف الطبي</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </Link>
        ))}
        {filteredPatients.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا يوجد مريضات مطابقات للبحث</h3>
          </div>
        )}
      </div>
    </div>
  );
}