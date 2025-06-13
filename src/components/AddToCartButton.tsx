'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface AddToCartButtonProps {
  item: {
    id: string
    name: string
    price: number
    image?: string
  }
}

export default function AddToCartButton({ item }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(item)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      className={`btn flex items-center justify-center space-x-2 ${
        isAdded ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'
      }`}
    >
      {isAdded ? (
        <>
          <Check size={20} />
          <span>Adicionado!</span>
        </>
      ) : (
        <>
          <ShoppingBag size={20} />
          <span>Adicionar ao Carrinho</span>
        </>
      )}
    </motion.button>
  )
} 