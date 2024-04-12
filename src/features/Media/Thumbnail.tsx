import { ImageMedia, VideoMedia, SingleMedia, filterImageProps } from '@/features/Media'
import Image from 'next/image'
import React, { MouseEventHandler, useMemo } from 'react'
import clsx from 'clsx'

interface ThumbnailProps<SomeMedia extends SingleMedia> {
  media: SomeMedia
  title: SomeMedia extends ImageMedia ? string : undefined
  isActive?: boolean
  className?: string
  contain?: boolean
  onClick?: MouseEventHandler
}

export default function Thumbnail<SomeMedia extends ImageMedia | VideoMedia>({
  title,
  media,
  isActive,
  className,
  contain,
  onClick,
}: ThumbnailProps<SomeMedia>) {
  const classNames = useMemo(
    () =>
      clsx(
        'w-full',
        isActive ? 'outline outline-primary outline-offset-2 outline-2' : '',
        contain ? 'object-contain' : 'aspect-square rounded-xl object-cover',
        className,
      ),
    [isActive, contain, className],
  )

  if (media.type === 'IMAGE') {
    return (
      <Image
        className={classNames}
        {...filterImageProps(media.source)}
        placeholder="blur"
        alt={title as string}
        onClick={onClick}
      />
    )
  }

  if (media.type === 'VIDEO') {
    return (
      <video
        className={classNames}
        src={media.source}
        muted
        loop
        onClick={onClick}
        autoPlay={isActive === undefined}
        playsInline={isActive === undefined}
      />
    )
  }

  throw new Error(`<Thumbnail />: "type" field of the "media" prop should be either "IMAGE" or "VIDEO"`)
}
