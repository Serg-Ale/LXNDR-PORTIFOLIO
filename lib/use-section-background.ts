"use client"

import { useEffect, useState } from "react"

export type SectionBackground = {
  backgroundColor: string
  textColor: string
  theme: 'light' | 'dark'
}

/**
 * Hook que detecta a cor de background da seção atual
 * baseado na posição do scroll e retorna as cores para o header e progress bar
 */
export function useSectionBackground(headerHeight: number): SectionBackground {
  const [sectionBg, setSectionBg] = useState<SectionBackground>({
    backgroundColor: 'rgb(250, 250, 250)',
    textColor: 'rgb(0, 0, 0)',
    theme: 'light'
  })

  useEffect(() => {
    const handleScroll = () => {
      // Detectar seções com data-theme
      const sections = document.querySelectorAll('[data-theme]')
      const scrollY = window.scrollY + headerHeight + 50
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          // Obter o background color REAL da seção
          const computedStyle = window.getComputedStyle(section)
          let bgColor = computedStyle.backgroundColor
          const textColor = computedStyle.color
          const theme = section.getAttribute('data-theme') as 'light' | 'dark'
          
          // Verificar se o background é transparente
          const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || 
                                bgColor === 'transparent' || 
                                !bgColor
          
          if (isTransparent) {
            // Se for transparente, obter do body (que tem bg-background aplicado)
            const bodyBg = window.getComputedStyle(document.body).backgroundColor
            
            // Se ainda for transparente, usar valores fixos baseados no tema
            if (bodyBg === 'rgba(0, 0, 0, 0)' || bodyBg === 'transparent' || !bodyBg) {
              // Fallback: usar cores fixas baseadas no tema global (dark mode)
              const isDarkMode = document.documentElement.classList.contains('dark')
              bgColor = isDarkMode ? 'rgb(0, 0, 0)' : 'rgb(250, 250, 250)'
            } else {
              bgColor = bodyBg
            }
          }
          
          setSectionBg({
            backgroundColor: bgColor,
            textColor: textColor || (theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'),
            theme: theme || 'light'
          })
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerHeight])

  return sectionBg
}
