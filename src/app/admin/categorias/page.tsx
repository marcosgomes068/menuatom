'use client'

import { useState } from 'react'
import { Plus, Edit, Trash, Tag } from 'lucide-react'
import Link from 'next/link'
import CategoryForm from '@/components/admin/CategoryForm'

export default function CategoriasPage() {
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const handleCategorySubmit = (data: any) => {
    console.log('Categoria salva:', data)
    setShowCategoryForm(false)
    setSelectedCategory(null)
  }

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category)
    setShowCategoryForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
            <Link href="/admin" className="text-[#ff6b35] hover:text-[#ff6b35]/80">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Lista de Categorias</h2>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Nova Categoria</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Lanches</h3>
                  <p className="text-sm text-gray-500">12 produtos</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory({ id: 1, name: 'Lanches', description: 'Lanches deliciosos' })}
                    className="text-[#ff6b35] hover:text-[#ff6b35]/80"
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Bebidas</h3>
                  <p className="text-sm text-gray-500">8 produtos</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory({ id: 2, name: 'Bebidas', description: 'Bebidas geladas' })}
                    className="text-[#ff6b35] hover:text-[#ff6b35]/80"
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Sobremesas</h3>
                  <p className="text-sm text-gray-500">6 produtos</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory({ id: 3, name: 'Sobremesas', description: 'Sobremesas doces' })}
                    className="text-[#ff6b35] hover:text-[#ff6b35]/80"
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showCategoryForm && (
        <CategoryForm
          onClose={() => {
            setShowCategoryForm(false)
            setSelectedCategory(null)
          }}
          onSubmit={handleCategorySubmit}
          initialData={selectedCategory}
        />
      )}
    </div>
  )
} 