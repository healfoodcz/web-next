'use client'

import React, { createContext, useTransition, PropsWithChildren } from 'react'
import { usePathname, Locale, useRouter } from '@/features/Translations'
import { useTranslations } from 'next-intl'
import { useDisclosure } from '@nextui-org/use-disclosure'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Button,
  ModalFooter,
} from '@nextui-org/react'

export const LanguageModalContext = createContext<(() => void) | null>(null)

interface LanguageModalProviderProps {
  locale: Locale
}

export function LanguageModalProvider({ locale, children }: PropsWithChildren<LanguageModalProviderProps>) {
  const disclosure = useDisclosure()
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitionPending, startTransition] = useTransition()
  const t = useTranslations('features')

  function handleLanguageChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as Locale })
    })
  }

  return (
    <LanguageModalContext.Provider value={disclosure.onOpen}>
      {children}

      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        hideCloseButton
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t('language.select')}</ModalHeader>

              <ModalBody>
                <RadioGroup
                  value={locale}
                  onValueChange={handleLanguageChange}
                  isDisabled={isTransitionPending}
                >
                  <Radio value="en" className="max-w-full w-full" description={t('language.english')}>
                    English
                  </Radio>
                  <Radio value="ru" className="max-w-full w-full" description={t('language.russian')}>
                    Русский
                  </Radio>
                  <Radio value="de" className="max-w-full w-full" description={t('language.german')}>
                    Deutsch
                  </Radio>
                  <Radio value="cs" className="max-w-full w-full" description={t('language.czech')}>
                    Česky
                  </Radio>
                </RadioGroup>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t('menu.done')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </LanguageModalContext.Provider>
  )
}
