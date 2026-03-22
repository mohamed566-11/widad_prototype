import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CIRCLES, MOCK_POSTS } from '@/mock/data/community';
import { Heart, MessageCircle, Share2, Plus, Pin, ShieldCheck, User } from 'lucide-react';

export default function CommunityFeed() {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const filteredPosts = activeCircle 
    ? MOCK_POSTS.filter(p => p.circleId === activeCircle)
    : MOCK_POSTS;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 relative min-h-screen">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">مجتمع وداد</h1>
        
        {/* Circles Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          <button 
            onClick={() => setActiveCircle(null)}
            className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border-2 ${!activeCircle ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            الكل
          </button>
          {MOCK_CIRCLES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCircle(c.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border-2 ${activeCircle === c.id ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <span>{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {post.isAnonymous ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                ) : (
                  <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" />
                )}
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">
                      {post.isAnonymous ? post.anonymousAlias : post.userName}
                    </h3>
                    {post.isPinned && <Pin className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">{post.userLabel}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                {MOCK_CIRCLES.find(c => c.id === post.circleId)?.emoji} {MOCK_CIRCLES.find(c => c.id === post.circleId)?.name}
              </div>
            </div>

            <Link to={`/patient/community/post/${post.id}`}>
              <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-pink-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-bold">{post.likes}</span>
                </button>
                <Link to={`/patient/community/post/${post.id}`} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-bold">{post.commentsCount}</span>
                </Link>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link 
        to="/patient/community/new"
        className="fixed bottom-24 left-8 bg-gradient-to-r from-primary to-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform z-10"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}