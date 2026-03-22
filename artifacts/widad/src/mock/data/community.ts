export const MOCK_CIRCLES = [
  { id: 'c1', name: 'حوامل', emoji: '🤰', members: 12450, color: '#FF6B9D' },
  { id: 'c2', name: 'أمهات جدد', emoji: '👶', members: 9800, color: '#4ECDC4' },
  { id: 'c3', name: 'مخطوبات', emoji: '💍', members: 7200, color: '#A78BFA' },
  { id: 'c4', name: 'صحة المرأة', emoji: '💪', members: 15600, color: '#F97316' },
  { id: 'c5', name: 'الخصوبة', emoji: '🌱', members: 5400, color: '#10B981' },
  { id: 'c6', name: 'ما بعد الولادة', emoji: '🌸', members: 6800, color: '#EC4899' },
]

export const MOCK_POSTS = [
  {
    id: 'p1', circleId: 'c1', isAnonymous: true, anonymousAlias: 'وردة الأمل', userLabel: 'حامل في الشهر الخامس',
    content: 'محتاجة مساعدة... الدكتورة قالتلي إن وزني زاد أكتر من اللازم في الشهر ده وأنا مش عارفة أتحكم في أكلي خالص. حد عندها تجربة؟',
    createdAt: '2026-03-18T10:30:00', likes: 47, supports: 89, cares: 23, commentsCount: 34, tags: ['وزن الحمل', 'تغذية'], isPinned: false,
  },
  {
    id: 'p2', circleId: 'c2', isAnonymous: false, userId: 'u3', userName: 'نور محمد', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', userLabel: 'أم لـ 3 أشهر',
    content: 'البيبي بدأ يبتسم النهاردة لأول مرة 😭❤️ مش قادرة أوصف الإحساس ده!',
    createdAt: '2026-03-18T08:15:00', likes: 234, supports: 12, cares: 8, commentsCount: 67, tags: ['فرحة'], isPinned: true,
  },
  {
    id: 'p3', circleId: 'c4', isAnonymous: true, anonymousAlias: 'نجمة الصباح', userLabel: 'أنا بس أنا',
    content: 'سؤال محتاجة رأي فيه... الدكتور قالي إن عندي PCOS وإن محتاجة أخس. هل الرياضة هتساعد فعلاً؟',
    createdAt: '2026-03-17T20:00:00', likes: 31, supports: 95, cares: 41, commentsCount: 52, tags: ['PCOS', 'صحة'], isPinned: false,
  },
]
