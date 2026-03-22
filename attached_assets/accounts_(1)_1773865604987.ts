// src/mock/data/accounts.ts
// =====================================================
// 🔐 كل الـ Demo Accounts — جاهزة للـ Login
// كلمة المرور لكل الأكونتس: demo123
//
// 3 مراحل حياة:
//   pre_marriage  → قبل الزواج  (مخطوبة / عزباء)
//   marriage      → مرحلة الزواج (متزوجة / بتحاول / حامل)
//   post_marriage → بعد الجواز  (أم جديدة / ما بعد الولادة)
//
// 4 باقات × 3 مراحل = 12 patient account
// + 3 doctor accounts
// + 1 admin account
// = 16 account إجمالي
// =====================================================

export type LifeStage = 'pre_marriage' | 'marriage' | 'post_marriage'
export type PlanSlug  = 'basic' | 'plus' | 'pro' | 'pro-plus'
export type UserRole  = 'patient' | 'doctor' | 'admin'

// communityGuidelinesAccepted:
//   false  → pre.basic فقط — يتوجّه لـ Guidelines أول مرة يدخل المجتمع
//   true   → كل الأكونتس الأخرى — دخول مباشر للمجتمع
// الـ default للأكونتس اللي ما عندهاش الـ field = true

// ─────────────────────────────────────────
// 👩 PATIENT ACCOUNTS — 12 account
// 3 مراحل × 4 باقات
// ─────────────────────────────────────────

export const PATIENT_ACCOUNTS = [

  // ══════════════════════════════════════════════
  // 💍 مرحلة قبل الزواج
  // مخطوبة / عزباء بتستعد للزواج
  // المحتوى: فحوصات ما قبل الزواج، صحة إنجابية،
  //          استعداد نفسي وجسدي، تنظيم الأسرة
  // ══════════════════════════════════════════════

  {
    email:     'pre.basic@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'نور خالد',
    avatar:    '/assets/avatars/patient-pre-1.jpg',
    phone:     '+20 100 111 0001',
    lifeStage: 'pre_marriage' as LifeStage,
    plan:      'basic' as PlanSlug,
    label:     '💍 قبل الزواج — Basic',
    bio:       'مخطوبة منذ 3 أشهر، بتتحضر للزواج',
    age:       24,
    communityGuidelinesAccepted: false,   // ← يتوجّه لشاشة Guidelines أول مرة
    mockData: {
      dashboardStats: {
        totalConsultations: 0,
        nextConsultation:   null,
        savedArticles:      3,
        trackerStreak:      5,
        featuredSection:    'فحوصات ما قبل الزواج',
      },
      subscription: {
        plan:         'وداد Basic',
        status:       'active',
        aiChatsToday: 3,
        aiChatsLimit: 5,
        freeConsults: 0,
      },
      suggestedArticles: [
        'فحوصات الدم الضرورية قبل الزواج',
        'الصحة الإنجابية للعروسة',
        'التغذية السليمة قبل الزواج',
      ],
      recentActivity: [
        'قرأت: الاستعداد الصحي للزواج',
        'سألت AI عن فحوصات ما قبل الزواج',
      ],
      // FeatureGate: AI Voice مقفول، استشارات مدفوعة
      lockedFeatures: ['ai_chat_voice', 'free_consultations'],
    },
  },

  {
    email:     'pre.plus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'ياسمين سامي',
    avatar:    '/assets/avatars/patient-pre-2.jpg',
    phone:     '+20 100 111 0002',
    lifeStage: 'pre_marriage' as LifeStage,
    plan:      'plus' as PlanSlug,
    label:     '💍 قبل الزواج — Plus',
    bio:       'مخطوبة، عايزة تعرف أكتر عن صحتها قبل الزواج',
    age:       26,
    mockData: {
      dashboardStats: {
        totalConsultations: 1,
        nextConsultation:   '2026-03-22T11:00:00',
        savedArticles:      8,
        trackerStreak:      12,
        featuredSection:    'استشارة ما قبل الزواج',
      },
      subscription: {
        plan:                 'وداد Plus',
        status:               'active',
        billingCycle:         'monthly',
        renewsAt:             '2026-04-01',
        freeConsultsUsed:     0,
        freeConsultsTotal:    1,
        consultationDiscount: 20,
      },
      suggestedArticles: [
        'التحدث مع شريك الحياة عن الصحة',
        'تحليل الأمراض الوراثية',
        'الصحة النفسية قبل الزواج',
      ],
      recentActivity: [
        'حجزت استشارة مع د. منى حسين',
        'أكملت تقييم الصحة الإنجابية',
        'سألت AI عن وسائل منع الحمل',
      ],
    },
  },

  {
    email:     'pre.pro@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'دينا وليد',
    avatar:    '/assets/avatars/patient-pre-3.jpg',
    phone:     '+20 100 111 0003',
    lifeStage: 'pre_marriage' as LifeStage,
    plan:      'pro' as PlanSlug,
    label:     '💍 قبل الزواج — Pro',
    bio:       'دكتورة مخطوبة، مهتمة جداً بالصحة الإنجابية',
    age:       28,
    mockData: {
      dashboardStats: {
        totalConsultations: 4,
        nextConsultation:   '2026-03-20T14:00:00',
        savedArticles:      21,
        trackerStreak:      30,
        featuredSection:    'خطة صحة ما قبل الزواج',
      },
      subscription: {
        plan:                 'وداد Pro',
        status:               'active',
        billingCycle:         'yearly',
        renewsAt:             '2027-01-01',
        freeConsultsUsed:     1,
        freeConsultsTotal:    3,
        consultationDiscount: 20,
        weeklyReportEnabled:  true,
      },
      suggestedArticles: [
        'تقرير AI: "صحتك جاهزة للزواج ✅"',
        'التهيئة الغذائية قبل الحمل',
        'فيتامينات ما قبل الحمل',
      ],
      recentActivity: [
        'تقرير AI أسبوعي: "صحتك ممتازة"',
        'أكملت 3 استشارات هذا الشهر',
        'نشطة في مجتمع المخطوبات',
      ],
    },
  },

  {
    email:     'pre.proplus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'ريهام طارق',
    avatar:    '/assets/avatars/patient-pre-4.jpg',
    phone:     '+20 100 111 0004',
    lifeStage: 'pre_marriage' as LifeStage,
    plan:      'pro-plus' as PlanSlug,
    label:     '💍 قبل الزواج — Pro+ 👑',
    bio:       'مديرة تنفيذية مخطوبة، عايزة أعلى مستوى رعاية',
    age:       31,
    mockData: {
      dashboardStats: {
        totalConsultations: 8,
        nextConsultation:   '2026-03-19T10:00:00',
        savedArticles:      45,
        trackerStreak:      60,
        featuredSection:    'رحلة AI المخصصة — ما قبل الزواج',
      },
      subscription: {
        plan:                 'وداد Pro+',
        status:               'active',
        billingCycle:         'yearly',
        renewsAt:             '2027-01-01',
        freeConsultsUsed:     2,
        freeConsultsTotal:    5,
        consultationDiscount: 25,
        weeklyReportEnabled:  true,
        customJourneyEnabled: true,
        prioritySupport:      true,
      },
      customJourney: {
        title:    'الاستعداد الصحي الشامل للزواج',
        progress: 65,
        nextStep: 'تحليل الأمراض الوراثية',
      },
      recentActivity: [
        'رحلة AI: "أسبوع 8 من خطة الاستعداد"',
        'تقرير أسبوعي + خطة تغذية مخصصة',
        'وصول مبكر لميزة "تحليل الجينات"',
      ],
    },
  },

  // ══════════════════════════════════════════════
  // 💑 مرحلة الزواج
  // متزوجة — بتحاول تحمل — حامل
  // المحتوى: خصوبة، تتبع الدورة، سونار، متابعة حمل،
  //          تغذية الحمل، AI Risk للمخاطر
  // ══════════════════════════════════════════════

  {
    email:     'marriage.basic@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'سارة محمد',
    avatar:    '/assets/avatars/patient-marriage-1.jpg',
    phone:     '+20 100 222 0001',
    lifeStage: 'marriage' as LifeStage,
    plan:      'basic' as PlanSlug,
    label:     '💑 مرحلة الزواج — Basic',
    bio:       'متزوجة سنة، حامل أسبوع 20 — الحمل الأول',
    age:       26,
    pregnancyWeek: 20,
    mockData: {
      dashboardStats: {
        totalConsultations: 2,
        nextConsultation:   '2026-03-25T10:00:00',
        currentWeek:        20,
        babySize:           'موزة 🍌',
        kicksToday:         8,
        featuredSection:    'متابعة الحمل — أسبوع 20',
      },
      subscription: {
        plan:         'وداد Basic',
        status:       'active',
        aiChatsToday: 4,
        aiChatsLimit: 5,
        freeConsults: 0,
      },
      suggestedArticles: [
        'تغذية الأسبوع 20 من الحمل',
        'تطور الجنين في الشهر الخامس',
        'آلام أسفل الظهر في الحمل',
      ],
      recentActivity: [
        'سجّلت حركة الجنين (8 مرات اليوم)',
        'قرأت: تغذية الأسبوع 20',
        'سألت AI عن آلام أسفل الظهر',
      ],
      lockedFeatures: ['ai_chat_voice', 'risk_assessment_full'],
    },
  },

  {
    email:     'marriage.plus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'هناء إبراهيم',
    avatar:    '/assets/avatars/patient-marriage-2.jpg',
    phone:     '+20 100 222 0002',
    lifeStage: 'marriage' as LifeStage,
    plan:      'plus' as PlanSlug,
    label:     '💑 مرحلة الزواج — Plus',
    bio:       'متزوجة 2 سنة، بتحاول الإنجاب — Fertility Tracker نشطة',
    age:       29,
    mockData: {
      dashboardStats: {
        totalConsultations:  3,
        nextConsultation:    '2026-03-25T09:00:00',
        fertilityWindow:     { start: '2026-03-22', end: '2026-03-27' },
        ovulationDay:        '2026-03-24',
        cycleDay:            18,
        featuredSection:     'نافذة الخصوبة — 4 أيام متبقية 🌱',
      },
      subscription: {
        plan:                 'وداد Plus',
        status:               'active',
        billingCycle:         'monthly',
        renewsAt:             '2026-04-01',
        freeConsultsUsed:     1,
        freeConsultsTotal:    1,
        consultationDiscount: 20,
      },
      suggestedArticles: [
        'تحسين فرص الحمل الطبيعي',
        'BBT وعلاقته بالخصوبة',
        'متى تزوري دكتورة الخصوبة؟',
      ],
      recentActivity: [
        'تتبع نافذة الخصوبة — Fertility Tracker',
        'استشارة مع د. سارة أحمد عن الخصوبة',
        'سألت AI عن تحسين فرص الحمل',
      ],
    },
  },

  {
    email:     'marriage.pro@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'مروة أحمد',
    avatar:    '/assets/avatars/patient-marriage-3.jpg',
    phone:     '+20 100 222 0003',
    lifeStage: 'marriage' as LifeStage,
    plan:      'pro' as PlanSlug,
    label:     '💑 مرحلة الزواج — Pro ⚠️ حمل بخطورة',
    bio:       'حامل أسبوع 28 — ضغط دم مرتفع — متابعة مكثفة',
    age:       35,
    pregnancyWeek: 28,
    mockData: {
      dashboardStats: {
        totalConsultations: 12,
        nextConsultation:   '2026-03-20T09:00:00',
        currentWeek:        28,
        babySize:           'باذنجانة 🍆',
        kicksToday:         10,
        weight:             82.0,
        weightGain:         '+8 كجم',
        // ← هذا يُشغّل AIRiskAlert في الـ Dashboard
        riskFlag:           true,
        riskType:           'ضغط دم مرتفع — متابعة مكثفة',
        riskLevel:          'high',
        featuredSection:    '⚠️ تنبيه: نموذج PTB يوصي بمراجعة دكتورة',
      },
      subscription: {
        plan:                 'وداد Pro',
        status:               'active',
        billingCycle:         'monthly',
        renewsAt:             '2026-04-01',
        freeConsultsUsed:     3,
        freeConsultsTotal:    3,
        consultationDiscount: 20,
        weeklyReportEnabled:  true,
      },
      aiRiskResults: {
        ptb:  { score: 45, level: 'medium', shap: ['ضغط الدم 38%', 'العمر 27%', 'BMI 20%', 'السكر 15%'] },
        pe:   { score: 38, level: 'medium', shap: ['ضغط الدم 52%', 'BMI 24%', 'العمر 24%'] },
        gdm:  { score: 22, level: 'low',    shap: ['BMI 45%', 'العمر 35%', 'التغذية 20%'] },
      },
      suggestedArticles: [
        'إدارة ضغط الدم أثناء الحمل',
        'علامات تسمم الحمل المبكرة',
        'متى تتصلي بالطوارئ؟',
      ],
      recentActivity: [
        '🚨 تقرير AI: "ضغط الدم يحتاج متابعة فورية"',
        'نموذج PTB: خطورة 45% — مراجعة مطلوبة',
        'استشارات أسبوعية مع د. سارة أحمد',
      ],
    },
  },

  {
    email:     'marriage.proplus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'إيمان رضا',
    avatar:    '/assets/avatars/patient-marriage-4.jpg',
    phone:     '+20 100 222 0004',
    lifeStage: 'marriage' as LifeStage,
    plan:      'pro-plus' as PlanSlug,
    label:     '💑 مرحلة الزواج — Pro+ 👑 حمل توأم',
    bio:       'حامل بتوأم أسبوع 26 — متابعة شديدة — فريق طبي كامل',
    age:       33,
    pregnancyWeek: 26,
    mockData: {
      dashboardStats: {
        totalConsultations: 20,
        nextConsultation:   '2026-03-19T08:00:00',
        currentWeek:        26,
        babySize:           'خيار 🥒 × 2',
        kicksToday:         22,
        weight:             88.0,
        weightGain:         '+14 كجم',
        riskFlag:           true,
        riskType:           'حمل توأم — متابعة مكثفة',
        riskLevel:          'high',
        featuredSection:    '🌟 رحلة AI: خطة متابعة حمل التوأم',
      },
      subscription: {
        plan:                 'وداد Pro+',
        status:               'active',
        billingCycle:         'yearly',
        freeConsultsUsed:     5,
        freeConsultsTotal:    5,
        consultationDiscount: 25,
        weeklyReportEnabled:  true,
        customJourneyEnabled: true,
        prioritySupport:      true,
      },
      customJourney: {
        title:    'خطة متابعة حمل التوأم — أسبوع بأسبوع',
        progress: 53,
        nextStep: 'سونار المراقبة — الأسبوع 28',
      },
      aiRiskResults: {
        ptb:  { score: 68, level: 'high', shap: ['توأم 55%', 'ضغط الدم 25%', 'العمر 20%'] },
        pe:   { score: 51, level: 'high', shap: ['توأم 48%', 'ضغط الدم 32%', 'BMI 20%'] },
        gdm:  { score: 35, level: 'medium', shap: ['توأم 40%', 'BMI 35%', 'التاريخ 25%'] },
      },
      fetalData: {
        twin1: { name: 'الجنين الأول', weight: '820 جرام', heartRate: 148 },
        twin2: { name: 'الجنين الثاني', weight: '790 جرام', heartRate: 152 },
      },
      medicalTeam: [
        { name: 'د. سارة أحمد',  specialty: 'نساء وتوليد' },
        { name: 'د. هبة علي',    specialty: 'تغذية' },
        { name: 'د. منى حسين',   specialty: 'أطفال حديثي الولادة' },
      ],
      recentActivity: [
        'رحلة AI: أسبوع 26 — كل الأرقام طبيعية',
        'سونار الأسبوع 24: الجنينان بصحة جيدة ✅',
        'فريق طبي كامل: 3 دكاترة',
      ],
    },
  },

  // ══════════════════════════════════════════════
  // 👶 مرحلة بعد الجواز / الأمومة
  // أم جديدة — ما بعد الولادة — تعافي
  // المحتوى: رضاعة، نمو الطفل، صحة نفسية،
  //          تعافي ما بعد الولادة، عودة الوزن
  // ══════════════════════════════════════════════

  {
    email:     'post.basic@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'نهاد كمال',
    avatar:    '/assets/avatars/patient-post-1.jpg',
    phone:     '+20 100 333 0001',
    lifeStage: 'post_marriage' as LifeStage,
    plan:      'basic' as PlanSlug,
    label:     '👶 بعد الجواز — Basic',
    bio:       'أم لطفل 2 شهر — أول تجربة أمومة',
    age:       25,
    babyAgeMonths: 2,
    mockData: {
      dashboardStats: {
        totalConsultations: 1,
        nextConsultation:   null,
        babyAge:            '2 شهر',
        savedArticles:      9,
        trackerStreak:      14,
        moodToday:          3,
        featuredSection:    'نصائح الأم الجديدة',
      },
      subscription: {
        plan:         'وداد Basic',
        status:       'active',
        aiChatsToday: 1,
        aiChatsLimit: 5,
        freeConsults: 0,
      },
      babyMilestones: [
        { milestone: 'رفع الرأس', achieved: true,  week: 6  },
        { milestone: 'الابتسامة', achieved: false, week: 8  },
        { milestone: 'تتبع الأشياء', achieved: false, week: 10 },
      ],
      suggestedArticles: [
        'الرضاعة الطبيعية — الأسئلة الشائعة',
        'التعامل مع مغص البيبي',
        'نوم الطفل في الشهرين الأول',
      ],
      recentActivity: [
        'سألت AI عن الرضاعة الطبيعية',
        'قرأت: التعامل مع مغص البيبي',
        'نشرت في مجتمع "أمهات جدد"',
      ],
      lockedFeatures: ['ai_chat_voice', 'weekly_report'],
    },
  },

  {
    email:     'post.plus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'حنان عمر',
    avatar:    '/assets/avatars/patient-post-2.jpg',
    phone:     '+20 100 333 0002',
    lifeStage: 'post_marriage' as LifeStage,
    plan:      'plus' as PlanSlug,
    label:     '👶 بعد الجواز — Plus',
    bio:       'أم لطفل 6 شهور — تعاني من اكتئاب ما بعد الولادة',
    age:       28,
    babyAgeMonths: 6,
    mockData: {
      dashboardStats: {
        totalConsultations: 4,
        nextConsultation:   '2026-03-23T16:00:00',
        babyAge:            '6 شهور',
        moodAvgLast7Days:   2.8,
        moodTrend:          'تحسّن تدريجي 📈',
        weightPostPartum:   72,
        weightGoal:         65,
        featuredSection:    'تابعي مزاجك — تحسّن ملحوظ هذا الأسبوع',
      },
      subscription: {
        plan:                 'وداد Plus',
        status:               'active',
        billingCycle:         'monthly',
        renewsAt:             '2026-04-01',
        freeConsultsUsed:     1,
        freeConsultsTotal:    1,
        consultationDiscount: 20,
      },
      moodHistory: [2, 2, 3, 2, 3, 3, 4],  // آخر 7 أيام — تحسّن
      suggestedArticles: [
        'اكتئاب ما بعد الولادة — لستِ وحدك',
        'متى تطلبي المساعدة المتخصصة؟',
        'العودة للحياة الطبيعية بعد الولادة',
      ],
      recentActivity: [
        'Mood Tracker: تحسّن 3 أيام متتالية ✅',
        'استشارة نفسية مع د. منى',
        'نشطة في مجتمع "أمهات جدد"',
      ],
    },
  },

  {
    email:     'post.pro@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'رانيا يوسف',
    avatar:    '/assets/avatars/patient-post-3.jpg',
    phone:     '+20 100 333 0003',
    lifeStage: 'post_marriage' as LifeStage,
    plan:      'pro' as PlanSlug,
    label:     '👶 بعد الجواز — Pro',
    bio:       'أم لتوأم عمرهم 4 شهور — محتاجة دعم مكثف',
    age:       31,
    babyAgeMonths: 4,
    mockData: {
      dashboardStats: {
        totalConsultations: 10,
        nextConsultation:   '2026-03-21T10:00:00',
        babyAge:            '4 شهور (توأم)',
        moodAvgLast7Days:   3.2,
        moodTrend:          'مستقر 📊',
        weightPostPartum:   80,
        weightGoal:         68,
        weightLostSoBirth:  '-6 كجم',
        featuredSection:    'تقرير AI: جدول رضاعة التوأم المثالي',
      },
      subscription: {
        plan:                 'وداد Pro',
        status:               'active',
        billingCycle:         'yearly',
        freeConsultsUsed:     2,
        freeConsultsTotal:    3,
        consultationDiscount: 20,
        weeklyReportEnabled:  true,
      },
      twins: [
        { name: 'الأول',  ageMonths: 4, weight: '6.2 كجم', height: '62 سم' },
        { name: 'الثاني', ageMonths: 4, weight: '5.9 كجم', height: '61 سم' },
      ],
      suggestedArticles: [
        'جدول رضاعة التوأم',
        'كيف تنامي وعندك توأم؟',
        'الدعم النفسي لأم التوأم',
      ],
      recentActivity: [
        'تقرير AI: "جدول رضاعة التوأم المثالي"',
        'استشارة تغذية ما بعد الولادة',
        'وزن ما بعد الولادة: تقدم ممتاز',
      ],
    },
  },

  {
    email:     'post.proplus@widad.com',
    password:  'demo123',
    role:      'patient' as UserRole,
    name:      'شيرين مصطفى',
    avatar:    '/assets/avatars/patient-post-4.jpg',
    phone:     '+20 100 333 0004',
    lifeStage: 'post_marriage' as LifeStage,
    plan:      'pro-plus' as PlanSlug,
    label:     '👶 بعد الجواز — Pro+ 👑',
    bio:       'أم بعد ولادة قيصرية صعبة — برنامج تعافٍ شامل',
    age:       34,
    babyAgeMonths: 3,
    mockData: {
      dashboardStats: {
        totalConsultations: 15,
        nextConsultation:   '2026-03-20T11:00:00',
        babyAge:            '3 شهور',
        moodAvgLast7Days:   4.1,
        moodTrend:          'تحسّن ممتاز 🌟',
        recoveryProgress:   85,
        weightPostPartum:   74,
        weightGoal:         66,
        weightLostSoBirth:  '-8 كجم',
        featuredSection:    'رحلة AI: أسبوع 12 من التعافي',
      },
      subscription: {
        plan:                 'وداد Pro+',
        status:               'active',
        billingCycle:         'yearly',
        freeConsultsUsed:     4,
        freeConsultsTotal:    5,
        consultationDiscount: 25,
        weeklyReportEnabled:  true,
        customJourneyEnabled: true,
        prioritySupport:      true,
      },
      customJourney: {
        title:    'خطة التعافي الشاملة بعد القيصرية',
        progress: 85,
        nextStep: 'جلسة فيزيوثيرابي — الأسبوع 14',
      },
      medicalTeam: [
        { name: 'د. سارة أحمد',  specialty: 'نساء وتوليد' },
        { name: 'د. هبة علي',    specialty: 'تغذية' },
        { name: 'د. منى حسين',   specialty: 'صحة نفسية' },
      ],
      suggestedArticles: [
        'التعافي بعد الولادة القيصرية',
        'متى تعودي للتمرين بعد القيصرية؟',
        'الرضاعة الطبيعية بعد القيصرية',
      ],
      recentActivity: [
        'رحلة AI: "أسبوع 12 — وزنك رجع 85% للطبيعي 🎉"',
        'تقرير: "الجرح تعافى بشكل ممتاز"',
        'فريق طبي مخصص: 3 دكاترة',
      ],
    },
  },
]

// ─────────────────────────────────────────
// 👨‍⚕️ DOCTOR ACCOUNTS — 3 accounts
// ─────────────────────────────────────────

export const DOCTOR_ACCOUNTS = [
  {
    email:      'doctor@widad.com',
    password:   'demo123',
    role:       'doctor' as UserRole,
    name:       'د. سارة أحمد',
    avatar:     '/assets/avatars/doctor-1.jpg',
    label:      '👩‍⚕️ نساء وتوليد — معتمدة',
    specialty:  'أمراض النساء والتوليد',
    isApproved: true,
    rating:     4.9,
    mockData: {
      stats: {
        consultationsToday: 5,
        consultationsMonth: 47,
        rating:             4.9,
        revenue:            12500,
        pendingRequests:    3,
      },
      todaySchedule: [
        { time: '10:00', patient: 'سارة محمد',  type: 'فيديو', status: 'confirmed' },
        { time: '11:00', patient: 'فاطمة علي',  type: 'صوت',   status: 'confirmed' },
        { time: '14:00', patient: 'مروة أحمد',  type: 'فيديو', status: 'pending'   },
      ],
    },
  },
  {
    email:      'doctor2@widad.com',
    password:   'demo123',
    role:       'doctor' as UserRole,
    name:       'د. هبة علي',
    avatar:     '/assets/avatars/doctor-3.jpg',
    label:      '👩‍⚕️ أخصائية تغذية — معتمدة',
    specialty:  'التغذية وصحة المرأة',
    isApproved: true,
    rating:     4.7,
    mockData: {
      stats: {
        consultationsToday: 3,
        consultationsMonth: 38,
        rating:             4.7,
        revenue:            8750,
        pendingRequests:    1,
      },
      todaySchedule: [
        { time: '09:00', patient: 'هناء إبراهيم', type: 'نص',   status: 'confirmed' },
        { time: '10:00', patient: 'دينا وليد',    type: 'فيديو', status: 'confirmed' },
      ],
    },
  },
  {
    email:      'doctor.pending@widad.com',
    password:   'demo123',
    role:       'doctor' as UserRole,
    name:       'د. أحمد سعيد',
    avatar:     '/assets/avatars/doctor-pending.jpg',
    label:      '⏳ طبيب جديد — منتظر موافقة الأدمن',
    specialty:  'طب الأطفال',
    isApproved: false,
    rating:     null,
    mockData: {
      approvalStatus: 'pending',
      submittedDocs:  ['الشهادة الطبية', 'بطاقة النقابة', 'صورة شخصية'],
      pendingDocs:    ['شهادة التخصص'],
      message:        'طلبك قيد المراجعة. سيتم الرد خلال 2-3 أيام عمل.',
    },
  },
]

// ─────────────────────────────────────────
// ⚙️ ADMIN ACCOUNT
// ─────────────────────────────────────────

export const ADMIN_ACCOUNTS = [
  {
    email:    'admin@widad.com',
    password: 'demo123',
    role:     'admin' as UserRole,
    name:     'أدمن وداد',
    avatar:   '/assets/avatars/admin-1.jpg',
    label:    '⚙️ Admin — صلاحيات كاملة',
    mockData: {
      overview: {
        totalUsers:          15420,
        newUsersToday:       47,
        totalDoctors:        234,
        pendingDoctors:      8,
        monthlyRevenue:      184500,
        revenueGrowth:       '+23%',
        activeSubscriptions: 3240,
        communityReports:    12,
      },
      revenueChart: [
        { month: 'أكتوبر', revenue: 95000  },
        { month: 'نوفمبر', revenue: 112000 },
        { month: 'ديسمبر', revenue: 134000 },
        { month: 'يناير',  revenue: 145000 },
        { month: 'فبراير', revenue: 168000 },
        { month: 'مارس',   revenue: 184500 },
      ],
    },
  },
]

// ─────────────────────────────────────────
// 🔧 Helper Functions
// ─────────────────────────────────────────

export const ALL_ACCOUNTS = [
  ...PATIENT_ACCOUNTS,
  ...DOCTOR_ACCOUNTS,
  ...ADMIN_ACCOUNTS,
]

export function findAccount(email: string, password: string) {
  return ALL_ACCOUNTS.find(
    (a) => a.email === email && a.password === password
  ) ?? null
}

export function getAccountsByStage(stage: LifeStage) {
  return PATIENT_ACCOUNTS.filter((a) => a.lifeStage === stage)
}

export function getAccountsByPlan(plan: PlanSlug) {
  return PATIENT_ACCOUNTS.filter((a) => a.plan === plan)
}

// ─────────────────────────────────────────
// 📋 Groups — للـ DemoLogin Page
// ─────────────────────────────────────────

export const ACCOUNTS_BY_GROUP = [
  {
    group:       '💍 قبل الزواج',
    description: 'مخطوبة / بتستعد للزواج',
    stage:       'pre_marriage' as LifeStage,
    color:       'pink',
    accounts:    PATIENT_ACCOUNTS.filter((a) => a.lifeStage === 'pre_marriage'),
  },
  {
    group:       '💑 مرحلة الزواج',
    description: 'متزوجة / بتحاول / حامل',
    stage:       'marriage' as LifeStage,
    color:       'purple',
    accounts:    PATIENT_ACCOUNTS.filter((a) => a.lifeStage === 'marriage'),
  },
  {
    group:       '👶 بعد الجواز',
    description: 'أم جديدة / ما بعد الولادة',
    stage:       'post_marriage' as LifeStage,
    color:       'teal',
    accounts:    PATIENT_ACCOUNTS.filter((a) => a.lifeStage === 'post_marriage'),
  },
  {
    group:       '👨‍⚕️ أطباء',
    description: 'دكاترة معتمدين + منتظر موافقة',
    stage:       null,
    color:       'blue',
    accounts:    DOCTOR_ACCOUNTS,
  },
  {
    group:       '⚙️ إدارة',
    description: 'صلاحيات كاملة',
    stage:       null,
    color:       'gray',
    accounts:    ADMIN_ACCOUNTS,
  },
]
