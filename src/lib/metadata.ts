export function createTitle(titleBase?: string) {
  if (typeof titleBase === 'string')
    return `${ titleBase } | ${ process.env.NEXT_PUBLIC_APP_NAME }`

  return process.env.NEXT_PUBLIC_APP_NAME
}
