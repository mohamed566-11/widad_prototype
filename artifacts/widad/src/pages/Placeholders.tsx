import { ReactNode } from 'react'

export function ComingSoon({ title, desc }: { title: string, desc?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-4xl">
        🚧
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">
        {desc || 'هذه الصفحة قيد التطوير في هذه النسخة التجريبية (Prototype). يرجى زيارة الصفحات الرئيسية.'}
      </p>
    </div>
  )
}

// Minimal versions of required pages to prevent router crashes
export const TrackersHub = () => <ComingSoon title="مركز المتتبعات" desc="مجموعة من المتتبعات (المزاج، الوزن، الدورة) مصممة خصيصاً لمرحلتك الحالية." />
export const MoodTracker = () => <ComingSoon title="متتبع المزاج" />
export const CommunityFeed = () => <ComingSoon title="مجتمع وداد" desc="مساحة آمنة لمشاركة تجاربك مع نساء يمرون بنفس المرحلة." />
export const DoctorDashboard = () => <ComingSoon title="لوحة تحكم الطبيب" desc="إدارة المواعيد، المرضى، والأرباح." />
export const AdminDashboard = () => <ComingSoon title="لوحة تحكم الإدارة" desc="إحصائيات المنصة، المستخدمين، والمبيعات." />
