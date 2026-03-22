import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS, MOCK_CIRCLES } from '@/mock/data/community';
import { ChevronLeft, Heart, MessageCircle, Share2, User, ShieldCheck, Send } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams();
  const post = MOCK_POSTS.find(p => p.id === id) || MOCK_POSTS[0];
  const [comment, setComment] = useState('');

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <Link to="/patient/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm mb-6 shrink-0">
        <ChevronLeft className="w-4 h-4" />
        عودة للمجتمع
      </Link>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pb-6">
        {/* Main Post */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {post.isAnonymous ? (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-gray-500" />
                </div>
              ) : (
                <img src={post.userAvatar} alt={post.userName} className="w-14 h-14 rounded-full object-cover shrink-0" />
              )}
              
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {post.isAnonymous ? post.anonymousAlias : post.userName}
                </h3>
                <div className="text-sm text-gray-500">
                  {post.userLabel} • {new Date(post.createdAt).toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
              {MOCK_CIRCLES.find(c => c.id === post.circleId)?.name}
            </div>
          </div>

          <p className="text-gray-800 text-lg leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-md">#{tag}</span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
                <Heart className="w-6 h-6" />
                <span className="font-bold">{post.likes}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-500">
                <MessageCircle className="w-6 h-6" />
                <span className="font-bold">{post.commentsCount} تعليق</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900 mb-4 px-2">التعليقات</h4>
          
          {/* Mock Expert Comment */}
          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 relative">
            <div className="flex items-start gap-3">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-bold text-gray-900">د. سارة أحمد</h5>
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">رأي طبي</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">زيادة الوزن في هذا الشهر طبيعية، لكن يفضل التركيز على البروتينات وتقليل السكريات لتجنب سكر الحمل. أنصحك بزيارة العيادة للاطمئنان.</p>
                <div className="text-xs text-gray-400">منذ ساعتين</div>
              </div>
            </div>
          </div>

          {/* Regular Comment */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-bold text-gray-900">أم غالية (مجهول)</h5>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">أنا كمان حصل معايا كدة في الشهر الخامس، متقلقيش وحاولي تمشي نص ساعة كل يوم.</p>
                <div className="text-xs text-gray-400">منذ 3 ساعات</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Comment */}
      <div className="bg-white p-4 border border-border rounded-3xl shadow-lg mt-4 shrink-0 flex items-end gap-2">
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="أضيفي تعليقك..."
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:border-primary resize-none min-h-[52px] max-h-32"
          rows={1}
        />
        <button 
          disabled={!comment.trim()}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Send className="w-5 h-5 -ml-1" />
        </button>
      </div>
    </div>
  );
}