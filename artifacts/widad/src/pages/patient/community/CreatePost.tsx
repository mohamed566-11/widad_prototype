import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CIRCLES } from '@/mock/data/community';
import { User, ShieldAlert, Send } from 'lucide-react';

export default function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [circleId, setCircleId] = useState(MOCK_CIRCLES[0].id);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock submit
    navigate('/patient/community');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">منشور جديد</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          
          <div className="mb-6 flex items-center justify-between bg-orange-50/50 border border-orange-100 p-4 rounded-2xl">
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                النشر كمجهول
                <ShieldAlert className="w-4 h-4 text-orange-500" />
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isAnonymous ? 'سيظهر اسمك: "وردة الأمل"' : 'سيظهر اسمك وصورتك الحقيقية'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">في أي دايرة؟</label>
              <select 
                value={circleId} 
                onChange={e => setCircleId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium"
              >
                {MOCK_CIRCLES.map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">محتوى المنشور</label>
              <textarea
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="بماذا تفكرين؟ شاركي تجربتك، اسألي، أو فضفضي..."
                className="w-full h-40 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary resize-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمات مفتاحية (Tags)</label>
              <input 
                type="text" 
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="مثال: تغذية, رياضة (افصلي بينها بفاصلة)"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
            إلغاء
          </button>
          <button type="submit" disabled={!content.trim()} className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50">
            <Send className="w-5 h-5 -ml-1" />
            نشر الآن
          </button>
        </div>
      </form>
    </div>
  );
}