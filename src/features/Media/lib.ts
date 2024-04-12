import { StaticImageData } from 'next/dist/shared/lib/get-img-props'

export function filterImageProps(staticImageData: StaticImageData): StaticImageData {
  return Object.fromEntries(
    Object.entries(staticImageData as StaticImageData).filter(
      ([key]) => !['blurWidth', 'blurHeight'].includes(key as string),
    ),
  ) as StaticImageData
}
