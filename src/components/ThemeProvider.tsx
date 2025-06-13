'use client'

import { useEffect } from 'react'
import { useConfigStore } from '@/store/config'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useConfigStore()

  useEffect(() => {
    // Aplicar cores do tema
    document.documentElement.style.setProperty('--color-primary', theme.primaryColor)
    document.documentElement.style.setProperty('--color-secondary', theme.secondaryColor)
    document.documentElement.style.setProperty('--color-background', theme.backgroundColor)
    document.documentElement.style.setProperty('--color-text', theme.textColor)

    // Aplicar fonte
    document.documentElement.style.setProperty('--font-family', theme.fontFamily)
  }, [theme])

  return <>{children}</>
} 