import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Activity, Shield, ArrowLeft, Bot, Stethoscope, Users, BookOpenText, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section className="pt-20 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Background" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/70" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              المنصة الأولى لصحة المرأة العربية
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
              رفيقتك الصحية في <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">كل مرحلة من حياتك</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              منصة متكاملة تدعمك بالذكاء الاصطناعي والاستشارات الطبية والمجتمع الآمن، من قبل الزواج وحتى الأمومة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                ابدئي رحلتك الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/auth" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-white text-foreground border-2 border-border shadow-sm hover:border-primary/30 hover:bg-gray-50 transition-all flex items-center justify-center">
                تسجيل الدخول للمنصة
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { k: '95%', v: 'رضا المستخدمين' },
                { k: '24/7', v: 'مساعد ذكي متاح' },
                { k: '150+', v: 'طبيب معتمد' },
                { k: '3', v: 'مراحل حياة مخصصة' },
              ].map((stat) => (
                <div key={stat.v} className="bg-white/80 backdrop-blur border border-border rounded-2xl p-4 shadow-sm">
                  <p className="text-2xl font-black text-foreground">{stat.k}</p>
                  <p className="text-xs text-muted-foreground font-bold">{stat.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">كل ما تحتاجينه في مكان واحد</h2>
            <p className="text-muted-foreground text-lg">صممنا وداد لتكون المنصة الشاملة الوحيدة التي تحتاجينها</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Bot className="w-8 h-8 text-primary" />, title: 'مساعد طبي AI', desc: 'إجابات فورية لأسئلتك الصحية في أي وقت وبكل سرية.' },
              { icon: <Stethoscope className="w-8 h-8 text-accent" />, title: 'استشارات طبية', desc: 'نخبة من أفضل الأطباء في مختلف التخصصات متوفرين أونلاين.' },
              { icon: <Activity className="w-8 h-8 text-teal-500" />, title: 'متتبعات ذكية', desc: 'تتبع للدورة، الخصوبة، الحمل، والمزاج مع تقارير مخصصة.' },
              { icon: <Users className="w-8 h-8 text-purple-500" />, title: 'مجتمع آمن', desc: 'مساحة فضفضة آمنة مع نساء يمرون بنفس تجربتك.' },
              { icon: <Shield className="w-8 h-8 text-orange-500" />, title: 'خصوصية تامة', desc: 'بياناتك مشفرة ومحمية بأعلى معايير الأمان.' },
              { icon: <Heart className="w-8 h-8 text-pink-500" />, title: 'محتوى موثوق', desc: 'آلاف المقالات الطبية المراجعة من قبل متخصصين.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage Entry */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">خريطة رحلتك الصحية</h2>
              <p className="text-muted-foreground">اختاري مرحلتك لعرض المتتبعات المناسبة والأطباء والمقالات المرتبطة بها.</p>
            </div>
            <Link to="/life-stages" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              كل المراحل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { key: 'pre_marriage', icon: '💍', title: 'قبل الزواج', desc: 'فحوصات واستعداد صحي متكامل.' },
              { key: 'marriage', icon: '💑', title: 'مرحلة الزواج', desc: 'متابعة الخصوبة والحمل أسبوعياً.' },
              { key: 'post_marriage', icon: '👶', title: 'بعد الجواز', desc: 'تعافٍ بعد الولادة وصحة الطفل.' },
            ].map((stage) => (
              <Link key={stage.key} to={`/life-stages/${stage.key}`} className="rounded-3xl border border-border bg-gray-50 p-6 hover:border-primary/30 hover:shadow-md transition-all group">
                <p className="text-4xl mb-3">{stage.icon}</p>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Public Explore */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <Link to="/doctors" className="bg-white rounded-3xl border border-border p-7 hover:shadow-lg transition-all">
            <Stethoscope className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">الأطباء متاحون للكل</h3>
            <p className="text-sm text-muted-foreground">استعرضي ملفات الأطباء والتخصصات بدون تسجيل. عند الحجز فقط سيطلب تسجيل الدخول.</p>
          </Link>

          <Link to="/articles" className="bg-white rounded-3xl border border-border p-7 hover:shadow-lg transition-all">
            <BookOpenText className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">مقالات طبية مفتوحة</h3>
            <p className="text-sm text-muted-foreground">مكتبة مقالات مصنفة حسب المرحلة والتخصص، متاحة للتصفح لجميع الزوار.</p>
          </Link>

          <Link to="/trackers" className="bg-white rounded-3xl border border-border p-7 hover:shadow-lg transition-all">
            <Activity className="w-10 h-10 text-teal-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">متتبعات عامة</h3>
            <p className="text-sm text-muted-foreground">صفحات المتتبعات متاحة للعرض، وعند بدء الاستخدام يتم تحويلك لتسجيل الدخول.</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
