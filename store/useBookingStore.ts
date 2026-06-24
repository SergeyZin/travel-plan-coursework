import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  tripId: string
  tripTitle: string
  tripSlug: string
  price: number
  travelers: number
  startDate: string
  image: string
}

interface BookingStore {
  cart: CartItem[]
  favorites: string[]
  addToCart: (item: CartItem) => void
  removeFromCart: (tripId: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  toggleFavorite: (tripId: string) => void
  isFavorite: (tripId: string) => boolean
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.tripId === item.tripId)
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.tripId === item.tripId ? { ...i, travelers: item.travelers, startDate: item.startDate } : i
            ),
          })
        } else {
          set({ cart: [...get().cart, item] })
        }
      },
      removeFromCart: (tripId) => {
        set({ cart: get().cart.filter((i) => i.tripId !== tripId) })
      },
      clearCart: () => set({ cart: [] }),
      totalItems: () => get().cart.length,
      totalPrice: () => get().cart.reduce((sum, i) => sum + i.price * i.travelers, 0),
      toggleFavorite: (tripId) => {
        const favs = get().favorites
        if (favs.includes(tripId)) {
          set({ favorites: favs.filter((id) => id !== tripId) })
        } else {
          set({ favorites: [...favs, tripId] })
        }
      },
      isFavorite: (tripId) => get().favorites.includes(tripId),
    }),
    { name: 'tour-planning-store' }
  )
)
