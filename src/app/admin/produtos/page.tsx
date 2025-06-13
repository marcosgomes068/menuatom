'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, X, Trash2, Edit2 } from 'lucide-react'
import { useProductStore, Product } from '@/store/product'
import { useCategoryStore, Category } from '@/store/category'
import ImageUpload from '@/components/admin/ImageUpload'
import { ImageService } from '@/services/imageService'

const imageService = ImageService.getInstance()

export default function ProdutosPage() {
  const { products, addProduct, updateProduct, removeProduct } = useProductStore()
  const { categories } = useCategoryStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    categoryId: '',
    available: true,
  })

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct)
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        categoryId: '',
        available: true,
      })
    }
  }, [editingProduct])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
    } else {
      addProduct({
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        image: formData.image || '',
        categoryId: formData.categoryId || '',
        available: formData.available || true,
      })
    }
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleImageUpload = async (file: File) => {
    try {
      const result = await imageService.uploadImage(file, 'product')
      setFormData((prev) => ({ ...prev, image: result.url }))
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
    }
  }

  const handleImageRemove = async () => {
    try {
      if (formData.image) {
        const filename = formData.image.split('/').pop()
        if (filename) {
          await imageService.deleteImage(filename)
        }
      }
      setFormData((prev) => ({ ...prev, image: '' }))
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff6b35]/90 transition-colors"
        >
          <Plus size={20} />
          <span>Adicionar Produto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative aspect-video">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product)
                      setIsModalOpen(true)
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    product.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.available ? 'Disponível' : 'Indisponível'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingProduct(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagem do Produto
                      </label>
                      <ImageUpload
                        currentImage={formData.image}
                        onImageUpload={handleImageUpload}
                        onImageRemove={handleImageRemove}
                        aspectRatio={16 / 9}
                        maxSize={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            categoryId: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category: Category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preço
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">R$</span>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              price: parseFloat(e.target.value),
                            }))
                          }
                          step="0.01"
                          min="0"
                          className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.available}
                            onChange={() =>
                              setFormData((prev) => ({ ...prev, available: true }))
                            }
                            className="mr-2"
                          />
                          <span>Disponível</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={!formData.available}
                            onChange={() =>
                              setFormData((prev) => ({ ...prev, available: false }))
                            }
                            className="mr-2"
                          />
                          <span>Indisponível</span>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false)
                        setEditingProduct(null)
                      }}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff6b35]/90 transition-colors"
                    >
                      <Save size={20} />
                      <span>Salvar</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 