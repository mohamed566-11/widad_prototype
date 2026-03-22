import { findAccount } from '../data/accounts'

export const authMock = {
  async login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 600))
    const account = findAccount(email, password)

    if (!account) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غلط')
    }

    return {
      token: `mock-token-${account.role}-${Date.now()}`,
      role: account.role,
      user: account,
    }
  },

  async register(_payload: unknown) {
    await new Promise((r) => setTimeout(r, 700))
    return {
      success: true,
      message: 'تم إرسال كود التحقق على رقمك',
    }
  },

  async verifyOTP(_otp: string) {
    await new Promise((r) => setTimeout(r, 500))
    return { success: true }
  },

  async requestPasswordReset(_email: string) {
    await new Promise((r) => setTimeout(r, 700))
    return {
      success: true,
      message: 'تم إرسال رابط إعادة التعيين على بريدك الإلكتروني',
    }
  },
}
