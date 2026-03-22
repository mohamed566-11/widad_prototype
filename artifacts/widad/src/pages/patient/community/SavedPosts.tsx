// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Saved Posts with frosted glass cards, dynamic hover states, and smooth staggered animations.

import { useState } from 'react';
import { MOCK_CIRCLES } from '@/mock/data/community';
import { BookmarkMinus, Heart, MessageCircle, User, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { communityMock } from '@/mock/services/community.mock';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function SavedPosts() {
  const { user } = useAuthStore();
  const [savedPosts, setSavedPosts] = useState(() => communityMock.getSavedPosts(user));

  const removeSaved = (postId: string) => {
    communityMock.removeSavedPost(user, postId);
    setSavedPosts((prev) => prev.filter((entry) => entry.post.id !== postId));
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-8 pb-10" dir="rtl">
        <m.div variants={fadeUpVariant} className="flex flex-col gap-6 relative">
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-accent/10 rounded-full blur-[60px] pointer-events-none -z-10 text-transparent">glow</div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm flex items-center gap-3">
              المنشورات المحفوظة <Bookmark className="w-8 h-8 text-primary opacity-80" />
            </h1>
          </div>
        </m.div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {savedPosts.map(({ post, savedAt }) => {
              const circle = MOCK_CIRCLES.find(c => c.id === post.circleId);
              
              return (
                <m.div 
                  key={post.id} 
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-[2rem] p-6 shadow-sm border border-border group relative overflow-hidden transition-all duration-500 hover:shadow-md hover:border-primary/30"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-[40px] pointer-events-none group-hover:from-primary/10 transition-colors"></div>
                  
                  <button
                    onClick={() => removeSaved(post.id)}
                    className="absolute top-6 left-6 z-20 p-2.5 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm border border-rose-500/20"
                    title="إزالة من المحفوظات"
                  >
                    <BookmarkMinus className="w-5 h-5" />
                  </button>

                  <div className="flex items-start gap-4 mb-5 relative z-10">
                    {post.isAnonymous ? (
                      <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-secondary to-border flex items-center justify-center shrink-0 border-2 border-background shadow-sm">
                        <User className="w-7 h-7 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="relative">
                        <img src={post.userAvatar} alt={post.userName} className="w-14 h-14 rounded-[1.25rem] object-cover shrink-0 border-2 border-background shadow-sm relative z-10" />
                        <div className="absolute inset-0 rounded-[1.25rem] bg-primary/20 blur-md -z-0 translate-y-1"></div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-black text-foreground text-lg mb-1">
                        {post.isAnonymous ? post.anonymousAlias : post.userName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border/50">{post.userLabel}</span>
                        <span className="text-border">•</span>
                        <span className="text-muted-foreground">
                          تم الحفظ: {new Date(savedAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/patient/community/post/${post.id}`} className="block relative z-10 group/link">
                    <p className="text-foreground text-lg leading-relaxed mb-5 font-medium group-hover/link:text-primary transition-colors line-clamp-3">
                      {post.content}
                    </p>
                  </Link>

                  <div className="flex items-center justify-between border-t border-border/50 pt-4 relative z-10">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="p-2 rounded-xl bg-secondary/50">
                          <Heart className="w-5 h-5" />
                        </div>
                        <span className="text-base font-black">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="p-2 rounded-xl bg-secondary/50">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <span className="text-base font-black">{post.commentsCount}</span>
                      </div>
                    </div>
                    {circle && (
                      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border shadow-sm text-xs font-black text-foreground flex items-center gap-1.5">
                        <span className="text-base">{circle.emoji}</span> {circle.name}
                      </div>
                    )}
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
          
          {savedPosts.length === 0 && (
            <m.div variants={fadeUpVariant} className="text-center py-20 glass-panel rounded-[2.5rem] border border-dashed border-border/80 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-5">
                 <Bookmark className="w-64 h-64" />
               </div>
              <h3 className="text-xl font-black font-display text-muted-foreground relative z-10">لا توجد منشورات محفوظة حالياً</h3>
              <p className="text-muted-foreground mt-2 relative z-10">تصفحي المجتمع واحفظي المنشورات التي تهمك للعودة إليها لاحقاً.</p>
            </m.div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}