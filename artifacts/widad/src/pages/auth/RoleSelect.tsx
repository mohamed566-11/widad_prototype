import { Link } from 'react-router-dom';
import { User, Stethoscope, Settings } from 'lucide-react';

export default function RoleSelect() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden" dir="rtl">
      {/* خلفية تزيينية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-white/20 shadow-[var(--shadow-sm)] relative z-10 w-full fixed top-0 h-20">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-accent">
            و
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-accent">
            وداد تك
          </span>
        </Link>
        <Link to="/demo" className="text-sm font-bold bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
          تجربة سريعة (Demo)
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 mt-20 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">أهلاً بكِ في منصة <span className="text-primary">وداد</span></h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium">الرجاء اختيار نوع الحساب للمتابعة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/auth/patient/login" className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all group flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all border-4 border-white shadow-sm relative z-10">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors mb-3 relative z-10">مريضة</h2>
              <p className="text-gray-500 text-sm leading-relaxed relative z-10">للمتابعة الصحية، استخدام المتتبعات، وحجز الاستشارات الطبية بحرية.</p>
            </Link>

            <Link to="/auth/doctor/login" className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-500 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all group flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all border-4 border-white shadow-sm relative z-10">
                <Stethoscope className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 group-hover:text-blue-500 transition-colors mb-3 relative z-10">طبيبة</h2>
              <p className="text-gray-500 text-sm leading-relaxed relative z-10">لإدارة المواعيد، تقديم الاستشارات، وإضافة مقالات طبية متخصصة.</p>
            </Link>

            <Link to="/auth/admin/login" className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-gray-800 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all group flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-100 transition-all border-4 border-white shadow-sm relative z-10">
                <Settings className="w-10 h-10 text-gray-700" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 group-hover:text-gray-800 transition-colors mb-3 relative z-10">الإدارة</h2>
              <p className="text-gray-500 text-sm leading-relaxed relative z-10">للوصول إلى لوحة تحكم المنصة، إدارة المستخدمين، والإعدادات.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}