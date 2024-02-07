import { fontLogo } from '@/lib'
import clsx from 'clsx'



export default function Logotype() {
  return (
    <span className={ clsx('text-lg', fontLogo.className) }>HEALFOOD CZ</span>
  )
}
