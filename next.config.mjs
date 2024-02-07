import createNextIntlPlugin from 'next-intl/plugin'



const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

/** @type {import('next').NextConfig} */
let nextConfig = {
  poweredByHeader: false
}

nextConfig = withNextIntl(nextConfig)



export default nextConfig
