'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  MessageSquare,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import Cookies from 'js-cookie'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('adminToken')
    router.push('/admin/login')
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/admin',
    },
    {
      title: 'Produtos',
      icon: <ShoppingBag size={20} />,
      href: '/admin/produtos',
    },
    {
      title: 'Categorias',
      icon: <Tag size={20} />,
      href: '/admin/categorias',
    },
    {
      title: 'Mensagens',
      icon: <MessageSquare size={20} />,
      href: '/admin/mensagens',
    },
    {
      title: 'Personalização',
      icon: <Palette size={20} />,
      href: '/admin/personalizacao',
    },
    {
      title: 'Configurações',
      icon: <Settings size={20} />,
      href: '/admin/configuracoes',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className="fixed top-0 left-0 h-full w-70 bg-white shadow-lg z-50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ x: 5 }}
              >
                {item.icon}
                <span>{item.title}</span>
              </motion.a>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-70' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, Administrador
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
} 