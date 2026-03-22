import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Smile, Scale, Calendar as CalendarIcon, Sprout, Baby, ChevronLeft } from 'lucide-react';

export default function TrackersHub() {
  const { user } = useAuthStore();
  
  const trackers = [
    { id: 'mood', title: 'متتبع المزاج', desc: 'سجلي مشاعرك يومياً لفهم نمط حالتك النفسية', icon: Smile, color: 'text-purple-500', bg: 'bg-purple-100', link: '/patient/trackers/mood', streak: 5 },
    { id: 'weight', title: 'متتبع الوزن', desc: 'تابعي تغيرات وزنك بشكل صحي', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-100', link: '/patient/trackers/weight', streak: 2 },
    { id: 'period', title: 'متتبع الدورة الشهرية', desc: 'توقعي دورتك القادمة وافهمي طبيعة جسمك', icon: CalendarIcon, color: 'text-pink-500', bg: 'bg-pink-100', link: '/patient/trackers/period', streak: 12 },
    { id: 'fertility', title: 'متتبع الخصوبة', desc: 'حددي أيام التبويض لزيادة فرص الحمل', icon: Sprout, color: 'text-green-500', bg: 'bg-green-100', link: '/patient/trackers/fertility', streak: 8 },
  ];

  if (user?.lifeStage === 'marriage') {
    trackers.push({ id: 'pregnancy', title: 'متتبع الحمل', desc: 'تابعي تطور جنينك أسبوعاً بأسبوع', icon: Baby, color: 'text-orange-500', bg: 'bg-orange-100', link: '/patient/trackers/pregnancy', streak: 15 });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">المتتبعات الصحية</h1>
        <p className="text-muted-foreground">تابعي كل تفاصيل صحتك في مكان واحد</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {trackers.map(t => (
          <Link key={t.id} to={t.link} className="bg-white rounded-3xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/50 transition-all group flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${t.bg} group-hover:scale-110 transition-transform`}>
                <t.icon className={`w-7 h-7 ${t.color}`} />
              </div>
              {t.streak > 0 && (
                <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-orange-100">
                  🔥 {t.streak} أيام متتالية
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-1">{t.desc}</p>
            
            <div className="mt-auto flex items-center justify-between text-primary font-bold text-sm bg-primary/5 p-3 rounded-xl">
              <span>دخول للمتتبع</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}