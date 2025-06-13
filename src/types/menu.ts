export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  isVegetarian: boolean
  isSpicy?: boolean
  isPromotion?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface CartItem extends MenuItem {
  quantity: number
} 