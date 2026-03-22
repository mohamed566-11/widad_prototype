import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function GuidelinesGuard() {
  const user = useAuthStore((s) => s.user)

  if (!user?.communityGuidelinesAccepted) {
    return <Navigate to="/patient/community/guidelines" replace />
  }

  return <Outlet />
}
