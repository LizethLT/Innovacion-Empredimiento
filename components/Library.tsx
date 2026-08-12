'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Calendar,
  Check,
  ChevronDown,
  Download,
  FileText,
  FolderOpen,
  Search,
  X,
} from 'lucide-react'
import { LIBRARY_DOCUMENTS } from '@/lib/documents'

export default function Library() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { categories, countByCategory } = useMemo(() => {
    const counts: Record<string, number> = {}

    LIBRARY_DOCUMENTS.forEach((document) => {
      const category = String(document.category ?? '').trim() || 'General'
      counts[category] = (counts[category] || 0) + 1
    })

    // Red de seguridad visual por si tus documentos actuales no tienen categorías asignadas
    const keys = Object.keys(counts)
    if (keys.length === 1 && keys[0] === 'General') {
      counts['Leyes'] = 0
      counts['Mesas'] = 0
      counts['Metodología'] = 0
    }

    return {
      categories: ['Todos', ...Object.keys(counts)],
      countByCategory: {
        Todos: LIBRARY_DOCUMENTS.length,
        ...counts,
      },
    }
  }, [])

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase()

    return LIBRARY_DOCUMENTS.filter((document) => {
      const category = String(document.category ?? '').trim() || 'General'

      const matchesCategory =
        selectedCategory === 'Todos' || category === selectedCategory

      const matchesSearch =
        !query ||
        `${document.title} ${document.description}`
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const hasActiveFilters =
    Boolean(search.trim()) || selectedCategory !== 'Todos'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <main className="min-h-screen bg-[#fbf8f3] text-[#241d1d]">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a1f2b]">
              Centro de recursos
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-[#5b0f18] sm:text-5xl">
              Biblioteca de documentos
            </h1>

            <p className="text-pretty text-lg leading-7 text-[#6f6565]">
              Acceso a documentos, guías y recursos para conocer la Ley en
              profundidad.
            </p>
          </div>

          {/* Barra de búsqueda + categorías desplegables */}
          <div className="mb-8 flex max-w-xl items-center rounded-full border border-[#dec7c2] bg-white shadow-sm">
            <div className="flex flex-1 items-center px-5 py-3.5">
              <Search
                className="mr-3 flex-shrink-0 text-[#9a8585]"
                size={19}
              />
              <label htmlFor="document-search" className="sr-only">
                Buscar documentos
              </label>
              <input
                id="document-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar documentos"
                className="w-full bg-transparent text-sm text-[#241d1d] placeholder-[#9a8585] outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Limpiar búsqueda"
                  className="ml-2 flex-shrink-0 text-[#9a8585] hover:text-[#5b0f18]"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="h-6 w-px bg-[#dec7c2]" />

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-r-full px-5 py-3.5 text-sm font-medium text-[#241d1d] transition hover:bg-[#f4e9e3]"
              >
                {selectedCategory === 'Todos' ? 'Categorías' : selectedCategory}
                <ChevronDown
                  size={16}
                  className={`text-[#7a1f2b] transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-60 rounded-xl border border-[#eadbd6] bg-white py-2 shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDropdownOpen(false)
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-[#241d1d] transition hover:bg-[#f4e9e3]"
                    >
                      <span>{category}</span>
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-[#f4e9e3] px-2 py-0.5 text-xs text-[#7a1f2b]">
                          {countByCategory[category] ?? 0}
                        </span>
                        {selectedCategory === category && (
                          <Check size={16} className="text-[#7a1f2b]" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between text-sm text-[#806f6f]">
            <span>
              {filteredDocuments.length}{' '}
              {filteredDocuments.length === 1
                ? 'documento encontrado'
                : 'documentos encontrados'}
            </span>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('Todos')
                }}
                className="font-semibold text-[#7a1f2b] hover:text-[#241d1d]"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#dec7c2] bg-white py-20 text-center">
              <FolderOpen className="mb-3 text-[#c7a7a1]" size={40} />

              <p className="mb-1 font-medium">
                No se encontraron documentos
              </p>

              <p className="text-sm text-[#806f6f]">
                Probá con otra búsqueda o categoría.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <article
                  key={document.id}
                  className="flex flex-col rounded-2xl border border-[#dec7c2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5b0f18] text-white">
                      <FileText size={22} />
                    </div>

                    <span className="rounded-full bg-[#f4e9e3] px-3 py-1 text-xs font-bold text-[#7a1f2b]">
                      {document.type}
                    </span>
                  </div>

                  <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a1f2b]">
                    {String(document.category ?? '').trim() || 'General'}
                  </span>

                  <h2 className="mb-2 font-bold text-[#241d1d]">
                    {document.title}
                  </h2>

                  <p className="mb-5 flex-grow text-sm leading-6 text-[#6f6565]">
                    {document.description}
                  </p>

                  <div className="mb-4 space-y-2 border-t border-[#eadbd6] pt-3 text-xs text-[#806f6f]">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {document.date}
                    </div>

                    <div>{document.pages}</div>
                  </div>

                  <a
                    href={document.file}
                    download
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#5b0f18] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#241d1d]"
                  >
                    <Download size={16} />
                    Descargar
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}