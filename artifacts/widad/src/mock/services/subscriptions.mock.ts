import { MOCK_PLANS } from '../data/subscriptions'

const pendingKey = (userId: string) => `widad-pending-plan-${userId}`
const invoicesKey = (userId: string) => `widad-invoices-${userId}`

type Invoice = {
  id: string
  date: string
  description: string
  amount: string
  status: 'paid'
  method: 'card' | 'wallet' | 'cash'
}

const seedInvoices: Invoice[] = [
  { id: 'INV-2026-003', date: '2026-03-01', description: 'تجديد اشتراك وداد Plus - شهري', amount: '149 ج.م', status: 'paid', method: 'card' },
  { id: 'INV-2026-002', date: '2026-02-01', description: 'تجديد اشتراك وداد Plus - شهري', amount: '149 ج.م', status: 'paid', method: 'card' },
  { id: 'INV-2026-001', date: '2026-01-15', description: 'استشارة فيديو - د. سارة أحمد', amount: '280 ج.م', status: 'paid', method: 'wallet' },
]

const resolveUserId = (user: any) => user?.email ?? user?.id ?? 'guest'

function readInvoices(user: any): Invoice[] {
  const userId = resolveUserId(user)
  const raw = localStorage.getItem(invoicesKey(userId))

  if (!raw) {
    localStorage.setItem(invoicesKey(userId), JSON.stringify(seedInvoices))
    return [...seedInvoices]
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : [...seedInvoices]
  } catch {
    localStorage.setItem(invoicesKey(userId), JSON.stringify(seedInvoices))
    return [...seedInvoices]
  }
}

function writeInvoices(user: any, invoices: Invoice[]) {
  const userId = resolveUserId(user)
  localStorage.setItem(invoicesKey(userId), JSON.stringify(invoices))
}

export const subscriptionsMock = {
  listPlans() {
    return MOCK_PLANS
  },

  setPendingPlan(user: any, planId: string, isYearly: boolean) {
    const userId = resolveUserId(user)
    localStorage.setItem(
      pendingKey(userId),
      JSON.stringify({ planId, isYearly, selectedAt: new Date().toISOString() })
    )
  },

  getPendingPlan(user: any): { planId: string; isYearly: boolean } | null {
    const userId = resolveUserId(user)
    const raw = localStorage.getItem(pendingKey(userId))

    if (!raw) return null

    try {
      return JSON.parse(raw)
    } catch {
      localStorage.removeItem(pendingKey(userId))
      return null
    }
  },

  clearPendingPlan(user: any) {
    const userId = resolveUserId(user)
    localStorage.removeItem(pendingKey(userId))
  },

  getInvoices(user: any): Invoice[] {
    return readInvoices(user)
  },

  addInvoice(user: any, invoice: Invoice) {
    const list = readInvoices(user)
    writeInvoices(user, [invoice, ...list])
  },

  checkout(
    user: any,
    billing?: {
      purchaserName?: string
      paymentMethod?: 'card' | 'wallet' | 'cash'
    }
  ) {
    const pending = this.getPendingPlan(user)
    const plan = MOCK_PLANS.find((p) => p.id === pending?.planId)

    if (!pending || !plan) {
      throw new Error('لا توجد باقة محددة لإتمام الدفع')
    }

    const amount = pending.isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
    const invoice: Invoice = {
      id: invoiceNumber,
      date: new Date().toISOString().slice(0, 10),
      description: `اشتراك ${plan.name} - ${pending.isYearly ? 'سنوي' : 'شهري'}`,
      amount: `${amount} ج.م`,
      status: 'paid',
      method: billing?.paymentMethod ?? 'card',
    }

    this.addInvoice(user, invoice)
    this.clearPendingPlan(user)

    return {
      success: true,
      plan,
      amount,
      billingCycle: pending.isYearly ? 'yearly' : 'monthly',
      invoiceNumber,
      purchaserName: billing?.purchaserName ?? user?.name,
      invoice,
    }
  },
}
