'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload } from 'lucide-react'
import { useConfigStore } from '@/store/config'

export default function ConfiguracoesPage() {
  const { restaurant, updateRestaurant } = useConfigStore()

  const handleSave = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Salvando configurações:', restaurant)
  }

  const handleImageUpload = (type: 'logo' | 'banner') => {
    // TODO: Implementar upload de imagens
    console.log('Upload de imagem:', type)
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
                onChange={(e) => updateRestaurant({ name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={restaurant.description}
                onChange={(e) => updateRestaurant({ description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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

        {/* Contatos e Redes Sociais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Contatos e Redes Sociais</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={restaurant.whatsapp}
                onChange={(e) => updateRestaurant({ whatsapp: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={restaurant.instagram}
                onChange={(e) => updateRestaurant({ instagram: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="@seu_instagram"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                value={restaurant.facebook}
                onChange={(e) => updateRestaurant({ facebook: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="facebook.com/seu_restaurante"
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
              <div className="flex items-center space-x-4">
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt="Logo"
                    className="w-20 h-20 object-contain border rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => handleImageUpload('logo')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Alterar Logo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner
              </label>
              <div className="flex items-center space-x-4">
                {restaurant.banner ? (
                  <img
                    src={restaurant.banner}
                    alt="Banner"
                    className="w-40 h-20 object-cover border rounded-lg"
                  />
                ) : (
                  <div className="w-40 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => handleImageUpload('banner')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Alterar Banner
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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