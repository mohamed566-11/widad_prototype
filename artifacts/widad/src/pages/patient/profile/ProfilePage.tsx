import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { User, Phone, Activity, Heart, Contact, Edit2, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'medical' | 'emergency'>('basic');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-6 left-6 p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
        >
          {isEditing ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Edit2 className="w-5 h-5" />}
        </button>

        <div className="relative">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" />
          <div className="absolute bottom-0 right-0 bg-primary w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-right mt-2 md:mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-bold">
              {user.label}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
              العمر: {user.age} سنة
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab('basic')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'basic' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          <User className="w-4 h-4" />
          المعلومات الأساسية
        </button>
        <button 
          onClick={() => setActiveTab('medical')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'medical' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          <Activity className="w-4 h-4" />
          المعلومات الطبية
        </button>
        <button 
          onClick={() => setActiveTab('emergency')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'emergency' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          <Contact className="w-4 h-4" />
          الطوارئ
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        {activeTab === 'basic' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">البيانات الشخصية</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">الاسم بالكامل</label>
                {isEditing ? (
                  <input type="text" defaultValue={user.name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                ) : (
                  <p className="font-medium text-lg">{user.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">رقم الهاتف</label>
                {isEditing ? (
                  <input type="text" defaultValue={user.phone} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" dir="ltr" />
                ) : (
                  <p className="font-medium text-lg" dir="ltr">{user.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">تاريخ الميلاد</label>
                {isEditing ? (
                  <input type="date" defaultValue="1998-05-15" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                ) : (
                  <p className="font-medium text-lg">15 مايو 1998 (26 سنة)</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">المرحلة الحياتية</label>
                <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium">
                  {user.label.split('—')[0]}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-500 mb-2">نبذة</label>
                {isEditing ? (
                  <textarea defaultValue={user.bio} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary h-24 resize-none" />
                ) : (
                  <p className="font-medium text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{user.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">السجل الطبي</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">فصيلة الدم</label>
                <p className="font-bold text-xl text-primary bg-primary/5 px-4 py-2 rounded-xl inline-block border border-primary/10">O+</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">الطول والوزن الأخير</label>
                <p className="font-medium text-lg">165 سم / 65 كجم</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-500 mb-2">الأمراض المزمنة</label>
                <div className="flex gap-2">
                  <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-red-100">لا يوجد</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-500 mb-2">الحساسية</label>
                <div className="flex gap-2">
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-100">البنسلين</span>
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-100">الفراولة</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-500 mb-2">الأدوية الحالية</label>
                <ul className="list-disc list-inside space-y-1 text-gray-700 pr-4">
                  <li>فيتامينات متعددة (يومياً)</li>
                  <li>حمض الفوليك (يومياً)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">جهة الاتصال للطوارئ</h2>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-red-800 mb-1">الاسم</label>
                        <input type="text" defaultValue="أحمد محمود (زوج)" className="w-full bg-white border border-red-200 rounded-xl px-4 py-2 outline-none focus:border-red-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-red-800 mb-1">رقم الهاتف</label>
                        <input type="text" defaultValue="+20 100 999 8888" className="w-full bg-white border border-red-200 rounded-xl px-4 py-2 outline-none focus:border-red-400" dir="ltr" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-red-900 mb-1">أحمد محمود</h3>
                      <p className="text-red-700 font-medium mb-3">القرابة: زوج</p>
                      <a href="tel:+201009998888" className="inline-flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-red-100 hover:bg-red-50 transition-colors" dir="ltr">
                        <Phone className="w-4 h-4" />
                        +20 100 999 8888
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}