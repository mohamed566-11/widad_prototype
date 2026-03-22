import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, Lock, Mail, Phone, User } from 'lucide-react'
import { authMock } from '@/mock/services/auth.mock'

export default function PatientRegister() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit =
    fullName.trim().length >= 3 &&
    email.includes('@') &&
    phone.trim().length >= 8 &&
    password.length >= 6 &&
    password === confirmPassword &&
    agree

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || loading) return

    setLoading(true)
    setError('')

    try {
      await authMock.register({
        fullName,
        email,
        phone,
        password,
      })

      navigate('/auth/patient/otp', { state: { email, phone } })
    } catch (e: any) {
      setError(e?.message ?? 'حدث خطأ أثناء إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50" dir="rtl">
      <div className="max-w-lg w-full">
        <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌸</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground">ابدئي رحلتك الصحية مع وداد في أقل من دقيقة</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-6 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="مثال: سارة محمد"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="name@example.com"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+20 10xxxxxxxx"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="6 أحرف على الأقل"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="أعيدي إدخال كلمة المرور"
                    required
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {confirmPassword && confirmPassword !== password && (
              <p className="text-xs text-destructive font-bold">كلمتا المرور غير متطابقتين</p>
            )}

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              أوافق على الشروط وسياسة الخصوصية
            </label>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full bg-primary text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إنشاء الحساب وإرسال OTP'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/auth/patient/login" className="text-primary font-bold hover:underline">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
