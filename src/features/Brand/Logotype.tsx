import clsx from 'clsx'
import { Link } from '@/features/Translations'
import { fontLogo } from '@/features/Common'

export default function Logotype() {
  return (
    <Link href="/" className={clsx('text-xl', fontLogo.className)}>
      HEALFOOD CZ
    </Link>
  )
}
