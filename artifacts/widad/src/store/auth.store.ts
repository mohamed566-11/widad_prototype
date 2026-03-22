import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserRole } from '../mock/data/accounts'
import { authMock } from '../mock/services/auth.mock'

interface AuthStore {
  user: any | null
  role: UserRole | null
  isAuth: boolean
  login: (email: string, password: string) => Promise<void>
  setUser: (user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, role: null, isAuth: false,
      login: async (email, password) => {
        const result = await authMock.login(email, password)
        set({ user: result.user, role: result.role as UserRole, isAuth: true })
      },
      setUser: (user) => set((state) => ({ user, role: state.role ?? (user?.role as UserRole) ?? null })),
      logout: () => set({ user: null, role: null, isAuth: false }),
    }),
    { name: 'widad-auth', partialize: (s) => ({ user: s.user, role: s.role, isAuth: s.isAuth }) }
  )
)
