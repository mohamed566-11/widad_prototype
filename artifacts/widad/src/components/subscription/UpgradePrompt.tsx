import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

const FEATURE_LABELS: Record<string, string> = {
  ai_chat_voice: 'المحادثة الصوتية مع الذكاء الاصطناعي',
  ai_weekly_reports: 'التقارير الصحية الأسبوعية',
  ai_custom_journey: 'الرحلة الصحية المخصصة',
}

export function UpgradePrompt({ feature }: { feature: string }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 grid place-items-center shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-amber-900 text-sm mb-1">ميزة مدفوعة</p>
          <p className="text-amber-800 text-sm mb-3">
            {FEATURE_LABELS[feature] ?? 'هذه الميزة'} متاحة في الباقات الأعلى.
          </p>
          <Link to="/patient/plans" className="inline-block bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors">
            ترقية الباقة
          </Link>
        </div>
      </div>
    </div>
  )
}
