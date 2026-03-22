import { useParams, Link } from 'react-router-dom';
import { MOCK_CIRCLES, MOCK_POSTS } from '@/mock/data/community';
import { Users, ChevronLeft, Heart, MessageCircle, Share2, User } from 'lucide-react';

export default function CirclePage() {
  const { id } = useParams();
  const circle = MOCK_CIRCLES.find(c => c.id === id);
  const posts = MOCK_POSTS.filter(p => p.circleId === id);

  if (!circle) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <Link to="/patient/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm">
        <ChevronLeft className="w-4 h-4" />
        عودة للمجتمع
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-border flex flex-col md:flex-row items-center gap-6 relative overflow-hidden text-center md:text-right">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full" style={{ backgroundColor: circle.color }}></div>
        
        <div className="text-7xl drop-shadow-sm">{circle.emoji}</div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900 mb-2">{circle.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
            <Users className="w-4 h-4" />
            {circle.members.toLocaleString('ar-EG')} عضوة
          </div>
        </div>

        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
          انضمام للدايرة
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-border">
            <div className="flex items-start gap-3 mb-4">
              {post.isAnonymous ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              ) : (
                <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full object-cover shrink-0" />
              )}
              
              <div>
                <h3 className="font-bold text-gray-900">
                  {post.isAnonymous ? post.anonymousAlias : post.userName}
                </h3>
                <div className="text-xs text-gray-500">
                  {post.userLabel} • {new Date(post.createdAt).toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>

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
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            لا توجد منشورات في هذه الدايرة بعد. كوني أول من ينشر!
          </div>
        )}
      </div>
    </div>
  );
}