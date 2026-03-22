import { useState } from 'react';
import { PATIENT_ACCOUNTS } from '@/mock/data/accounts';
import { Search, Filter } from 'lucide-react';

export default function AdminPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = PATIENT_ACCOUNTS.filter(p => 
    p.name.includes(searchTerm) || p.email.includes(searchTerm)
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">قاعدة المريضات</h1>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث بالاسم أو البريد..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="bg-white border border-gray-200 p-2.5 rounded-xl text-gray-600 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 font-bold text-gray-600 text-sm">المريضة</th>
                <th className="p-5 font-bold text-gray-600 text-sm">المرحلة الحياتية</th>
                <th className="p-5 font-bold text-gray-600 text-sm">الباقة</th>
                <th className="p-5 font-bold text-gray-600 text-sm">رقم الهاتف</th>
                <th className="p-5 font-bold text-gray-600 text-sm text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((patient, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <img src={patient.avatar} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                      {patient.label.split('—')[0]}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      patient.plan === 'basic' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                      patient.plan === 'plus' ? 'bg-pink-50 text-pink-600 border-pink-200' :
                      patient.plan === 'pro' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                      'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                      {patient.plan.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-5 text-gray-600 text-sm font-medium" dir="ltr">{patient.phone}</td>
                  <td className="p-5 text-center">
                    <button className="text-primary font-bold text-sm hover:underline">عرض التفاصيل</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}