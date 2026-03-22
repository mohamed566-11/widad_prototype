// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Notifications page to be sleek, using glass panels, animated list items, and modern badging.

import { useMemo, useState } from 'react';
import { Bell, Calendar, Bot, Stethoscope, HeartPulse, CheckCircle2, Inbox } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { notificationsMock } from '@/mock/services/notifications.mock';
import type { MockNotification, NotificationType } from '@/mock/data/notifications';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';

const TYPE_UI: Record<NotificationType, { icon: any; color: string; bg: string; label: string }> = {
  consultation: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20', label: 'استشارات' },
  ai_risk: { icon: Bot, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20', label: 'تنبيه ذكاء اصطناعي' },
  subscription: { icon: Bell, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20', label: 'الاشتراكات' },
  community: { icon: Stethoscope, color: 'text-teal-500', bg: 'bg-teal-500/10 border-teal-500/20', label: 'المجتمع' },
  tracker: { icon: HeartPulse, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/20', label: 'المتتبعات' },
  weekly_report: { icon: Bot, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20', label: 'تقارير أسبوعية' },
  system: { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-500/10 border-gray-500/20', label: 'النظام' },
};

export default function Notifications() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [notifications, setNotifications] = useState<MockNotification[]>(() => notificationsMock.listForUser(user));

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return notifications;
    return notifications.filter((n) => n.type === filter);
  }, [filter, notifications]);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    notificationsMock.saveForUser(user, updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    notificationsMock.saveForUser(user, updated);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6 pb-10" dir="rtl">
        
        {/* Header section */}
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-0.5 shadow-inner">
              <div className="w-full h-full bg-background/50 backdrop-blur-md rounded-[1.4rem] flex items-center justify-center relative">
                <Bell className="w-8 h-8 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-background"></span>
                  </span>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black font-display text-foreground mb-1">الإشعارات</h1>
              <p className="text-muted-foreground font-medium">لديك {unreadCount} إشعار غير مقروء</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
             {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 hover:bg-primary/20 hover:shadow-[var(--shadow-glow)] px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  تحديد الكل كمقروء
                </button>
              )}
          </div>
        </m.div>

        {/* Filters */}
        <m.div variants={fadeUpVariant} className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-300",
              filter === 'all' 
                ? 'bg-foreground text-background shadow-md' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            الكل
          </button>
          {Object.entries(TYPE_UI).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setFilter(type as NotificationType)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2",
                filter === type 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              <config.icon className="w-4 h-4 opacity-70" />
              {config.label}
            </button>
          ))}
        </m.div>

        {/* Notifications List */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] border border-border overflow-hidden relative shadow-sm">
          <div className="absolute flex inset-0 pointer-events-none">
            <div className="w-1/2 bg-gradient-to-r from-transparent to-primary/5 opacity-50"></div>
          </div>
          
          <div className="relative z-10 divide-y divide-border/50">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notif) => {
                const ui = TYPE_UI[notif.type] || TYPE_UI['system'];
                const Icon = ui.icon;
                return (
                  <m.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={cn(
                      "p-6 flex flex-col md:flex-row md:items-start gap-5 cursor-pointer transition-all duration-300 group",
                      !notif.isRead 
                        ? 'bg-white/40 dark:bg-primary/5 hover:bg-white/60 dark:hover:bg-primary/10' 
                        : 'hover:bg-background/40 opacity-80 hover:opacity-100 grayscale-[0.3]'
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 shadow-inner", 
                      ui.bg
                    )}>
                      <Icon className={cn("w-7 h-7", ui.color)} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className={cn(
                          "font-bold font-display text-lg",
                          !notif.isRead ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          {notif.title}
                        </h3>
                        <span className="text-xs font-bold text-muted-foreground whitespace-nowrap bg-secondary/50 px-3 py-1 rounded-full border border-border/50 w-fit">
                          {notif.time}
                        </span>
                      </div>
                      <p className={cn(
                        "text-base leading-relaxed",
                        !notif.isRead ? 'text-muted-foreground font-medium' : 'text-muted-foreground/70'
                      )}>
                        {notif.body}
                      </p>
                    </div>
                    
                    {!notif.isRead && (
                      <div className="w-3 h-3 bg-primary rounded-full shrink-0 mt-3 md:mt-2 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                    )}
                  </m.div>
                );
              })}
            </AnimatePresence>
            
            {filteredNotifications.length === 0 && (
              <m.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="p-16 flex flex-col items-center justify-center text-center text-muted-foreground"
              >
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <Inbox className="w-10 h-10 opacity-50" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground mb-2">لا توجد إشعارات</h3>
                <p>لم نجد أي إشعارات مطابقة للفلتر المحدد.</p>
              </m.div>
            )}
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}