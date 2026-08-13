'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Building2, Briefcase, Eye, GraduationCap, Handshake, Lightbulb, MapPin, Target, Users, X, Book, FileText, Gavel } from 'lucide-react'
import { articles, getArticleByRange } from '@/lib/articles'

const ITEMS = [
  {
    id: 'actores',
    title: 'Actores del Ecosistema',
    description:
      'Agrupa a los actores del Ecosistema Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento, reunidos de manera permanente en el Consejo Municipal para orientar, articular y fortalecer su desarrollo, promoviendo una visión compartida para Tarija.',
    activities: ['Coordinar esfuerzos', 'Generar consensos', 'Definir prioridades estratégicas'],
    results: ['Ecosistema dinámico y participativo', 'Acciones conjuntas', 'Desarrollo sostenible del municipio'],
    actors: [
      'Sector público',
      'Educación superior, investigación y desarrollo tecnológico',
      'Sector empresarial y productivo',
      'Emprendedores y organizaciones de apoyo',
      'Sector creativo, cultural y de innovación',
      'Instituciones financieras',
      'Sociedad civil',
      'Cooperación nacional e internacional',
    ],
    article: 'Art. 15–18 y 23',
    icon: Users,
  },
  {
    id: 'secretaria',
    title: 'Secretaría Técnica',
    description:
      'Instancia encargada de coordinar el funcionamiento operativo del Sistema Municipal de Innovación. Ejercida por la unidad organizacional designada por el Órgano Ejecutivo Municipal, es el principal soporte técnico, administrativo y de articulación del Consejo Municipal y las Mesas Temáticas.',
    activities: ['Planificar y organizar sesiones', 'Elaborar y custodiar actas e informes', 'Coordinar la Agenda Estratégica Anual'],
    results: ['Continuidad y eficiencia institucional', 'Alianzas estratégicas y redes de colaboración', 'Apoyo al Observatorio Municipal'],
    actors: ['Órgano Ejecutivo Municipal', 'Consejo Municipal', 'Mesas Temáticas'],
    article: 'Art. 24',
    icon: Building2,
  },
  {
    id: 'observatorio',
    title: 'Observatorio Municipal',
    description:
      'Instrumento técnico que produce y gestiona el conocimiento que sustenta el desarrollo del Ecosistema Municipal: recopila, integra, procesa y analiza información estratégica, transformando los datos en evidencia para la toma de decisiones.',
    activities: ['Administrar el Sistema Municipal de Información e Indicadores', 'Elaborar estudios, diagnósticos e informes', 'Difundir conocimiento y facilitar acceso público'],
    results: ['Gestión basada en evidencia', 'Transparencia', 'Mejora continua'],
    actors: ['Consejo Municipal', 'Mesas Temáticas', 'Secretaría Técnica', 'Plan Municipal'],
    article: 'Art. 30–34',
    icon: Eye,
  },
  {
    id: 'mesas',
    title: 'Mesas Temáticas de Articulación',
    description:
      'Espacios técnicos y colaborativos que reúnen a instituciones públicas, academia, empresas, emprendedores, organizaciones sociales, sector creativo y cooperación internacional para analizar desafíos, identificar oportunidades y construir propuestas para el Ecosistema Municipal.',
    activities: ['Metodologías participativas y cocreación', 'Laboratorios de innovación', 'Talleres colaborativos y grupos especializados'],
    results: ['Propuestas elevadas al Consejo Municipal', 'Fortalecimiento de políticas públicas', 'Insumos para el Plan Municipal'],
    actors: ['Instituciones públicas', 'Academia', 'Empresas', 'Sector creativo', 'Cooperación internacional'],
    article: 'Art. 20–22',
    icon: Handshake,
  },
  {
    id: 'agenda',
    title: 'Agenda Estratégica Anual del Ecosistema',
    description:
      'Instrumento que traduce la visión de mediano y largo plazo del Plan Municipal en prioridades estratégicas para cada gestión, elaborado y aprobado anualmente por el Consejo Municipal. No es vinculante para el Órgano Ejecutivo, pero sirve de referencia para la formulación y seguimiento del Plan Municipal.',
    activities: ['Analizar la evolución del Ecosistema', 'Incorporar aportes de las Mesas Temáticas', 'Usar información del Observatorio Municipal'],
    results: ['Visión compartida anual', 'Referencia para el Plan Municipal', 'Orientación de políticas, programas y proyectos'],
    actors: ['Consejo Municipal', 'Mesas Temáticas', 'Observatorio Municipal', 'Secretaría Técnica'],
    article: 'Art. 19',
    icon: Lightbulb,
  },
  {
    id: 'plan',
    title: 'Plan Municipal para el Desarrollo del Ecosistema',
    description:
      'Hoja de ruta estratégica que orienta la implementación de la Ley, con objetivos, ejes estratégicos, políticas, programas, proyectos, instrumentos e indicadores de mediano y largo plazo, articulando el trabajo de las secretarías y unidades del Gobierno Autónomo Municipal.',
    activities: ['Diagnóstico integral del Ecosistema', 'Identificar activos territoriales estratégicos', 'Procesos de participación y consulta'],
    results: ['Planificación consensuada y basada en evidencia', 'Coherencia con la planificación municipal vigente', 'Actualización periódica'],
    actors: ['Gobierno Autónomo Municipal', 'Consejo Municipal', 'Mesas Temáticas'],
    article: 'Art. 25–29',
    icon: MapPin,
  },
]

const actorIcons = [Building2, Briefcase, GraduationCap, Handshake, Target, Users]

export default function InteractiveEcosystem() {
  const descriptionRef = useRef<HTMLDivElement | null>(null)
  const [selectedId, setSelectedId] = useState('actores')
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[0] | null>(null)
  const [isArticleModalOpen, setArticleModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const selected = ITEMS.find((item) => item.id === selectedId) ?? ITEMS[0]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleArticleClick = (articleText: string) => {
    // Mapeo flexible que convierte formatos de display a rangos de búsqueda
    const articleMap: { [key: string]: string } = {
      'Art. 15–18 y 23': '15 al 23',
      'Art. 24': '24 al 24',
      'Art. 30–34': '30 al 34',
      'Art. 20–22': '20 al 22',
      'Art. 19': '19 al 19',
      'Art. 25–29': '25 al 29',
    }
    
    // Intenta encontrar un mapeo exacto primero
    let range = articleMap[articleText.trim()]
    
    // Si no encuentra mapeo exacto, intenta extraer el primer rango del texto
    if (!range) {
      const match = articleText.match(/(\d+)\s*(?:–|-|al)\s*(\d+)/)
      if (match) {
        range = `${match[1]} al ${match[2]}`
      } else {
        const singleMatch = articleText.match(/(\d+)/)
        if (singleMatch) {
          range = `${singleMatch[1]} al ${singleMatch[1]}`
        }
      }
    }
    
    if (range) {
      const article = getArticleByRange(range)
      if (article) {
        setSelectedArticle(article)
        setArticleModalOpen(true)
      }
    }
  }

  const closeArticleModal = () => {
    setArticleModalOpen(false)
    window.setTimeout(() => {
      setSelectedArticle(null)
    }, 300)
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    requestAnimationFrame(() => {
      if (!descriptionRef.current) return
      const elementTop = descriptionRef.current.getBoundingClientRect().top + window.pageYOffset
      const offset = Math.max(elementTop - 120, 0)
      window.scrollTo({ top: offset, behavior: 'smooth' })
    })
  }

  return (
    <main id="ecosistema" className="min-h-screen bg-[#fbfaf8] px-4 py-8 text-[#241f20] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8c2432]">Arquitectura institucional</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-[#621b27] sm:text-5xl">Consejo Municipal de Innovación y Emprendimiento</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#766c6b]">Selecciona cualquier componente del modelo para consultar su información.</p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="rounded-[2rem] border border-[#ead9d3] bg-white px-4 py-7 shadow-[0_20px_60px_rgba(98,27,39,0.08)] sm:px-8 sm:py-10">
            {/* FIX: contenedor más alto y con más aire, igual que en Inicio */}
            <div className="relative mx-auto h-[680px] max-w-[700px] sm:h-[720px]">
              {/* Botones superiores: mismo estilo de 3 líneas que en Inicio, para que la altura
                  del bloque sea predecible y no empuje el título hacia el arco. */}
              <button
                type="button"
                aria-label="Ver Agenda Estratégica de Innovación"
                onClick={() => handleSelect('agenda')}
                className="absolute left-[3%] top-2 z-10 w-[37%] rounded-xl border border-[#d7a3a1] bg-[#fffaf8] px-3 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#8c2432] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8c2432] hover:bg-[#fff3f1] sm:text-xs"
              >
                Agenda<br />Estratégica Anual<br />del Ecosistema
              </button>
              <button
                type="button"
                aria-label="Ver Plan Municipal para el Desarrollo del Ecosistema"
                onClick={() => handleSelect('plan')}
                className="absolute right-[3%] top-2 z-10 w-[37%] rounded-xl border border-[#d7a3a1] bg-[#fffaf8] px-3 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#8c2432] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8c2432] hover:bg-[#fff3f1] sm:text-xs"
              >
                Plan Municipal<br />para el Desarrollo<br />del Ecosistema
              </button>

              {/* Arcos decorativos: más bajos y compactos para no chocar con los botones ni el título */}
              <div className="absolute left-1/2 top-[11%] h-[100px] w-[84%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#c77d80]" />
              <div className="absolute left-1/2 top-[13%] h-[100px] w-[84%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#e4b1ae]" />
              <div className="absolute left-1/2 top-[8%] h-7 w-px -translate-x-1/2 bg-[#8c2432]" />

              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 680" aria-hidden="true">
                {/* Flecha hacia "Agenda Estratégica Anual del Ecosistema" */}
                <path d="M 185 45 Q 160 25 150 4" stroke="#d39495" strokeWidth="2" fill="none" />
                <path d="M 150 0 L 142 15 L 158 15 Z" fill="#d39495" />
                {/* Flecha hacia "Plan Municipal para el Desarrollo del Ecosistema" */}
                <path d="M 515 45 Q 540 25 550 4" stroke="#d39495" strokeWidth="2" fill="none" />
                <path d="M 550 0 L 542 15 L 558 15 Z" fill="#d39495" />
              </svg>

              {/* Título central: ahora con más espacio respecto al arco, igual que en Inicio */}
              <div className="absolute left-1/2 top-[30%] w-full -translate-x-1/2 text-center text-sm font-bold leading-5 text-[#241f20] sm:text-base">Consejo Municipal de Innovación<br />y Emprendimiento</div>

              <button type="button" onClick={() => handleSelect('actores')} aria-label="Ver Actores" className={`absolute left-1/2 top-[40%] flex h-52 w-52 -translate-x-1/2 flex-col items-center justify-center rounded-full border-[3px] border-[#8c2432] bg-[#8c2432] text-white shadow-[0_14px_28px_rgba(140,36,50,0.2)] transition hover:scale-[1.02] sm:h-60 sm:w-60 ${selectedId === 'actores' ? 'ring-4 ring-[#edc7c4] ring-offset-4' : ''}`}>
                <span className="text-xs font-bold uppercase tracking-[0.28em]">Actores</span>
                <div className="mt-5 grid grid-cols-3 gap-2">{actorIcons.map((Icon, index) => <span key={index} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a94d5b] sm:h-10 sm:w-10"><Icon size={17} aria-hidden="true" /></span>)}</div>
              </button>

              <div className="absolute left-[20%] top-[70%] h-20 w-[29%] -rotate-[25deg] border-t border-[#d39495]" />
              <div className="absolute left-1/2 top-[70%] h-20 -translate-x-1/2 border-l border-[#d39495]" />
              <div className="absolute right-[20%] top-[70%] h-20 w-[29%] rotate-[25deg] border-t border-[#d39495]" />

              {[['secretaria', 'Secretaría', 'Técnica', Building2, 'left-[4%]'], ['observatorio', 'Observatorio', 'Municipal', Eye, 'left-1/2 -translate-x-1/2'], ['mesas', 'Mesas', 'Técnicas', Users, 'right-[4%]']].map(([id, line1, line2, Icon, position]) => (
                <button key={id as string} type="button" onClick={() => handleSelect(id as string)} className={`absolute ${position} top-[84%] flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#dfa0a0] bg-[#fffdfb] text-[10px] font-semibold text-[#241f20] shadow-sm transition hover:-translate-y-1 hover:bg-[#fff5f1] sm:h-28 sm:w-28 ${selectedId === id ? 'bg-[#fff0ec] ring-2 ring-[#dfa0a0] ring-offset-2' : ''}`}><Icon size={21} className="mb-2" strokeWidth={1.8} aria-hidden="true" /><span>{line1 as string}</span><span>{line2 as string}</span></button>
              ))}
            </div>
          </div>

          <aside ref={descriptionRef} className="rounded-[2rem] border border-[#ead9d3] bg-white p-6 shadow-[0_20px_60px_rgba(98,27,39,0.08)] sm:p-8" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a64b57]">Información del componente</p>
              <button
                type="button"
                onClick={() => handleArticleClick(selected.article)}
                className="whitespace-nowrap rounded-full bg-[#810100] px-3 py-1 text-[10px] font-bold text-white transition-colors hover:bg-[#630000]"
                title={`Ver ${selected.article}`}
              >
                {selected.article}
              </button>
            </div>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#621b27] sm:text-3xl">{selected.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#766c6b]">{selected.description}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><InfoBlock title="Actividades clave" items={selected.activities} /><InfoBlock title="Resultados" items={selected.results} /></div>
            <div className="mt-5 rounded-2xl bg-[#fbf5f1] p-5"><p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a64b57]">Actores involucrados</p><div className="mt-3 flex flex-wrap gap-2">{selected.actors.map((actor) => <span key={actor} className="rounded-full border border-[#ead9d3] bg-white px-3 py-1.5 text-xs text-[#5b4e4e]">{actor}</span>)}</div></div>
          </aside>
        </section>

        <nav className="mt-8 rounded-[2rem] border border-[#ead9d3] bg-white p-4 shadow-[0_12px_30px_rgba(98,27,39,0.08)] sm:p-5" aria-label="Navegación de componentes"><p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#a64b57]">Explorar arquitectura</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{ITEMS.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => handleSelect(item.id)} aria-pressed={selectedId === item.id} className={`group flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition hover:-translate-y-0.5 ${selectedId === item.id ? 'border-[#8c2432] bg-[#8c2432] text-white shadow-[0_8px_18px_rgba(140,36,50,0.22)]' : 'border-[#ead9d3] bg-[#fffdfb] text-[#4e4141] hover:border-[#c77d80] hover:bg-[#fff5f1] hover:shadow-sm'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${selectedId === item.id ? 'bg-[#a94d5b]' : 'bg-[#fbf0ec] text-[#8c2432] group-hover:bg-[#f4ddd8]'}`}><Icon size={16} aria-hidden="true" /></span><span>{item.title}</span></button> })}</div></nav>
      </div>

      {/* Modal de Artículos */}
      {isMounted && isArticleModalOpen && selectedArticle
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 sm:px-6"
              onClick={closeArticleModal}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeArticleModal}
                  aria-label="Cerrar"
                  className="sticky top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#810100] text-white shadow-lg transition hover:bg-[#630000]"
                >
                  <X size={20} />
                </button>

                <div className="p-6 sm:p-10">
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                      <Gavel size={24} className="text-[#810100]" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8c2432] mb-2">Artículos</p>
                    <h2 className="text-3xl font-black text-[#621b27] mb-2">
                      {selectedArticle.range}
                    </h2>
                    <p className="text-lg font-bold text-[#810100]">{selectedArticle.title}</p>
                    <div className="h-1 w-16 bg-[#810100] rounded-full mx-auto mt-4"></div>
                  </div>

                  {/* Contenido del artículo */}
                  <div className="space-y-6">
                    {renderArticleContent(selectedArticle.content)}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </main>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-[#f0e5e0] bg-[#fffaf7] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64b57]">{title}</p><ul className="mt-3 space-y-2 text-xs leading-5 text-[#766c6b]">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a64b57]" />{item}</li>)}</ul></div>
}

function renderArticleContent(content: string) {
  const lines = content.split('\n').filter(line => line.trim())
  const elements: JSX.Element[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // CAPÍTULO
    if (line.startsWith('CAPÍTULO')) {
      elements.push(
        <div key={`chapter-${i}`} className="py-6 text-center border-y-2 border-[#810100] bg-[#fbf0ec]">
          <p className="text-xs font-bold uppercase tracking-widest text-[#810100] mb-2">Sistema Municipal</p>
          <h3 className="text-2xl font-black text-[#621b27]">{line}</h3>
        </div>
      )
    }
    
    // TÍTULO principal (en mayúsculas, sin numeración)
    else if (line.match(/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/) && line.length > 10 && !line.includes('Artículo') && !line.startsWith('I.')) {
      elements.push(
        <div key={`title-${i}`} className="mt-6 mb-4">
          <h3 className="text-xl font-bold text-[#621b27] text-center uppercase tracking-wide">{line}</h3>
        </div>
      )
    }
    
    // Artículo (Artículo 25, Artículo 26, etc.)
    else if (line.match(/^Artículo\s+\d+/)) {
      const articleMatch = line.match(/^(Artículo\s+\d+)\.?\s*\((.*?)\)(.*)/)
      if (articleMatch) {
        elements.push(
          <div key={`article-${i}`} className="mt-6 mb-4 rounded-xl bg-gradient-to-r from-[#fbf0ec] to-[#fff5f1] p-4 border-l-4 border-[#810100]">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-[#810100] mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#810100]">{articleMatch[1]}</p>
                <h4 className="text-lg font-bold text-[#621b27]">({articleMatch[2]})</h4>
              </div>
            </div>
          </div>
        )
      }
    }
    
    // Romanos (I., II., III., etc.)
    else if (line.match(/^[IVX]+\./)) {
      elements.push(
        <div key={`roman-${i}`} className="mt-4 ml-4 pl-4 border-l-2 border-[#dfa0a0]">
          <p className="text-sm leading-7 text-[#441f25]">
            <span className="font-bold text-[#810100]">{line.substring(0, line.indexOf('.') + 1)}</span>
            {line.substring(line.indexOf('.') + 1)}
          </p>
        </div>
      )
    }
    
    // Letras (a), b), c), etc.)
    else if (line.match(/^[a-z]\)/)) {
      elements.push(
        <div key={`letter-${i}`} className="mt-2 ml-8">
          <p className="text-sm leading-7 text-[#441f25]">
            <span className="font-bold text-[#810100]">{line.substring(0, line.indexOf(')') + 1)}</span>
            {line.substring(line.indexOf(')') + 1)}
          </p>
        </div>
      )
    }
    
    // Texto normal
    else if (line.length > 0) {
      elements.push(
        <p key={`text-${i}`} className="text-sm leading-7 text-[#441f25]">
          {line}
        </p>
      )
    }
  }
  
  return elements
}