'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash, Package, Tag, Settings, Layout, MessageSquare, Home } from 'lucide-react'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import CategoryForm from '@/components/admin/CategoryForm'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('produtos')
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const handleProductSubmit = (data: any) => {
    console.log('Produto salvo:', data)
    setShowProductForm(false)
    setSelectedProduct(null)
  }

  const handleCategorySubmit = (data: any) => {
    console.log('Categoria salva:', data)
    setShowCategoryForm(false)
    setSelectedCategory(null)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowProductForm(true)
  }

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category)
    setShowCategoryForm(true)
  }

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/admin' },
    { name: 'Produtos', icon: Package, href: '/admin/produtos' },
    { name: 'Categorias', icon: Tag, href: '/admin/categorias' },
    { name: 'Mensagens', icon: MessageSquare, href: '/admin/mensagens' },
    { name: 'Personalização', icon: Layout, href: '/admin/personalizacao' },
    { name: 'Configurações', icon: Settings, href: '/admin/configuracoes' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <Link href="/" className="text-[#ff6b35] hover:text-[#ff6b35]/80">
              Ver Site
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <nav className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                  item.href === '/admin'
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Produtos</h2>
            <p className="text-gray-600 mb-4">Gerencie seus produtos e cardápio</p>
            <Link
              href="/admin/produtos"
              className="btn btn-primary flex items-center space-x-2"
            >
              <Package size={20} />
              <span>Gerenciar Produtos</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Categorias</h2>
            <p className="text-gray-600 mb-4">Organize seus produtos em categorias</p>
            <Link
              href="/admin/categorias"
              className="btn btn-primary flex items-center space-x-2"
            >
              <Tag size={20} />
              <span>Gerenciar Categorias</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personalização</h2>
            <p className="text-gray-600 mb-4">Personalize a aparência do seu site</p>
            <Link
              href="/admin/personalizacao"
              className="btn btn-primary flex items-center space-x-2"
            >
              <Layout size={20} />
              <span>Personalizar Site</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mensagens</h2>
            <p className="text-gray-600 mb-4">Gerencie as mensagens recebidas</p>
            <Link
              href="/admin/mensagens"
              className="btn btn-primary flex items-center space-x-2"
            >
              <MessageSquare size={20} />
              <span>Ver Mensagens</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600 mb-4">Configure as informações do restaurante</p>
            <Link
              href="/admin/configuracoes"
              className="btn btn-primary flex items-center space-x-2"
            >
              <Settings size={20} />
              <span>Configurações</span>
            </Link>
          </div>
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          onClose={() => {
            setShowProductForm(false)
            setSelectedProduct(null)
          }}
          onSubmit={handleProductSubmit}
          initialData={selectedProduct}
        />
      )}

      {showCategoryForm && (
        <CategoryForm
          onClose={() => {
            setShowCategoryForm(false)
            setSelectedCategory(null)
          }}
          onSubmit={handleCategorySubmit}
          initialData={selectedCategory}
        />
      )}
    </div>
  )
} 