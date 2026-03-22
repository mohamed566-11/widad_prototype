import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function ProtectedRoute({ role }: { role: 'patient' | 'doctor' | 'admin' }) {
  const { isAuth, role: userRole } = useAuthStore()

  if (!isAuth) {
    return <Navigate to="/auth" replace />
  }
  
  if (userRole !== role) {
    return <Navigate to={`/${userRole}/dashboard`} replace />
  }

  return <Outlet />
}
