import { useAuthStore } from '@/store/auth.store';
import { CreditCard, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { MOCK_PLANS } from '@/mock/data/subscriptions';

export default function MySubscription() {
  const { user } = useAuthStore();
  
  if (!user || !user.mockData.subscription) return null;
  
  const sub = user.mockData.subscription;
  const currentPlan = MOCK_PLANS.find(p => p.name === sub.plan);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">اشتراكي الحالي</h1>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">{sub.plan}</h2>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                {sub.status === 'active' ? 'نشط' : 'غير نشط'}
              </span>
            </div>
            {sub.renewsAt ? (
              <p className="text-gray-300 font-medium">يتجدد في: {new Date(sub.renewsAt).toLocaleDateString('ar-EG')}</p>
            ) : (
              <p className="text-gray-300 font-medium">باقة مجانية مدى الحياة</p>
            )}
          </div>
          
          {currentPlan?.isFree && (
            <button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
              ترقية الباقة الآن
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Usage Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            استهلاك الباقة
          </h3>
          
          <div className="space-y-6">
            {sub.freeConsultsTotal !== undefined && (
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-gray-700">الاستشارات المجانية</span>
                  <span className="text-primary">{sub.freeConsultsUsed} / {sub.freeConsultsTotal}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(sub.freeConsultsUsed / sub.freeConsultsTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {sub.aiChatsLimit && (
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-gray-700">رسائل المساعد الذكي (اليوم)</span>
                  <span className="text-purple-500">{sub.aiChatsToday} / {sub.aiChatsLimit}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(sub.aiChatsToday / sub.aiChatsLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {sub.consultationDiscount && (
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  %
                </div>
                <div>
                  <p className="font-bold text-green-800">خصم دائم {sub.consultationDiscount}%</p>
                  <p className="text-sm text-green-700">يطبق تلقائياً على كل الاستشارات</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Included */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-bold mb-6">مميزات باقتك</h3>
          <ul className="space-y-4">
            {currentPlan?.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Settings */}
      {!currentPlan?.isFree && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-bold mb-6">إعدادات الاشتراك</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-bold text-gray-900">التجديد التلقائي</p>
                <p className="text-sm text-gray-500">تجديد الاشتراك تلقائياً في نهاية المدة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <button className="flex items-center gap-2 text-destructive font-bold p-4 hover:bg-destructive/5 rounded-2xl transition-colors w-full">
              <AlertCircle className="w-5 h-5" />
              إلغاء الاشتراك
            </button>
          </div>
        </div>
      )}
    </div>
  );
}