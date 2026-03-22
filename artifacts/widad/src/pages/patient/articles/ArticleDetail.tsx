// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Article Detail page with an immersive hero image, glassmorphic content area, and a floating interactive sidebar for related actions.

import { useParams, Link, useLocation } from 'react-router-dom';
import { MOCK_ARTICLES } from '@/mock/data/articles';
import { Clock, User, Calendar, Bookmark, ChevronRight, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { isAuth, user } = useAuthStore();
  const article = MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0];
  const isPublicRoute = location.pathname.startsWith('/articles');
  const backPath = isPublicRoute ? '/articles' : '/patient/articles';
  const aiPath = '/patient/ai';
  
  const [isSaved, setIsSaved] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto pb-20 px-4 sm:px-6 md:px-8 space-y-8" dir="rtl">
        
        {/* Navigation Bar */}
        <m.div variants={fadeUpVariant} className="flex justify-between items-center bg-white/50 dark:bg-black/20 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 shadow-sm sticky top-20 z-40">
           <Link to={backPath} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold font-display text-sm group">
             <div className="bg-secondary/80 rounded-full p-2 group-hover:bg-primary/10 transition-colors">
               <ChevronRight className="w-4 h-4" />
             </div>
             <span>العودة للمكتبة</span>
           </Link>
           
           <div className="flex items-center gap-2">
             <button aria-label="Share" className="p-2.5 rounded-full bg-secondary/80 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-border/50 shadow-sm">
               <Share2 className="w-5 h-5" />
             </button>
             <button 
                onClick={() => setIsSaved(!isSaved)}
                aria-label="Save" 
                className={cn(
                  "p-2.5 rounded-full transition-all duration-300 border shadow-sm",
                  isSaved 
                    ? "bg-primary text-white border-primary shadow-primary/30" 
                    : "bg-secondary/80 text-muted-foreground hover:bg-primary/10 hover:text-primary border-border/50"
                )}
             >
               <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
             </button>
           </div>
        </m.div>

        <article className="glass-panel rounded-[2.5rem] overflow-hidden shadow-sm border border-border relative">
          {/* Immersive Hero */}
          <m.div variants={fadeUpVariant} className="h-72 md:h-[500px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
            <img 
              src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop&auto=format&q=80&seed=${article.id}`} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-out"
              style={{ transitionDuration: '2s' }}
            />
            
            <div className="absolute top-6 left-6 z-20">
               <span className="bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-black font-display text-white rounded-full border border-white/30 shadow-lg flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                 مقال طبي مقترح
               </span>
            </div>

            <div className="absolute bottom-10 right-10 left-10 z-20 text-white max-w-3xl">
              <span className="bg-primary px-4 py-1.5 text-sm font-black font-display rounded-full mb-6 inline-block shadow-md">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-black font-display mb-6 leading-[1.3] drop-shadow-md">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/80">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <User className="w-4 h-4 text-accent" />
                  <span>د. {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{article.readTime} دقائق قراءة</span>
                </div>
              </div>
            </div>
          </m.div>

          <div className="grid lg:grid-cols-12 gap-10 p-6 md:p-12 relative z-20 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
            {/* Main Content Area */}
            <m.div variants={fadeUpVariant} className="lg:col-span-8 2xl:col-span-9 space-y-8">
              <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground max-w-none leading-[2.2] marker:text-primary prose-li:text-muted-foreground font-medium">
                
                <div className="bg-secondary/50 dark:bg-secondary/20 p-8 rounded-[2rem] border-r-4 border-primary shadow-sm mb-12">
                  <p className="text-xl font-bold font-display text-foreground m-0 leading-relaxed italic">
                    "{article.excerpt}"
                  </p>
                </div>
                
                <p>
                  يعد الاهتمام بالصحة في هذه المرحلة أمراً بالغ الأهمية. إن التغيرات التي يمر بها الجسم تتطلب وعياً كبيراً ورعاية خاصة لضمان المرور بهذه الفترة بسلام وأمان.
                  حيث أثبتت الدراسات الحديثة أن الاستعداد الاستباقي يقلل من احتمالية التعرض للمضاعفات بنسبة تزيد عن 40%.
                </p>
                
                <h3 className="text-3xl font-black font-display mt-12 mb-6 text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  </div>
                  أهم التوصيات الطبية
                </h3>
                <p>
                  ينصح الأطباء دائماً بالالتزام بالمراجعات الدورية وإجراء الفحوصات اللازمة في وقتها. كما أن التغذية السليمة تلعب دوراً محورياً في دعم وظائف الجسم الأساسية وتعزيز المناعة.
                  ويفضل دائماً التنسيق مع فريق الرعاية الصحية لوضع خطة تتناسب مع الحالة الفردية.
                </p>
                <ul className="space-y-4 my-8 p-6 bg-white/50 dark:bg-black/20 rounded-[1.5rem] border border-border/50 list-none font-bold">
                  {['الالتزام بنظام غذائي متوازن وغني بالفيتامينات والمعادن الأساسية.', 'شرب كميات كافية من الماء يومياً للحفاظ على ترطيب الجسم.', 'الحصول على قسط كافٍ من النوم والراحة لتعزيز عملية الاستشفاء.', 'تجنب التوتر والضغوط النفسية وممارسة تمارين الاسترخاء والتأمل.'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-3xl font-black font-display mt-12 mb-6 text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  متى يجب استشارة الطبيب؟
                </h3>
                <p>
                  هناك بعض العلامات التحذيرية التي لا ينبغي تجاهلها. إذا شعرت بأي أعراض غير معتادة أو ألم مستمر، يجب التواصل مع طبيبك فوراً. الاكتشاف المبكر لأي مشكلة يسهل علاجها بشكل كبير ويجنب الكثير من التبعات.
                  استمعي إلى جسدك ولا تترددي في طلب المساعدة المتخصصة.
                </p>
              </div>
            </m.div>
            
            {/* Sidebar / AI Assistant Promo */}
            <div className="lg:col-span-4 2xl:col-span-3">
              <div className="sticky top-40 space-y-6">
                
                {/* AI Promo Card */}
                <m.div variants={scaleIn} className="glass-card bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2rem] p-8 border border-primary/20 shadow-[var(--shadow-glow)] shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none -z-10 group-hover:bg-primary/30 transition-colors"></div>
                  
                  <div className="w-16 h-16 bg-white dark:bg-black rounded-[1.5rem] shadow-sm flex items-center justify-center mb-6 border border-border mt-2">
                     <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  
                  <h4 className="font-black font-display text-2xl text-foreground mb-3 leading-tight">استفسري من وداد</h4>
                  <p className="text-sm font-medium text-muted-foreground mb-8 leading-relaxed">
                    هل لفت انتباهك شيء في المقال وتريدين معرفة المزيد؟ الذكاء الاصطناعي "وداد" متاح للإجابة على جميع تساؤلاتك الطبية.
                  </p>
                  
                  <Link
                    to={isAuth ? aiPath : '/auth/patient/login'}
                    state={isAuth ? undefined : { redirectTo: aiPath }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-black font-display py-4 rounded-[1.25rem] shadow-md shadow-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all group/btn relative overflow-hidden h-14"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative z-10">{isAuth ? 'اسألي وداد الآن' : 'تسجيل الدخول للبدء'}</span>
                    <ChevronRight className="w-5 h-5 relative z-10 rotate-180" />
                  </Link>
                </m.div>

                {/* Author Card */}
                <m.div variants={fadeUpVariant} className="glass-panel bg-white/60 dark:bg-black/40 rounded-[2rem] p-6 border border-border flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden border-2 border-primary/20 shrink-0">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}&backgroundColor=transparent`} alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">كاتب المقال</p>
                    <h5 className="font-black font-display text-base text-foreground">د. {article.author}</h5>
                    <p className="text-xs text-muted-foreground font-medium mt-1">طبيب متخصص في صحة المرأة</p>
                  </div>
                </m.div>
                
              </div>
            </div>
            
          </div>
        </article>
      </m.div>
    </LazyMotion>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}