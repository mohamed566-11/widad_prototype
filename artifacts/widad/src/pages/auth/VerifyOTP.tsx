import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { authMock } from '@/mock/services/auth.mock'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as any)?.email

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = otp.length === 6

  const handleVerify = async () => {
    if (!canSubmit || loading) return

    setLoading(true)
    setError('')
    try {
      await authMock.verifyOTP(otp)
      navigate('/auth/patient/login')
    } catch (e: any) {
      setError(e?.message ?? 'كود التحقق غير صحيح')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-border">
        <Link to="/auth/patient/register" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">تأكيد رقم الهاتف</h1>
          <p className="text-muted-foreground">
            أدخلي كود التحقق المكوّن من 6 أرقام
            {email ? ` والمُرسل إلى ${email}` : ''}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-4 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          dir="ltr"
          placeholder="000000"
          className="w-full text-center tracking-[0.5em] text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        />

        <button
          type="button"
          onClick={handleVerify}
          disabled={!canSubmit || loading}
          className="mt-5 w-full bg-primary text-white font-bold rounded-xl py-3.5 hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تأكيد'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          لم يصلك الكود؟{' '}
          <button type="button" className="text-primary font-bold hover:underline">إعادة الإرسال</button>
        </div>
      </div>
    </div>
  )
}
