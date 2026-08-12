'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface Noticia {
  id: string
  titulo: string
  descripcion: string | null
  link: string
  tipo: string
  created_at: string
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data.noticias ?? []))
      .catch(() => setNoticias([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main id="noticias" className="min-h-screen bg-[#f8f5f1] px-4 py-8 text-[#241f20] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8c2432]">Noticias</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#621b27] sm:text-5xl">
            Actualidad y noticias del ecosistema
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#766c6b]">
            Informes, convocatorias y avances del trabajo conjunto entre instituciones, emprendedores y comunidad.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-[#766c6b]">Cargando noticias...</p>
        ) : noticias.length === 0 ? (
          <p className="text-sm text-[#766c6b]">
            Todavía no hay noticias publicadas. Las que se publiquen desde el panel aparecerán aquí.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {noticias.map((noticia) => (
              <article
                key={noticia.id}
                className="group flex h-full flex-col rounded-[1.75rem] border border-[#ead9d3] bg-white p-6 shadow-[0_14px_40px_rgba(98,27,39,0.06)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex w-fit rounded-full bg-[#fbf0ec] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8c2432]">
                  {noticia.tipo === 'video' ? 'Video' : 'Actualidad'}
                </div>

                <h2 className="text-xl font-bold leading-tight text-[#621b27]">{noticia.titulo}</h2>
                {noticia.descripcion && (
                  <p className="mt-4 flex-1 text-sm leading-7 text-[#766c6b]">{noticia.descripcion}</p>
                )}

                <a
                  href={noticia.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-[#810100] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#670000]"
                >
                  {noticia.tipo === 'video' ? 'Ver video' : 'Ver noticia'}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}