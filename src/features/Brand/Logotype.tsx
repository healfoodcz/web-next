import { Link } from '@/features/Translations'
import clsx from 'clsx'
import { fontLogo } from '@/features/Common/lib'

export default function Logotype() {
  return (
    <Link href="/" className={clsx('text-xl', fontLogo.className)}>
      HEALFOOD CZ
    </Link>
  )
}
