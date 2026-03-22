import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2, Mail, ShieldCheck } from 'lucide-react'
import { authMock } from '@/mock/services/auth.mock'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await authMock.requestPasswordReset(email)
      setMessage(result.message)
    } catch (e: any) {
      setError(e?.message ?? 'تعذر إرسال رابط إعادة التعيين')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50" dir="rtl">
      <div className="max-w-md w-full">
        <Link to="/auth/patient/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">استعادة كلمة المرور</h1>
            <p className="text-muted-foreground">سنرسل لك رابط إعادة التعيين على بريدك الإلكتروني</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-4 text-sm font-bold text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-4 text-sm font-bold text-center border border-green-100">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={!email || loading}
              className="w-full bg-primary text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إرسال رابط الاستعادة'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            تذكرت كلمة المرور؟{' '}
            <Link to="/auth/patient/login" className="text-primary font-bold hover:underline">العودة لتسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
