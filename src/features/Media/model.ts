import { StaticImageData } from 'next/image'

export const MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const

export interface ImageMedia {
  type: typeof MediaType.IMAGE
  source: StaticImageData
}

export interface VideoMedia {
  type: typeof MediaType.VIDEO
  source: any
}

export type SingleMedia = ImageMedia | VideoMedia

export type MultipleMedia = Array<SingleMedia>
