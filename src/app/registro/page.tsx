'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUserStore } from '@/store/user'
import { ImageUpload } from '@/components/ImageUpload'
import { ImageService } from '@/services/imageService'

const imageService = ImageService.getInstance()

export default function RegistroPage() {
  const router = useRouter()
  const register = useUserStore((state) => state.register)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    restaurantDescription: '',
    restaurantLogo: '',
    restaurantBanner: '',
    restaurantAddress: '',
    restaurantPhone: '',
    restaurantWhatsapp: '',
    restaurantInstagram: '',
    restaurantFacebook: '',
    restaurantWebsite: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (file: File, type: 'logo' | 'banner') => {
    try {
      const imageUrl = await imageService.uploadImage(file)
      setFormData((prev) => ({
        ...prev,
        [type === 'logo' ? 'restaurantLogo' : 'restaurantBanner']: imageUrl,
      }))
    } catch (error) {
      setError('Erro ao fazer upload da imagem')
    }
  }

  const handleImageRemove = async (type: 'logo' | 'banner') => {
    const imageUrl = type === 'logo' ? formData.restaurantLogo : formData.restaurantBanner
    if (imageUrl) {
      try {
        await imageService.deleteImage(imageUrl)
        setFormData((prev) => ({
          ...prev,
          [type === 'logo' ? 'restaurantLogo' : 'restaurantBanner']: '',
        }))
      } catch (error) {
        setError('Erro ao remover imagem')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        restaurantName: formData.restaurantName,
        restaurantDescription: formData.restaurantDescription,
        restaurantLogo: formData.restaurantLogo,
        restaurantBanner: formData.restaurantBanner,
        restaurantAddress: formData.restaurantAddress,
        restaurantPhone: formData.restaurantPhone,
        restaurantWhatsapp: formData.restaurantWhatsapp,
        restaurantInstagram: formData.restaurantInstagram,
        restaurantFacebook: formData.restaurantFacebook,
        restaurantWebsite: formData.restaurantWebsite,
      })
      router.push('/admin')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Restaurante</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                  Nome do Restaurante
                </label>
                <input
                  type="text"
                  id="restaurantName"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="restaurantPhone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="restaurantPhone"
                  name="restaurantPhone"
                  value={formData.restaurantPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="restaurantDescription" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  id="restaurantDescription"
                  name="restaurantDescription"
                  value={formData.restaurantDescription}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="restaurantAddress" className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  id="restaurantAddress"
                  name="restaurantAddress"
                  value={formData.restaurantAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="restaurantWhatsapp" className="block text-sm font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="restaurantWhatsapp"
                  name="restaurantWhatsapp"
                  value={formData.restaurantWhatsapp}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="restaurantWebsite" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  id="restaurantWebsite"
                  name="restaurantWebsite"
                  value={formData.restaurantWebsite}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="restaurantInstagram" className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="text"
                  id="restaurantInstagram"
                  name="restaurantInstagram"
                  value={formData.restaurantInstagram}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="restaurantFacebook" className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="text"
                  id="restaurantFacebook"
                  name="restaurantFacebook"
                  value={formData.restaurantFacebook}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <ImageUpload
                  currentImage={formData.restaurantLogo}
                  onImageUpload={(file) => handleImageUpload(file, 'logo')}
                  onImageRemove={() => handleImageRemove('logo')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                <ImageUpload
                  currentImage={formData.restaurantBanner}
                  onImageUpload={(file) => handleImageUpload(file, 'banner')}
                  onImageRemove={() => handleImageRemove('banner')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Já tem uma conta? Faça login
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
} 