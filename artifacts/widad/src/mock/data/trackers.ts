export const MOCK_MOOD_DATA = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const mood = Math.floor(Math.random() * 5) + 1;
  return {
    date: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }),
    mood,
    note: mood > 3 ? 'يوم جيد' : 'يوم متعب',
    factors: ['نوم', 'عمل', 'تغذية'].slice(0, Math.floor(Math.random() * 3) + 1)
  };
});

export const MOCK_WEIGHT_DATA = Array.from({ length: 10 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (27 - (i * 3)));
  const weight = 65 + (Math.random() * 2 - 1); // around 65kg
  return {
    date: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }),
    weight: Number(weight.toFixed(1)),
    bmi: Number((weight / (1.65 * 1.65)).toFixed(1))
  };
});

export const MOCK_PERIOD_DATA = {
  lastPeriodStart: '2026-03-01',
  cycleLength: 28,
  periodLength: 5,
  nextPeriodExpected: '2026-03-29',
  fertilityWindow: { start: '2026-03-12', end: '2026-03-17' },
  ovulationDay: '2026-03-15',
  history: [
    { start: '2026-02-01', end: '2026-02-06', cycleLength: 28 },
    { start: '2026-01-04', end: '2026-01-09', cycleLength: 28 },
    { start: '2025-12-07', end: '2025-12-12', cycleLength: 28 }
  ]
};

export const MOCK_PREGNANCY_DATA = {
  dueDate: '2026-08-01',
  currentWeek: 20,
  babySize: 'موزة 🍌',
  babyWeight: '300 جرام',
  appointments: [
    { date: '2026-03-25', doctor: 'د. سارة أحمد', type: 'سونار تفصيلي' },
    { date: '2026-04-15', doctor: 'د. سارة أحمد', type: 'متابعة شهرية' }
  ],
  medications: [
    { name: 'حمض الفوليك', dosage: 'قرص يومياً', time: 'صباحاً' },
    { name: 'حديد', dosage: 'قرص يومياً', time: 'مساءً' }
  ],
  kickCount: { today: 8, goal: 10 },
  weightHistory: [
    { week: 12, weight: 62 },
    { week: 16, weight: 64 },
    { week: 20, weight: 66 }
  ]
};

export const MOCK_FERTILITY_DATA = {
  cycleDay: 18,
  fertilityWindow: { start: '2026-03-22', end: '2026-03-27' },
  ovulationDay: '2026-03-24',
  bbtData: Array.from({ length: 18 }).map((_, i) => {
    const date = new Date('2026-03-01');
    date.setDate(date.getDate() + i);
    // Typical BBT curve (dip before ovulation, rise after)
    const baseTemp = 36.4;
    const temp = i < 14 ? baseTemp + (Math.random() * 0.2 - 0.1) : baseTemp + 0.4 + (Math.random() * 0.2 - 0.1);
    return {
      date: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }),
      temp: Number(temp.toFixed(2))
    };
  })
};