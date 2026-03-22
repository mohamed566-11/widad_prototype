import { Save, AlertOctagon } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إعدادات المنصة</h1>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border space-y-8">
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">الإعدادات العامة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم التطبيق</label>
              <input type="text" defaultValue="وداد تك" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني للدعم</label>
              <input type="email" defaultValue="support@widad.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" dir="ltr" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">إدارة الخصائص (Feature Flags)</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">المحادثة الصوتية لـ AI</p>
                <p className="text-sm text-gray-500">تفعيل خيار الميكروفون في شاشة المساعد الذكي</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">التقييم الذكي للمخاطر (SHAP)</p>
                <p className="text-sm text-gray-500">عرض نسب الخطورة لحوامل باقات Pro</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertOctagon className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold text-lg mb-1">وضع الصيانة</p>
                <p className="text-sm">إيقاف التطبيق مؤقتاً للمستخدمين لعرض رسالة الصيانة</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors whitespace-nowrap">
              تفعيل وضع الصيانة
            </button>
          </div>
        </section>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Save className="w-5 h-5" />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}