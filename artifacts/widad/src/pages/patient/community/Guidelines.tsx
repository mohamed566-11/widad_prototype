import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Stethoscope, MegaphoneOff, AlertOctagon, HeartHandshake } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export default function Guidelines() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const rules = [
    { icon: HeartHandshake, title: 'الاحترام المتبادل', desc: 'عاملي الأخريات كما تحبين أن تُعاملي. لا للتنمر أو الإساءة.' },
    { icon: Stethoscope, title: 'لا للنصائح الطبية', desc: 'المنصة للفضفضة والدعم النفسي. يمنع منعاً باتاً وصف الأدوية.' },
    { icon: UserCheck, title: 'الخصوصية والأمان', desc: 'لا تشاركي معلوماتك الشخصية أو أرقام الهواتف في العام.' },
    { icon: ShieldCheck, title: 'مساحة آمنة للنساء', desc: 'هذا المجتمع مخصص للنساء فقط لمناقشة أمورهن براحة وأمان.' },
    { icon: MegaphoneOff, title: 'لا للإعلانات', desc: 'يمنع الترويج لمنتجات، خدمات، أو صفحات أخرى.' },
    { icon: AlertOctagon, title: 'التبليغ عن المخالفات', desc: 'استخدمي زر التبليغ لأي محتوى مزعج وسيتدخل الإشراف فوراً.' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">قوانين مجتمع وداد</h1>
        <p className="text-lg text-gray-600">للحفاظ على مساحة آمنة وداعمة للجميع، يرجى قراءة والموافقة على هذه الشروط</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border mb-10">
        <div className="space-y-6">
          {rules.map((rule, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <rule.icon className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{rule.title}</h3>
                <p className="text-gray-600 leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={() => {
            if (user) {
              setUser({ ...user, communityGuidelinesAccepted: true });
            }
            navigate('/patient/community');
          }}
          className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-1 w-full sm:w-auto"
        >
          قرأت وأوافق على الشروط
        </button>
        <p className="mt-4 text-sm text-gray-400">بموافقتك، تتعهدين بالالتزام بالقوانين. المخالفة قد تؤدي لحظر الحساب.</p>
      </div>
    </div>
  );
}