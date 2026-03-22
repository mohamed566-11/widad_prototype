import { useState } from 'react'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { BookOpen, Eye, PenSquare, Plus } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'

const DOCTOR_ARTICLES = [
  { id: 'da1', title: 'نصائح التغذية أثناء الحمل', views: 3420, date: '2026-03-10', status: 'منشور' },
  { id: 'da2', title: 'الصحة النفسية للمرأة بعد الولادة', views: 1890, date: '2026-02-28', status: 'منشور' },
]

export default function DoctorArticles() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState<'mine' | 'platform'>('mine')

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">المقالات الطبية</h1>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> كتابة مقال
        </button>
      </div>

      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        <button onClick={() => setTab('mine')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${tab === 'mine' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>
          مقالاتي
        </button>
        <button onClick={() => setTab('platform')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${tab === 'platform' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>
          مقالات المنصة
        </button>
      </div>

      {tab === 'mine' ? (
        <div className="space-y-3">
          {DOCTOR_ARTICLES.map(a => (
            <div key={a.id} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground">{a.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-muted-foreground">{a.date}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Eye className="w-3.5 h-3.5" /> {a.views.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">{a.status}</span>
                </div>
              </div>
              <button className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors">
                <PenSquare className="w-5 h-5" />
              </button>
            </div>
          ))}
          {DOCTOR_ARTICLES.length === 0 && (
            <div className="bg-white rounded-2xl p-12 border border-border shadow-sm text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-bold">لم تكتبي أي مقالات بعد</p>
              <button className="mt-4 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm">ابدأي الكتابة</button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_ARTICLES.map(a => (
            <div key={a.id} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground">{a.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">{a.author}</span>
                  <span className="text-sm text-muted-foreground">{a.date}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-primary">{a.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
