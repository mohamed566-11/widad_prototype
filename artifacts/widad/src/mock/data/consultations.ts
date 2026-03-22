export const MOCK_CONSULTATIONS = [
  { id: 'c1', doctorName: 'د. سارة أحمد', doctorSpecialty: 'أمراض النساء والتوليد', doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150', type: 'فيديو', date: '2026-03-20', time: '10:00 صباحاً', status: 'upcoming', price: 350, notes: '', prescription: null },
  { id: 'c2', doctorName: 'د. هبة علي', doctorSpecialty: 'التغذية وصحة المرأة', doctorAvatar: 'https://images.unsplash.com/photo-1594824436998-dde3c1441bc2?w=150', type: 'صوت', date: '2026-03-15', time: '02:00 مساءً', status: 'completed', price: 250, notes: 'الالتزام بالنظام الغذائي المقترح والتركيز على البروتين.', prescription: 'فيتامين د 5000 وحدة' },
  { id: 'c3', doctorName: 'د. منى حسين', doctorSpecialty: 'طب الأطفال حديثي الولادة', doctorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150', type: 'نص', date: '2026-03-10', time: '11:30 صباحاً', status: 'completed', price: 200, notes: 'الطفل ينمو بشكل طبيعي. الاستمرار في الرضاعة الطبيعية.', prescription: 'قطرات فيتامين د للرضع' },
  { id: 'c4', doctorName: 'د. نادية حسن', doctorSpecialty: 'طب نفسي', doctorAvatar: 'https://images.unsplash.com/photo-1594824436998-dde3c1441bc2?w=150', type: 'فيديو', date: '2026-03-25', time: '05:00 مساءً', status: 'pending', price: 380, notes: '', prescription: null },
  { id: 'c5', doctorName: 'د. ليلى مصطفى', doctorSpecialty: 'التوليد', doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150', type: 'صوت', date: '2026-03-05', time: '01:00 مساءً', status: 'cancelled', price: 400, notes: 'تم الإلغاء من قبل المريض', prescription: null }
];

export const MOCK_PATIENTS = [
  { id: 'p1', name: 'سارة محمد', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150', age: 26, lastVisit: '2026-03-10', diagnosis: 'حمل - الأسبوع 20', lifeStage: 'marriage' },
  { id: 'p2', name: 'هناء إبراهيم', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150', age: 29, lastVisit: '2026-03-12', diagnosis: 'متابعة تبويض', lifeStage: 'marriage' },
  { id: 'p3', name: 'مروة أحمد', avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150', age: 35, lastVisit: '2026-03-15', diagnosis: 'ضغط دم مرتفع مع الحمل', lifeStage: 'marriage' },
  { id: 'p4', name: 'نهاد كمال', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', age: 25, lastVisit: '2026-03-01', diagnosis: 'متابعة ما بعد الولادة', lifeStage: 'post_marriage' },
  { id: 'p5', name: 'نور خالد', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', age: 24, lastVisit: '2026-02-28', diagnosis: 'فحوصات ما قبل الزواج', lifeStage: 'pre_marriage' },
  { id: 'p6', name: 'ياسمين سامي', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', age: 26, lastVisit: '2026-03-18', diagnosis: 'استشارة عامة', lifeStage: 'pre_marriage' },
  { id: 'p7', name: 'دينا وليد', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', age: 28, lastVisit: '2026-03-05', diagnosis: 'تقييم صحة إنجابية', lifeStage: 'pre_marriage' },
  { id: 'p8', name: 'حنان عمر', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', age: 28, lastVisit: '2026-03-14', diagnosis: 'اكتئاب ما بعد الولادة', lifeStage: 'post_marriage' },
];

export const MOCK_DOCTOR_CONSULTATIONS = [
  { id: 'dc1', patientName: 'سارة محمد', patientAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150', type: 'فيديو', date: '2026-03-20', time: '10:00 صباحاً', status: 'upcoming', notes: 'متابعة حمل - الأسبوع 20' },
  { id: 'dc2', patientName: 'مروة أحمد', patientAvatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150', type: 'فيديو', date: '2026-03-20', time: '02:00 مساءً', status: 'pending', notes: 'ارتفاع في ضغط الدم' },
  { id: 'dc3', patientName: 'هناء إبراهيم', patientAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150', type: 'صوت', date: '2026-03-21', time: '11:00 صباحاً', status: 'upcoming', notes: 'استشارة خصوبة' },
  { id: 'dc4', patientName: 'نور خالد', patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', type: 'نص', date: '2026-03-19', time: '04:00 مساءً', status: 'completed', notes: 'تحليل نتائج فحوصات الزواج' },
  { id: 'dc5', patientName: 'نهاد كمال', patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', type: 'فيديو', date: '2026-03-18', time: '01:00 مساءً', status: 'completed', notes: 'فحص ما بعد الولادة' },
  { id: 'dc6', patientName: 'ياسمين سامي', patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', type: 'صوت', date: '2026-03-22', time: '09:00 صباحاً', status: 'pending', notes: 'استشارة تغذية' },
  { id: 'dc7', patientName: 'دينا وليد', patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', type: 'فيديو', date: '2026-03-15', time: '10:00 صباحاً', status: 'completed', notes: '' },
  { id: 'dc8', patientName: 'حنان عمر', patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', type: 'نص', date: '2026-03-12', time: '03:00 مساءً', status: 'cancelled', notes: 'ألغيت' },
  { id: 'dc9', patientName: 'إيمان رضا', patientAvatar: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150', type: 'فيديو', date: '2026-03-25', time: '12:00 مساءً', status: 'upcoming', notes: 'متابعة توأم' },
  { id: 'dc10', patientName: 'شيرين مصطفى', patientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', type: 'صوت', date: '2026-03-26', time: '10:30 صباحاً', status: 'upcoming', notes: 'استشارة تعافي' }
];