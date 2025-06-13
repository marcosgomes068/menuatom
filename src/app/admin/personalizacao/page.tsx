'use client'

import { motion } from 'framer-motion'
import { Save, Plus, Trash2 } from 'lucide-react'
import { useConfigStore } from '@/store/config'
import ImageUpload from '@/components/admin/ImageUpload'
import { ImageService } from '@/services/imageService'

const imageService = ImageService.getInstance()

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

  const handleImageUpload = async (id: string, file: File) => {
    try {
      const result = await imageService.uploadImage(file, 'banner')
      const item = carouselItems.find(item => item.id === id)
      if (item) {
        updateCarouselItem(id, 'image', result.url)
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
    }
  }

  const handleImageRemove = async (id: string) => {
    try {
      const item = carouselItems.find(item => item.id === id)
      if (item?.image) {
        const filename = item.image.split('/').pop()
        if (filename) {
          await imageService.deleteImage(filename)
        }
      }
      updateCarouselItem(id, 'image', '')
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
    }
  }

  const handleSave = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Salvando configurações:', { carouselItems, theme })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Personalização</h1>

      <div className="space-y-6">
        {/* Carrossel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Carrossel</h2>
            <button
              onClick={handleAddCarouselItem}
              className="flex items-center space-x-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff6b35]/90 transition-colors"
            >
              <Plus size={20} />
              <span>Adicionar Slide</span>
            </button>
          </div>

          <div className="space-y-4">
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
                    <ImageUpload
                      currentImage={item.image}
                      onImageUpload={(file) => handleImageUpload(item.id, file)}
                      onImageRemove={() => handleImageRemove(item.id)}
                      aspectRatio={16 / 9}
                      maxSize={2}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateCarouselItem(item.id, 'title', e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateCarouselItem(item.id, 'description', e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link
                      </label>
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) =>
                          updateCarouselItem(item.id, 'link', e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor Primária
              </label>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) =>
                  updateTheme({ primaryColor: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor Secundária
              </label>
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) =>
                  updateTheme({ secondaryColor: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor de Fundo
              </label>
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) =>
                  updateTheme({ backgroundColor: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor do Texto
              </label>
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) =>
                  updateTheme({ textColor: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff6b35]/90 transition-colors"
        >
          <Save size={20} />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  )
} 