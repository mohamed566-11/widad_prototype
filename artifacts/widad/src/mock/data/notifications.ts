export type NotificationType =
  | 'consultation'
  | 'ai_risk'
  | 'subscription'
  | 'community'
  | 'tracker'
  | 'weekly_report'
  | 'system'

export interface MockNotification {
  id: string
  type: NotificationType
  title: string
  body: string
  time: string
  isRead: boolean
  actionUrl?: string
  priority?: 'low' | 'normal' | 'high'
}

const BASE_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'n-consult-1',
    type: 'consultation',
    title: 'استشارتك القادمة غداً',
    body: 'د. سارة أحمد - الساعة 10:00 صباحاً',
    time: 'منذ ساعتين',
    isRead: false,
    actionUrl: '/patient/consultations',
  },
  {
    id: 'n-community-1',
    type: 'community',
    title: 'رد على منشورك',
    body: 'د. هبة علي ردت على سؤالك في مجتمع فضفضة',
    time: 'أمس',
    isRead: true,
    actionUrl: '/patient/community',
  },
  {
    id: 'n-tracker-1',
    type: 'tracker',
    title: 'تذكير: سجلي وزنك اليوم',
    body: 'آخر تسجيل كان منذ 3 أيام',
    time: 'منذ يومين',
    isRead: true,
    actionUrl: '/patient/trackers/weight',
  },
]

export function buildNotificationsForUser(user: any): MockNotification[] {
  const lifeStage = user?.lifeStage
  const planName: string = user?.mockData?.subscription?.plan ?? ''
  const riskFlag = Boolean(user?.mockData?.dashboardStats?.riskFlag)

  const dynamic: MockNotification[] = [...BASE_NOTIFICATIONS]

  if (riskFlag) {
    dynamic.unshift({
      id: 'n-risk-1',
      type: 'ai_risk',
      title: 'تنبيه صحي من وداد AI',
      body: 'تم رصد مؤشر خطورة أعلى من الطبيعي. يفضّل مراجعة الطبيبة.',
      time: 'الآن',
      isRead: false,
      actionUrl: '/patient/risk',
      priority: 'high',
    })
  }

  if (planName.includes('Pro')) {
    dynamic.push({
      id: 'n-report-1',
      type: 'weekly_report',
      title: 'تقريرك الأسبوعي جاهز',
      body: 'ملخص صحي أسبوعي مبني على متتبعاتك.',
      time: 'منذ 5 ساعات',
      isRead: false,
      actionUrl: '/patient/ai',
    })
  }

  if (planName.includes('Plus') || planName.includes('Pro')) {
    dynamic.push({
      id: 'n-sub-1',
      type: 'subscription',
      title: 'تذكير بمزايا اشتراكك',
      body: 'لديك استشارات مجانية متاحة هذا الشهر.',
      time: 'منذ يوم',
      isRead: true,
      actionUrl: '/patient/subscription',
    })
  }

  if (lifeStage === 'post_marriage') {
    dynamic.push({
      id: 'n-post-1',
      type: 'system',
      title: 'نصيحة يومية للأم الجديدة',
      body: 'الراحة القصيرة خلال اليوم تساعد في تحسين المزاج والطاقة.',
      time: 'منذ 3 أيام',
      isRead: true,
      actionUrl: '/patient/articles',
    })
  }

  return dynamic
}
