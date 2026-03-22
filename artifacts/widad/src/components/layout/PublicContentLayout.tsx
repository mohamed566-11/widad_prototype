import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { User, Rocket } from 'lucide-react'

export default function PublicContentLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { isAuth, user, role } = useAuthStore()
  const dashPath = role ? `/${role}/dashboard` : '/demo'
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Navbar */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-black text-lg">و</div>
            <span className="font-black text-lg text-foreground hidden sm:block">وداد تك</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link>
            <Link to="/about" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">من نحن</Link>
            <Link to="/life-stages" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">المراحل</Link>
            <Link to="/trackers" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">المتتبعات</Link>
            <Link to="/doctors" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">الأطباء</Link>
            <Link to="/articles" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">المقالات</Link>
            <Link to="/pricing" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">الباقات</Link>
            <Link to="/contact" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {isAuth ? (
              <Link to={dashPath} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                <span className="sm:hidden">لوحتي</span>
              </Link>
            ) : (
              <>
                <Link to="/auth" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors hidden sm:block">تسجيل الدخول</Link>
                <Link to="/demo" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                  <Rocket className="w-4 h-4" />
                  جربي مجاناً
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className={isLandingPage ? 'pt-16' : 'pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-8'}>
        {children}
      </main>
    </div>
  )
}
