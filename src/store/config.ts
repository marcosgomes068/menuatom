import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CarouselItem {
  id: string
  image: string
  title: string
  description: string
  link: string
}

interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

interface RestaurantConfig {
  name: string
  description: string
  whatsapp: string
  instagram: string
  facebook: string
  address: string
  openingHours: string
  logo: string
  banner: string
}

interface ConfigState {
  carouselItems: CarouselItem[]
  theme: ThemeConfig
  restaurant: RestaurantConfig
  addCarouselItem: (item: CarouselItem) => void
  removeCarouselItem: (id: string) => void
  updateCarouselItem: (id: string, field: keyof CarouselItem, value: string) => void
  updateTheme: (theme: Partial<ThemeConfig>) => void
  updateRestaurant: (config: Partial<RestaurantConfig>) => void
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#27ae60',
  secondaryColor: '#f39c12',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  fontFamily: 'Inter',
}

const defaultRestaurant: RestaurantConfig = {
  name: '',
  description: '',
  whatsapp: '',
  instagram: '',
  facebook: '',
  address: '',
  openingHours: '',
  logo: '',
  banner: '',
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      carouselItems: [],
      theme: defaultTheme,
      restaurant: defaultRestaurant,

      addCarouselItem: (item) =>
        set((state) => ({
          carouselItems: [...state.carouselItems, item],
        })),

      removeCarouselItem: (id) =>
        set((state) => ({
          carouselItems: state.carouselItems.filter((item) => item.id !== id),
        })),

      updateCarouselItem: (id, field, value) =>
        set((state) => ({
          carouselItems: state.carouselItems.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      updateTheme: (newTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...newTheme },
        })),

      updateRestaurant: (newConfig) =>
        set((state) => ({
          restaurant: { ...state.restaurant, ...newConfig },
        })),
    }),
    {
      name: 'restaurant-config',
    }
  )
) 