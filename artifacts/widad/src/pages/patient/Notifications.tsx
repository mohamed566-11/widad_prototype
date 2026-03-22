import { useMemo, useState } from 'react';
import { Bell, Calendar, Bot, Stethoscope, HeartPulse, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { notificationsMock } from '@/mock/services/notifications.mock';
import type { MockNotification, NotificationType } from '@/mock/data/notifications';

const TYPE_UI: Record<NotificationType, { icon: any; color: string; bg: string; label: string }> = {
  consultation: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100', label: 'استشارات' },
  ai_risk: { icon: Bot, color: 'text-red-600', bg: 'bg-red-100', label: 'AI' },
  subscription: { icon: Bell, color: 'text-orange-500', bg: 'bg-orange-100', label: 'اشتراك' },
  community: { icon: Stethoscope, color: 'text-teal-500', bg: 'bg-teal-100', label: 'مجتمع' },
  tracker: { icon: HeartPulse, color: 'text-pink-500', bg: 'bg-pink-100', label: 'متتبعات' },
  weekly_report: { icon: Bot, color: 'text-purple-500', bg: 'bg-purple-100', label: 'تقارير' },
  system: { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-100', label: 'نظام' },
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">الإشعارات</h1>
          <p className="text-muted-foreground mt-1">لديك {unreadCount} إشعار غير مقروء</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-white border border-border text-gray-600 hover:bg-gray-50'}`}
        >
          الكل
        </button>
        {Object.entries(TYPE_UI).map(([type, config]) => (
          <button
            key={type}
            onClick={() => setFilter(type as NotificationType)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === type ? 'bg-primary text-white' : 'bg-white border border-border text-gray-600 hover:bg-gray-50'}`}
          >
            {config.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
        {filteredNotifications.map((notif, index) => {
          const ui = TYPE_UI[notif.type];
          const Icon = ui.icon;
          return (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-5 flex items-start gap-4 cursor-pointer transition-colors ${!notif.isRead ? 'bg-primary/5' : 'hover:bg-gray-50'} ${index !== filteredNotifications.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${ui.bg}`}>
                <Icon className={`w-6 h-6 ${ui.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold ${!notif.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{notif.time}</span>
                </div>
                <p className={`text-sm ${!notif.isRead ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                  {notif.body}
                </p>
              </div>
              {!notif.isRead && (
                <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-2"></div>
              )}
            </div>
          );
        })}
        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            لا توجد إشعارات حالياً
          </div>
        )}
      </div>
    </div>
  );
}