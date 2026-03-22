import { Link } from 'react-router-dom'
import { TRACKERS_BY_STAGE, STAGE_META, type StageKey } from '@/mock/data/stage-mapping'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { MOCK_ARTICLES } from '@/mock/data/articles'

const STAGES: StageKey[] = ['pre_marriage', 'marriage', 'post_marriage']

const TRACKER_IMAGE: Record<string, string> = {
  mood: `${import.meta.env.BASE_URL}images/trackers/mood.svg`,
  weight: `${import.meta.env.BASE_URL}images/trackers/weight.svg`,
  period: `${import.meta.env.BASE_URL}images/trackers/period.svg`,
  fertility: `${import.meta.env.BASE_URL}images/trackers/fertility.svg`,
  pregnancy: `${import.meta.env.BASE_URL}images/trackers/pregnancy.svg`,
}

const STAGE_TONE: Record<StageKey, string> = {
  pre_marriage: 'from-pink-50 to-fuchsia-50',
  marriage: 'from-teal-50 to-cyan-50',
  post_marriage: 'from-orange-50 to-rose-50',
}

export default function TrackersPublic() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="rounded-3xl border border-border bg-gradient-to-l from-white to-pink-50/70 p-8 shadow-sm">
          <h1 className="text-4xl font-black text-foreground mb-3">المتتبعات الصحية</h1>
          <p className="text-lg text-foreground/75 max-w-3xl">استكشفي المتتبعات المناسبة لكل مرحلة من حياتك. التصفح مفتوح، وعند بدء الاستخدام الفعلي سيتم تحويلك لتسجيل الدخول.</p>
        </div>

        <div className="space-y-8">
          {STAGES.map((stage) => (
            <section key={stage} className="bg-white border border-border rounded-3xl p-6 shadow-sm overflow-hidden">
              <div className={`rounded-2xl bg-gradient-to-l ${STAGE_TONE[stage]} border border-white px-5 py-4 mb-5`}>
                <h2 className="text-2xl font-black text-foreground mb-1">
                  {STAGE_META[stage].icon} {STAGE_META[stage].title}
                </h2>
                <p className="text-foreground/70">{STAGE_META[stage].desc}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {TRACKERS_BY_STAGE[stage].map((tracker) => (
                  <article key={tracker.id} className="group border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/25 transition-all">
                    <div className="h-32 overflow-hidden bg-gray-50">
                      <img src={TRACKER_IMAGE[tracker.id]} alt={tracker.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    <div className="p-4">
                      <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold mb-3">
                        متتبع ذكي
                      </div>
                      <h3 className="font-black text-foreground mb-1">{tracker.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4 min-h-11">{tracker.desc}</p>

                      <Link
                        to="/auth/patient/login"
                        state={{ redirectTo: tracker.route }}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-primary text-white px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors"
                      >
                        تسجيل الدخول لاستخدام المتتبع
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* اضافة قسم الاطباء والمقالات في الصفحة الرئيسية للمتتبعات */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* قسم الأطباء المميزين */}
          <section className="bg-white border border-border rounded-3xl p-6 shadow-[var(--shadow-sm)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">أطباء متميزون</h2>
                <p className="text-muted-foreground text-sm mt-1">تحدثي مع نخبة الأطباء الآن</p>
              </div>
              <Link to="/doctors" className="inline-flex bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">كل الأطباء</Link>
            </div>
            <div className="flex flex-col gap-4">
              {MOCK_DOCTORS.slice(0, 3).map((doctor) => (
                <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-4 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{doctor.name}</h3>
                      <p className="text-xs font-medium text-primary/80 mb-1">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-500">
                        <span>★</span> {doctor.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <span className="block text-xs font-bold text-gray-400 mb-1">السعر</span>
                    <span className="block text-sm font-black text-gray-900">{doctor.price} ر.س</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* قسم المقالات المميزة */}
          <section className="bg-white border border-border rounded-3xl p-6 shadow-[var(--shadow-sm)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">أحدث المقالات</h2>
                <p className="text-muted-foreground text-sm mt-1">نصائح ومقالات طبية موثوقة</p>
              </div>
              <Link to="/articles" className="inline-flex bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">كل المقالات</Link>
            </div>
            <div className="flex flex-col gap-4">
              {MOCK_ARTICLES.slice(0, 3).map((article) => (
                <Link key={article.id} to={`/articles/${article.id}`} className="group flex gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-3 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                    <img src={article.image || 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&q=80'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col py-1">
                    <span className="text-[10px] font-black text-primary mb-1">{article.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                    <div className="mt-auto flex items-center justify-between text-[11px] font-medium text-gray-400">
                      <span>{article.author}</span>
                      <span>{article.readTime} د</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
