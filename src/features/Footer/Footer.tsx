import { useTranslations } from 'next-intl'
import Section from '@/features/Page/Section'
import { Link } from '@/features/Translations'
import { Logotype } from '@/features/Brand'

export default function Footer() {
  const t = useTranslations()
  // const mainLinks = useMainLinks()

  return (
    <footer className="border-t border-divider">
      <Section className="flex flex-col sm:flex-row gap-4 justify-between items-center text-center">
        <Logotype />

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/juridical/privacy-policy">{t('pages.juridical.privacyPolicy.titleAndLink')}</Link>
          <Link href="/juridical/gdpr">{t('pages.juridical.gdpr.titleAndLink')}</Link>
          <Link href="/juridical/disclaimer">{t('pages.juridical.disclaimer.titleAndLink')}</Link>
          <Link href="/juridical/terms-and-conditions">
            {t('pages.juridical.termsAndConditions.titleAndLink')}
          </Link>
        </div>
      </Section>
    </footer>
  )

  // return (
  //   <footer className="border-t border-divider">
  //     <Section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  //       <div className="flex flex-col gap-1">
  //         <span className="font-bold mb-1">HEALFOOD CZ s.r.o.</span>
  //         <span>K. Čapka 1231/6, 36001 Karlovy Vary, Česká republika</span>
  //         <span>IČO: 09552481</span>
  //         <span>DIČ: CZ09552481</span>
  //       </div>
  //
  //       <div className="flex flex-col gap-1">
  //         <span className="font-bold mb-1">{t('features.navigation.pages')}</span>
  //         {mainLinks.map((link) => (
  //           <Link href={link.href} key={link.href}>
  //             {link.label}
  //           </Link>
  //         ))}
  //       </div>
  //
  //       <div className="flex flex-col gap-1">
  //         <span className="font-bold mb-1">{t('features.navigation.juridical')}</span>
  //         <Link href="/juridical/privacy-policy">{t('pages.juridical.privacyPolicy.titleAndLink')}</Link>
  //         <Link href="/juridical/gdpr">{t('pages.juridical.gdpr.titleAndLink')}</Link>
  //         <Link href="/juridical/disclaimer">{t('pages.juridical.disclaimer.titleAndLink')}</Link>
  //         <Link href="/juridical/terms-and-conditions">
  //           {t('pages.juridical.termsAndConditions.titleAndLink')}
  //         </Link>
  //       </div>
  //
  //       <div className="flex flex-col gap-1">
  //         <span className="font-bold mb-1">{t('pages.main.contact.link')}</span>
  //         <Link href="tel:+420775587855">+420 775 587 855</Link>
  //         <Link href="mailto:healfoodcz@gmail.com">healfoodcz@gmail.com</Link>
  //         <Link href="https://wa.me/+420775587855">WhatsApp</Link>
  //         <Link href="https://t.me/+420775587855">Telegram</Link>
  //       </div>
  //
  //       {/* <div className="flex flex-col gap-1">
  //         <span className="font-bold mb-1">Other</span>
  //         <Link href="">Language</Link>
  //         <Link href="">Theme</Link>
  //         <Link href="">Bookmarks</Link>
  //         <Link href="">Price request</Link>
  //       </div> */}
  //     </Section>
  //   </footer>
  // )
}
