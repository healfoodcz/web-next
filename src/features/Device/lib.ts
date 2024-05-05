export const device = {
  get isMobile() {
    return window.matchMedia('(pointer: coarse)').matches
  },
}
