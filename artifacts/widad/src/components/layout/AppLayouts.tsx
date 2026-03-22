import { SidebarLayout } from './SidebarLayout'
import { Outlet } from 'react-router-dom'
import { Home, Activity, Stethoscope, Bot, Users, BookOpen, CreditCard, Calendar, FileText, Settings, UserCircle, PieChart, Inbox } from 'lucide-react'

export function PatientLayout() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'الرئيسية', path: '/patient/dashboard' },
    { icon: <Activity className="w-5 h-5" />, label: 'المتتبعات', path: '/patient/trackers' },
    { icon: <Stethoscope className="w-5 h-5" />, label: 'الاستشارات', path: '/patient/consultations' },
    { icon: <Bot className="w-5 h-5" />, label: 'وداد AI', path: '/patient/ai' },
    { icon: <Users className="w-5 h-5" />, label: 'المجتمع', path: '/patient/community' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'المقالات', path: '/patient/articles' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'الاشتراك', path: '/patient/subscriptions' },
  ]
  return <SidebarLayout items={navItems}><Outlet /></SidebarLayout>
}

export function DoctorLayout() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'الرئيسية', path: '/doctor/dashboard' },
    { icon: <Inbox className="w-5 h-5" />, label: 'الاستشارات', path: '/doctor/consultations' },
    { icon: <Users className="w-5 h-5" />, label: 'المرضى', path: '/doctor/patients' },
    { icon: <Calendar className="w-5 h-5" />, label: 'التقويم', path: '/doctor/calendar' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'المقالات', path: '/doctor/articles' },
    { icon: <UserCircle className="w-5 h-5" />, label: 'الملف الشخصي', path: '/doctor/profile' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'الأرباح', path: '/doctor/financials' },
  ]
  return <SidebarLayout items={navItems}><Outlet /></SidebarLayout>
}

export function AdminLayout() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'الرئيسية', path: '/admin/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'المستخدمين', path: '/admin/patients' },
    { icon: <Stethoscope className="w-5 h-5" />, label: 'الأطباء', path: '/admin/doctors' },
    { icon: <Inbox className="w-5 h-5" />, label: 'الاستشارات', path: '/admin/consultations' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'المقالات', path: '/admin/articles' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'المالية', path: '/admin/financial' },
    { icon: <Users className="w-5 h-5" />, label: 'المجتمع', path: '/admin/community' },
    { icon: <FileText className="w-5 h-5" />, label: 'الاشتراكات', path: '/admin/subscriptions' },
    { icon: <PieChart className="w-5 h-5" />, label: 'التحليلات', path: '/admin/analytics' },
    { icon: <Settings className="w-5 h-5" />, label: 'الإعدادات', path: '/admin/settings' },
  ]
  return <SidebarLayout items={navItems}><Outlet /></SidebarLayout>
}
