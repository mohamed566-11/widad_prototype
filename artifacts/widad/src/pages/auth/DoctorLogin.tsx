import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Mail, Lock, Loader2, ArrowRight, Stethoscope } from 'lucide-react';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/doctor/dashboard');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 items-center justify-center p-4 md:p-0" dir="rtl">
      
      {/* القسم الأيمن - صورة تعبيرية */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 h-screen relative flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="relative z-10 text-center flex flex-col items-center max-w-md">
          <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-500/30 rotate-3">
            <Stethoscope className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-foreground mb-4 leading-tight">عيادتك الرقمية المتكاملة</h2>
          <p className="text-lg text-foreground/70 mb-8">تابعي مرضاك، أدي استشارات، وانشري المعرفة من منصة واحدة.</p>
          <div className="flex gap-2">
            <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500/30 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* القسم الأيسر - فورم الدخول */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-blue-500 mb-8 transition-colors text-sm font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-border">
            <ArrowRight className="w-4 h-4" />
            رجوع لاختيار نوع الحساب
          </Link>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-500/5 p-8 sm:p-10 border border-blue-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-black text-foreground mb-2">أهلاً يا دكتورة 🩺</h1>
              <p className="text-muted-foreground font-medium">سجلي الدخول لمتابعة جدول مواعيدك</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-6 text-sm font-bold text-center border border-destructive/20 relative z-10">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pr-12 pl-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-900"
                    placeholder="doctor@widad.com"
                    required
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500/50" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pr-12 pl-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    placeholder="••••••••"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300 transition-colors" />
                  <span className="text-gray-600 font-medium group-hover:text-blue-500 transition-colors">تذكرني</span>
                </label>
                <Link to="/auth/doctor/reset" className="text-blue-500 font-bold hover:underline">نسيت كلمة المرور؟</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-70 mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تسجيل الدخول'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100/80 text-center relative z-10">
              <Link to="/demo" className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
                هل تبحثين عن الحسابات التجريبية؟
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}