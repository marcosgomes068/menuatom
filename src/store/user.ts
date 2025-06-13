import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserService } from '@/services/userService'

const userService = UserService.getInstance()

export interface User {
  id: string
  name: string
  email: string
  restaurantInfo: {
    id: string
    name: string
    description?: string
    logo?: string
    banner?: string
    address: string
    phone: string
    whatsapp?: string
    instagram?: string
    facebook?: string
    website?: string
    themeConfig?: {
      id: string
      primaryColor: string
      secondaryColor: string
      backgroundColor: string
      textColor: string
    }
  }
}

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  register: (userData: {
    name: string
    email: string
    password: string
    restaurantName: string
    restaurantDescription?: string
    restaurantLogo?: string
    restaurantBanner?: string
    restaurantAddress: string
    restaurantPhone: string
    restaurantWhatsapp?: string
    restaurantInstagram?: string
    restaurantFacebook?: string
    restaurantWebsite?: string
  }) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (id: string, userData: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      register: async (userData) => {
        try {
          const user = await userService.register(userData)
          set({
            currentUser: user,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error('Erro ao registrar usuário:', error)
          throw error
        }
      },

      login: async (email, password) => {
        try {
          const user = await userService.login(email, password)
          set({
            currentUser: user,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error('Erro ao fazer login:', error)
          throw error
        }
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
        })
      },

      updateUser: async (id, userData) => {
        try {
          const user = await userService.updateUser(id, userData)
          set({
            currentUser: user,
          })
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error)
          throw error
        }
      },

      deleteUser: async (id) => {
        try {
          await userService.deleteUser(id)
          set({
            currentUser: null,
            isAuthenticated: false,
          })
        } catch (error) {
          console.error('Erro ao deletar usuário:', error)
          throw error
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
) 