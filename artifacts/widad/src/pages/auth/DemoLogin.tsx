import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { ACCOUNTS_BY_GROUP, type PlanSlug } from '../../mock/data/accounts'

const GROUP_STYLES: Record<string, { header: string; border: string; badge: string }> = {
  pink:   { header: 'text-pink-600',   border: 'border-pink-100',   badge: 'bg-pink-50 text-pink-600'   },
  purple: { header: 'text-purple-600', border: 'border-purple-100', badge: 'bg-purple-50 text-purple-600' },
  teal:   { header: 'text-teal-600',   border: 'border-teal-100',   badge: 'bg-teal-50 text-teal-600'   },
  blue:   { header: 'text-blue-600',   border: 'border-blue-100',   badge: 'bg-blue-50 text-blue-600'   },
  gray:   { header: 'text-gray-600',   border: 'border-gray-100',   badge: 'bg-gray-50 text-gray-500'   },
}

const PLAN_STYLES: Record<PlanSlug, string> = {
  'basic':    'bg-gray-100 text-gray-500 border border-gray-200',
  'plus':     'bg-pink-50 text-pink-600 border border-pink-200',
  'pro':      'bg-purple-50 text-purple-600 border border-purple-200',
  'pro-plus': 'bg-amber-50 text-amber-600 border border-amber-200',
}

const PLAN_LABELS: Record<PlanSlug, string> = {
  'basic':    'Basic',
  'plus':     'Plus',
  'pro':      'Pro',
  'pro-plus': 'Pro+ 👑',
}

export default function DemoLogin() {
  const navigate   = useNavigate()
  const login      = useAuthStore((s) => s.login)
  const [loading, setLoading] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string, role: string) => {
    setLoading(email)
    try {
      await login(email, password)
      navigate(`/${role}/dashboard`)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">🌸 وداد — Demo Accounts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              اضغطي على أي حساب للدخول فوراً &nbsp;·&nbsp; كلمة السر:{' '}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono font-bold text-xs shadow-sm border border-gray-200">
                demo123
              </code>
            </p>
          </div>
          <button onClick={() => navigate('/auth')} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors bg-white px-4 py-2 rounded-full border border-border shadow-sm">
            دخول عادي →
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 px-6 py-3 shadow-sm relative z-0">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-1">👩 12 مريضة</span>
          <span className="flex items-center gap-1">👨‍⚕️ 3 أطباء</span>
          <span className="flex items-center gap-1">⚙️ 1 أدمن</span>
          <span className="text-primary bg-primary/5 px-3 py-0.5 rounded-full">3 مراحل حياة × 4 باقات</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {ACCOUNTS_BY_GROUP.map((group) => {
          const style = GROUP_STYLES[group.color]
          return (
            <section key={group.group}>
              <div className="flex items-baseline gap-3 mb-5 border-b border-border pb-2">
                <h2 className={`text-2xl font-bold ${style.header}`}>{group.group}</h2>
                <span className="text-sm text-muted-foreground font-medium">{group.description}</span>
                <span className="text-xs text-gray-400 mr-auto bg-gray-100 px-2 py-1 rounded-full font-bold">
                  {group.accounts.length} حساب
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {group.accounts.map((account) => {
                  const isLoading = loading === account.email
                  const plan = 'plan' in account ? (account as any).plan as PlanSlug : null
                  const hasRiskFlag = account.mockData && 'dashboardStats' in account.mockData && (account.mockData as any).dashboardStats?.riskFlag

                  return (
                    <button
                      key={account.email}
                      onClick={() => handleLogin(account.email, account.password, account.role)}
                      disabled={!!loading}
                      className={`
                        relative text-right p-5 rounded-3xl bg-white
                        border-2 ${style.border}
                        shadow-md hover:shadow-xl hover:-translate-y-1
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        group overflow-hidden
                      `}
                    >
                      {isLoading && (
                        <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm grid place-items-center rounded-3xl">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        {plan ? (
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${PLAN_STYLES[plan]}`}>
                            {PLAN_LABELS[plan]}
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">Staff</span>
                        )}
                        {hasRiskFlag && (
                          <span className="text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full shadow-sm">
                            ⚠️ حالة خطرة
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <img src={account.avatar} alt={account.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-bold text-gray-900 text-lg leading-tight">{account.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">{account.email}</p>
                        </div>
                      </div>

                      {('bio' in account || 'specialty' in account) && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2 h-10 border-t border-gray-50 pt-2">
                          {(account as any).bio || (account as any).specialty}
                        </p>
                      )}

                      <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          ←
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
