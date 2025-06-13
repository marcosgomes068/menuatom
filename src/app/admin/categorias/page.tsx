'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, Trash2, Edit2 } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'
import { ImageService } from '@/services/imageService'

interface Category {
  id: string
  name: string
  description: string
  image?: string
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const imageService = ImageService.getInstance()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      setError('Erro ao carregar categorias')
    }
  }

  const handleAddCategory = () => {
    setEditingCategory({
      id: '',
      name: '',
      description: '',
    })
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erro ao excluir categoria')

      setCategories(categories.filter(c => c.id !== id))
    } catch (error) {
      console.error('Erro ao excluir categoria:', error)
      setError('Erro ao excluir categoria')
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!editingCategory) return

    try {
      setIsLoading(true)
      const result = await imageService.uploadImage(file, 'category')
      setEditingCategory({
        ...editingCategory,
        image: result.url,
      })
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      setError('Erro ao fazer upload da imagem')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageRemove = async () => {
    if (!editingCategory?.image) return

    try {
      setIsLoading(true)
      const filename = editingCategory.image.split('/').pop()
      if (filename) {
        await imageService.deleteImage(filename)
      }
      setEditingCategory({
        ...editingCategory,
        image: undefined,
      })
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
      setError('Erro ao remover imagem')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingCategory) return

    try {
      setIsLoading(true)
      const method = editingCategory.id ? 'PUT' : 'POST'
      const url = '/api/categories'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      })

      if (!response.ok) throw new Error('Erro ao salvar categoria')

      const savedCategory = await response.json()
      setCategories(prev =>
        editingCategory.id
          ? prev.map(c => (c.id === editingCategory.id ? savedCategory : c))
          : [...prev, savedCategory]
      )

      setIsModalOpen(false)
      setEditingCategory(null)
    } catch (error) {
      console.error('Erro ao salvar categoria:', error)
      setError('Erro ao salvar categoria')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <button
          onClick={handleAddCategory}
          className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#ff6b35]/90 transition-colors"
        >
          <Plus size={20} />
          Nova Categoria
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {category.image && (
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{category.description}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingCategory.id ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={e =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={e =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem
                </label>
                <ImageUpload
                  currentImage={editingCategory.image}
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  aspectRatio={16 / 9}
                  maxSize={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingCategory(null)
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#ff6b35]/90 transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 