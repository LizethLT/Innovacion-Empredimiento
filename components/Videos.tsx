'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Play, Search, ChevronDown, Check } from 'lucide-react'

export default function Videos() {
  function getYoutubeThumbnail(url) {
    if (!url) return null
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (!match) return null
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  }

  const videos = [
    {
      title: '¿Cómo funcionará el Consejo Municipal de Innovación de Tarija?',
      description: 'Tarija tiene talento, ideas y personas con ganas de transformar nuestra ciudad.',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B]',
      duration: '8:45',
      category: 'ley',
      youtubeUrl: 'https://youtu.be/WCNXOwngRHk',
    },
    /*{
      title: 'Sin video',
      description: '',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#5B0F18]',
      duration: '12:30',
      category: 'ley',
      youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    },
    {
      title: 'Sin video',
      description: '',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#1E1E1E]',
      duration: '10:15',
      category: 'ley',
      youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    },
    {
      title: 'Sin video',
      description: '',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#1E1E1E]',
      duration: '9:50',
      category: 'ley',
      youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    },*/
    {
      title: 'Mesa 1 | Gobernanza y Planificación del Ecosistema de Innovación',
      description: '¿Cómo se coordinará el Ecosistema Municipal de Innovación?',
      thumbnail: 'bg-gradient-to-br from-[#1E1E1E] to-[#5B0F18]',
      duration: '7:20',
      category: 'mesas',
      youtubeUrl: 'https://youtu.be/e6XG6gb58Qo',
    },
    {
      title: 'Mesa 2 | Talento, Emprendimiento y Programas Municipales',
      description: 'El talento es uno de los principales motores del desarrollo.',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B]',
      duration: '15:40',
      category: 'mesas',
      youtubeUrl: 'https://youtu.be/gqsh08KK6vY',
    },
    {
      title: 'Mesa 3 | Instrumentos Estratégicos para la Innovación',
      description: 'Las ideas necesitan herramientas para convertirse en realidad.',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#5B0F18]',
      duration: '11:25',
      category: 'mesas',
      youtubeUrl: 'https://youtu.be/JBrkHYzaVtM',
    },
    {
      title: 'Mesa 4 | Implementación, Sostenibilidad y Proyección del Ecosistema',
      description: '¿Cómo hacemos que el Ecosistema Municipal de Innovación se convierta en una política sostenible en el tiempo?',
      thumbnail: 'bg-gradient-to-br from-[#1E1E1E] to-[#7A1F2B]',
      duration: '10:10',
      category: 'mesas',
      youtubeUrl: 'https://youtu.be/PRlOmQkYE9M',
    },
  ]

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'ley', label: 'Ley' },
    { id: 'mesas', label: 'Mesas' },
  ]

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('todos')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categoryCounts = useMemo(() => {
    const counts = { todos: videos.length }
    categories.forEach((cat) => {
      if (cat.id === 'todos') return
      counts[cat.id] = videos.filter((v) => v.category === cat.id).length
    })
    return counts
  }, [videos, categories])

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === 'todos' || video.category === activeCategory
      const matchesQuery =
        query.trim() === '' ||
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [videos, query, activeCategory])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-10">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Videos</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Contenido audiovisual para conocer más sobre la Ley y sus oportunidades
          </p>
        </div>

        {/* Buscador y filtros */}
        <div className="mb-10">
          <div className="flex items-center w-full max-w-2xl bg-white border border-[#D8A7A7] rounded-full pl-5 pr-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#5B0F18] transition">
            <Search className="text-gray-400 shrink-0" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar videos"
              className="w-full bg-transparent px-3 py-1.5 text-[#1E1E1E] placeholder-gray-400 focus:outline-none"
            />

            <div className="w-px h-6 bg-[#D8A7A7] mr-2 shrink-0" />

            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold text-[#5B0F18] hover:bg-[#F8F1E7] transition-colors whitespace-nowrap"
              >
                Categorías
                <ChevronDown
                  size={16}
                  className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#D8A7A7] rounded-xl shadow-lg overflow-hidden z-10 py-1">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id)
                          setDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-left hover:bg-[#F8F1E7] transition-colors"
                      >
                        <span
                          className={
                            isActive
                              ? 'font-semibold text-[#1E1E1E]'
                              : 'text-[#1E1E1E]'
                          }
                        >
                          {cat.label}
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className="bg-[#F8F1E7] text-[#7A1F2B] text-xs font-semibold px-2 py-0.5 rounded-full min-w-[1.5rem] text-center">
                            {categoryCounts[cat.id] ?? 0}
                          </span>
                          {isActive && (
                            <Check size={16} className="text-[#5B0F18]" />
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {filteredVideos.length}{' '}
            {filteredVideos.length === 1 ? 'video encontrado' : 'videos encontrados'}
          </p>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No se encontraron videos que coincidan con tu búsqueda.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => {
              const thumbnailImg = getYoutubeThumbnail(video.youtubeUrl)
              return (
              <a
                key={index}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#D8A7A7] rounded-lg overflow-hidden hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 group cursor-pointer block"
              >
                <div className={`${thumbnailImg ? '' : video.thumbnail} aspect-video flex items-center justify-center relative overflow-hidden`}>
                  {thumbnailImg && (
                    <img
                      src={thumbnailImg}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-[#5B0F18] fill-[#5B0F18]" size={28} />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 bg-white/90 text-[#5B0F18] text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1E1E1E] mb-2 text-sm group-hover:text-[#7A1F2B] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600">{video.description}</p>
                </div>
              </a>
              )
            })}
          </div>
        )}

        {/* Subscription CTA */}
        <div className="mt-12 bg-white border-2 border-[#5B0F18] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">Canal Oficial de Videos</h3>
          <p className="text-gray-600 mb-6">Accede a más contenido, cursos y documentales en nuestro canal oficial</p>
          {/* 👉 PEGA AQUÍ el link real de tu canal de YouTube */}
          <a
            href="https://youtube.com/@renanjustiniano?si=qjpi7Z9LvyQkKhcY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B0F18] text-white font-semibold rounded-lg hover:bg-[#1E1E1E] transition-colors"
          >
            Ver en YouTube
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.175c-3.674-.576-11.308-.576-14.98 0C2.309 3.727 1.813 5.746 1.813 12c0 6.254.496 8.273 2.822 8.825 3.672.576 11.306.576 14.98 0 2.326-.552 2.822-2.571 2.822-8.825 0-6.254-.496-8.273-2.822-8.825zm-3.97 9.75L9.08 15.08V8.92l6.565 3.83z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}