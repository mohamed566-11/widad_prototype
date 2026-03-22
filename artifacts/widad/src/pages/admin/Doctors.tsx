import { useState } from 'react';
import { DOCTOR_ACCOUNTS } from '@/mock/data/accounts';
import { Check, X, ShieldCheck, FileText } from 'lucide-react';

export default function AdminDoctors() {
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('pending');

  const filtered = DOCTOR_ACCOUNTS.filter(d => 
    activeTab === 'approved' ? d.isApproved : !d.isApproved
  );

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إدارة الأطباء</h1>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'pending' ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          طلبات الاعتماد
          {DOCTOR_ACCOUNTS.filter(d=>!d.isApproved).length > 0 && (
            <span className="bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {DOCTOR_ACCOUNTS.filter(d=>!d.isApproved).length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'approved' ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          الأطباء المعتمدون
        </button>
      </div>

      <div className="space-y-6">
        {filtered.map((doctor, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col md:flex-row gap-6 md:items-center">
            <img src={doctor.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-50 shrink-0" />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl text-gray-900">{doctor.name}</h3>
                {doctor.isApproved && <ShieldCheck className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-gray-500 font-medium mb-3">{doctor.specialty}</p>
              
              {!doctor.isApproved && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-2">المستندات المرفقة للمراجعة:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.mockData?.submittedDocs?.map((doc: string, j: number) => (
                        <a key={j} href="#" className="text-xs bg-white text-primary font-bold px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5">
                          {doc}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 flex md:flex-col gap-3">
              {!doctor.isApproved ? (
                <>
                  <button className="flex-1 md:flex-none bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> اعتماد
                  </button>
                  <button className="flex-1 md:flex-none bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> رفض
                  </button>
                </>
              ) : (
                <button className="text-gray-500 font-bold bg-gray-50 px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  تعديل الملف
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا يوجد أطباء في هذا القسم</h3>
          </div>
        )}
      </div>
    </div>
  );
}