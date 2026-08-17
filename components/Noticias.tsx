'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Newspaper, Video, Share2, CalendarDays } from 'lucide-react'
import { useNotifications } from '@/context/NotificationContext'

interface Noticia {
  id: string
  titulo: string
  descripcion: string | null
  enlace: string
  tipo: string
  imagen_url: string | null
  creado_en: string
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function CardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-[1.5rem] bg-white p-7 shadow-[0_12px_35px_rgba(61,1,3,0.08)]">
      <div className="h-48 w-full animate-pulse rounded-xl bg-[#f1e6e1] mb-5" />
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 animate-pulse rounded-full bg-[#f1e6e1]" />
        <div className="h-4 w-20 animate-pulse rounded bg-[#f1e6e1]" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-5 w-full animate-pulse rounded bg-[#f1e6e1]" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-[#f1e6e1]" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#f6efec]" />
        <div className="h-3.5 w-5/6 animate-pulse rounded bg-[#f6efec]" />
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-[#f7f0ed] pt-4">
        <div className="h-4 w-28 animate-pulse rounded bg-[#f1e6e1]" />
        <div className="h-8 w-8 animate-pulse rounded-full bg-[#f1e6e1]" />
      </div>
    </div>
  )
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const { markAsViewed } = useNotifications()

  useEffect(() => {
    fetch('/api/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data.noticias ?? []))
      .catch(() => setNoticias([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="noticias" className="bg-[#f8f5f1] px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f1e0dc] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#621b27] mb-3">
              Está pasando
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#241005] sm:text-6xl">
              Noticias y Actualidad
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#766c6b]">
            Informes de gestión, normativas y avances del trabajo legislativo junto a sectores productivos y la ciudadanía.
          </p>
        </div>

        <div className="relative">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}

          {!loading && noticias.length === 0 && (
            <div className="mx-auto max-w-md rounded-[2rem] border border-dashed border-[#ead9d3] bg-white/50 px-8 py-16 text-center shadow-sm">
              <Newspaper size={32} strokeWidth={1.5} className="mx-auto text-[#a8635f]" aria-hidden="true" />
              <p className="mt-4 text-base font-semibold text-[#621b27]">Todavía no hay noticias publicadas</p>
              <p className="mt-1 text-sm text-[#766c6b]">
                Las que se publiquen desde el panel aparecerán aquí automáticamente.
              </p>
            </div>
          )}

          {!loading && noticias.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia) => {
                const isVideo = noticia.tipo === 'video'
                return (
                  <article
                    key={noticia.id}
                    className="group relative flex flex-col justify-between rounded-[2rem] bg-white p-7 shadow-[0_10px_30px_rgba(61,1,3,0.06)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(61,1,3,0.12)] overflow-hidden"
                  >
                    <div>
                      {noticia.imagen_url && (
                        <div className="relative -mx-7 -mt-7 mb-5 h-48 w-[calc(100%+3.5rem)] overflow-hidden bg-gray-100">
                          <img
                            src={noticia.imagen_url}
                            alt={noticia.titulo}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                            isVideo ? 'bg-[#eaf1fb] text-[#1e4d8c]' : 'bg-[#fbf0ec] text-[#621b27]'
                          }`}
                        >
                          {isVideo ? <Video size={12} aria-hidden="true" /> : <Newspaper size={12} aria-hidden="true" />}
                          {isVideo ? 'Video' : 'Actualidad'}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#9c8e8b]">
                          <CalendarDays size={12} aria-hidden="true" />
                          <span>{formatFecha(noticia.creado_en)}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold leading-snug text-[#241f20] transition-colors group-hover:text-[#621b27]">
                        {noticia.titulo}
                      </h2>

                      {noticia.descripcion && (
                        <p className="mt-2.5 text-[13px] leading-relaxed text-[#766c6b] line-clamp-3">
                          {noticia.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[#f4edea] pt-4">
                      <a
                        href={noticia.enlace}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => markAsViewed(noticia.id)}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#621b27] transition-colors hover:text-[#810100]"
                      >
                        {isVideo ? 'Ver video' : 'Seguir leyendo'}
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>

                      <a
                        href={noticia.enlace}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => markAsViewed(noticia.id)}
                        aria-label="Compartir noticia"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead9d3] text-[#a89b98] transition-all hover:border-[#621b27] hover:bg-[#fbf0ec] hover:text-[#621b27]"
                      >
                        <Share2 size={13} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}