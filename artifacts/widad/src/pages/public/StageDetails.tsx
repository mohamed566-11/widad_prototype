import { Link, useParams } from 'react-router-dom'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { STAGE_META, TRACKERS_BY_STAGE, doctorMatchesStage, type StageKey } from '@/mock/data/stage-mapping'

const STAGES: StageKey[] = ['pre_marriage', 'marriage', 'post_marriage']

const TRACKER_IMAGE: Record<string, string> = {
  mood: `${import.meta.env.BASE_URL}images/trackers/mood.svg`,
  weight: `${import.meta.env.BASE_URL}images/trackers/weight.svg`,
  period: `${import.meta.env.BASE_URL}images/trackers/period.svg`,
  fertility: `${import.meta.env.BASE_URL}images/trackers/fertility.svg`,
  pregnancy: `${import.meta.env.BASE_URL}images/trackers/pregnancy.svg`,
}

export default function StageDetails() {
  const { stage = '' } = useParams()
  const key = STAGES.includes(stage as StageKey) ? (stage as StageKey) : null

  if (!key) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center bg-white rounded-3xl border border-border shadow-sm mt-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">المرحلة غير موجودة</h1>
          <p className="text-muted-foreground mb-6">اختاري مرحلة صحيحة لعرض المتتبعات والأطباء والمقالات.</p>
          <Link to="/life-stages" className="inline-flex bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">العودة لمراحل الحياة</Link>
        </div>
      </div>
    )
  }

  const doctors = MOCK_DOCTORS.filter((doctor) => doctorMatchesStage(doctor, key))
  const articles = MOCK_ARTICLES.filter((article) => article.lifeStage === key)
  const trackers = TRACKERS_BY_STAGE[key]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-8">
        <header className="bg-white border border-border rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {STAGE_META[key].icon} {STAGE_META[key].title}
          </h1>
          <p className="text-gray-600">{STAGE_META[key].desc}</p>
        </header>

        <section className="bg-white border border-border rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">المتتبعات المناسبة</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {trackers.map((tracker) => (
              <article key={tracker.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/25 transition-all overflow-hidden">
                <div className="h-28 bg-gray-50">
                  <img src={TRACKER_IMAGE[tracker.id]} alt={tracker.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-black text-foreground mb-1">{tracker.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">{tracker.desc}</p>
                  <Link to="/auth/patient/login" state={{ redirectTo: tracker.route }} className="inline-flex text-sm font-bold text-primary hover:underline">
                    تسجيل الدخول لاستخدامه
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border border-border rounded-3xl p-6 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">الأطباء المناسبون للمرحلة</h2>
              <p className="text-muted-foreground text-sm mt-1">نخبة من الأطباء المختصين لمساعدتك</p>
            </div>
            <Link to="/doctors" className="inline-flex bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">عرض كل الأطباء</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map((doctor) => (
              <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{doctor.name}</h3>
                    <p className="text-sm font-medium text-primary/80 mb-1">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <span>★</span> {doctor.rating} ({doctor.reviewsCount} تقييم)
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100/80 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">⏰ متاح خلال: {doctor.responseTime}</span>
                  <span className="flex items-center gap-1">💰 {doctor.price} ر.س</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white border border-border rounded-3xl p-6 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">المقالات المناسبة للمرحلة</h2>
              <p className="text-muted-foreground text-sm mt-1">أحدث المقالات والنصائح الطبية لحالتك</p>
            </div>
            <Link to="/articles" className="inline-flex bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">عرض كل المقالات</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="group rounded-3xl border border-gray-100 bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-primary/30 transition-all overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <img src={article.image || 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&q=80'} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {article.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mt-auto pt-4 border-t border-gray-100/80">
                    <span className="flex items-center gap-1">✍️ {article.author}</span>
                    <span className="flex items-center gap-1">⏳ {article.readTime} دقائق</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
