# 🌸 وداد تك — Frontend Prototype

> **React + TypeScript + Vite | Mock Data 100% | شغال بدون Backend**

```
React 19  •  TypeScript 5  •  Vite 6  •  Tailwind CSS v4  •  shadcn/ui
30+ شاشة  •  Mock Data كاملة  •  RTL عربي  •  3 أدوار  •  AI + 3D
```

---

## 📋 جدول المحتويات

- [Quick Start](#-quick-start)
- [هيكل الملفات](#-هيكل-الملفات)
- [Mock Data Layer](#-mock-data-layer)
- [Auth & Routing](#-auth--routing)
- [Patient Portal](#-patient-portal)
- [Doctor Portal](#-doctor-portal)
- [Admin Dashboard](#-admin-dashboard)
- [نظام الاشتراكات](#-subscription-system)
- [مجتمع فضفضة](#-community-فضفضة)
- [AI Features](#-ai-features)
- [Design System](#-design-system)
- [مراحل البناء](#-مراحل-البناء--6-أسابيع)
- [Demo Guide](#-demo-guide)

---

## ⚡ Quick Start

```bash
# 1. إنشاء المشروع
npm create vite@latest widad-prototype -- --template react-ts
cd widad-prototype

# 2. المكتبات الأساسية
npm install react-router-dom zustand @tanstack/react-query axios

# 3. UI & Styling
npm install tailwindcss @tailwindcss/vite lucide-react
npm install recharts framer-motion
npm install three @types/three

# 4. shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input card badge avatar
npx shadcn@latest add dialog sheet tabs select
npx shadcn@latest add toast skeleton progress
npx shadcn@latest add calendar accordion

# 5. Forms & Utils
npm install react-hook-form zod @hookform/resolvers
npm install date-fns clsx tailwind-merge

# 6. Dev Tools
npm install -D @tanstack/react-query-devtools

# 7. تشغيل
npm run dev
```

### `.env`

```env
VITE_USE_MOCK=true
VITE_APP_NAME=وداد
```

---

## 📁 هيكل الملفات

```
widad-prototype/
├── public/
│   └── assets/
│       ├── logo.svg
│       ├── logo-white.svg
│       └── avatars/           ← صور وهمية للأطباء والمرضى
│
├── src/
│   │
│   ├── mock/                  ← ❤️ القلب — كل البيانات الوهمية هنا
│   │   ├── delay.ts           ← محاكاة تأخير الشبكة
│   │   ├── data/
│   │   │   ├── users.ts
│   │   │   ├── doctors.ts
│   │   │   ├── patients.ts
│   │   │   ├── consultations.ts
│   │   │   ├── trackers.ts
│   │   │   ├── articles.ts
│   │   │   ├── community.ts
│   │   │   ├── notifications.ts
│   │   │   ├── subscriptions.ts
│   │   │   ├── invoices.ts
│   │   │   └── ai-results.ts
│   │   └── services/          ← دوال تُرجع mock data كأنها API calls
│   │       ├── auth.mock.ts
│   │       ├── patient.mock.ts
│   │       ├── doctor.mock.ts
│   │       ├── admin.mock.ts
│   │       ├── trackers.mock.ts
│   │       ├── consultations.mock.ts
│   │       ├── community.mock.ts
│   │       ├── subscriptions.mock.ts
│   │       ├── ai.mock.ts
│   │       └── fetal.mock.ts
│   │
│   ├── store/
│   │   ├── auth.store.ts      ← الـ user المسجل + الدور
│   │   ├── ui.store.ts        ← sidebar open/close
│   │   └── cart.store.ts      ← subscription checkout state
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useRole.ts
│   │   └── useSubscription.ts
│   │
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── doctor.types.ts
│   │   ├── consultation.types.ts
│   │   ├── tracker.types.ts
│   │   ├── community.types.ts
│   │   └── subscription.types.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── PatientLayout.tsx
│   │   │   ├── DoctorLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RoleGuard.tsx
│   │   ├── charts/
│   │   │   ├── WeightChart.tsx
│   │   │   ├── MoodChart.tsx
│   │   │   ├── PeriodCalendar.tsx
│   │   │   ├── RiskGauge.tsx
│   │   │   ├── ShapChart.tsx
│   │   │   └── RevenueChart.tsx
│   │   ├── ai/
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   ├── VoiceButton.tsx
│   │   │   ├── RiskScoreCard.tsx
│   │   │   └── Fetal3DViewer.tsx
│   │   ├── community/
│   │   │   ├── PostCard.tsx
│   │   │   ├── CommentThread.tsx
│   │   │   ├── AnonymousToggle.tsx
│   │   │   ├── ReactionBar.tsx
│   │   │   └── CircleChip.tsx
│   │   ├── subscription/
│   │   │   ├── PricingCard.tsx
│   │   │   ├── PricingToggle.tsx
│   │   │   ├── FeatureGate.tsx
│   │   │   ├── UsageTracker.tsx
│   │   │   └── UpgradePrompt.tsx
│   │   └── shared/
│   │       ├── PageHeader.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── StatCard.tsx
│   │       └── DoctorCard.tsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── AboutUs.tsx
│   │   │   ├── LifeStages.tsx
│   │   │   └── ContactUs.tsx
│   │   ├── auth/
│   │   │   ├── RoleSelect.tsx
│   │   │   ├── PatientLogin.tsx
│   │   │   ├── PatientRegister.tsx
│   │   │   ├── VerifyOTP.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   ├── DoctorLogin.tsx
│   │   │   └── AdminLogin.tsx
│   │   ├── patient/
│   │   │   ├── Dashboard.tsx          ← يتغير حسب lifeStage + plan
│   │   │   ├── Notifications.tsx      ← ✅ مضافة
│   │   │   ├── profile/
│   │   │   │   ├── ProfilePage.tsx
│   │   │   │   ├── BasicInfo.tsx
│   │   │   │   ├── MedicalInfo.tsx
│   │   │   │   └── EmergencyContact.tsx
│   │   │   ├── trackers/
│   │   │   │   ├── TrackersHub.tsx
│   │   │   │   ├── MoodTracker.tsx
│   │   │   │   ├── WeightTracker.tsx
│   │   │   │   ├── PeriodTracker.tsx
│   │   │   │   ├── FertilityTracker.tsx
│   │   │   │   └── PregnancyTracker.tsx
│   │   │   ├── consultations/
│   │   │   │   ├── DoctorSearch.tsx
│   │   │   │   ├── DoctorProfile.tsx
│   │   │   │   ├── BookConsultation.tsx
│   │   │   │   ├── ConsultationsList.tsx
│   │   │   │   └── ConsultationDetail.tsx
│   │   │   ├── ai/
│   │   │   │   ├── AiChat.tsx
│   │   │   │   ├── RiskAssessment.tsx
│   │   │   │   └── FetalAnalysis.tsx
│   │   │   ├── community/
│   │   │   │   ├── CommunityFeed.tsx
│   │   │   │   ├── CirclePage.tsx
│   │   │   │   ├── PostDetail.tsx
│   │   │   │   ├── CreatePost.tsx
│   │   │   │   ├── SavedPosts.tsx     ← ✅ مضافة
│   │   │   │   └── Guidelines.tsx     ← ✅ مضافة (قبول الشروط)
│   │   │   ├── subscriptions/
│   │   │   │   ├── PricingPage.tsx
│   │   │   │   ├── Checkout.tsx
│   │   │   │   ├── MySubscription.tsx
│   │   │   │   └── Invoices.tsx
│   │   │   └── articles/
│   │   │       ├── ArticlesList.tsx
│   │   │       └── ArticleDetail.tsx
│   │   ├── doctor/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Consultations.tsx
│   │   │   ├── ConsultationDetail.tsx
│   │   │   ├── Patients.tsx
│   │   │   ├── PatientEHR.tsx
│   │   │   ├── Articles.tsx
│   │   │   ├── Calendar.tsx           ← ✅ مضافة
│   │   │   ├── Profile.tsx
│   │   │   └── Financials.tsx
│   │   └── admin/
│   │       ├── Dashboard.tsx
│   │       ├── Patients.tsx
│   │       ├── Doctors.tsx
│   │       ├── Consultations.tsx
│   │       ├── Articles.tsx
│   │       ├── Financial.tsx
│   │       ├── Community.tsx
│   │       ├── Subscriptions.tsx
│   │       ├── Analytics.tsx          ← ✅ مضافة كصفحة منفصلة
│   │       └── Settings.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts           ← cn(), formatDate(), formatPrice()
│   │   └── constants.ts       ← PLANS, SPECIALTIES, CIRCLES
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 🎭 Mock Data Layer

### `src/mock/delay.ts`

```typescript
// محاكاة تأخير الشبكة — يجعل الـ prototype يبدو حقيقياً
export const delay = (ms?: number) =>
  new Promise(resolve =>
    setTimeout(resolve, ms ?? 400 + Math.random() * 400)
  )
```

### `src/mock/data/doctors.ts`

```typescript
export const MOCK_DOCTORS = [
  {
    id: 'd1',
    name: 'د. سارة أحمد',
    specialty: 'أمراض النساء والتوليد',
    rating: 4.9,
    reviewsCount: 248,
    price: 350,
    image: '/assets/avatars/doctor-1.jpg',
    about: 'استشارية أمراض النساء والتوليد، خبرة 15 سنة...',
    qualifications: ['MRCOG', 'زمالة كلية الأطباء'],
    languages: ['العربية', 'الإنجليزية'],
    availableSlots: [
      { date: '2026-03-20', times: ['10:00', '11:00', '14:00'] },
      { date: '2026-03-21', times: ['09:00', '13:00', '16:00'] },
    ],
    isOnline: true,
    nextAvailable: '2026-03-20',
    responseTime: '< 2 ساعة',
  },
  {
    id: 'd2',
    name: 'د. منى حسين',
    specialty: 'طب الأطفال حديثي الولادة',
    rating: 4.8,
    reviewsCount: 189,
    price: 300,
    image: '/assets/avatars/doctor-2.jpg',
    about: 'استشارية طب الأطفال، متخصصة في صحة حديثي الولادة...',
    qualifications: ['MRCPCH', 'دكتوراه طب الأطفال'],
    languages: ['العربية'],
    availableSlots: [
      { date: '2026-03-20', times: ['11:00', '15:00'] },
    ],
    isOnline: false,
    nextAvailable: '2026-03-20',
    responseTime: '< 4 ساعات',
  },
  {
    id: 'd3',
    name: 'د. هبة علي',
    specialty: 'التغذية وصحة المرأة',
    rating: 4.7,
    reviewsCount: 312,
    price: 250,
    image: '/assets/avatars/doctor-3.jpg',
    about: 'أخصائية تغذية معتمدة، متخصصة في صحة المرأة وتغذية الحمل...',
    qualifications: ['ماجستير تغذية علاجية'],
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    availableSlots: [
      { date: '2026-03-19', times: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    ],
    isOnline: true,
    nextAvailable: '2026-03-19',
    responseTime: '< 1 ساعة',
  },
  // أضف 7 أطباء تانيين بنفس الشكل...
]
```

### `src/mock/data/trackers.ts`

```typescript
const today = new Date()
const days30 = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(today)
  d.setDate(d.getDate() - (29 - i))
  return d.toISOString().split('T')[0]
})

export const MOCK_MOOD_DATA = days30.map((date, i) => ({
  date,
  mood: [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)],
  // 1=سيء جداً  2=سيء  3=عادي  4=جيد  5=ممتاز
  note: i % 7 === 0 ? 'يوم صعب بسبب الإجهاد' : '',
  factors: ['نوم', 'تمرين', 'طعام'].filter(() => Math.random() > 0.5),
}))

export const MOCK_WEIGHT_DATA = days30
  .filter((_, i) => i % 3 === 0)
  .map((date, i) => ({
    date,
    weight: 68.5 - i * 0.1 + (Math.random() - 0.5) * 0.3,
    bmi: 24.2 - i * 0.04,
  }))

export const MOCK_PERIOD_DATA = {
  lastPeriodStart: '2026-02-15',
  lastPeriodEnd: '2026-02-19',
  cycleLength: 28,
  periodLength: 5,
  nextPeriodExpected: '2026-03-15',
  fertilityWindow: { start: '2026-03-01', end: '2026-03-06' },
  ovulationDay: '2026-03-03',
  history: [
    { start: '2026-02-15', end: '2026-02-19', flow: 'medium', symptoms: ['آلام خفيفة'] },
    { start: '2026-01-18', end: '2026-01-22', flow: 'heavy',  symptoms: ['آلام', 'توتر'] },
    { start: '2025-12-21', end: '2025-12-25', flow: 'light',  symptoms: [] },
  ],
}

export const MOCK_PREGNANCY_DATA = {
  dueDate: '2026-08-15',
  currentWeek: 20,
  babySize: 'موزة',
  babyWeight: '300 جرام',
  babyLength: '25 سم',
  appointments: [
    { date: '2026-03-25', type: 'سونار متابعة', doctor: 'د. سارة أحمد', done: false },
    { date: '2026-04-10', type: 'تحاليل دم', doctor: '', done: false },
  ],
  medications: [
    { name: 'حمض الفوليك', dose: '5mg', frequency: 'يومياً', time: 'صباحاً' },
    { name: 'كالسيوم', dose: '500mg', frequency: 'مرتين يومياً', time: 'بعد الأكل' },
  ],
  kickCount: { today: 12, target: 10, lastRecorded: '18:30' },
  weight: [
    { week: 10, weight: 65.0 },
    { week: 12, weight: 65.8 },
    { week: 16, weight: 67.2 },
    { week: 20, weight: 68.5 },
  ],
}
```

### `src/mock/data/community.ts`

```typescript
export const MOCK_CIRCLES = [
  { id: 'c1', name: 'حوامل',       emoji: '🤰', members: 12450, color: '#FF6B9D' },
  { id: 'c2', name: 'أمهات جدد',   emoji: '👶', members: 9800,  color: '#4ECDC4' },
  { id: 'c3', name: 'مخطوبات',     emoji: '💍', members: 7200,  color: '#A78BFA' },
  { id: 'c4', name: 'صحة المرأة',  emoji: '💪', members: 15600, color: '#F97316' },
  { id: 'c5', name: 'الخصوبة',     emoji: '🌱', members: 5400,  color: '#10B981' },
  { id: 'c6', name: 'ما بعد الولادة', emoji: '🌸', members: 6800, color: '#EC4899' },
]

export const MOCK_POSTS = [
  {
    id: 'p1',
    circleId: 'c1',
    isAnonymous: true,
    anonymousAlias: 'وردة الأمل',
    userLabel: 'حامل في الشهر الخامس',
    content: 'محتاجة مساعدة... الدكتورة قالتلي إن وزني زاد أكتر من اللازم في الشهر ده وأنا مش عارفة أتحكم في أكلي خالص. حد عندها تجربة؟',
    createdAt: '2026-03-18T10:30:00',
    likes: 47, supports: 89, cares: 23, commentsCount: 34,
    tags: ['وزن الحمل', 'تغذية'],
    isPinned: false,
  },
  {
    id: 'p2',
    circleId: 'c2',
    isAnonymous: false,
    userId: 'u3',
    userName: 'نور محمد',
    userAvatar: '/assets/avatars/user-3.jpg',
    userLabel: 'أم لـ 3 أشهر',
    content: 'البيبي بدأ يبتسم النهاردة لأول مرة 😭❤️ مش قادرة أوصف الإحساس ده!',
    createdAt: '2026-03-18T08:15:00',
    likes: 234, supports: 12, cares: 8, commentsCount: 67,
    tags: ['فرحة'],
    isPinned: true,
  },
  {
    id: 'p3',
    circleId: 'c4',
    isAnonymous: true,
    anonymousAlias: 'نجمة الصباح',
    userLabel: 'أنا بس أنا',
    content: 'سؤال محتاجة رأي فيه... الدكتور قالي إن عندي PCOS وإن محتاجة أخس. هل الرياضة هتساعد فعلاً؟',
    createdAt: '2026-03-17T20:00:00',
    likes: 31, supports: 95, cares: 41, commentsCount: 52,
    tags: ['PCOS', 'صحة'],
    isPinned: false,
  },
]

export const MOCK_COMMENTS: Record<string, any[]> = {
  p1: [
    {
      id: 'cm1',
      isAnonymous: false,
      userName: 'ريم أحمد',
      userAvatar: '/assets/avatars/user-5.jpg',
      content: 'أنا كمان كان عندي نفس المشكلة! الحل اللي نفع معايا هو إني قسمت وجباتي لـ 6 وجبات صغيرة بدل 3 كبار.',
      createdAt: '2026-03-18T11:00:00',
      likes: 12,
      replies: [
        {
          id: 'cm1-r1',
          isAnonymous: true,
          anonymousAlias: 'وردة الأمل',
          content: 'جزاكِ الله خيراً يا ريم! هجرب الطريقة دي',
          createdAt: '2026-03-18T11:30:00',
          likes: 3,
        },
      ],
    },
    {
      id: 'cm2',
      isAnonymous: false,
      userName: 'د. هبة علي',
      userAvatar: '/assets/avatars/doctor-3.jpg',
      userLabel: '👩‍⚕️ أخصائية تغذية',
      isExpert: true,
      content: 'كأخصائية تغذية، الطبيعي الزيادة في الشهر الخامس تكون 1.5-2 كيلو. ركزي على البروتين والخضروات وقللي السكريات.',
      createdAt: '2026-03-18T12:00:00',
      likes: 45,
      replies: [],
    },
  ],
}
```

### `src/mock/data/subscriptions.ts`

```typescript
export const MOCK_PLANS = [
  {
    id: 'plan-basic',
    slug: 'widad-basic',
    name: 'وداد Basic',
    monthlyPrice: 0,
    yearlyPrice: null,
    isFree: true,
    badge: null,
    color: '#6B7280',
    features: {
      ai_chat_text: 'limited',      // 5 رسائل/يوم
      ai_chat_voice: false,
      free_consultations_monthly: 0,
      consultation_discount: 0,
      ai_weekly_reports: false,
      ai_custom_journey: false,
      priority_support: false,
    },
    featuresList: [
      { text: 'مقالات طبية محدودة',       included: true  },
      { text: 'AI Chat — 5 رسائل يومياً', included: true  },
      { text: 'أدوات صحة أساسية',          included: true  },
      { text: 'مجتمع فضفضة',               included: true  },
      { text: 'استشارة مجانية شهرياً',     included: false },
      { text: 'AI بالصوت',                 included: false },
      { text: 'تقارير AI أسبوعية',         included: false },
    ],
  },
  {
    id: 'plan-plus',
    slug: 'widad-plus',
    name: 'وداد Plus',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    isFree: false,
    badge: 'الأكثر شعبية ⭐',
    color: '#EC4899',
    features: {
      ai_chat_text: 'unlimited',
      ai_chat_voice: true,
      free_consultations_monthly: 1,
      consultation_discount: 20,
      ai_weekly_reports: false,
      ai_custom_journey: false,
      priority_support: false,
    },
    featuresList: [
      { text: 'محتوى طبي كامل',            included: true  },
      { text: 'AI Chat غير محدود',         included: true  },
      { text: 'AI Chat بالصوت',            included: true  },
      { text: 'استشارة مجانية / شهر',      included: true  },
      { text: 'خصم 20% على الاستشارات',    included: true  },
      { text: 'تقارير AI أسبوعية',         included: false },
      { text: 'رحلة AI مخصصة',             included: false },
    ],
  },
  {
    id: 'plan-pro',
    slug: 'widad-pro',
    name: 'وداد Pro',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    isFree: false,
    badge: null,
    color: '#8B5CF6',
    features: {
      ai_chat_text: 'unlimited',
      ai_chat_voice: true,
      free_consultations_monthly: 3,
      consultation_discount: 20,
      ai_weekly_reports: true,
      ai_custom_journey: false,
      priority_support: false,
    },
    featuresList: [
      { text: 'كل مميزات Plus',            included: true  },
      { text: '3 استشارات مجانية / شهر',   included: true  },
      { text: 'تقارير AI صحية أسبوعية',    included: true  },
      { text: 'أدوات صحة متقدمة',          included: true  },
      { text: 'أولوية في الدعم',           included: false },
      { text: 'رحلة AI مخصصة',             included: false },
    ],
  },
  {
    id: 'plan-pro-plus',
    slug: 'widad-pro-plus',
    name: 'وداد Pro+',
    monthlyPrice: 449,
    yearlyPrice: 4490,
    isFree: false,
    badge: 'VIP 👑',
    color: '#F59E0B',
    features: {
      ai_chat_text: 'unlimited',
      ai_chat_voice: true,
      free_consultations_monthly: 5,
      consultation_discount: 25,
      ai_weekly_reports: true,
      ai_custom_journey: true,
      priority_support: true,
    },
    featuresList: [
      { text: 'كل مميزات Pro',              included: true },
      { text: '5 استشارات مجانية / شهر',    included: true },
      { text: 'خصم 25% على الاستشارات',     included: true },
      { text: 'رحلة AI مخصصة',              included: true },
      { text: 'دعم أولوية 24/7',            included: true },
      { text: 'وصول مبكر لمميزات جديدة',    included: true },
    ],
  },
]

export const MOCK_CURRENT_SUBSCRIPTION = {
  planId: 'plan-plus',
  planName: 'وداد Plus',
  billingCycle: 'monthly' as const,
  pricePaid: 149,
  startsAt: '2026-03-01',
  endsAt: '2026-04-01',
  status: 'active' as const,
  autoRenew: true,
  freeConsultationsUsed: 0,
  freeConsultationsTotal: 1,
}

export const MOCK_INVOICES = [
  {
    id: 'inv-001',
    number: 'INV-2026-000045',
    date: '2026-03-01',
    description: 'وداد Plus — شهري',
    amount: 149,
    status: 'paid' as const,
  },
  {
    id: 'inv-002',
    number: 'INV-2026-000021',
    date: '2026-02-01',
    description: 'وداد Plus — شهري',
    amount: 149,
    status: 'paid' as const,
  },
]
```

### `src/mock/services/auth.mock.ts`

```typescript
import { delay } from '../delay'

export const DEMO_ACCOUNTS = {
  patient: { email: 'patient@widad.com', password: 'demo123', role: 'patient' as const },
  doctor:  { email: 'doctor@widad.com',  password: 'demo123', role: 'doctor'  as const },
  admin:   { email: 'admin@widad.com',   password: 'demo123', role: 'admin'   as const },
}

export const authMock = {
  login: async (email: string, _password: string) => {
    await delay()
    const account = Object.values(DEMO_ACCOUNTS).find(a => a.email === email)
    if (!account) throw new Error('البريد الإلكتروني أو كلمة المرور غلط')
    return {
      token: `mock-token-${account.role}-${Date.now()}`,
      role: account.role,
      user: getMockUser(account.role),
    }
  },

  register: async (_data: unknown) => {
    await delay(800)
    return { success: true, message: 'تم إرسال كود التحقق على رقمك' }
  },

  verifyOTP: async (_otp: string) => {
    await delay(600)
    return { success: true } // أي OTP يشتغل في الـ mock
  },
}

function getMockUser(role: 'patient' | 'doctor' | 'admin') {
  const users = {
    patient: {
      id: 'u1',
      name: 'سارة محمد',
      email: 'patient@widad.com',
      avatar: '/assets/avatars/patient-1.jpg',
      phone: '+20 100 123 4567',
      lifeStage: 'pregnancy',
    },
    doctor: {
      id: 'd1',
      name: 'د. سارة أحمد',
      email: 'doctor@widad.com',
      avatar: '/assets/avatars/doctor-1.jpg',
      specialty: 'أمراض النساء والتوليد',
    },
    admin: {
      id: 'a1',
      name: 'أدمن وداد',
      email: 'admin@widad.com',
      avatar: '/assets/avatars/admin-1.jpg',
    },
  }
  return users[role]
}
```

---

## 🔐 Auth & Routing

### `src/store/auth.store.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authMock } from '../mock/services/auth.mock'

type Role = 'patient' | 'doctor' | 'admin'

interface AuthStore {
  user: any | null
  token: string | null
  role: Role | null
  isAuth: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, token: null, role: null,
      isAuth: false, isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await authMock.login(email, password)
          set({ user: res.user, token: res.token, role: res.role, isAuth: true })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () =>
        set({ user: null, token: null, role: null, isAuth: false }),
    }),
    {
      name: 'widad-auth',
      partialize: (s) => ({ token: s.token, role: s.role, user: s.user }),
    }
  )
)
```

### `src/components/auth/ProtectedRoute.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function ProtectedRoute({ role }: { role: 'patient' | 'doctor' | 'admin' }) {
  const { isAuth, role: userRole } = useAuthStore()

  if (!isAuth)            return <Navigate to="/auth" replace />
  if (userRole !== role)  return <Navigate to={`/${userRole}/dashboard`} replace />

  return <Outlet />
}
```

### `src/App.tsx` — Routes الكاملة (60 route)

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { GuidelinesGuard } from './components/auth/GuidelinesGuard'

// ─── Public ───────────────────────────────────────
const LandingPage      = lazy(() => import('./pages/public/LandingPage'))
const AboutUs          = lazy(() => import('./pages/public/AboutUs'))
const LifeStages       = lazy(() => import('./pages/public/LifeStages'))
const ContactUs        = lazy(() => import('./pages/public/ContactUs'))

// ─── Auth ──────────────────────────────────────────
const RoleSelect       = lazy(() => import('./pages/auth/RoleSelect'))
const PatientLogin     = lazy(() => import('./pages/auth/PatientLogin'))
const PatientRegister  = lazy(() => import('./pages/auth/PatientRegister'))
const VerifyOTP        = lazy(() => import('./pages/auth/VerifyOTP'))
const ResetPassword    = lazy(() => import('./pages/auth/ResetPassword'))
const DoctorLogin      = lazy(() => import('./pages/auth/DoctorLogin'))
const AdminLogin       = lazy(() => import('./pages/auth/AdminLogin'))
const DemoLogin        = lazy(() => import('./pages/auth/DemoLogin'))

// ─── Patient ───────────────────────────────────────
const PatientDashboard    = lazy(() => import('./pages/patient/Dashboard'))
const Notifications       = lazy(() => import('./pages/patient/Notifications'))
const ProfilePage         = lazy(() => import('./pages/patient/profile/ProfilePage'))
const TrackersHub         = lazy(() => import('./pages/patient/trackers/TrackersHub'))
const MoodTracker         = lazy(() => import('./pages/patient/trackers/MoodTracker'))
const WeightTracker       = lazy(() => import('./pages/patient/trackers/WeightTracker'))
const PeriodTracker       = lazy(() => import('./pages/patient/trackers/PeriodTracker'))
const FertilityTracker    = lazy(() => import('./pages/patient/trackers/FertilityTracker'))
const PregnancyTracker    = lazy(() => import('./pages/patient/trackers/PregnancyTracker'))
const DoctorSearch        = lazy(() => import('./pages/patient/consultations/DoctorSearch'))
const DoctorProfile       = lazy(() => import('./pages/patient/consultations/DoctorProfile'))
const BookConsultation    = lazy(() => import('./pages/patient/consultations/BookConsultation'))
const ConsultationsList   = lazy(() => import('./pages/patient/consultations/ConsultationsList'))
const ConsultationDetail  = lazy(() => import('./pages/patient/consultations/ConsultationDetail'))
const AiChat              = lazy(() => import('./pages/patient/ai/AiChat'))
const RiskAssessment      = lazy(() => import('./pages/patient/ai/RiskAssessment'))
const FetalAnalysis       = lazy(() => import('./pages/patient/ai/FetalAnalysis'))
const CommunityFeed       = lazy(() => import('./pages/patient/community/CommunityFeed'))
const CirclePage          = lazy(() => import('./pages/patient/community/CirclePage'))
const PostDetail          = lazy(() => import('./pages/patient/community/PostDetail'))
const CreatePost          = lazy(() => import('./pages/patient/community/CreatePost'))
const SavedPosts          = lazy(() => import('./pages/patient/community/SavedPosts'))
const Guidelines          = lazy(() => import('./pages/patient/community/Guidelines'))
const PricingPage         = lazy(() => import('./pages/patient/subscriptions/PricingPage'))
const Checkout            = lazy(() => import('./pages/patient/subscriptions/Checkout'))
const MySubscription      = lazy(() => import('./pages/patient/subscriptions/MySubscription'))
const Invoices            = lazy(() => import('./pages/patient/subscriptions/Invoices'))
const ArticlesList        = lazy(() => import('./pages/patient/articles/ArticlesList'))
const ArticleDetail       = lazy(() => import('./pages/patient/articles/ArticleDetail'))

// ─── Doctor ────────────────────────────────────────
const DoctorDashboard     = lazy(() => import('./pages/doctor/Dashboard'))
const DoctorConsultations = lazy(() => import('./pages/doctor/Consultations'))
const DoctorConDetail     = lazy(() => import('./pages/doctor/ConsultationDetail'))
const DoctorPatients      = lazy(() => import('./pages/doctor/Patients'))
const PatientEHR          = lazy(() => import('./pages/doctor/PatientEHR'))
const DoctorArticles      = lazy(() => import('./pages/doctor/Articles'))
const DoctorCalendar      = lazy(() => import('./pages/doctor/Calendar'))
const DoctorProfile       = lazy(() => import('./pages/doctor/Profile'))
const DoctorFinancials    = lazy(() => import('./pages/doctor/Financials'))

// ─── Admin ─────────────────────────────────────────
const AdminDashboard      = lazy(() => import('./pages/admin/Dashboard'))
const AdminPatients       = lazy(() => import('./pages/admin/Patients'))
const AdminDoctors        = lazy(() => import('./pages/admin/Doctors'))
const AdminConsultations  = lazy(() => import('./pages/admin/Consultations'))
const AdminArticles       = lazy(() => import('./pages/admin/Articles'))
const AdminFinancial      = lazy(() => import('./pages/admin/Financial'))
const AdminCommunity      = lazy(() => import('./pages/admin/Community'))
const AdminSubscriptions  = lazy(() => import('./pages/admin/Subscriptions'))
const AdminAnalytics      = lazy(() => import('./pages/admin/Analytics'))
const AdminSettings       = lazy(() => import('./pages/admin/Settings'))

// ──────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: false } },
})

const Fallback = () => (
  <div className="h-screen grid place-items-center text-gray-400">
    جاري التحميل...
  </div>
)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>

            {/* ══ Public ══ */}
            <Route path="/"                          element={<LandingPage />} />
            <Route path="/about"                     element={<AboutUs />} />
            <Route path="/life-stages"               element={<LifeStages />} />
            <Route path="/contact"                   element={<ContactUs />} />

            {/* ══ Auth ══ */}
            <Route path="/auth"                      element={<RoleSelect />} />
            <Route path="/auth/patient/login"        element={<PatientLogin />} />
            <Route path="/auth/patient/register"     element={<PatientRegister />} />
            <Route path="/auth/patient/otp"          element={<VerifyOTP />} />
            <Route path="/auth/patient/reset"        element={<ResetPassword />} />
            <Route path="/auth/doctor/login"         element={<DoctorLogin />} />
            <Route path="/auth/admin/login"          element={<AdminLogin />} />   {/* ✅ مضاف */}
            <Route path="/demo"                      element={<DemoLogin />} />    {/* ✅ كل الأكونتس */}

            {/* ══ Patient — protected ══ */}
            <Route element={<ProtectedRoute role="patient" />}>
              <Route element={<PatientLayout />}>

                <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />

                {/* Core */}
                <Route path="/patient/dashboard"           element={<PatientDashboard />} />
                <Route path="/patient/notifications"       element={<Notifications />} />        {/* ✅ مضاف */}
                <Route path="/patient/profile/*"           element={<ProfilePage />} />

                {/* Trackers */}
                <Route path="/patient/trackers"            element={<TrackersHub />} />
                <Route path="/patient/trackers/mood"       element={<MoodTracker />} />
                <Route path="/patient/trackers/weight"     element={<WeightTracker />} />
                <Route path="/patient/trackers/period"     element={<PeriodTracker />} />
                <Route path="/patient/trackers/fertility"  element={<FertilityTracker />} />
                <Route path="/patient/trackers/pregnancy"  element={<PregnancyTracker />} />

                {/* Consultations */}
                <Route path="/patient/doctors"             element={<DoctorSearch />} />
                <Route path="/patient/doctors/:id"         element={<DoctorProfile />} />
                <Route path="/patient/book/:id"            element={<BookConsultation />} />
                <Route path="/patient/consultations"       element={<ConsultationsList />} />
                <Route path="/patient/consultations/:id"   element={<ConsultationDetail />} />

                {/* AI */}
                <Route path="/patient/ai"                  element={<AiChat />} />
                <Route path="/patient/risk"                element={<RiskAssessment />} />
                <Route path="/patient/fetal"               element={<FetalAnalysis />} />

                {/* Community — GuidelinesGuard يعرض Guidelines أول مرة */}
                <Route element={<GuidelinesGuard />}>
                  <Route path="/patient/community"              element={<CommunityFeed />} />
                  <Route path="/patient/community/circles/:id"  element={<CirclePage />} />
                  <Route path="/patient/community/post/:id"     element={<PostDetail />} />
                  <Route path="/patient/community/create"       element={<CreatePost />} />
                  <Route path="/patient/community/saved"        element={<SavedPosts />} />  {/* ✅ مضاف */}
                </Route>
                <Route path="/patient/community/guidelines" element={<Guidelines />} />       {/* ✅ مضاف */}

                {/* Subscriptions */}
                <Route path="/patient/plans"               element={<PricingPage />} />
                <Route path="/patient/checkout"            element={<Checkout />} />
                <Route path="/patient/subscription"        element={<MySubscription />} />
                <Route path="/patient/invoices"            element={<Invoices />} />

                {/* Articles */}
                <Route path="/patient/articles"            element={<ArticlesList />} />
                <Route path="/patient/articles/:id"        element={<ArticleDetail />} />

              </Route>
            </Route>

            {/* ══ Doctor — protected ══ */}
            <Route element={<ProtectedRoute role="doctor" />}>
              <Route element={<DoctorLayout />}>

                <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />

                <Route path="/doctor/dashboard"           element={<DoctorDashboard />} />
                <Route path="/doctor/consultations"       element={<DoctorConsultations />} />
                <Route path="/doctor/consultations/:id"   element={<DoctorConDetail />} />
                <Route path="/doctor/patients"            element={<DoctorPatients />} />
                <Route path="/doctor/patients/:id/ehr"   element={<PatientEHR />} />
                <Route path="/doctor/articles"            element={<DoctorArticles />} />
                <Route path="/doctor/calendar"            element={<DoctorCalendar />} />   {/* ✅ مضاف */}
                <Route path="/doctor/profile"             element={<DoctorProfile />} />
                <Route path="/doctor/financials"          element={<DoctorFinancials />} />

              </Route>
            </Route>

            {/* ══ Admin — protected ══ */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<AdminLayout />}>

                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

                <Route path="/admin/dashboard"       element={<AdminDashboard />} />
                <Route path="/admin/patients"        element={<AdminPatients />} />
                <Route path="/admin/doctors"         element={<AdminDoctors />} />
                <Route path="/admin/consultations"   element={<AdminConsultations />} />
                <Route path="/admin/articles"        element={<AdminArticles />} />
                <Route path="/admin/financial"       element={<AdminFinancial />} />
                <Route path="/admin/community"       element={<AdminCommunity />} />
                <Route path="/admin/subscriptions"   element={<AdminSubscriptions />} />
                <Route path="/admin/analytics"       element={<AdminAnalytics />} />       {/* ✅ مضاف */}
                <Route path="/admin/settings"        element={<AdminSettings />} />

              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
```

---

## 🩹 الأجزاء المضافة — 6 أجزاء كانت ناقصة

### 1. Life Stage Redirect Logic — Dashboard يتغير حسب المرحلة

```tsx
// src/pages/patient/Dashboard.tsx
// المنطق: بناءً على lifeStage في الـ user يعرض sections مختلفة

import { useAuthStore } from '../../store/auth.store'
import type { LifeStage } from '../../mock/data/accounts'

// خريطة: كل مرحلة → الـ sections اللي تظهر
const STAGE_CONFIG: Record<LifeStage, {
  heroSection: string
  showTrackers: string[]
  showAIModels: string[]
  communityCircle: string
  suggestedDoctors: string[]
}> = {
  pre_marriage: {
    heroSection:      'استعدي لمرحلة جديدة',
    showTrackers:     ['mood', 'weight', 'period'],
    showAIModels:     [],                              // لا يوجد AI risk لهذه المرحلة
    communityCircle:  'c3',                            // دائرة المخطوبات
    suggestedDoctors: ['أمراض النساء', 'التغذية'],
  },
  marriage: {
    heroSection:      'متابعة صحتك اليومية',
    showTrackers:     ['mood', 'weight', 'period', 'fertility', 'pregnancy'],
    showAIModels:     ['ptb', 'pe', 'gdm'],            // كل نماذج الـ Risk
    communityCircle:  'c1',                            // دائرة الحوامل
    suggestedDoctors: ['أمراض النساء', 'التوليد', 'التغذية'],
  },
  post_marriage: {
    heroSection:      'رحلة الأمومة',
    showTrackers:     ['mood', 'weight'],
    showAIModels:     [],
    communityCircle:  'c2',                            // دائرة الأمهات الجدد
    suggestedDoctors: ['طب الأطفال', 'التغذية', 'الصحة النفسية'],
  },
}

export default function PatientDashboard() {
  const user   = useAuthStore((s) => s.user)
  const stage  = (user?.lifeStage ?? 'marriage') as LifeStage
  const config = STAGE_CONFIG[stage]
  const stats  = user?.mockData?.dashboardStats
  const sub    = user?.mockData?.subscription

  return (
    <div className="space-y-6">
      {/* Hero greeting — يتغير حسب المرحلة */}
      <HeroSection title={config.heroSection} user={user} />

      {/* AI Risk Alert — يظهر فقط لأكونتس marriage.pro و marriage.proplus */}
      {stats?.riskFlag && (
        <AIRiskAlert type={stats.riskType} level={stats.riskLevel} />
      )}

      {/* Subscription usage — يظهر فقط للباقات المدفوعة */}
      {sub && !sub.plan?.includes('Basic') && (
        <SubscriptionBanner subscription={sub} />
      )}

      {/* Stats Row */}
      <StatsRow stats={stats} stage={stage} />

      {/* Trackers — حسب المرحلة */}
      <ActiveTrackers trackers={config.showTrackers} stage={stage} />

      {/* Upcoming Consultation */}
      {stats?.nextConsultation && (
        <UpcomingCard datetime={stats.nextConsultation} />
      )}

      {/* Custom Journey — Pro+ فقط */}
      {sub?.customJourneyEnabled && user?.mockData?.customJourney && (
        <CustomJourneyCard journey={user.mockData.customJourney} />
      )}

      {/* Weekly Report — Pro و Pro+ */}
      {sub?.weeklyReportEnabled && (
        <WeeklyReportCard stage={stage} />
      )}

      {/* Suggested Doctors */}
      <SuggestedDoctors specialties={config.suggestedDoctors} />

      {/* Community Highlight */}
      <CommunityHighlight circleId={config.communityCircle} />
    </div>
  )
}
```

---

### 2. Notifications Page — `src/pages/patient/Notifications.tsx`

```tsx
// Mock notifications — كل نوع بأيقونة ولون مختلف
export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'consultation',         // 📅 استشارة
    title: 'استشارتك القادمة غداً',
    body: 'د. سارة أحمد — الساعة 10:00 صباحاً',
    time: '2026-03-19T08:00:00',
    isRead: false,
    actionUrl: '/patient/consultations/c1',
  },
  {
    id: 'n2',
    type: 'ai_risk',              // 🚨 تنبيه AI
    title: 'تنبيه صحي من وداد AI',
    body: 'ضغط الدم أعلى من الطبيعي — راجعي دكتورتك',
    time: '2026-03-18T14:30:00',
    isRead: false,
    actionUrl: '/patient/risk',
    priority: 'high',
  },
  {
    id: 'n3',
    type: 'subscription',         // 💳 اشتراك
    title: 'تجديد اشتراكك قريباً',
    body: 'وداد Plus ينتهي في 3 أيام — جددي الآن',
    time: '2026-03-18T09:00:00',
    isRead: true,
    actionUrl: '/patient/subscription',
  },
  {
    id: 'n4',
    type: 'community',            // 💬 مجتمع
    title: 'رد على منشورك',
    body: 'د. هبة علي ردّت على سؤالك في فضفضة',
    time: '2026-03-17T20:00:00',
    isRead: true,
    actionUrl: '/patient/community/post/p1',
  },
  {
    id: 'n5',
    type: 'tracker',              // 📊 tracker
    title: 'تذكير: سجّلي وزنك اليوم',
    body: 'آخر تسجيل كان منذ 3 أيام',
    time: '2026-03-17T08:00:00',
    isRead: true,
    actionUrl: '/patient/trackers/weight',
  },
  {
    id: 'n6',
    type: 'weekly_report',        // 📋 تقرير أسبوعي (Pro+)
    title: 'تقريرك الأسبوعي جاهز',
    body: 'ملخص صحتك هذا الأسبوع — اضغطي للقراءة',
    time: '2026-03-16T10:00:00',
    isRead: true,
    actionUrl: '/patient/ai',
  },
]

// NotificationsPage — عرض + mark as read + تصفية بالنوع
export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>('all')
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))

  return (
    <div>
      <PageHeader
        title={`الإشعارات ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
        action={<button onClick={markAllRead}>تحديد الكل كمقروء</button>}
      />
      <NotificationFilters value={filter} onChange={setFilter} />
      {filtered.length === 0
        ? <EmptyState message="لا توجد إشعارات" />
        : filtered.map(n => <NotificationItem key={n.id} notification={n} />)
      }
    </div>
  )
}
```

---

### 3. SavedPosts Page — `src/pages/patient/community/SavedPosts.tsx`

```tsx
// mock data — محفوظات المجتمع
export const MOCK_SAVED_POSTS = [
  {
    savedAt: '2026-03-17T15:00:00',
    post: MOCK_POSTS[0],   // وردة الأمل — وزن الحمل
  },
  {
    savedAt: '2026-03-16T10:00:00',
    post: MOCK_POSTS[1],   // نور محمد — ابتسامة البيبي
  },
]

export default function SavedPostsPage() {
  // حذف من المحفوظات محلياً في الـ state
  const [saved, setSaved] = useState(MOCK_SAVED_POSTS)

  const unsave = (postId: string) =>
    setSaved(prev => prev.filter(s => s.post.id !== postId))

  return (
    <div>
      <PageHeader title="المنشورات المحفوظة" />
      {saved.length === 0
        ? <EmptyState message="لم تحفظي أي منشور بعد" icon="🔖" />
        : saved.map(({ post, savedAt }) => (
            <PostCard
              key={post.id}
              post={post}
              showUnsaveButton
              savedAt={savedAt}
              onUnsave={() => unsave(post.id)}
            />
          ))
      }
    </div>
  )
}
```

---

### 4. Community Guidelines — `src/pages/patient/community/Guidelines.tsx`

```tsx
// GuidelinesGuard — يفحص إذا كانت المستخدمة قبلت الشروط
// src/components/auth/GuidelinesGuard.tsx

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function GuidelinesGuard() {
  const user = useAuthStore((s) => s.user)

  // لو ما قبلتش الشروط → ابعتها لشاشة الشروط
  if (!user?.communityGuidelinesAccepted) {
    return <Navigate to="/patient/community/guidelines" replace />
  }
  return <Outlet />
}
```

```tsx
// Guidelines.tsx — شاشة قبول الشروط
export default function CommunityGuidelines() {
  const updateUser = useAuthStore((s) => s.setUser)
  const user       = useAuthStore((s) => s.user)
  const navigate   = useNavigate()

  const handleAccept = () => {
    // في الـ mock نحدث الـ user state محلياً
    updateUser({ ...user, communityGuidelinesAccepted: true })
    navigate('/patient/community')
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1>قواعد مجتمع فضفضة 🌸</h1>
      <div className="space-y-4 text-gray-600">
        <Rule icon="🤝" title="الاحترام المتبادل"
          text="تعاملي مع كل عضوة باحترام — لا مكان للإساءة أو التنمر" />
        <Rule icon="🔒" title="الخصوصية والسرية"
          text="ما يُشارك في المجتمع يبقى فيه — لا تشاركي تفاصيل الأخريات خارجه" />
        <Rule icon="💊" title="المعلومات الطبية"
          text="المحتوى للتوعية فقط — القرار الطبي دايماً للدكتور" />
        <Rule icon="🚨" title="المحتوى الضار"
          text="البلاغ عن أي محتوى مسيء فرض على كل عضوة — نحافظ على الأمان معاً" />
        <Rule icon="🎭" title="النشر المجهول"
          text="حقك في النشر بدون اسمك محفوظ — لكن مع المسؤولية الكاملة" />
      </div>
      <button
        onClick={handleAccept}
        className="mt-8 w-full bg-pink-500 text-white py-3 rounded-xl font-bold"
      >
        أوافق على قواعد المجتمع وأنضم الآن 🌸
      </button>
    </div>
  )
}
```

---

### 5. Doctor Calendar — `src/pages/doctor/Calendar.tsx`

```tsx
// Mock data لجدول الطبيب
export const MOCK_DOCTOR_CALENDAR = {
  workingHours: {
    sunday:    { start: '09:00', end: '17:00', active: true  },
    monday:    { start: '09:00', end: '17:00', active: true  },
    tuesday:   { start: '09:00', end: '14:00', active: true  },
    wednesday: { start: '09:00', end: '17:00', active: true  },
    thursday:  { start: '09:00', end: '14:00', active: true  },
    friday:    { start: null,    end: null,    active: false },
    saturday:  { start: null,    end: null,    active: false },
  },
  blockedDates: [
    { date: '2026-03-25', reason: 'إجازة' },
    { date: '2026-03-26', reason: 'مؤتمر طبي' },
  ],
  upcomingConsultations: [
    { date: '2026-03-20', time: '10:00', patient: 'سارة محمد',  type: 'فيديو' },
    { date: '2026-03-20', time: '11:00', patient: 'فاطمة علي',  type: 'صوت'   },
    { date: '2026-03-21', time: '09:00', patient: 'مروة أحمد',  type: 'فيديو' },
    { date: '2026-03-23', time: '14:00', patient: 'هناء إبراهيم', type: 'نص'  },
  ],
}

// DoctorCalendar Component:
// - Calendar شهري يعرض الأيام المحجوزة والمتاحة
// - Sidebar: Working Hours editor (يعدّل محلياً في الـ state)
// - Block Date: يضيف تاريخ إجازة
// - كل التغييرات mock محلية — لا backend
```

---

### 6. Admin Analytics — `src/pages/admin/Analytics.tsx`

```tsx
// Mock analytics data مفصّلة
export const MOCK_ANALYTICS = {
  userGrowth: [
    { month: 'أكتوبر', users: 1200, doctors: 18 },
    { month: 'نوفمبر', users: 2100, doctors: 24 },
    { month: 'ديسمبر', users: 3800, doctors: 31 },
    { month: 'يناير',  users: 6200, doctors: 45 },
    { month: 'فبراير', users: 9800, doctors: 67 },
    { month: 'مارس',   users: 15420, doctors: 89 },
  ],
  lifeStageBreakdown: [
    { stage: 'قبل الزواج',  users: 4200, percent: 27 },
    { stage: 'مرحلة الزواج', users: 7100, percent: 46 },
    { stage: 'بعد الجواز',   users: 4120, percent: 27 },
  ],
  planBreakdown: [
    { plan: 'Basic',  count: 8900, revenue: 0,      color: '#6B7280' },
    { plan: 'Plus',   count: 4200, revenue: 625800, color: '#EC4899' },
    { plan: 'Pro',    count: 2100, revenue: 627900, color: '#8B5CF6' },
    { plan: 'Pro+',   count: 890,  revenue: 399610, color: '#F59E0B' },
  ],
  topSpecialties: [
    { name: 'أمراض النساء', consultations: 3240, revenue: 84240 },
    { name: 'طب الأطفال',   consultations: 1890, revenue: 56700 },
    { name: 'التغذية',       consultations: 1560, revenue: 31200 },
    { name: 'الصحة النفسية', consultations: 980,  revenue: 24500 },
  ],
  communityStats: {
    totalPosts:     8920,
    totalComments:  34200,
    reportsResolved: 98,       // %
    avgResponseTime: '8 دقائق',
  },
  aiUsage: {
    totalChatMessages:  145000,
    voiceMessages:      12400,
    riskAssessments:    3200,
    fetalAnalyses:      890,
  },
}

// 4 Recharts في الصفحة:
// 1. UserGrowth — LineChart (users + doctors)
// 2. LifeStageBreakdown — PieChart
// 3. PlanBreakdown — BarChart (count + revenue)
// 4. TopSpecialties — HorizontalBarChart
```

---

### Mock Data للأجزاء الجديدة — أضفها لـ `accounts.ts`

```typescript
// أضف هذا للـ user object في كل أكونت patient
communityGuidelinesAccepted: true,   // false فقط في pre.basic لإظهار شاشة الشروط

// أضف للأكونت pre.basic@widad.com خصيصاً:
communityGuidelinesAccepted: false,  // ← سيُوجَّه لشاشة Guidelines أول مرة
```

```typescript
// src/mock/data/notifications.ts
// أضف MOCK_NOTIFICATIONS لكل أكونت حسب حالته:
// - marriage.pro → notification بـ AI risk alert + priority: 'high'
// - post.plus    → notification Mood trend improvement
// - pre.proplus  → notification weekly report ready
```

### Dashboard

```tsx
// البيانات كلها من: mock/services/patient.mock.ts
// المكونات:
// <StatsRow />           ← 4 بطاقات (استشارات / موعد قادم / أسبوع الحمل / وزن)
// <UpcomingCard />       ← الاستشارة القادمة + زر Join
// <HealthSummary />      ← آخر Mood + Weight + Period
// <QuickActions />       ← حجز / AI Chat / تسجيل قياس
// <RecommendedDoctors /> ← 3 أطباء مقترحين
// <RecentArticles />     ← آخر 3 مقالات
// <AIRiskAlert />        ← يظهر لو في نتيجة تحتاج انتباه
```

### Trackers

| الـ Tracker | Mock Data | Charts |
|-------------|-----------|--------|
| **Mood** | `MOCK_MOOD_DATA` 30 يوم | Bar Chart (5 ألوان) + Trend Line |
| **Weight** | `MOCK_WEIGHT_DATA` 10 قياسات | Line Chart + BMI badge + Goal line |
| **Period** | `MOCK_PERIOD_DATA` | PeriodCalendar + توقع الدورة القادمة |
| **Fertility** | BBT + مخاط يومي | BBT Line Chart + نافذة خصوبة ملوّنة |
| **Pregnancy** | `MOCK_PREGNANCY_DATA` | Timeline أسبوعي + Kick Counter |

### Doctor Booking — 6 خطوات

```
DoctorSearch → DoctorProfile → SlotPicker → BookingForm → MockPayment → Confirmation
     ↑               ↑               ↑             ↑            ↑              ↑
  Filter UI    Reviews + Bio    Calendar      Notes +       أي بيانات     ملخص +
  (specialty,  مؤهلات وهمية   MOCK_DOCTORS   session type   تنجح دايماً  Add to Calendar
  price, rate)                  slots
```

### AI Chat

```typescript
// Mock Responses — ردود حسب الكلمات المفتاحية
const MOCK_AI_RESPONSES: Record<string, string[]> = {
  'دوخة':  ['الدوخة في الحمل شائعة جداً، خصوصاً في الثلث الأول...'],
  'وزن':   ['زيادة الوزن الطبيعية في الحمل بين 11-16 كيلو...'],
  'ألم':   ['لو الألم مستمر أكتر من ساعة، لازم تتصلي بدكتورتك فوراً...'],
  'default': [
    'أنا وداد، مساعدتك الصحية! 🌸',
    'سؤال مهم جداً. المعلومة العامة هي...',
    'أنصحك دايماً تستشيري دكتورتك، بس هقولك...',
  ],
}

// Voice — Web Speech API (يشتغل على Chrome فقط)
// recognition.lang = 'ar-EG'
// SpeechSynthesis للرد بالصوت
// TypingIndicator — 3 نقاط أثناء "التفكير" (delay 1.5s)
```

---

## 👨‍⚕️ Doctor Portal

### Doctor Dashboard

```
Stats Row:
  استشارات اليوم (5)  |  هذا الشهر (47)  |  التقييم (4.9⭐)  |  الإيراد (12,500 ج.م)

Today's Schedule:
  قائمة MOCK_CONSULTATIONS المفلترة لليوم

Pending Requests:
  طلبات انتظار القبول مع قبول/رفض (يغيّر الـ state محلياً)

Weekly Chart:
  Recharts Bar — الاستشارات آخر 7 أيام
```

### PatientEHR

```typescript
// بيانات EHR وهمية لكل مريضة تُبنى من MOCK_PATIENTS
const MOCK_EHR_u1 = {
  vitals:       { bp: '120/80', weight: 68.5, height: 165, bmi: 25.2 },
  allergies:    ['بنسلين'],
  conditions:   ['PCOS خفيف'],
  medications:  ['حمض الفوليك 5mg', 'كالسيوم 500mg'],
  reports: [
    { date: '2026-03-10', type: 'تحليل دم', summary: 'هيموجلوبين 11.5 — خفيف أنيميا' },
  ],
  consultationHistory: [...], // من MOCK_CONSULTATIONS
}
```

---

## ⚙️ Admin Dashboard

```typescript
export const MOCK_ADMIN_STATS = {
  overview: {
    totalUsers: 15420,     newUsersToday: 47,
    totalDoctors: 234,     pendingApproval: 8,
    monthlyRevenue: 184500, revenueGrowth: '+23%',
    activeSubscriptions: 3240,
    communityReports: 12,
  },
  revenueChart: [
    { month: 'أكتوبر', revenue: 95000  },
    { month: 'نوفمبر', revenue: 112000 },
    { month: 'ديسمبر', revenue: 134000 },
    { month: 'يناير',  revenue: 145000 },
    { month: 'فبراير', revenue: 168000 },
    { month: 'مارس',   revenue: 184500 },
  ],
  subscriptionBreakdown: [
    { plan: 'Basic',  count: 8900, color: '#6B7280' },
    { plan: 'Plus',   count: 4200, color: '#EC4899' },
    { plan: 'Pro',    count: 2100, color: '#8B5CF6' },
    { plan: 'Pro+',   count: 890,  color: '#F59E0B' },
  ],
}
```

---

## 💳 Subscription System

### Pricing Page Layout

```
┌──────────────────────────────────────────┐
│    شهري  ●───────────○  سنوي (وفري 17%) │  ← PricingToggle
└──────────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Basic   │ │  Plus ⭐ │ │   Pro    │ │  Pro+ 👑 │
│  مجاني   │ │ 149 ج.م  │ │ 299 ج.م  │ │ 449 ج.م  │
│  ──────  │ │ ══════   │ │  ──────  │ │  ──────  │
│  ✅ ...  │ │  ✅ ...  │ │  ✅ ...  │ │  ✅ ...  │
│  ❌ ...  │ │  ✅ ...  │ │  ✅ ...  │ │  ✅ ...  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
                  ↓ اضغط اشترك
         Checkout (4 steps mock)
         1. مراجعة + Promo Code
         2. طريقة الدفع (Visa / Wallet)
         3. تأكيد
         4. ✅ تم الدفع بنجاح!
```

### FeatureGate Component

```tsx
// يُلف أي feature مدفوعة
export function FeatureGate({ feature, children }: Props) {
  const { subscription } = useSubscription()

  if (!subscription?.features[feature]) {
    return <UpgradePrompt feature={feature} />
  }
  return <>{children}</>
}

// الاستخدام في أي صفحة:
<FeatureGate feature="ai_chat_voice">
  <VoiceButton onTranscript={handleTranscript} />
</FeatureGate>

<FeatureGate feature="ai_weekly_reports">
  <WeeklyReportSection />
</FeatureGate>
```

---

## 💬 Community فضفضة

### Feed Layout

```
🔍 ابحثي...                    [+ منشور جديد]

[ حوامل 🤰 ] [ أمهات 👶 ] [ مخطوبات 💍 ] [ صحة 💪 ]

  الأحدث  |  الأكثر تفاعلاً  |  دائرتي

┌──────────────────────────────────────────────┐
│ 📌  وردة الأمل  •  حامل في الشهر الخامس      │
│ محتاجة مساعدة... الدكتورة قالتلي إن وزني...  │
│ #وزن_الحمل  #تغذية                           │
│ 💗47  🤝89  💙23  💬34  🔖  ···             │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│  نور محمد  •  أم لـ 3 أشهر                   │
│ البيبي ابتسم النهارده 😭❤️                    │
│ 💗234  🤝12  💙8  💬67                      │
└──────────────────────────────────────────────┘
```

### Create Post

```
[اكتبي ما في قلبك...                        ]

الدائرة: [حوامل ▼]    الوسوم: [+ أضيفي وسماً]

┌────────────────────────────────────────────┐
│ 🎭  نشر مجهول  ────────────────────  [●]  │
│     ستظهرين باسم: "وردة الأمل"             │
└────────────────────────────────────────────┘

تسميتك: [حامل في الشهر الخامس              ]

               [إلغاء]  [نشر المنشور 🌸]
```

### 3 أنواع Reactions

```typescript
const REACTIONS = [
  { type: 'like',    emoji: '💗', label: 'أحب'   },
  { type: 'support', emoji: '🤝', label: 'أدعمك' },
  { type: 'care',    emoji: '💙', label: 'أهتم'  },
]
// التفاعل يتغير محلياً في الـ state — لا يحتاج API
```

---

## 🤖 AI Features

### Risk Assessment — PTB

```
Step 1 ← بيانات أساسية (8 حقول)
  العمر | ضغط الدم الانقباضي | الانبساطي | BMI | السكر | سكري سابق | ...

Step 2 ← نتيجة فورية (mock calculation)
  ✅  < 30%  → "ممتاز! استمري في المتابعة الطبيعية"
  ⚠️  30-60% → "نوصي بمتابعة أكثر مع دكتورتك"
  🚨  > 60%  → نموذج المرحلة التانية (20+ حقل)

Step 3 ← SHAP Chart (Recharts Horizontal Bar)
  عمر الأم      ████████░░  42%
  ضغط الدم      ██████░░░░  31%
  BMI           ████░░░░░░  22%
  السكر         █░░░░░░░░░   5%

Step 4 ← توصية + زر "احجزي استشارة الآن"
  (كل الأرقام وهمية — تُحسب عشوائياً لإظهار الـ UI)
```

### Fetal 3D Viewer — Three.js

```typescript
// 12 landmark تشريحية — إحداثيات وهمية
export const MOCK_LANDMARKS = [
  { name: 'Forehead',   x: 0,    y: 1.2,  z: 0.3 },
  { name: 'Nasion',     x: 0,    y: 0.9,  z: 0.5 },
  { name: 'Nasal Tip',  x: 0,    y: 0.7,  z: 0.7 },
  { name: 'Upper Lip',  x: 0,    y: 0.4,  z: 0.6 },
  { name: 'Lower Lip',  x: 0,    y: 0.2,  z: 0.5 },
  { name: 'Chin',       x: 0,    y: -0.1, z: 0.4 },
  { name: 'Left Ear',   x: -0.8, y: 0.6,  z: 0   },
  { name: 'Right Ear',  x: 0.8,  y: 0.6,  z: 0   },
  // ... 4 نقاط تانية
]

// Mock results تظهر بعد "تحليل" الصورة (delay 3s)
export const MOCK_FETAL_RESULTS = {
  gestationalAge: 20,
  measurements: {
    IFA:        { value: 68.2, normal: '65-75°',  status: 'normal' },
    FMF:        { value: 72.1, normal: '70-85°',  status: 'normal' },
    noseLength: { value: 8.3,  normal: '7-10mm',  status: 'normal' },
  },
  riskLevel: 'low',
  recommendation: 'القياسات ضمن المعدل الطبيعي. تابعي مع دكتورتك.',
}

// Three.js setup:
// scene → 12 SphereGeometry (نقاط وردية)
//       + Line connecting them (أزرق)
//       + AmbientLight + DirectionalLight
//       + camera.position.z = 5
//       + scene.rotation.y += 0.005 في كل frame
```

---

## 🎨 Design System

### `src/styles/globals.css`

```css
@import "tailwindcss";

:root {
  --widad-pink:       #E91E8C;
  --widad-pink-light: #FFE4F3;
  --widad-blue:       #185FA5;
  --widad-purple:     #7C3AED;

  --color-primary:    var(--widad-pink);
  --color-secondary:  var(--widad-blue);
  --color-background: #FAFAFA;
  --color-surface:    #FFFFFF;
  --color-border:     #E5E7EB;
  --color-text:       #111827;
  --color-muted:      #6B7280;

  direction: rtl;
  font-family: 'Tajawal', 'Cairo', sans-serif;
}
```

### `index.html` — Font

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
```

### `tailwind.config.ts`

```typescript
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        widad: {
          pink:        '#E91E8C',
          'pink-light':'#FFE4F3',
          blue:        '#185FA5',
          purple:      '#7C3AED',
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
      },
    },
  },
}
```

---

## 📅 مراحل البناء — 6 أسابيع

### الأسبوع 1 — الأساس

```
- [ ] npm create vite + install كل المكتبات
- [ ] Tailwind config + CSS variables + globals.css
- [ ] shadcn/ui init + كل الـ components
- [ ] src/mock/ — كل الـ data files والـ services
- [ ] auth.store.ts + ProtectedRoute
- [ ] App.tsx — كل الـ routes بـ lazy loading
- [ ] PatientLayout + DoctorLayout + AdminLayout
- [ ] Sidebar + Navbar + MobileNav (responsive 375px)
- [ ] LandingPage (Hero + Stats + Features + Testimonials + CTA)
- [ ] RoleSelect + PatientLogin + PatientRegister + VerifyOTP
- [ ] DoctorLogin + AdminLogin
- [ ] Deploy على Vercel ← للاختبار المبكر
```

### الأسبوع 2 — Patient Core

```
- [ ] Patient Dashboard ← Life Stage Redirect Logic (STAGE_CONFIG)  ← ✅ جديد
- [ ] ProfilePage (BasicInfo + MedicalInfo + EmergencyContact)
- [ ] MoodTracker ← Bar Chart بـ 5 ألوان
- [ ] WeightTracker ← Line Chart + BMI calculator محلي
- [ ] PeriodTracker ← Custom Calendar + توقعات
- [ ] ArticlesList + ArticleDetail
- [ ] Notifications.tsx ← MOCK_NOTIFICATIONS + mark as read          ← ✅ جديد
```

### الأسبوع 3 — Consultations + AI

```
- [ ] DoctorSearch ← Filter Panel + Doctor Cards Grid
- [ ] DoctorProfile ← Reviews + SlotPicker Calendar
- [ ] BookConsultation ← 6 steps flow كامل
- [ ] ConsultationsList + ConsultationDetail
- [ ] FertilityTracker ← BBT Chart
- [ ] PregnancyTracker ← Timeline + Kick Counter
- [ ] AiChat ← ChatBubbles + Mock responses
- [ ] VoiceButton (Web Speech API) + SpeechSynthesis
- [ ] Doctor Dashboard + Consultations + PatientEHR
- [ ] DoctorCalendar.tsx ← Working Hours + Blocked Dates              ← ✅ جديد
```

### الأسبوع 4 — Community + AI Risk

```
- [ ] Guidelines.tsx ← شاشة قبول شروط المجتمع                        ← ✅ جديد
- [ ] GuidelinesGuard.tsx ← يفحص communityGuidelinesAccepted          ← ✅ جديد
- [ ] pre.basic account: communityGuidelinesAccepted = false           ← ✅ جديد
- [ ] CommunityFeed ← Posts + Circles + Tabs
- [ ] PostDetail ← Nested comments
- [ ] CreatePost Modal ← Anonymous toggle + Tags
- [ ] SavedPosts.tsx ← unsave محلي في state                            ← ✅ جديد
- [ ] ReactionBar (like / support / care)
- [ ] RiskAssessment ← PTB + PE + GDM forms
- [ ] RiskGauge (Recharts Radial) + ShapChart
- [ ] Doctor Patients + Articles + Financials

```

### الأسبوع 5 — Admin + Subscriptions

```
- [ ] Admin Dashboard ← KPIs + Revenue Charts
- [ ] Admin Doctors ← Doctor Approval workflow
- [ ] Admin Analytics.tsx ← 4 Recharts + lifeStage breakdown           ← ✅ جديد
- [ ] Admin Community ← Reports + Hide/Restore
- [ ] Admin Subscriptions
- [ ] PricingPage ← 4 PricingCards + Toggle
- [ ] SubscriptionCheckout ← 4 steps + Mock payment
- [ ] MySubscription ← Usage tracker + History
- [ ] InvoicesPage
- [ ] FeatureGate + UpgradePrompt في كل الأماكن
```

### الأسبوع 6 — النجم + الصقل النهائي

```
- [ ] FetalAnalysis ← Upload + Mock analysis progress
- [ ] Fetal3DViewer ← Three.js + 12 landmarks + Auto-rotate
- [ ] Framer Motion ← Page transitions + Micro-interactions
- [ ] Skeleton loading لكل الشاشات
- [ ] Empty states + Error states مصممة
- [ ] Mobile responsive test (375px / 768px / 1024px)
- [ ] RTL شامل — مراجعة كل الشاشات
- [ ] Performance: code splitting تلقائي + lazy loading
- [ ] اختبار على Chrome + Safari + Firefox
- [ ] Final deploy + QR Code
```

---

## 🎬 Demo Guide

### 🔐 Demo Accounts — كلمة السر لكل الأكونتس: `demo123`

> ضع الملفين في `src/mock/data/accounts.ts` و `src/pages/auth/DemoLogin.tsx`
> وأضف Route: `<Route path="/demo" element={<DemoLogin />} />`

---

#### 💍 قبل الزواج — 4 أكونتس

مخطوبة / بتستعد للزواج — المحتوى: فحوصات ما قبل الزواج، صحة إنجابية، استعداد نفسي

| الباقة | Email | ما يظهر في الـ Dashboard |
|--------|-------|--------------------------|
| Basic   | `pre.basic@widad.com`   | 5 رسائل AI/يوم — FeatureGate مقفول |
| Plus    | `pre.plus@widad.com`    | استشارة مجانية قادمة + خصم 20% |
| Pro     | `pre.pro@widad.com`     | تقرير AI أسبوعي + 3 استشارات |
| Pro+ 👑 | `pre.proplus@widad.com` | رحلة AI مخصصة: "الاستعداد الشامل للزواج" |

---

#### 💑 مرحلة الزواج — 4 أكونتس

متزوجة / بتحاول تحمل / حامل — المحتوى: خصوبة، متابعة حمل، AI Risk، سونار

| الباقة | Email | ما يظهر في الـ Dashboard |
|--------|-------|--------------------------|
| Basic   | `marriage.basic@widad.com`   | حامل أسبوع 20 — Kick Counter |
| Plus    | `marriage.plus@widad.com`    | Fertility window نشطة — بتحاول تحمل |
| Pro     | `marriage.pro@widad.com`     | ⚠️ **حمل بخطورة — AI Risk Alert PTB 45%** |
| Pro+ 👑 | `marriage.proplus@widad.com` | 🚨 **حمل توأم** — فريق 3 أطباء + 3D Fetal |

---

#### 👶 بعد الجواز — 4 أكونتس

أم جديدة / ما بعد الولادة — المحتوى: رضاعة، نمو الطفل، صحة نفسية، تعافي

| الباقة | Email | ما يظهر في الـ Dashboard |
|--------|-------|--------------------------|
| Basic   | `post.basic@widad.com`   | بيبي 2 شهر — Mood Tracker |
| Plus    | `post.plus@widad.com`    | اكتئاب ما بعد الولادة — Mood trend تحسّن |
| Pro     | `post.pro@widad.com`     | أم توأم 4 شهور — تقارير أسبوعية |
| Pro+ 👑 | `post.proplus@widad.com` | تعافي بعد قيصرية — رحلة AI أسبوع 12 |

---

#### 👨‍⚕️ أطباء — 3 أكونتس

| Email | الوصف |
|-------|-------|
| `doctor@widad.com` | د. سارة أحمد — نساء وتوليد — معتمدة — جدول يوم كامل |
| `doctor2@widad.com` | د. هبة علي — تغذية — معتمدة |
| `doctor.pending@widad.com` | د. أحمد سعيد — ⏳ منتظر موافقة الأدمن |

---

#### ⚙️ أدمن — 1 أكونت

| Email | الوصف |
|-------|-------|
| `admin@widad.com` | صلاحيات كاملة — 8 أطباء منتظرين — 12 بلاغ مجتمع |

---

### ملفات الـ Accounts

```
src/mock/data/accounts.ts     ← 16 أكونت + mock data مخصصة لكل واحد
src/pages/auth/DemoLogin.tsx  ← شاشة اختيار الأكونت بضغطة واحدة
```

**الـ `auth.mock.ts` — استخدم `findAccount()`:**

```typescript
import { findAccount } from '../data/accounts'

export const authMock = {
  login: async (email: string, password: string) => {
    await delay()
    const account = findAccount(email, password)
    if (!account) throw new Error('البريد الإلكتروني أو كلمة المرور غلط')
    return {
      token: `mock-token-${account.role}-${Date.now()}`,
      role:  account.role,
      user:  account,
    }
  },
}
```

**الـ Dashboard — استخدم `mockData` من الأكونت:**

```typescript
// src/pages/patient/Dashboard.tsx
const user = useAuthStore((s) => s.user)
const stats = user?.mockData?.dashboardStats

// marriage.pro  → stats.riskFlag = true   → يظهر AIRiskAlert
// pro-plus      → subscription.customJourneyEnabled = true → تظهر رحلة AI
// post.plus     → stats.moodTrend → يظهر Mood trend chart
```

### سيناريو 10 دقائق

| # | الوقت | الشاشة | الجملة |
|---|-------|--------|--------|
| 1 | دقيقة 1 | Landing Page | *"وداد — منصة تصاحب المرأة من الخطوبة للأمومة"* |
| 2 | دقيقة 2 | Login كـ Patient | *"سارة بتفتح التطبيق..."* |
| 3 | دقيقة 3 | Dashboard | *"شايفة استشارتها القادمة + صحتها فوراً"* |
| 4 | دقيقة 4 | Period + Weight | *"بتسجّل وزنها — الخط البياني بيوضح التقدم"* |
| ⭐ | دقيقة 5 | **AI Chat + Voice 🎤** | ***"بتسأل وداد بصوتها بالعربي"*** |
| 6 | دقيقة 6 | Doctor Booking | *"بتحجز في 30 ثانية + دفع"* |
| 7 | دقيقة 7 | Community | *"بتنشر مجهولة — ردّوا عليها فوراً"* |
| 8 | دقيقة 8 | Risk Assessment | *"النموذج كشف خطر 78% + SHAP بيشرح"* |
| ⭐ | دقيقة 9 | **Fetal 3D 🌟** | ***"سونار → تحليل → نموذج 3D يدور"*** |
| 10 | دقيقة 10 | Admin Dashboard | *"الإدارة شايفة مستخدمين + إيراد + مجتمع"* |

### نصائح مهمة

```
✅ افتح Chrome — Voice API يشتغل بس فيه
✅ جهّز Laptop + Mobile للـ demo
✅ اعمل Hard Refresh قبل العرض مباشرة
✅ اطبع QR Code للـ Vercel link
✅ ابدأ دايماً من Landing — متبدأش من Dashboard
✅ عند Voice Demo: "كيف أعرف موعد دورتي القادمة؟"
```

---

## ✅ Pre-Demo Checklist

```
□ Landing تفتح في أقل من 3 ثوانٍ
□ /demo → كل الأكونتس تظهر بشكل صحيح
□ Login → Dashboard بلا console errors
□ Dashboard يتغير حسب المرحلة (pre / marriage / post)
□ marriage.pro → AI Risk Alert يظهر فوراً ⚠️
□ marriage.proplus → رحلة AI مخصصة تظهر ⭐
□ Dashboard Charts فيها بيانات واقعية
□ Mood Tracker — 5 ألوان مختلفة واضحة
□ Period Calendar — التواريخ منطقية
□ AI Chat — يرد بعد delay واقعية
□ Voice Input يشتغل على Chrome
□ Doctor Search — Filters تعمل فعلاً
□ Booking Flow — 6 خطوات تكتمل
□ Mock Payment — ينجح دايماً
□ Notifications — تظهر حسب نوع الأكونت
□ Community Guidelines — pre.basic يتوجّه للشروط أول مرة
□ Community — Anonymous toggle يغير الاسم
□ Saved Posts — unsave يشتغل محلياً
□ SHAP Chart واضح ومقروء
□ Fetal 3D يدور بدون أي خطأ
□ Pricing — Toggle يغيّر الأسعار صح
□ FeatureGate يعرض UpgradePrompt للـ Basic
□ Doctor Calendar يعرض Working Hours
□ Admin Analytics — 4 Charts تظهر كلها
□ Admin Charts تظهر بيانات
□ موبايل 375px — لا يوجد overflow
□ RTL — كل النصوص على اليمين
□ Skeleton يظهر قبل الـ Data
□ لا يوجد أي console errors
```

---

> *"اجعل كل شاشة تحكي قصة — ليس فقط تعرض بيانات"*

**React + TypeScript + Vite · Mock Data 100% · بدون Backend · للمرأة المصرية 🌸**
