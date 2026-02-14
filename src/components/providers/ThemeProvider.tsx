'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'

function ThemeScript() {
  useEffect(() => {
    // Override next-themes behavior to only use 'dark' class or nothing
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const classList = document.documentElement.classList
          if (classList.contains('light')) {
            classList.remove('light')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    // Clean up on unmount
    return () => observer.disconnect()
  }, [])
  
  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <ThemeScript />
      {children}
    </NextThemesProvider>
  )
}
