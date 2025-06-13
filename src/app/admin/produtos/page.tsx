'use client'

import { useState } from 'react'
import { Plus, Edit, Trash, Package } from 'lucide-react'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'

export default function ProdutosPage() {
  const [showProductForm, setShowProductForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleProductSubmit = (data: any) => {
    console.log('Produto salvo:', data)
    setShowProductForm(false)
    setSelectedProduct(null)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowProductForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
            <Link href="/admin" className="text-[#ff6b35] hover:text-[#ff6b35]/80">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Lista de Produtos</h2>
            <button
              onClick={() => setShowProductForm(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Novo Produto</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">X-Burger</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Lanches</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">R$ 25,90</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct({ id: 1, name: 'X-Burger', category: 'Lanches', price: 25.90 })}
                      className="text-[#ff6b35] hover:text-[#ff6b35]/80 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
    </div>
  )
} 