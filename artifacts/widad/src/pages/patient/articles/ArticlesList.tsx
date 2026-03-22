// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Articles List with glassmorphic cards, staggered masonry-like appearance through animations, and vibrant category pills.

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MOCK_ARTICLES } from '@/mock/data/articles';
import { Clock, User, Library, Search, Sparkles } from 'lucide-react';
import { STAGE_META, type StageKey } from '@/mock/data/stage-mapping';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

const CATEGORIES = ['الكل', 'تغذية', 'صحة نفسية', 'فحوصات', 'خصوبة', 'أمومة'];

export default function ArticlesList() {
  const location = useLocation();
  const isPublicRoute = location.pathname.startsWith('/articles');
  const [activeCat, setActiveCat] = useState('الكل');
  const [activeStage, setActiveStage] = useState<StageKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_ARTICLES.filter((article) => {
    const byCategory = activeCat === 'الكل' || article.category === activeCat;
    const byStage = activeStage === 'all' || article.lifeStage === activeStage;
    const bySearch = article.title.includes(searchQuery) || article.excerpt.includes(searchQuery);
    return byCategory && byStage && bySearch;
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto pb-10 space-y-10" dir="rtl">
        
        {/* Header & Hero */}
        <m.div variants={fadeUpVariant} className="relative z-10 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-sm border border-border group">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-colors duration-700 group-hover:bg-primary/20 text-transparent">glow</div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-700 text-transparent">glow</div>
          
          <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
             <Library className="w-64 h-64 text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
               <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-6 border border-primary/20 shadow-sm backdrop-blur-md">
                 <Sparkles className="w-4 h-4 animate-pulse" />
                 موسوعة المعرفة الطبية
               </div>
               <h1 className="text-4xl md:text-5xl font-black font-display text-foreground mb-4 drop-shadow-sm">المكتبة الطبية</h1>
               <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">اكتشفي مقالات موثوقة ومبنية على أسس علمية لمساعدتك في كل خطوة من مراحل حياتك.</p>
            </div>
            
            <div className="w-full md:w-80 relative">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="ابحثي عن مقال..."
                 className="w-full bg-white/60 dark:bg-black/40 border border-border/50 rounded-full py-4 pr-12 pl-6 font-bold text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/60 shadow-inner backdrop-blur-md"
               />
               <Search className="w-5 h-5 text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
          </div>
        </m.div>

        {/* Filters */}
        <div className="space-y-6 sticky top-20 z-20 backdrop-blur-xl bg-background/60 py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:py-0">
          <m.div variants={fadeUpVariant} className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar snap-x">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={cn(
                  "px-6 py-3 rounded-full font-black font-display text-sm whitespace-nowrap transition-all duration-300 border-2 snap-center relative overflow-hidden group",
                  activeCat === cat 
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/30" 
                    : "border-transparent bg-white/80 dark:bg-black/20 text-muted-foreground hover:bg-white dark:hover:bg-black/40 hover:text-foreground shadow-sm hover:shadow-md border border-border/50"
                )}
              >
                  {activeCat === cat && <div className="absolute inset-0 bg-white/20 animate-pulse-glow" />}
                  <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </m.div>

          <m.div variants={fadeUpVariant} className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar snap-x">
            <button
              onClick={() => setActiveStage('all')}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-colors border snap-start",
                activeStage === 'all' 
                  ? "border-accent bg-accent/10 text-accent-foreground shadow-sm" 
                  : "border-border/50 bg-white/50 dark:bg-black/20 text-muted-foreground hover:bg-white dark:hover:bg-black/40 hover:text-foreground"
              )}
            >
              كل المراحل
            </button>
            {(['pre_marriage', 'marriage', 'post_marriage'] as StageKey[]).map((stage) => {
              const isActive = activeStage === stage;
              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 border flex items-center gap-2 snap-start",
                    isActive 
                       ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-105" 
                       : "border-border/50 bg-white/50 dark:bg-black/20 text-muted-foreground hover:bg-white dark:hover:bg-black/40 hover:text-foreground hover:border-border"
                  )}
                >
                  <span className={cn("text-base", !isActive && "opacity-80 grayscale group-hover:grayscale-0 transition-all")}>{STAGE_META[stage].icon}</span>
                  {STAGE_META[stage].title}
                </button>
              )
            })}
          </m.div>
        </div>

        {/* Articles Grid */}
        <m.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, index) => (
              <m.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  to={`${isPublicRoute ? '/articles' : '/patient/articles'}/${article.id}`} 
                  className="glass-card bg-white/80 dark:bg-black/40 rounded-[2rem] overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 group flex flex-col h-full h-[450px]"
                >
                  {/* Image Header */}
                  <div className="h-56 relative overflow-hidden shrink-0">
                     <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                     <img 
                      src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format&q=80&seed=${article.id}`} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                     />
                     <div className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs font-black font-display text-primary rounded-full shadow-md border border-white/20 dark:border-white/10">
                       {article.category}
                     </div>
                     <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 text-xs rounded-full font-bold shadow-md border border-white/10 flex items-center gap-1.5">
                       <span className="text-[10px]">{STAGE_META[article.lifeStage as StageKey]?.icon ?? '✨'}</span>
                       {STAGE_META[article.lifeStage as StageKey]?.title ?? 'عام'}
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-black/90 dark:via-black/50">
                    <h3 className="font-black font-display text-xl text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3 leading-relaxed font-medium">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs font-bold text-muted-foreground border-t border-border/50 pt-5 mt-auto">
                      <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1.5 rounded-full border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                        <User className="w-4 h-4" />
                        <span className="mt-0.5">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="mt-0.5">{article.readTime} دقائق</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
        
        <AnimatePresence>
          {filtered.length === 0 && (
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 glass-panel rounded-[2.5rem] border-2 border-dashed border-border/80 shadow-inner group relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-secondary/30 group-hover:bg-secondary/50 transition-colors duration-500 -z-10"></div>
               <div className="w-24 h-24 bg-white/80 dark:bg-black/40 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm border border-border/50 rotate-3 group-hover:-rotate-3 transition-transform duration-500">
                 <Search className="w-10 h-10 text-muted-foreground" />
               </div>
              <h3 className="text-2xl font-black font-display text-foreground mb-2">لم نعثر على مقالات</h3>
              <p className="text-muted-foreground font-medium">جربي البحث بكلمات مختلفة أو تغيير التصفية المحددة.</p>
              
              <button 
                onClick={() => { setActiveCat('الكل'); setActiveStage('all'); setSearchQuery(''); }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                عرض كل المقالات
              </button>
            </m.div>
          )}
        </AnimatePresence>
        
      </m.div>
    </LazyMotion>
  );
}