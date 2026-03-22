import { useParams, Link, useLocation } from 'react-router-dom';
import { MOCK_ARTICLES } from '@/mock/data/articles';
import { Clock, User, Calendar, Bookmark, ChevronLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export default function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { isAuth } = useAuthStore();
  const article = MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0];
  const isPublicRoute = location.pathname.startsWith('/articles');
  const backPath = isPublicRoute ? '/articles' : '/patient/articles';
  const aiPath = '/patient/ai';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link to={backPath} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm">
        <ChevronLeft className="w-4 h-4" />
        العودة للمكتبة
      </Link>

      <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border">
        <div className="h-64 md:h-96 relative">
          <img src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&h=600&fit=crop&auto=format&q=80&seed=${article.id}`} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 right-6 left-6 text-white">
            <span className="bg-primary px-3 py-1 text-xs font-bold rounded-full mb-3 inline-block">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight">{article.title}</h1>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
            <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {article.author}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {article.readTime} دقائق قراءة
              </div>
            </div>
            
            <button className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors">
              <Bookmark className="w-5 h-5" />
              حفظ المقال
            </button>
          </div>

          <div className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 max-w-none leading-loose">
            <p className="text-xl font-medium text-gray-800 mb-8 border-r-4 border-primary pr-4">
              {article.excerpt}
            </p>
            
            <p>
              يعد الاهتمام بالصحة في هذه المرحلة أمراً بالغ الأهمية. إن التغيرات التي يمر بها الجسم تتطلب وعياً كبيراً ورعاية خاصة لضمان المرور بهذه الفترة بسلام وأمان.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">أهم التوصيات الطبية</h3>
            <p>
              ينصح الأطباء دائماً بالالتزام بالمراجعات الدورية وإجراء الفحوصات اللازمة في وقتها. كما أن التغذية السليمة تلعب دوراً محورياً في دعم وظائف الجسم الأساسية وتعزيز المناعة.
            </p>
            <ul>
              <li>الالتزام بنظام غذائي متوازن وغني بالفيتامينات.</li>
              <li>شرب كميات كافية من الماء يومياً.</li>
              <li>الحصول على قسط كافٍ من النوم والراحة.</li>
              <li>تجنب التوتر والضغوط النفسية قدر الإمكان.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">متى يجب استشارة الطبيب؟</h3>
            <p>
              هناك بعض العلامات التحذيرية التي لا ينبغي تجاهلها. إذا شعرت بأي أعراض غير معتادة أو ألم مستمر، يجب التواصل مع طبيبك فوراً. الاكتشاف المبكر لأي مشكلة يسهل علاجها بشكل كبير.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mt-8 not-prose text-center">
              <h4 className="font-bold text-primary mb-2">هل لديك استفسار بخصوص هذا الموضوع؟</h4>
              <p className="text-sm text-gray-600 mb-4">يمكنك سؤال "وداد" المساعد الذكي أو حجز استشارة مع طبيب مختص.</p>
              <Link
                to={isAuth ? aiPath : '/auth/patient/login'}
                state={isAuth ? undefined : { redirectTo: aiPath }}
                className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-primary/90 transition-colors"
              >
                {isAuth ? 'اسألي وداد الآن' : 'تسجيل الدخول لسؤال وداد'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}