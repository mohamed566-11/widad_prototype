import { UpgradePrompt } from './UpgradePrompt'
import { useAuthStore } from '@/store/auth.store'

type PaidFeature = 'ai_chat_voice' | 'ai_weekly_reports' | 'ai_custom_journey'

function hasFeature(planName: string, feature: PaidFeature) {
  const isBasic = planName.includes('Basic')
  const isPlus = planName.includes('Plus')
  const isPro = planName.includes('Pro')
  const isProPlus = planName.includes('Pro+')

  if (feature === 'ai_chat_voice') {
    return !isBasic
  }

  if (feature === 'ai_weekly_reports') {
    return isPro || isProPlus
  }

  if (feature === 'ai_custom_journey') {
    return isProPlus
  }

  return isPlus || isPro || isProPlus
}

export function FeatureGate({ feature, children }: { feature: PaidFeature; children: any }) {
  const user = useAuthStore((s: any) => s.user)
  const planName: string = user?.mockData?.subscription?.plan ?? 'وداد Basic'

  if (!hasFeature(planName, feature)) {
    return <UpgradePrompt feature={feature} />
  }

  return <>{children}</>
}
