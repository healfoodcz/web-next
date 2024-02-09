import { capitalize } from '@/lib/string'

export function createTitle(titleBase?: string) {
  if (typeof titleBase === 'string')
    return `${capitalize(titleBase)} | ${process.env.NEXT_PUBLIC_APP_NAME}`

  return process.env.NEXT_PUBLIC_APP_NAME
}
