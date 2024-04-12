import { PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'

type Props = PropsWithChildren<{
  className?: string
  bg?: ReactNode
}>

export default function Section({ className, bg, children }: Props) {
  return (
    <section>
      {bg === undefined ? null : (
        <div className="absolute top-0 left-0 w-full h-screen object-cover -z-10">{bg}</div>
      )}
      <div className={clsx('max-w-[1024px] w-full flex flex-col gap-6 mx-auto px-6 py-6', className)}>
        {children}
      </div>
    </section>
  )
}
