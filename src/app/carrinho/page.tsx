'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, MapPin, Clock } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('dinheiro')

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = 5 // Taxa de entrega fixa por enquanto
  const finalTotal = total + deliveryFee

  const handleCheckout = () => {
    // Aqui você implementará a lógica de checkout
    console.log('Finalizando pedido:', {
      items,
      address,
      paymentMethod,
      total: finalTotal
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Carrinho vazio</h3>
                  <p className="mt-1 text-sm text-gray-500">Adicione itens ao seu carrinho para continuar.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between py-4 border-b"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>

              {/* Endereço de Entrega */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço de Entrega
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" size={20} />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Digite seu endereço completo"
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]"
                  />
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forma de Pagamento
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]"
                >
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartão de Crédito/Débito</option>
                  <option value="pix">PIX</option>
                </select>
              </div>

              {/* Resumo de Valores */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxa de Entrega</span>
                  <span className="text-gray-900">R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#ff6b35]">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Botão de Finalizar */}
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || !address}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={20} />
                <span>Finalizar Pedido</span>
              </button>

              {/* Tempo Estimado */}
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Clock size={16} className="mr-2" />
                <span>Tempo estimado: 30-45 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 