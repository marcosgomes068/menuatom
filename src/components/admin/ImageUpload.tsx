'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string
  onImageUpload: (file: File) => void
  onImageRemove: () => void
  aspectRatio?: number
  maxSize?: number // em MB
  className?: string
}

export default function ImageUpload({
  currentImage,
  onImageUpload,
  onImageRemove,
  aspectRatio = 16 / 9,
  maxSize = 2,
  className = '',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Verifica o tipo do arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem.')
      return false
    }

    // Verifica o tamanho do arquivo
    if (file.size > maxSize * 1024 * 1024) {
      setError(`O arquivo deve ter no máximo ${maxSize}MB.`)
      return false
    }

    setError('')
    return true
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && validateFile(file)) {
      try {
        setIsLoading(true)
        await onImageUpload(file)
      } catch (error) {
        console.error('Erro ao fazer upload:', error)
        setError('Erro ao fazer upload da imagem. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      try {
        setIsLoading(true)
        await onImageUpload(file)
      } catch (error) {
        console.error('Erro ao fazer upload:', error)
        setError('Erro ao fazer upload da imagem. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  const handleRemove = async () => {
    try {
      setIsLoading(true)
      await onImageRemove()
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
      setError('Erro ao remover imagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        disabled={isLoading}
      />

      {currentImage ? (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            style={{ aspectRatio }}
          />
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <X size={20} />}
          </button>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-4
            flex flex-col items-center justify-center cursor-pointer
            transition-colors
            ${isDragging ? 'border-[#ff6b35] bg-[#ff6b35]/5' : 'border-gray-300 hover:border-[#ff6b35]'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{ aspectRatio }}
        >
          {isLoading ? (
            <Loader2 size={32} className="animate-spin text-[#ff6b35]" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG até {maxSize}MB
              </p>
            </>
          )}
        </motion.div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
} 