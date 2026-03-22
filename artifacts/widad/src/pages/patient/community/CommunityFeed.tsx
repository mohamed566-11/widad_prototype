// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Community Feed with frosted glass cards, dynamic hover states, and smooth staggered animations.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CIRCLES, MOCK_POSTS } from '@/mock/data/community';
import { Heart, MessageCircle, Share2, Plus, Pin, User, ShieldCheck } from 'lucide-react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function CommunityFeed() {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const filteredPosts = activeCircle 
    ? MOCK_POSTS.filter(p => p.circleId === activeCircle)
    : MOCK_POSTS;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-8 pb-20 relative min-h-screen" dir="rtl">
        <m.div variants={fadeUpVariant} className="flex flex-col gap-6 relative">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none -z-10 text-transparent">glow</div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm flex items-center gap-3">
              مجتمع وداد <ShieldCheck className="w-8 h-8 text-primary opacity-80" />
            </h1>
          </div>
          
          {/* Circles Filter */}
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar px-1 -mx-1">
            <button 
              onClick={() => setActiveCircle(null)}
              className={cn(
                "px-6 py-3 rounded-[1.5rem] font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md shadow-sm",
                !activeCircle 
                  ? 'border-primary/50 bg-gradient-to-r from-primary to-accent text-white shadow-[var(--shadow-glow)] scale-105' 
                  : 'border-border/50 bg-white/50 dark:bg-black/20 text-muted-foreground hover:bg-white/80 dark:hover:bg-black/40 hover:text-foreground'
              )}
            >
              الكل
            </button>
            {MOCK_CIRCLES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCircle(c.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-[1.5rem] font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md shadow-sm",
                  activeCircle === c.id 
                    ? 'border-primary/50 bg-gradient-to-r from-primary to-accent text-white shadow-[var(--shadow-glow)] scale-105' 
                    : 'border-border/50 bg-white/50 dark:bg-black/20 text-muted-foreground hover:bg-white/80 dark:hover:bg-black/40 hover:text-foreground'
                )}
              >
                <span className="text-xl" style={{ filter: activeCircle === c.id ? 'brightness(1.5) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        </m.div>

        {/* Posts */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map(post => {
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
                  
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-4">
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
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-black text-foreground text-lg">
                            {post.isAnonymous ? post.anonymousAlias : post.userName}
                          </h3>
                          {post.isPinned && (
                            <div className="bg-orange-500/10 p-1.5 rounded-lg border border-orange-500/20" title="مثبت">
                              <Pin className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border/50">{post.userLabel}</span>
                          <span className="text-border">•</span>
                          <span className="text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {circle && (
                      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border shadow-sm text-xs font-black text-foreground flex items-center gap-1.5">
                        <span className="text-base">{circle.emoji}</span> {circle.name}
                      </div>
                    )}
                  </div>

                  <Link to={`/patient/community/post/${post.id}`} className="block relative z-10 group/link">
                    <p className="text-foreground text-lg leading-relaxed mb-5 font-medium group-hover/link:text-primary transition-colors line-clamp-3">
                      {post.content}
                    </p>
                  </Link>

                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm transition-colors cursor-pointer hover:bg-primary hover:text-white">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 pt-4 relative z-10">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-pink-500 transition-colors group/btn">
                        <div className="p-2 rounded-xl bg-secondary/50 group-hover/btn:bg-pink-500/10 transition-colors">
                          <Heart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </div>
                        <span className="text-base font-black">{post.likes}</span>
                      </button>
                      <Link to={`/patient/community/post/${post.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors group/btn">
                        <div className="p-2 rounded-xl bg-secondary/50 group-hover/btn:bg-blue-500/10 transition-colors">
                          <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </div>
                        <span className="text-base font-black">{post.commentsCount}</span>
                      </Link>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl hover:bg-secondary/80">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Floating Action Button */}
        <m.div variants={scaleIn} className="fixed bottom-24 left-8 z-50">
          <Link 
            to="/patient/community/new"
            className="bg-gradient-to-r from-primary to-accent text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[var(--shadow-glow)] hover:scale-110 transition-transform duration-300 relative group"
            title="إضافة مشاركة جديدة"
          >
            <div className="absolute inset-0 rounded-[1.5rem] bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Plus className="w-8 h-8 relative z-10" />
          </Link>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}