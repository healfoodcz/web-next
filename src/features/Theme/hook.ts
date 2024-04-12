import { useContext } from 'react'
import { ThemeModalContext } from './context'

export function useThemeModal() {
  const context = useContext(ThemeModalContext)

  if (context === null) {
    throw new Error('"useThemeModal" should be used within <ThemeModalProvider/>.')
  }

  return context
}
