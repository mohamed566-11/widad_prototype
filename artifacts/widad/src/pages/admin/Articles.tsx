import { useState } from 'react'
import { MOCK_ARTICLES } from '@/mock/data/articles'
import { BookOpen, Eye, Clock, Trash2, PenSquare } from 'lucide-react'

const CATEGORIES = ['الكل', 'تغذية', 'صحة نفسية', 'فحوصات', 'خصوبة', 'أمومة']

export default function AdminArticles() {
  const [cat, setCat] = useState('الكل')
  const [search, setSearch] = useState('')

  const filtered = MOCK_ARTICLES.filter(a => {
    const matchCat = cat === 'الكل' || a.category === cat
    const matchSearch = !search || a.title.includes(search) || a.author.includes(search)
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">إدارة المقالات</h1>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <PenSquare className="w-4 h-4" /> مقال جديد
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">{MOCK_ARTICLES.length}</p>
          <p className="text-sm text-muted-foreground">إجمالي المقالات</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">12,840</p>
          <p className="text-sm text-muted-foreground">مشاهدة هذا الشهر</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
          <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-foreground">6.5 د</p>
          <p className="text-sm text-muted-foreground">متوسط وقت القراءة</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="ابحث في المقالات..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${cat === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(a => (
            <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-border">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.author} · {a.date} · {a.readTime} دقيقة</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-primary shrink-0">{a.category}</span>
              <div className="flex gap-2 shrink-0">
                <button className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"><PenSquare className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-10">لا توجد مقالات</p>
          )}
        </div>
      </div>
    </div>
  )
}
