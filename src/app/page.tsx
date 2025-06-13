'use client'

import { motion } from 'framer-motion'
import Carousel from '@/components/Carousel'
import { useConfigStore } from '@/store/config'

export default function HomePage() {
  const { restaurant } = useConfigStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carrossel */}
      <div className="container mx-auto px-4 py-8">
        <Carousel />
      </div>

      {/* Informações do Restaurante */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
          <p className="text-lg text-gray-600 mb-8">{restaurant.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Horário de Funcionamento</h3>
              <p className="text-gray-600">{restaurant.openingHours}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Endereço</h3>
              <p className="text-gray-600">{restaurant.address}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Contato</h3>
              <div className="space-y-2">
                {restaurant.whatsapp && (
                  <a
                    href={`https://wa.me/${restaurant.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary transition-colors"
                  >
                    WhatsApp: {restaurant.whatsapp}
                  </a>
                )}
                {restaurant.instagram && (
                  <a
                    href={`https://instagram.com/${restaurant.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary transition-colors"
                  >
                    Instagram: {restaurant.instagram}
                  </a>
                )}
                {restaurant.facebook && (
                  <a
                    href={restaurant.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
