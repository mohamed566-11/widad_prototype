import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">من نحن</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          وداد منصة صحية رقمية تدعم المرأة العربية في كل مراحل رحلتها، من قبل الزواج وحتى الأمومة، عبر محتوى موثوق، متتبعات ذكية، واستشارات مع أطباء معتمدين.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-bold mb-2">رؤيتنا</h2>
            <p className="text-sm text-gray-600">تمكين كل امرأة من اتخاذ قرارات صحية واثقة مبنية على معلومات موثوقة.</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-bold mb-2">رسالتنا</h2>
            <p className="text-sm text-gray-600">تقديم تجربة رعاية صحية رقمية إنسانية، بسيطة، وآمنة.</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-bold mb-2">قيمنا</h2>
            <p className="text-sm text-gray-600">الخصوصية، الثقة، التمكين، والالتزام العلمي.</p>
          </div>
        </div>

        <Link to="/auth" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
          ابدئي الآن
        </Link>
      </div>
    </div>
  )
}
