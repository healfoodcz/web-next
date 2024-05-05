import { useContext } from 'react'
import { LanguageModalContext } from '@/features/Language'

export function useLanguageModal() {
  const context = useContext(LanguageModalContext)

  if (context === null) {
    throw new Error('"useLanguageModal" should be used within <LanguageModalProvider/>.')
  }

  return context
}
