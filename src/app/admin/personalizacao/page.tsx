'use client'

import { motion } from 'framer-motion'
import { Save, Upload, Plus, Trash2 } from 'lucide-react'
import { useConfigStore } from '@/store/config'

export default function PersonalizacaoPage() {
  const { carouselItems, theme, addCarouselItem, removeCarouselItem, updateCarouselItem, updateTheme } = useConfigStore()

  const handleAddCarouselItem = () => {
    const newItem = {
      id: Date.now().toString(),
      image: '',
      title: '',
      description: '',
      link: '',
    }
    addCarouselItem(newItem)
  }

  const handleImageUpload = (id: string) => {
    // TODO: Implementar upload de imagem
    console.log('Upload de imagem para item:', id)
  }

  const handleSave = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Salvando configurações:', { carouselItems, theme })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Personalização</h1>

      {/* Carrossel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Carrossel</h2>
          <button
            onClick={handleAddCarouselItem}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus size={20} />
            <span>Adicionar Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {carouselItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium">Slide {carouselItems.indexOf(item) + 1}</h3>
                <button
                  onClick={() => removeCarouselItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem
                  </label>
                  <div className="flex items-center space-x-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Slide"
                        className="w-40 h-24 object-cover border rounded-lg"
                      />
                    ) : (
                      <div className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <Upload size={24} className="text-gray-400" />
                      </div>
                    )}
                    <button
                      onClick={() => handleImageUpload(item.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Alterar Imagem
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateCarouselItem(item.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateCarouselItem(item.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => updateCarouselItem(item.id, 'link', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tema */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Tema</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor Primária
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="w-12 h-12 rounded-lg border"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor Secundária
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="w-12 h-12 rounded-lg border"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor de Fundo
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                className="w-12 h-12 rounded-lg border"
              />
              <input
                type="text"
                value={theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor do Texto
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => updateTheme({ textColor: e.target.value })}
                className="w-12 h-12 rounded-lg border"
              />
              <input
                type="text"
                value={theme.textColor}
                onChange={(e) => updateTheme({ textColor: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fonte
            </label>
            <select
              value={theme.fontFamily}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Save size={20} />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  )
} 