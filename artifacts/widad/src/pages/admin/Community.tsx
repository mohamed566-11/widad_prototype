import { AlertTriangle, Trash2, CheckCircle2 } from 'lucide-react';

const MOCK_REPORTS = [
  { id: 1, postSnippet: 'هل يمكنني تناول دواء كذا بدون وصفة؟', reporter: 'نور محمد', reason: 'طلب نصيحة طبية', date: 'منذ ساعتين' },
  { id: 2, postSnippet: 'عندي منتج ممتاز للتخسيس تواصلوا معي خاص...', reporter: 'ياسمين', reason: 'إعلان ترويجي', date: 'منذ 5 ساعات' },
  { id: 3, postSnippet: 'أنتن لا تفهمن شيء في هذا الموضوع...', reporter: 'سارة', reason: 'تنمر وإساءة', date: 'أمس' },
];

export default function AdminCommunity() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">إشراف المجتمع</h1>

      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex items-start gap-4 mb-8">
        <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-orange-900 text-lg mb-1">تنبيهات الإشراف</h3>
          <p className="text-orange-800">يوجد {MOCK_REPORTS.length} بلاغات تحتاج لمراجعتك. يرجى التأكد من الحفاظ على بيئة آمنة للمستخدمات.</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_REPORTS.map(report => (
          <div key={report.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2 items-center">
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold border border-red-100">
                  سبب البلاغ: {report.reason}
                </span>
                <span className="text-xs text-gray-400 font-medium">{report.date}</span>
              </div>
              <span className="text-sm font-bold text-gray-500">مُبلغ من: {report.reporter}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-gray-700 italic border-r-4 border-r-gray-300">
              "{report.postSnippet}"
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                حذف المنشور
              </button>
              <button className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                تجاهل البلاغ
              </button>
            </div>
          </div>
        ))}
        {MOCK_REPORTS.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">المجتمع آمن ولا توجد بلاغات</h3>
          </div>
        )}
      </div>
    </div>
  );
}