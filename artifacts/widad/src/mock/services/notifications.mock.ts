import { buildNotificationsForUser, type MockNotification } from '../data/notifications'

function keyForUser(userId: string) {
  return `widad-notifications-${userId}`
}

export const notificationsMock = {
  listForUser(user: any): MockNotification[] {
    const userId = user?.email ?? user?.id ?? 'guest'
    const key = keyForUser(userId)
    const cached = localStorage.getItem(key)

    if (cached) {
      try {
        return JSON.parse(cached) as MockNotification[]
      } catch {
        localStorage.removeItem(key)
      }
    }

    const seed = buildNotificationsForUser(user)
    localStorage.setItem(key, JSON.stringify(seed))
    return seed
  },

  saveForUser(user: any, notifications: MockNotification[]) {
    const userId = user?.email ?? user?.id ?? 'guest'
    localStorage.setItem(keyForUser(userId), JSON.stringify(notifications))
  },
}
