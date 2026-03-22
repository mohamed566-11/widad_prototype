import { MOCK_ARTICLES } from './articles'

export type StageKey = 'pre_marriage' | 'marriage' | 'post_marriage'

export const STAGE_META: Record<StageKey, { title: string; icon: string; desc: string }> = {
  pre_marriage: {
    title: 'قبل الزواج',
    icon: 'Heart',
    desc: 'تحضيرات صحية وفحوصات ما قبل الزواج وبناء وعي صحي متوازن.',
  },
  marriage: {
    title: 'مرحلة الزواج',
    icon: 'Users',
    desc: 'متابعة الخصوبة والحمل والاستشارات الطبية المتخصصة.',
  },
  post_marriage: {
    title: 'بعد الجواز',
    icon: 'Baby',
    desc: 'دعم الأم بعد الولادة والتعافي وصحة الطفل.',
  },
}

const DOCTOR_STAGE_BY_SPECIALTY: Record<string, StageKey[]> = {
  'أمراض النساء والتوليد': ['pre_marriage', 'marriage', 'post_marriage'],
  'طب الأطفال حديثي الولادة': ['post_marriage'],
  'التغذية وصحة المرأة': ['pre_marriage', 'marriage', 'post_marriage'],
  'طب نفسي': ['pre_marriage', 'marriage', 'post_marriage'],
  'التوليد وعمليات الجراحة': ['marriage', 'post_marriage'],
}

export function getDoctorStages(doctor: { specialty: string }): StageKey[] {
  return DOCTOR_STAGE_BY_SPECIALTY[doctor.specialty] ?? ['marriage']
}

export function doctorMatchesStage(doctor: { specialty: string }, stage: StageKey | 'all') {
  if (stage === 'all') return true
  return getDoctorStages(doctor).includes(stage)
}

export function articleMatchesStage(article: { lifeStage?: string }, stage: StageKey | 'all') {
  if (stage === 'all') return true
  return article.lifeStage === stage
}

export const TRACKERS_BY_STAGE: Record<StageKey, Array<{ id: string; title: string; desc: string; route: string }>> = {
  pre_marriage: [
    { id: 'mood', title: 'متتبع المزاج', desc: 'لمتابعة التوازن النفسي قبل الزواج.', route: '/patient/trackers/mood' },
    { id: 'weight', title: 'متتبع الوزن', desc: 'متابعة الوزن وأسلوب الحياة الصحي.', route: '/patient/trackers/weight' },
    { id: 'period', title: 'متتبع الدورة', desc: 'فهم الدورة الشهرية والاستعداد الصحي.', route: '/patient/trackers/period' },
  ],
  marriage: [
    { id: 'fertility', title: 'متتبع الخصوبة', desc: 'تحديد نافذة الخصوبة وأيام التبويض.', route: '/patient/trackers/fertility' },
    { id: 'pregnancy', title: 'متتبع الحمل', desc: 'متابعة الحمل أسبوعًا بأسبوع.', route: '/patient/trackers/pregnancy' },
    { id: 'weight', title: 'متتبع الوزن', desc: 'مراقبة آمنة لتغيرات الوزن.', route: '/patient/trackers/weight' },
  ],
  post_marriage: [
    { id: 'mood', title: 'متتبع المزاج', desc: 'متابعة ما بعد الولادة والحالة النفسية.', route: '/patient/trackers/mood' },
    { id: 'weight', title: 'متتبع الوزن', desc: 'التعافي التدريجي بعد الولادة.', route: '/patient/trackers/weight' },
    { id: 'period', title: 'متتبع الدورة', desc: 'تنظيم الدورة بعد الولادة.', route: '/patient/trackers/period' },
  ],
}

export const STAGE_ARTICLE_COUNTS = {
  pre_marriage: MOCK_ARTICLES.filter((a) => a.lifeStage === 'pre_marriage').length,
  marriage: MOCK_ARTICLES.filter((a) => a.lifeStage === 'marriage').length,
  post_marriage: MOCK_ARTICLES.filter((a) => a.lifeStage === 'post_marriage').length,
}
