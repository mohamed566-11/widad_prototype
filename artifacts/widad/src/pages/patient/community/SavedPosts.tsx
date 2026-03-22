import { useState } from 'react';
import { MOCK_CIRCLES } from '@/mock/data/community';
import { BookmarkMinus, Heart, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { communityMock } from '@/mock/services/community.mock';

export default function SavedPosts() {
  const { user } = useAuthStore();
  const [savedPosts, setSavedPosts] = useState(() => communityMock.getSavedPosts(user));

  const removeSaved = (postId: string) => {
    communityMock.removeSavedPost(user, postId);
    setSavedPosts((prev) => prev.filter((entry) => entry.post.id !== postId));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">المنشورات المحفوظة</h1>

      <div className="space-y-6">
        {savedPosts.map(({ post, savedAt }) => (
          <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-border relative group">
            <button
              onClick={() => removeSaved(post.id)}
              className="absolute top-5 left-5 p-2 text-primary bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="إزالة من المحفوظات"
            >
              <BookmarkMinus className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              {post.isAnonymous ? (
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
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
                  {post.userLabel} • تم الحفظ: {new Date(savedAt).toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>

            <Link to={`/patient/community/post/${post.id}`}>
              <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
            </Link>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-bold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-bold">{post.commentsCount}</span>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                {MOCK_CIRCLES.find(c => c.id === post.circleId)?.name}
              </div>
            </div>
          </div>
        ))}
        {savedPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا توجد منشورات محفوظة</h3>
          </div>
        )}
      </div>
    </div>
  );
}