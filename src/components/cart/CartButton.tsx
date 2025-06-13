'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import CartModal from './CartModal'

export default function CartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const items = useCartStore((state) => state.items)

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 