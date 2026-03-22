// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Incorporating Framer Motion layoutId for active link backgrounds, staggered list animations,
// and a frosted glass aesthetic for the sidebar and main container.
// Removed harsh borders and replaced with `glass-panel` and `shadow-glass`.

import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { LogOut, Menu, X } from 'lucide-react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUpVariant, staggerContainer, customEase } from '@/lib/animations'

interface SidebarItem {
  icon: ReactNode;
  label: string;
  path: string;
}

export function SidebarLayout({ items, children, title }: { items: SidebarItem[], children: ReactNode, title?: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const sidebarAnimation = isMobile 
    ? { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } } 
    : { initial: { x: 0 }, animate: { x: 0 }, exit: { x: 0 } }

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-screen bg-background overflow-hidden relative selection:bg-primary/20" dir="rtl">
        
        {/* Animated Background Mesh */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />

        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-md lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {(isOpen || !isMobile) && (
            <m.aside
              {...sidebarAnimation}
              transition={{ duration: 0.4, ease: customEase }}
              className={cn(
                "fixed inset-y-0 right-0 z-50 w-72 glass-panel border-r-0 border-l border-white/20 shadow-glass flex flex-col lg:static lg:bg-transparent lg:shadow-none lg:border-l lg:backdrop-blur-none",
                isMobile ? "bg-white/70 dark:bg-black/70" : ""
              )}
            >
              <div className="p-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="relative overflow-hidden rounded-xl bg-white p-1 shadow-[var(--shadow-soft)] transition-transform group-hover:scale-105 duration-300">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Widad Logo" className="w-10 h-10 object-contain" />
                  </div>
                  <span className="text-2xl font-black font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x">
                    وداد تك
                  </span>
                </Link>
                {isMobile && (
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 relative">
                {items.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => isMobile && setIsOpen(false)}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3.5 rounded-[1.25rem] transition-colors duration-300 group font-medium text-sm",
                        isActive ? "text-primary-foreground font-bold shadow-soft" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <m.div 
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-primary/90 shadow-glow rounded-[1.25rem] z-0"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <span className={cn("relative z-10 transition-colors duration-300", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")}>
                        {item.icon}
                      </span>
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-5 mt-auto border-t border-border/50">
                <div className="flex items-center gap-3 p-3 rounded-2xl glass-card mb-4">
                  <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt={user?.name} className="w-11 h-11 rounded-xl object-cover shadow-sm border border-white/50" />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold font-display text-sm text-foreground truncate drop-shadow-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-[1.25rem] transition-all duration-300 group"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  تسجيل الخروج
                </button>
              </div>
            </m.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
          
          {/* Mobile Header Overlay */}
          <m.header 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="lg:hidden flex items-center justify-between p-4 glass-panel border-b border-border shadow-sm z-30"
          >
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Widad Logo" className="w-9 h-9 rounded-lg object-contain shadow-sm bg-white p-0.5" />
              <span className="font-black font-display text-lg bg-clip-text text-transparent bg-gradient-to-l from-primary to-accent">وداد</span>
            </div>
            <button onClick={() => setIsOpen(true)} className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </m.header>

          <main className="flex-1 overflow-y-auto w-full relative">
            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
              {title && (
                <m.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="flex items-center justify-between glass-card rounded-3xl p-6"
                >
                  <h1 className="text-3xl font-black font-display text-foreground tracking-tight drop-shadow-sm">{title}</h1>
                </m.div>
              )}
              
              <m.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="show"
                key={location.pathname} // re-trigger animations on route change
              >
                {children}
              </m.div>
            </div>
          </main>
        </div>
      </div>
    </LazyMotion>
  )
}
