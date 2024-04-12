export interface NavigationLink {
  href: string
  label: string
  isActive: Function
  isNested?: boolean
}

export function isLinkActive(this: NavigationLink, pathname: string) {
  if (this?.isNested) {
    return pathname.startsWith(this.href)
  }

  return pathname === this.href
}
