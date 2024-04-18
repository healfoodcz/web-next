'use client'

import React, { createContext, PropsWithChildren } from 'react'
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  RadioGroup,
  Radio,
  Button,
  Tooltip,
} from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { ThemeExample } from '@/features/Theme/ThemeExample'

export const ThemeModalContext = createContext<(() => void) | null>(null)

export function ThemeModalProvider({ children }: PropsWithChildren) {
  const disclosure = useDisclosure()
  const { theme, setTheme } = useTheme()
  const t = useTranslations('features')

  return (
    <ThemeModalContext.Provider value={disclosure.onOpen}>
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
              <ModalHeader>{t('theme.select')}</ModalHeader>

              {/* variant A - cluttered */}
              {/* <ModalBody>
                <RadioGroup value={theme} onValueChange={setTheme}>
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="light"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                      description={t('theme.lightThemeDescription')}
                    >
                      {t('theme.lightTheme')}
                    </Radio>

                    <Tooltip content={t('theme.lightThemeDescription')} placement="left">
                      <ThemeExample theme="light" />
                    </Tooltip>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="dark"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                      description={t('theme.darkThemeDescription')}
                    >
                      {t('theme.darkTheme')}
                    </Radio>

                    <Tooltip content={t('theme.darkThemeDescription')} placement="left">
                      <ThemeExample theme="dark" />
                    </Tooltip>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="system"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                      description={t('theme.systemThemeDescription')}
                    >
                      {t('theme.systemTheme')}
                    </Radio>

                    <Tooltip content={t('theme.systemThemeDescription')} placement="left">
                      <ThemeExample theme="system" />
                    </Tooltip>
                  </div>
                </RadioGroup>
              </ModalBody> */}

              {/* variant B - weird */}
              <ModalBody>
                <RadioGroup value={theme} onValueChange={setTheme}>
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="light"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.lightTheme')}
                    </Radio>

                    <Tooltip content={t('theme.lightThemeDescription')} placement="left">
                      <ThemeExample theme="light" />
                    </Tooltip>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="dark"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.darkTheme')}
                    </Radio>

                    <Tooltip content={t('theme.darkThemeDescription')} placement="left">
                      <ThemeExample theme="dark" />
                    </Tooltip>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="system"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.systemTheme')}
                    </Radio>

                    <Tooltip content={t('theme.systemThemeDescription')} placement="left">
                      <ThemeExample theme="system" />
                    </Tooltip>
                  </div>
                </RadioGroup>
              </ModalBody>

              {/* variant C - simple */}
              {/* <ModalBody>
                <RadioGroup value={theme} onValueChange={setTheme}>
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="light"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.lightTheme')}
                    </Radio>

                    <ThemeExample theme="light" />
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="dark"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.darkTheme')}
                    </Radio>

                    <ThemeExample theme="dark" />
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <Radio
                      value="system"
                      className="w-full"
                      classNames={{
                        labelWrapper: 'pl-2',
                      }}
                    >
                      {t('theme.systemTheme')}
                    </Radio>

                    <ThemeExample theme="system" />
                  </div>
                </RadioGroup>
              </ModalBody> */}

              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t('menu.done')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ThemeModalContext.Provider>
  )
}
