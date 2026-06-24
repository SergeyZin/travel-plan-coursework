'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SafeImage({ src, alt, fill, width, height, className, priority, sizes }: SafeImageProps) {
  const [error, setError] = useState(false)
  const fallback = '/images/placeholder.jpg'

  if (error) {
    if (fill) {
      return <Image src={fallback} alt={alt} fill className={className} sizes={sizes} />
    }
    return <Image src={fallback} alt={alt} width={width || 400} height={height || 300} className={className} />
  }

  if (fill) {
    return (
      <Image
        src={src || fallback}
        alt={alt}
        fill
        className={className}
        onError={() => setError(true)}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  return (
    <Image
      src={src || fallback}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  )
}
