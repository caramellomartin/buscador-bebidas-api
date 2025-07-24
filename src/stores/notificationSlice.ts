import type { StateCreator } from "zustand"
import type { FavoritesSliceType } from "./favoritesSlice"

type Notification = {
  text: string
  error: boolean
  show: boolean
}

export type NotificationSliceType = {
  notification: Notification
  showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
  hideNotification: () => void
}

let timeoutId: ReturnType<typeof setTimeout> | null = null

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
  notification: {
    text: '',
    error: false,
    show: false
  },
  showNotification: (payload) => {
    if(timeoutId) clearTimeout(timeoutId)
    set({
      notification: {
        ...get().notification,
        text: payload.text,
        error: payload.error,
        show: true
      }
    })
    timeoutId = setTimeout(() => {
      set((state) => ({
        notification: {
          ...state.notification,
          show: false
        }
      }))
      timeoutId = null
    }, 3000);
  },
  hideNotification: () => {
    if(timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    set((state) => ({
        notification: {
          ...state.notification,
          show: false
        }
    }))
  }
})