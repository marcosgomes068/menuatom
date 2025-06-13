'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { useConfigStore } from '@/store/config'
import ImageUpload from '@/components/admin/ImageUpload'
import { ImageService } from '@/services/imageService'

const imageService = ImageService.getInstance()

export default function ConfiguracoesPage() {
  const { restaurant, updateRestaurant } = useConfigStore()

  const handleSave = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Salvando configurações:', restaurant)
  }

  const handleImageUpload = async (type: 'logo' | 'banner', file: File) => {
    try {
      const result = await imageService.uploadImage(file, type === 'logo' ? 'banner' : 'banner')
      updateRestaurant({
        ...restaurant,
        [type]: result.url,
      })
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
    }
  }

  const handleImageRemove = async (type: 'logo' | 'banner') => {
    try {
      const currentImage = restaurant[type]
      if (currentImage) {
        const filename = currentImage.split('/').pop()
        if (filename) {
          await imageService.deleteImage(filename)
        }
      }
      updateRestaurant({
        ...restaurant,
        [type]: undefined,
      })
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações do Restaurante</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Restaurante
              </label>
              <input
                type="text"
                value={restaurant.name}
                onChange={(e) =>
                  updateRestaurant({
                    ...restaurant,
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
                value={restaurant.description}
                onChange={(e) =>
                  updateRestaurant({
                    ...restaurant,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <input
                type="text"
                value={restaurant.address}
                onChange={(e) => updateRestaurant({ address: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horário de Funcionamento
              </label>
              <input
                type="text"
                value={restaurant.openingHours}
                onChange={(e) => updateRestaurant({ openingHours: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Ex: Seg-Sex: 11h às 22h, Sáb-Dom: 12h às 23h"
              />
            </div>
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Contato</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={restaurant.whatsapp}
                onChange={(e) =>
                  updateRestaurant({
                    ...restaurant,
                    whatsapp: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={restaurant.instagram}
                onChange={(e) =>
                  updateRestaurant({
                    ...restaurant,
                    instagram: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                value={restaurant.facebook}
                onChange={(e) =>
                  updateRestaurant({
                    ...restaurant,
                    facebook: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
            </div>
          </div>
        </motion.div>

        {/* Imagens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm md:col-span-2"
        >
          <h2 className="text-lg font-semibold mb-4">Imagens</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <ImageUpload
                currentImage={restaurant.logo}
                onImageUpload={(file) => handleImageUpload('logo', file)}
                onImageRemove={() => handleImageRemove('logo')}
                aspectRatio={1}
                maxSize={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner
              </label>
              <ImageUpload
                currentImage={restaurant.banner}
                onImageUpload={(file) => handleImageUpload('banner', file)}
                onImageRemove={() => handleImageRemove('banner')}
                aspectRatio={16 / 9}
                maxSize={2}
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