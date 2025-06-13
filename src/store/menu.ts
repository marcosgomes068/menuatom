import { create } from 'zustand'

interface MenuState {
  selectedCategoryId: string | null
  setSelectedCategoryId: (categoryId: string | null) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (categoryId) => set({ selectedCategoryId: categoryId }),
})) 