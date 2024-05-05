import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { CopyState } from '@/features/Copy/model'
import { Check, Copy, X } from '@phosphor-icons/react'
import { Tooltip, Button } from '@nextui-org/react'
import clsx from 'clsx'
import { device } from '../Device'

interface CopyButtonProps {
  copyContent: string
}

export default function CopyButton({ copyContent }: CopyButtonProps) {
  const t = useTranslations('features.copy')
  const [copyState, setCopyState] = useState<CopyState>(CopyState.TO_BE_COPIED)
  const copyMessage = useMemo(() => {
    switch (copyState) {
      case CopyState.TO_BE_COPIED:
        return t('toBeCopied')
      case CopyState.HAS_BEEN_COPIED:
        return t('hasBeenCopied')
      case CopyState.HAS_NOT_BEEN_COPIED:
      default:
        return t('hasNotBeenCopied')
    }
  }, [copyState, t])
  const copyIcon = useMemo(() => {
    const commonProps = {
      className: 'flex-shrink-0',
      size: 16,
    }

    switch (copyState) {
      case CopyState.TO_BE_COPIED:
        return <Copy aria-label={t('toBeCopied')} {...commonProps} />
      case CopyState.HAS_BEEN_COPIED:
        return <Check aria-label={t('hasBeenCopied')} {...commonProps} />
      case CopyState.HAS_NOT_BEEN_COPIED:
      default:
        return <X aria-label={t('hasNotBeenCopied')} {...commonProps} />
    }
  }, [copyState, t])
  const copyColor = useMemo(() => {
    switch (copyState) {
      case CopyState.TO_BE_COPIED:
        return 'default'
      case CopyState.HAS_BEEN_COPIED:
        return 'success'
      case CopyState.HAS_NOT_BEEN_COPIED:
      default:
        return 'danger'
    }
  }, [copyState])

  function handleCopy() {
    const delay = 2000

    function handleBackToNormal() {
      setCopyState(CopyState.TO_BE_COPIED)
    }

    function handleCopied() {
      setCopyState(CopyState.HAS_BEEN_COPIED)

      setTimeout(handleBackToNormal, delay)
    }

    function handleError() {
      setCopyState(CopyState.HAS_NOT_BEEN_COPIED)

      setTimeout(handleBackToNormal, delay)
    }

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(copyContent).then(handleCopied, handleError)
    }

    // fallback when navigator.clipboard isn't there (insecure context, not supported, ...)
    // create a temporary element
    const element = document.createElement('textarea')
    element.value = copyContent
    document.body.appendChild(element)

    // select the text content
    element.select()

    // use the clipboard API if available (newer mobiles)
    if (document.execCommand('copy')) {
      handleCopied()
    } else {
      // show a message to instruct user to copy manually
      handleError()
    }

    // remove the temporary element
    document.body.removeChild(element)

    return undefined
  }

  return (
    <Tooltip
      content={copyMessage}
      placement="left"
      isOpen={copyState !== CopyState.TO_BE_COPIED || undefined}
      delay={100}
      closeDelay={0}
      color={copyColor}
    >
      <Button
        className={clsx(
          'group-hover/row:opacity-100',
          copyState !== CopyState.HAS_BEEN_COPIED && 'opacity-0',
          copyState === CopyState.HAS_NOT_BEEN_COPIED && 'opacity-100',
          device.isMobile && 'opacity-100',
        )}
        isIconOnly
        size="md"
        onClick={handleCopy}
        color={copyColor}
      >
        {copyIcon}
      </Button>
    </Tooltip>
  )
}
