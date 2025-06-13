import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '@/types/menu'

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
          })
        }
      },
      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        })
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          ),
        })
      },
      clearCart: () => {
        set({ items: [] })
      },
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 