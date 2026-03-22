import { useAuthStore } from '@/store/auth.store';
import { Camera, Save } from 'lucide-react';

export default function DoctorProfile() {
  const { user } = useAuthStore();
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">الملف الشخصي والعيادة</h1>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
          <div className="shrink-0 text-center">
            <div className="relative inline-block mb-4">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md" />
              <button className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-500">تحديث الصورة الشخصية</p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الاسم بالكامل</label>
                <input type="text" defaultValue={user.name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">التخصص الرئيسي</label>
                <input type="text" defaultValue={user.specialty} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">نبذة عنك (تظهر للمرضى)</label>
              <textarea defaultValue="استشارية أمراض النساء والتوليد، خبرة 15 سنة في متابعة الحمل الحرج وعلاج تأخر الإنجاب." className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary resize-none" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">إعدادات الاستشارات</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">سعر الاستشارة (ج.م)</label>
              <input type="number" defaultValue="350" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">وقت الرد المتوقع</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium">
                <option>أقل من ساعتين</option>
                <option>أقل من 4 ساعات</option>
                <option>خلال 24 ساعة</option>
              </select>
            </div>
            
            <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">متاح لاستقبال الحجوزات</h4>
                <p className="text-sm text-gray-500">عند إيقاف هذا الخيار، لن يظهر ملفك في نتائج البحث</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Save className="w-5 h-5" />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}