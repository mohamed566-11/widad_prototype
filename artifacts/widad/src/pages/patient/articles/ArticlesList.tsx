import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '@/mock/data/articles';
import { Clock, User } from 'lucide-react';
import { STAGE_META, type StageKey } from '@/mock/data/stage-mapping';
import { useLocation } from 'react-router-dom';

const CATEGORIES = ['الكل', 'تغذية', 'صحة نفسية', 'فحوصات', 'خصوبة', 'أمومة'];

export default function ArticlesList() {
  const location = useLocation();
  const isPublicRoute = location.pathname.startsWith('/articles');
  const [activeCat, setActiveCat] = useState('الكل');
  const [activeStage, setActiveStage] = useState<StageKey | 'all'>('all');

  const filtered = MOCK_ARTICLES.filter((article) => {
    const byCategory = activeCat === 'الكل' || article.category === activeCat;
    const byStage = activeStage === 'all' || article.lifeStage === activeStage;
    return byCategory && byStage;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">المكتبة الطبية</h1>
        
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border-2 ${activeCat === cat ? 'border-primary bg-primary text-white shadow-md' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setActiveStage('all')}
            className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all border ${activeStage === 'all' ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
          >
            كل المراحل
          </button>
          {(['pre_marriage', 'marriage', 'post_marriage'] as StageKey[]).map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all border ${activeStage === stage ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
            >
              {STAGE_META[stage].icon} {STAGE_META[stage].title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(article => (
          <Link key={article.id} to={`${isPublicRoute ? '/articles' : '/patient/articles'}/${article.id}`} className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
               <img src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=300&fit=crop&auto=format&q=80&seed=${article.id}`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-primary rounded-full shadow-sm">
                 {article.category}
               </span>
               <span className="absolute top-4 left-4 bg-black/65 text-white px-2 py-1 text-[11px] rounded-full font-bold">
                 {STAGE_META[article.lifeStage as StageKey]?.title ?? 'عام'}
               </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2 leading-relaxed">{article.excerpt}</p>
              
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} دقائق قراءة
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <h3 className="text-lg font-bold text-gray-500">لا توجد مقالات في هذا القسم حالياً</h3>
        </div>
      )}
    </div>
  );
}