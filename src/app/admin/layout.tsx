'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogOut, Settings, Package, Tag, Layout } from 'lucide-react'
import { useUserStore } from '@/store/user'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {currentUser.restaurantInfo.logo ? (
                  <img
                    src={currentUser.restaurantInfo.logo}
                    alt={currentUser.restaurantInfo.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                )}
                <span className="ml-2 text-lg font-medium text-gray-900">
                  {currentUser.restaurantInfo.name}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                <Link
                  href="/admin/produtos"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50"
                >
                  <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Produtos
                </Link>

                <Link
                  href="/admin/categorias"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50"
                >
                  <Tag className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Categorias
                </Link>

                <Link
                  href="/admin/personalizacao"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50"
                >
                  <Layout className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Personalização
                </Link>

                <Link
                  href="/admin/configuracoes"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50"
                >
                  <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Configurações
                </Link>
              </nav>
            </div>

            <main className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg p-6"
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 