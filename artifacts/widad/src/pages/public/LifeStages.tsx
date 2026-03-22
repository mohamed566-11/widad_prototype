import { Link } from 'react-router-dom'

export default function LifeStages() {
  const stages = [
    {
      key: 'pre_marriage',
      title: 'قبل الزواج',
      desc: 'محتوى وفحوصات وتحضيرات صحية متخصصة قبل بداية الحياة الزوجية.',
      icon: '💍',
    },
    {
      key: 'marriage',
      title: 'مرحلة الزواج',
      desc: 'متابعة الخصوبة والحمل والاستشارات الطبية مع توصيات ذكية.',
      icon: '💑',
    },
    {
      key: 'post_marriage',
      title: 'بعد الجواز',
      desc: 'دعم الأم بعد الولادة وصحة الطفل والتوازن النفسي والتعافي.',
      icon: '👶',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">مراحل الحياة</h1>
        <p className="text-lg text-muted-foreground mb-10">وداد ترافقك بخدمات مخصصة لكل مرحلة.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <div key={stage.key} className="bg-white border border-border rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="text-4xl mb-4">{stage.icon}</div>
              <h2 className="text-xl font-bold mb-2">{stage.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{stage.desc}</p>
              <Link to={`/life-stages/${stage.key}`} className="mt-auto inline-flex items-center justify-center bg-primary text-white rounded-xl py-2.5 font-bold hover:bg-primary/90 transition-colors">
                عرض تفاصيل المرحلة
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">المتتبعات الصحية</h2>
            <p className="text-gray-600">يمكنك استكشاف المتتبعات لكل مرحلة، وعند البدء سيتم طلب تسجيل الدخول.</p>
          </div>
          <Link to="/trackers" className="inline-flex bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            عرض المتتبعات
          </Link>
        </div>
      </div>
    </div>
  )
}
