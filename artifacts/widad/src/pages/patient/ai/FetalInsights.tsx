import { useMemo, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'

const SCAN_HISTORY = [
  { id: 's1', date: '2026-02-18', title: 'سونار متابعة النمو', summary: 'النمو متوافق مع العمر الحملي.' },
  { id: 's2', date: '2026-03-05', title: 'سونار تفصيلي', summary: 'الحركة جيدة ولا توجد ملاحظات مقلقة.' },
  { id: 's3', date: '2026-03-19', title: 'سونار نبض ودوبلر', summary: 'تدفق الدم ضمن الحدود الطبيعية.' },
]

type ViewerMode = 'front' | 'side' | 'top'

export default function FetalInsights() {
  const { user } = useAuthStore()
  const [selectedScanId, setSelectedScanId] = useState(SCAN_HISTORY[0].id)
  const [viewerMode, setViewerMode] = useState<ViewerMode>('front')

  const selectedScan = useMemo(
    () => SCAN_HISTORY.find((scan) => scan.id === selectedScanId) ?? SCAN_HISTORY[0],
    [selectedScanId]
  )

  const twins = user?.mockData?.fetalData
  const fetusList = twins
    ? [twins.twin1, twins.twin2].filter(Boolean)
    : [{ name: 'الجنين', weight: '780 جرام', heartRate: 146 }]

  return (
    <div className="max-w-6xl mx-auto pb-10 space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">تحليل السونار الجنيني</h1>
          <p className="text-muted-foreground mt-2">قراءة مبسطة لآخر الفحوصات مع عارض 3D تجريبي.</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/10 text-primary px-4 py-2 text-sm font-bold">
          الأسبوع الحالي: {user?.pregnancyWeek ?? 26}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h2 className="text-lg font-bold text-foreground">🧬 العارض ثلاثي الأبعاد (Mock)</h2>
              <div className="flex gap-2">
                {[
                  { id: 'front', label: 'أمامي' },
                  { id: 'side', label: 'جانبي' },
                  { id: 'top', label: 'علوي' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setViewerMode(item.id as ViewerMode)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition-colors ${
                      viewerMode === item.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 rounded-2xl border border-gray-100 bg-linear-to-br from-pink-50 via-rose-50 to-amber-50 relative overflow-hidden">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                  viewerMode === 'front' ? 'rotate-0' : viewerMode === 'side' ? 'rotate-12' : '-rotate-6'
                }`}
              >
                <div className="relative w-44 h-44">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-300 to-rose-500 opacity-70 blur-sm" />
                  <div className="absolute inset-6 rounded-full bg-white/35 border border-white/50" />
                  <div className="absolute top-10 left-12 w-8 h-8 rounded-full bg-rose-200/80" />
                  <div className="absolute bottom-10 right-12 w-10 h-10 rounded-full bg-pink-200/70" />
                </div>
              </div>
              <div className="absolute top-3 left-3 rounded-lg bg-white/70 border border-white/70 px-3 py-1.5 text-xs font-bold text-rose-700">
                3D Preview
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">📊 القياسات الحالية</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {fetusList.map((fetus: any) => (
                <div key={fetus.name} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-2">
                  <p className="font-bold text-foreground">{fetus.name}</p>
                  <p className="text-sm text-gray-700">
                    الوزن التقديري: <span className="font-bold text-gray-900">{fetus.weight}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    النبض: <span className="font-bold text-gray-900">{fetus.heartRate} نبضة/دقيقة</span>
                  </p>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Math.min(100, (Number(fetus.heartRate) / 180) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-4">🗂️ سجل الفحوصات</h3>
            <div className="space-y-2">
              {SCAN_HISTORY.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => setSelectedScanId(scan.id)}
                  className={`w-full text-right rounded-xl border px-3 py-2 transition-colors ${
                    selectedScan.id === scan.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-sm font-bold">{scan.title}</p>
                  <p className="text-xs opacity-80">{scan.date}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-foreground">💡 ملخص الفحص المختار</h3>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-sm font-bold text-foreground mb-1">{selectedScan.title}</p>
              <p className="text-xs text-gray-600 mb-2">{selectedScan.date}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedScan.summary}</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-800">
              <p className="font-bold mb-1">توصية وداد</p>
              استمري على نفس نمط المتابعة، وكرري السونار خلال أسبوعين أو حسب توصية الطبيبة.
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
