import createMiddleware from 'next-intl/middleware'
import { translations } from '@/features/Translations'

export default createMiddleware({
  locales: translations.locales,
  defaultLocale: translations.defaultLocale,
})

export const config = {
  matcher: [
    /*
     * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.light.ico|favicon.dark.ico).*)',
  ],
}
