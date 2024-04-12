import { Card, CardBody } from '@nextui-org/react'
import { TextAa } from '@phosphor-icons/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

interface ThemeExampleProps {
  theme: 'light' | 'dark' | 'system'
}

const style = {
  topLeft: { clipPath: 'polygon(0 0, 0 100%, 100% 0)' },
  bottomRight: { clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' },
}

export const ThemeExample = forwardRef<HTMLDivElement, ThemeExampleProps>((props, ref) => {
  const { theme, ...otherProps } = props

  if (theme === 'system') {
    return (
      <div className="relative" ref={ref} {...otherProps}>
        <Card className="light border-2 border-default flex-shrink-0" style={style.topLeft} shadow="none">
          <CardBody className="p-4">
            <TextAa aria-label="Aa" />
          </CardBody>
        </Card>

        <Card
          className="dark border-2 border-default flex-shrink-0 absolute top-0 left-0"
          style={style.bottomRight}
          shadow="none"
        >
          <CardBody className="p-4">
            <TextAa aria-label="Aa" />
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <Card
      className={clsx('border-2 border-default flex-shrink-0', theme)}
      shadow="none"
      ref={ref}
      {...otherProps}
    >
      <CardBody className="p-4">
        <TextAa aria-label="Aa" />
      </CardBody>
    </Card>
  )
})

ThemeExample.displayName = 'ThemeExample'
