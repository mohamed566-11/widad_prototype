import { useAuthStore } from '@/store/auth.store'
import { AlertCircle, Calendar, MessageSquare, Activity, ChevronLeft, ArrowUpRight, TrendingUp, Sparkles, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { FeatureGate } from '@/components/subscription/FeatureGate'

export default function PatientDashboard() {
  const { user } = useAuthStore()
  if (!user) return null

  const stats = user.mockData.dashboardStats

  return (
    <div className="space-y-8 pb-10">
      
      {/* Risk Alert */}
      {stats.riskFlag && (
        <div className="bg-destructive/10 border-2 border-destructive/20 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-destructive">تنبيه صحي هام ⚠️</h3>
              <p className="text-destructive/80 font-medium mt-1">{stats.riskType} — ننصحك بمراجعة طبيبك المختص.</p>
            </div>
          </div>
          <Link to="/patient/consultations" className="bg-destructive text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-destructive/25 hover:bg-destructive/90 transition-colors whitespace-nowrap w-full md:w-auto text-center">
            احجزي استشارة عاجلة
          </Link>
        </div>
      )}

      {/* Welcome & Featured */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-accent rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">أهلاً بكِ يا {user.name.split(' ')[0]} 🌸</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg">كيف تشعرين اليوم؟ دعينا نتابع صحتك خطوة بخطوة.</p>
            
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 inline-block">
              <p className="text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                توصية اليوم لكِ
              </p>
              <p className="font-bold text-xl">{stats.featuredSection}</p>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-500 mb-4">الاستشارة القادمة</h3>
            {stats.nextConsultation ? (
              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="font-bold text-lg text-foreground">د. سارة أحمد</p>
                <p className="text-primary font-medium mt-1">20 مارس • 10:00 صباحاً</p>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground font-medium">لا توجد استشارات مجدولة</p>
              </div>
            )}
          </div>
          <Link to="/patient/doctors" className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3.5 rounded-full hover:bg-gray-800 transition-colors">
            <Calendar className="w-4 h-4" />
            احجزي موعد جديد
          </Link>
        </div>
      </div>

      {/* Pregnancy / Stage Specific Info */}
      {user.lifeStage === 'marriage' && user.pregnancyWeek && (
        <div className="bg-pink-50 border border-pink-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-32 h-32 rounded-full bg-white shadow-md border-4 border-pink-200 flex items-center justify-center text-5xl">
            {stats.babySize?.includes('موزة') ? '🍌' : stats.babySize?.includes('خيار') ? '🥒' : '🍆'}
          </div>
          <div className="flex-1 text-center md:text-right">
            <h3 className="text-2xl font-bold text-pink-900 mb-2">أنتِ في الأسبوع الـ {user.pregnancyWeek} من الحمل!</h3>
            <p className="text-pink-700 font-medium text-lg">طفلك الآن بحجم {stats.babySize}</p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="bg-white px-4 py-2 rounded-full text-pink-600 font-bold shadow-sm border border-pink-100">
                وزنك: {stats.weight} كجم ({stats.weightGain})
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-pink-600 font-bold shadow-sm border border-pink-100">
                حركات الجنين اليوم: {stats.kicksToday}
              </span>
            </div>
          </div>
          <Link to="/patient/trackers/pregnancy" className="p-4 bg-white rounded-full text-pink-500 shadow-sm hover:shadow-md transition-shadow">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">وصول سريع</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/patient/ai" className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:border-primary hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">المساعد الذكي</h4>
            <p className="text-xs text-gray-500 mt-1">اسألي وداد عن أي شيء</p>
          </Link>
          <Link to="/patient/trackers" className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:border-teal-500 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">المتتبعات</h4>
            <p className="text-xs text-gray-500 mt-1">المزاج، الوزن، الدورة</p>
          </Link>
          <Link to="/patient/community" className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:border-orange-500 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">مجتمع وداد</h4>
            <p className="text-xs text-gray-500 mt-1">شاركي تجربتك بأمان</p>
          </Link>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl shadow-md text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-bold text-white">باقتك الحالية</h4>
              <p className="text-xs text-gray-300 mt-1 font-bold">{user.mockData.subscription.plan}</p>
            </div>
            <ArrowUpRight className="absolute bottom-4 left-4 text-white/50 w-5 h-5 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FeatureGate feature="ai_weekly_reports">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-bold mb-1">تقرير AI الأسبوعي</p>
            <h4 className="text-lg font-bold">ملخص صحتك هذا الأسبوع جاهز</h4>
            <p className="text-sm text-gray-500 mt-2">يتضمن المزاج، الوزن، والنشاط الصحي.</p>
          </div>
        </FeatureGate>

        <FeatureGate feature="ai_custom_journey">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-bold mb-1">رحلة AI المخصصة</p>
            <h4 className="text-lg font-bold">خطة مخصصة حسب مرحلتك الحالية</h4>
            <p className="text-sm text-gray-500 mt-2">توصيات أسبوعية مبنية على تقدمك وحالتك الصحية.</p>
          </div>
        </FeatureGate>
      </div>

      {/* Suggested Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">مقالات مقترحة لكِ</h3>
          <Link to="/patient/articles" className="text-primary font-bold text-sm hover:underline">عرض الكل</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_ARTICLES.slice(0, 3).map((article) => (
            <Link key={article.id} to={`/patient/articles/${article.id}`} className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                 <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary rounded-full shadow-sm">
                   {article.category}
                 </span>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 font-medium border-t border-gray-50 pt-3">
                  <span>{article.author}</span>
                  <span>{article.readTime} دقائق قراءة</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
