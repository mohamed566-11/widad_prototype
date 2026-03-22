// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Transformed standard registration form into a beautiful, engaging experience.
// Used staggered animations for form fields to make the form feel alive and responsive.
// Replaced flat white backgrounds with `glass-panel` and smooth gradient backdrops.

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, Lock, Mail, Phone, User } from 'lucide-react'
import { authMock } from '@/mock/services/auth.mock'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeUpVariant, staggerContainer, customEase } from '@/lib/animations'

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
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden" dir="rtl">
        {/* ✨ Animated Floating Nebulas */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>

        <m.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: customEase }}
          className="absolute top-6 right-6 z-20"
        >
          <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium hover:bg-primary/5 px-4 py-2 rounded-full">
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Link>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-lg w-full relative z-10"
        >
          <m.div variants={fadeUpVariant} className="glass-panel rounded-[2rem] p-8 md:p-10 border border-white/60 dark:border-white/10 shadow-glass">
            <div className="text-center mb-10">
              <div className="relative inline-block overflow-hidden rounded-2xl bg-white p-2 shadow-[var(--shadow-soft)] mb-6">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Widad Logo" className="w-16 h-16 object-contain" />
              </div>
              <h1 className="text-3xl font-black font-display text-foreground mb-3">إنشاء حساب جديد</h1>
              <p className="text-muted-foreground">ابدئي رحلتك الصحية مع وداد في أقل من دقيقة</p>
            </div>

            {error && (
              <m.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-destructive/10 text-destructive p-4 rounded-xl mb-6 text-sm font-bold text-center border border-destructive/20"
              >
                {error}
              </m.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-5">
                <m.div variants={fadeUpVariant}>
                  <label className="block text-sm font-bold text-foreground/80 mb-2">الاسم الكامل</label>
                  <div className="relative group">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl py-3.5 pr-12 pl-4 focus:bg-white dark:focus:bg-black focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                      placeholder="مثال: سارة محمد"
                      required
                    />
                  </div>
                </m.div>

                <m.div variants={fadeUpVariant}>
                  <label className="block text-sm font-bold text-foreground/80 mb-2">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl py-3.5 pr-12 pl-4 focus:bg-white dark:focus:bg-black focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                      placeholder="name@example.com"
                      required
                      dir="ltr"
                    />
                  </div>
                </m.div>

                <m.div variants={fadeUpVariant}>
                  <label className="block text-sm font-bold text-foreground/80 mb-2">رقم الهاتف</label>
                  <div className="relative group">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl py-3.5 pr-12 pl-4 focus:bg-white dark:focus:bg-black focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                      placeholder="+20 10xxxxxxxx"
                      required
                      dir="ltr"
                    />
                  </div>
                </m.div>

                <m.div variants={fadeUpVariant} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground/80 mb-2">كلمة المرور</label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl py-3.5 pr-12 pl-4 focus:bg-white dark:focus:bg-black focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                        placeholder="6 أحرف على الأقل"
                        required
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground/80 mb-2">تأكيد كلمة المرور</label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl py-3.5 pr-12 pl-4 focus:bg-white dark:focus:bg-black focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                        placeholder="أعيدي إدخال كلمة المرور"
                        required
                        dir="ltr"
                      />
                    </div>
                  </div>
                </m.div>
                
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-destructive font-bold">كلمتا المرور غير متطابقتين</p>
                )}
              </div>

              <m.div variants={fadeUpVariant}>
                <label className="flex items-center gap-3 text-sm text-foreground/70 cursor-pointer pt-2 group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="peer appearance-none w-5 h-5 rounded border border-gray-300 checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="group-hover:text-foreground transition-colors">أوافق على الشروط وسياسة الخصوصية</span>
                </label>
              </m.div>

              <m.div variants={fadeUpVariant} className="pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="w-full relative overflow-hidden bg-primary text-primary-foreground font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-[var(--shadow-glow)] disabled:opacity-60 disabled:shadow-none group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إنشاء الحساب وإرسال OTP'}
                </button>
              </m.div>
            </form>

            <m.p variants={fadeUpVariant} className="mt-8 text-sm text-center text-foreground/70">
              لديك حساب بالفعل؟{' '}
              <Link to="/auth/patient/login" className="text-primary font-bold hover:underline transition-all">تسجيل الدخول</Link>
            </m.p>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
