/**
 * Extrae el ID de video de un link de YouTube.
 */
export function getYoutubeVideoId(url?: string | null): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v')
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.replace('/embed/', '')
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.replace('/shorts/', '')
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Convierte un link de YouTube (cualquier formato común) a una URL de embed.
 * Devuelve null si el texto no parece un link de YouTube válido.
 */
export function getYoutubeEmbedUrl(url?: string | null): string | null {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

/**
 * Devuelve la URL de miniatura de YouTube para un video.
 * Usa hqdefault.jpg, disponible universalmente para todos los videos.
 */
export function getYoutubeThumbnailUrl(url?: string | null): string | null {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

/**
 * Devuelve varias URLs candidatas de miniatura para un video, en orden de
 * preferencia. Permite implementar un fallback en el cliente: si el primer
 * host no responde, se prueba el siguiente.
 */
export function getYoutubeThumbnailCandidates(url?: string | null): string[] {
  const videoId = getYoutubeVideoId(url)
  if (!videoId) return []
  return [
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  ]
}
