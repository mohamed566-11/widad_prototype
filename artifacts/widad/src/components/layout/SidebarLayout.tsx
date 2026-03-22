import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-[var(--shadow-lg)] flex flex-col transition-transform lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
              و
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-accent">
              وداد تك
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white font-bold shadow-md shadow-primary/20 scale-[1.02]" 
                    : "text-muted-foreground hover:bg-gray-50/80 hover:text-foreground font-medium hover:scale-[1.01]"
                )}
              >
                <span className={cn("transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-white/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/80 mb-3 border border-gray-100">
            <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt={user?.name} className="w-11 h-11 rounded-xl object-cover shadow-sm border border-white" />
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate font-medium">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50/30">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[var(--shadow-sm)] z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-sm shadow-md shadow-primary/20">و</div>
            <span className="font-black text-lg text-foreground">وداد</span>
          </div>
          <button onClick={() => setIsOpen(true)} className="p-2 -mr-2 text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {title && (
              <div className="flex items-center justify-between bg-white rounded-3xl p-6 shadow-[var(--shadow-sm)] border border-gray-100">
                <h1 className="text-2xl font-black text-foreground">{title}</h1>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
