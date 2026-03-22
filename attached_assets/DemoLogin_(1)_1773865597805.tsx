// src/pages/auth/DemoLogin.tsx
// =====================================================
// شاشة Demo Login — كل الأكونتس بضغطة واحدة
// 3 مراحل: قبل الزواج / مرحلة الزواج / بعد الجواز
// =====================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { ACCOUNTS_BY_GROUP, type PlanSlug } from '../../mock/data/accounts'

// ألوان الـ groups
const GROUP_STYLES: Record<string, { header: string; border: string; badge: string }> = {
  pink:   { header: 'text-pink-600',   border: 'border-pink-100',   badge: 'bg-pink-50 text-pink-600'   },
  purple: { header: 'text-purple-600', border: 'border-purple-100', badge: 'bg-purple-50 text-purple-600' },
  teal:   { header: 'text-teal-600',   border: 'border-teal-100',   badge: 'bg-teal-50 text-teal-600'   },
  blue:   { header: 'text-blue-600',   border: 'border-blue-100',   badge: 'bg-blue-50 text-blue-600'   },
  gray:   { header: 'text-gray-600',   border: 'border-gray-100',   badge: 'bg-gray-50 text-gray-500'   },
}

// ألوان الباقات
const PLAN_STYLES: Record<PlanSlug, string> = {
  'basic':    'bg-gray-100   text-gray-500   border border-gray-200',
  'plus':     'bg-pink-50    text-pink-600   border border-pink-200',
  'pro':      'bg-purple-50  text-purple-600 border border-purple-200',
  'pro-plus': 'bg-amber-50   text-amber-600  border border-amber-200',
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
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

      {/* ── Header ── */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">🌸 وداد — Demo Accounts</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              اضغطي على أي أكونت للدخول فوراً &nbsp;·&nbsp; كلمة السر:{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-xs">
                demo123
              </code>
            </p>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
          >
            تسجيل دخول عادي →
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex gap-8 text-sm text-gray-500">
          <span>👩 12 أكونت مريضة</span>
          <span>👨‍⚕️ 3 أكونت طبيب</span>
          <span>⚙️ 1 أكونت أدمن</span>
          <span className="text-pink-500 font-medium">3 مراحل حياة × 4 باقات</span>
        </div>
      </div>

      {/* ── Groups ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {ACCOUNTS_BY_GROUP.map((group) => {
          const style = GROUP_STYLES[group.color]
          return (
            <section key={group.group}>

              {/* Group Header */}
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className={`text-xl font-bold ${style.header}`}>
                  {group.group}
                </h2>
                <span className="text-sm text-gray-400">{group.description}</span>
                <span className="text-xs text-gray-300 mr-auto">
                  {group.accounts.length} أكونت
                </span>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.accounts.map((account) => {
                  const isLoading = loading === account.email
                  const plan = 'plan' in account ? (account as any).plan as PlanSlug : null
                  const hasRiskFlag = account.mockData && 'dashboardStats' in account.mockData
                    && (account.mockData as any).dashboardStats?.riskFlag

                  return (
                    <button
                      key={account.email}
                      onClick={() => handleLogin(account.email, account.password, account.role)}
                      disabled={!!loading}
                      className={`
                        relative text-right p-4 rounded-2xl bg-white
                        border-2 ${style.border}
                        shadow-sm hover:shadow-md hover:scale-[1.02]
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        group
                      `}
                    >
                      {/* Loading */}
                      {isLoading && (
                        <div className="absolute inset-0 rounded-2xl bg-white/90 grid place-items-center">
                          <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      {/* Top row: plan badge + risk flag */}
                      <div className="flex items-center justify-between mb-2">
                        {plan ? (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PLAN_STYLES[plan]}`}>
                            {PLAN_LABELS[plan]}
                          </span>
                        ) : (
                          <span />
                        )}
                        {hasRiskFlag && (
                          <span className="text-xs bg-red-50 text-red-500 border border-red-100 px-1.5 py-0.5 rounded-full">
                            ⚠️ خطر
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <p className="font-bold text-gray-800 text-[15px] leading-snug mb-0.5">
                        {account.name}
                      </p>

                      {/* Bio */}
                      {'bio' in account && (
                        <p className="text-xs text-gray-400 leading-relaxed mb-2 line-clamp-2">
                          {(account as any).bio}
                        </p>
                      )}

                      {/* Email */}
                      <p className="text-[11px] text-gray-300 font-mono truncate">
                        {account.email}
                      </p>

                      {/* Hover arrow */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 text-base">
                        ←
                      </div>
                    </button>
                  )
                })}
              </div>

            </section>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div className="text-center pb-10 text-sm text-gray-300">
        كلمة السر لكل الأكونتس:&nbsp;
        <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono">
          demo123
        </code>
      </div>

    </div>
  )
}
