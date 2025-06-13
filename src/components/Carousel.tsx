'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useConfigStore } from '@/store/config'

export default function Carousel() {
  const { carouselItems } = useConfigStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || carouselItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselItems.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) =>
      current === 0 ? carouselItems.length - 1 : current - 1
    )
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) => (current + 1) % carouselItems.length)
  }

  if (carouselItems.length === 0) return null

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={carouselItems[currentIndex].image}
            alt={carouselItems[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">
                {carouselItems[currentIndex].title}
              </h2>
              <p className="text-sm opacity-90">
                {carouselItems[currentIndex].description}
              </p>
              {carouselItems[currentIndex].link && (
                <a
                  href={carouselItems[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Saiba mais
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrevious}
          className="p-2 bg-black/30 text-white rounded-r-lg hover:bg-black/50 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="p-2 bg-black/30 text-white rounded-l-lg hover:bg-black/50 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 