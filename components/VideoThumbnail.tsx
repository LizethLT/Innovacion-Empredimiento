'use client'

import { useState } from 'react'
import { getYoutubeThumbnailCandidates } from '@/lib/youtube'

/**
 * Imagen de miniatura de YouTube con fallback automático entre varios hosts
 * (i.ytimg.com, img.youtube.com) y tamaños (hqdefault, mqdefault). Esto
 * garantiza que la miniatura se muestre incluso si uno de los servidores
 * de YouTube no responde para un video concreto.
 */
export default function VideoThumbnail({
  url,
  alt,
  className = '',
}: {
  url?: string | null
  alt: string
  className?: string
}) {
  const candidates = getYoutubeThumbnailCandidates(url)
  const [index, setIndex] = useState(0)

  if (candidates.length === 0) {
    return null
  }

  const current = candidates[index]

  const handleError = () => {
    // Si hay otro candidato, avanzar; si no, ocultar la imagen (deja el fondo).
    setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={(e) => {
        // Último candidato fallido => ocultar imagen para que quede el fondo.
        if (index >= candidates.length - 1) {
          e.currentTarget.style.display = 'none'
        } else {
          handleError()
        }
      }}
    />
  )
}
