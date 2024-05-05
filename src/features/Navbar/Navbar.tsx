'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Navbar as NextUiNavbar } from '@nextui-org/navbar'
import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
  Button,
  NavbarItem,
  Tooltip,
} from '@nextui-org/react'
import clsx from 'clsx'
import { Translate, MoonStars, Sun } from '@phosphor-icons/react'
import { usePathname, Link } from '@/features/Translations'
import { useThemeModal } from '@/features/Theme'
import { useLanguageModal } from '@/features/Language/hook'
import { Logotype } from '@/features/Brand'
import { useMainLinks } from './hook'

export default function Navbar() {
  const t = useTranslations()

  // menu
  const mainLinks = useMainLinks()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navbarProps = useMemo(
    () => ({
      isBordered: true,
      isBlurred: false,
      isMenuOpen,
      onMenuOpenChange: setIsMenuOpen,
      disableAnimation: true,
    }),
    [isMenuOpen],
  )

  // modals
  const openLanguageModal = useLanguageModal()
  const openThemeModal = useThemeModal()

  // theme
  const { resolvedTheme } = useTheme()
  const themeIcon = useMemo(
    () =>
      resolvedTheme === 'dark' ? (
        <MoonStars aria-label={t('features.theme.darkTheme')} />
      ) : (
        <Sun aria-label={t('features.theme.lightTheme')} />
      ),
    [resolvedTheme, t],
  )

  // bookmarks
  // const bookmarks = useAppSelector((state) => state.bookmarks)
  // Computer programming
  // -> Computer program
  // -> Sequence
  // -> Mathematics
  // -> Knowledge
  // -> Awareness of facts
  // -> Awareness
  // -> Philosophy

  // render some things only on client
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {/* | <- sm */}
      <NextUiNavbar className="sm:hidden" {...navbarProps}>
        <NavbarContent justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? t('features.menu.close') : t('features.menu.open')} />

          <NavbarMenu>
            {mainLinks.map((link) => {
              const isActive = link.isActive(pathname)

              return (
                <NavbarMenuItem isActive={isActive} key={link.href}>
                  <Link
                    className={clsx('w-full', isActive ? 'text-primary' : '')}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </NavbarMenuItem>
              )
            })}
          </NavbarMenu>
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarBrand>
            <Logotype />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <Button
            variant="light"
            isIconOnly
            onClick={openLanguageModal}
            aria-label={t('features.language.label')}
          >
            <Translate aria-label={t('features.language.label')} />
          </Button>

          <Button variant="light" isIconOnly onClick={openThemeModal} aria-label={t('features.theme.label')}>
            {isMounted && themeIcon}
          </Button>

          {/* <Dropdown>
            <DropdownTrigger>
              <Button variant="light" isIconOnly>
                <GearSix />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Options">
              <DropdownItem startContent={<Translate />} key="language" onClick={openLanguageModal}>
                {t('features.language.label')}
              </DropdownItem>

              <DropdownItem startContent={isMounted ? themeIcon : null} key="theme" onClick={openThemeModal}>
                {t('features.theme.label')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </NavbarContent>
      </NextUiNavbar>

      {/* sm -> | */}
      <NextUiNavbar className="hidden sm:flex" {...navbarProps}>
        <NavbarContent justify="start">
          <NavbarBrand className="grow-0">
            <Logotype />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center">
          {mainLinks.map((link) => {
            const isActive = link.isActive(pathname)

            return (
              <NavbarItem key={link.href} isActive={isActive}>
                <Link className={isActive ? 'text-primary' : ''} href={link.href}>
                  {link.label}
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          <Tooltip content={t('features.language.label')} placement="bottom">
            <Button
              variant="light"
              isIconOnly
              onClick={openLanguageModal}
              aria-label={t('features.language.label')}
            >
              <Translate aria-label={t('features.language.label')} />
            </Button>
          </Tooltip>

          <Tooltip content={t('features.theme.label')} placement="bottom">
            <Button
              variant="light"
              isIconOnly
              onClick={openThemeModal}
              aria-label={t('features.theme.label')}
            >
              {isMounted && themeIcon}
            </Button>
          </Tooltip>

          {/* REFACTOR: to menu links */}
          {/* <Tooltip content={t('pages.main.bookmarks.titleAndLink')} placement="bottom">
            <Link href="/bookmarks">
              <Badge
                content={isMounted ? bookmarks.length : 0}
                isInvisible={!isMounted || bookmarks.length === 0}
                color="primary"
              >
                <Button variant="light" isIconOnly aria-label={t('pages.main.bookmarks.titleAndLink')}>
                  <Bookmarks aria-label={t('pages.main.bookmarks.titleAndLink')} />
                </Button>
              </Badge>
            </Link>
          </Tooltip> */}
        </NavbarContent>
      </NextUiNavbar>
    </>
  )
}
