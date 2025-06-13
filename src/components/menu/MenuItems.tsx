'use client'

import { useMenuStore } from '@/store/menu'
import { menuData, MenuItem } from '@/data/menu'
import { useCartStore } from '@/store/cart'
import { Plus, Image as ImageIcon } from 'lucide-react'

export default function MenuItems() {
  const selectedCategoryId = useMenuStore((state) => state.selectedCategoryId)
  const addToCart = useCartStore((state) => state.addItem)

  const filteredItems = selectedCategoryId
    ? menuData.categories
        .find((category) => category.id === selectedCategoryId)
        ?.items || []
    : menuData.categories.flatMap((category) => category.items)

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 overflow-hidden bg-gray-100">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement?.classList.add('flex', 'items-center', 'justify-center')
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ImageIcon size={48} />
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <span className="text-lg font-bold text-primary">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {item.allergens?.map((allergen) => (
                  <span
                    key={allergen}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 