import { MOCK_POSTS } from '../data/community'

interface SavedEntry {
  postId: string
  savedAt: string
}

function keyForUser(userId: string) {
  return `widad-saved-posts-${userId}`
}

function seedSavedPosts(user: any): SavedEntry[] {
  const stage = user?.lifeStage

  if (stage === 'pre_marriage') {
    return [{ postId: 'p3', savedAt: '2026-03-16T10:00:00' }]
  }

  if (stage === 'post_marriage') {
    return [
      { postId: 'p2', savedAt: '2026-03-17T15:00:00' },
      { postId: 'p1', savedAt: '2026-03-16T10:00:00' },
    ]
  }

  return [
    { postId: 'p1', savedAt: '2026-03-17T15:00:00' },
    { postId: 'p2', savedAt: '2026-03-16T10:00:00' },
  ]
}

export const communityMock = {
  getSavedPosts(user: any) {
    const userId = user?.email ?? user?.id ?? 'guest'
    const key = keyForUser(userId)
    const cached = localStorage.getItem(key)

    let saved: SavedEntry[]

    if (cached) {
      try {
        saved = JSON.parse(cached) as SavedEntry[]
      } catch {
        saved = seedSavedPosts(user)
      }
    } else {
      saved = seedSavedPosts(user)
    }

    localStorage.setItem(key, JSON.stringify(saved))

    return saved
      .map((entry) => ({
        savedAt: entry.savedAt,
        post: MOCK_POSTS.find((p) => p.id === entry.postId),
      }))
      .filter((item) => Boolean(item.post)) as Array<{ savedAt: string; post: (typeof MOCK_POSTS)[number] }>
  },

  removeSavedPost(user: any, postId: string) {
    const userId = user?.email ?? user?.id ?? 'guest'
    const key = keyForUser(userId)
    const current = this.getSavedPosts(user)
    const reduced = current
      .filter((item) => item.post.id !== postId)
      .map((item) => ({ postId: item.post.id, savedAt: item.savedAt }))

    localStorage.setItem(key, JSON.stringify(reduced))
  },
}
