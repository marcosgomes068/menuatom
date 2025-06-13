'use client'

import { useState } from 'react'
import { menuData } from '@/data/menu'
import { useMenuStore } from '@/store/menu'

export default function MenuCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const setSelectedCategoryId = useMenuStore((state) => state.setSelectedCategoryId)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedCategoryId(categoryId)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Categorias</h2>
      <nav className="space-y-2">
        {menuData.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  )
} 