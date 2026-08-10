'use client'

import { useRef, useState } from 'react'
import { Building2, Briefcase, Eye, GraduationCap, Handshake, Lightbulb, MapPin, Target, Users } from 'lucide-react'

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
  const selected = ITEMS.find((item) => item.id === selectedId) ?? ITEMS[0]

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
    <main className="min-h-screen bg-[#fbfaf8] px-4 py-8 text-[#241f20] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8c2432]">Arquitectura institucional</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-[#621b27] sm:text-5xl">Consejo Municipal de Innovación y Emprendimiento</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#766c6b]">Selecciona cualquier componente del modelo para consultar su información.</p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="rounded-[2rem] border border-[#ead9d3] bg-white px-4 py-7 shadow-[0_20px_60px_rgba(98,27,39,0.08)] sm:px-8 sm:py-10">
            <div className="relative mx-auto h-[600px] max-w-[700px] sm:h-[650px]">
              <button type="button" aria-label="Ver Agenda Estratégica de Innovación" onClick={() => handleSelect('agenda')} className="absolute left-[5%] top-2 z-10 max-w-[38%] -rotate-[25deg] text-left text-[10px] leading-4 text-[#8c2432] no-underline transition hover:text-[#621b27] sm:text-xs">Agenda Estratégica Anual del Ecosistema</button>
              <button type="button" aria-label="Ver Plan Municipal para el Desarrollo del Ecosistema" onClick={() => handleSelect('plan')} className="absolute right-[3%] top-2 z-10 max-w-[42%] rotate-[25deg] text-right text-[10px] leading-4 text-[#8c2432] no-underline transition hover:text-[#621b27] sm:text-xs">Plan Municipal para el Desarrollo del Ecosistema</button>
              <div className="absolute left-1/2 top-5 h-[185px] w-[88%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#c77d80]"
              /><div className="absolute left-1/2 top-8 h-[185px] w-[88%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#e4b1ae]" />
              <div className="absolute left-1/2 top-1 h-3 w-px -translate-x-1/2 bg-[#8c2432]" />

              <div className="absolute left-1/2 top-[17%] w-full -translate-x-1/2 text-center text-sm font-bold leading-5 text-[#241f20] sm:text-base">Consejo Municipal de Innovación<br />y Emprendimiento</div>

              <button type="button" onClick={() => handleSelect('actores')} aria-label="Ver Actores" className={`absolute left-1/2 top-[29%] flex h-52 w-52 -translate-x-1/2 flex-col items-center justify-center rounded-full border-[3px] border-[#8c2432] bg-[#8c2432] text-white shadow-[0_14px_28px_rgba(140,36,50,0.2)] transition hover:scale-[1.02] sm:h-60 sm:w-60 ${selectedId === 'actores' ? 'ring-4 ring-[#edc7c4] ring-offset-4' : ''}`}>
                <span className="text-xs font-bold uppercase tracking-[0.28em]">Actores</span>
                <div className="mt-5 grid grid-cols-3 gap-2">{actorIcons.map((Icon, index) => <span key={index} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a94d5b] sm:h-10 sm:w-10"><Icon size={17} aria-hidden="true" /></span>)}</div>
              </button>

              <div className="absolute left-[20%] top-[65%] h-20 w-[29%] -rotate-[25deg] border-t border-[#d39495]" />
              <div className="absolute left-1/2 top-[65%] h-20 -translate-x-1/2 border-l border-[#d39495]" />
              <div className="absolute right-[20%] top-[65%] h-20 w-[29%] rotate-[25deg] border-t border-[#d39495]" />

              {[['secretaria', 'Secretaría', 'Técnica', Building2, 'left-[4%]'], ['observatorio', 'Observatorio', 'Municipal', Eye, 'left-1/2 -translate-x-1/2'], ['mesas', 'Mesas', 'Técnicas', Users, 'right-[4%]']].map(([id, line1, line2, Icon, position]) => (
                <button key={id as string} type="button" onClick={() => handleSelect(id as string)} className={`absolute ${position} top-[79%] flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#dfa0a0] bg-[#fffdfb] text-[10px] font-semibold text-[#241f20] shadow-sm transition hover:-translate-y-1 hover:bg-[#fff5f1] sm:h-28 sm:w-28 ${selectedId === id ? 'bg-[#fff0ec] ring-2 ring-[#dfa0a0] ring-offset-2' : ''}`}><Icon size={21} className="mb-2" strokeWidth={1.8} aria-hidden="true" /><span>{line1 as string}</span><span>{line2 as string}</span></button>
              ))}
            </div>
          </div>

          <aside ref={descriptionRef} className="rounded-[2rem] border border-[#ead9d3] bg-white p-6 shadow-[0_20px_60px_rgba(98,27,39,0.08)] sm:p-8" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a64b57]">Información del componente</p>
              <span className="whitespace-nowrap rounded-full bg-[#fbf0ec] px-3 py-1 text-[10px] font-bold text-[#8c2432]">{selected.article}</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#621b27] sm:text-3xl">{selected.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#766c6b]">{selected.description}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><InfoBlock title="Actividades clave" items={selected.activities} /><InfoBlock title="Resultados" items={selected.results} /></div>
            <div className="mt-5 rounded-2xl bg-[#fbf5f1] p-5"><p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a64b57]">Actores involucrados</p><div className="mt-3 flex flex-wrap gap-2">{selected.actors.map((actor) => <span key={actor} className="rounded-full border border-[#ead9d3] bg-white px-3 py-1.5 text-xs text-[#5b4e4e]">{actor}</span>)}</div></div>
          </aside>
        </section>

        <nav className="mt-8 rounded-[2rem] border border-[#ead9d3] bg-white p-4 shadow-[0_12px_30px_rgba(98,27,39,0.08)] sm:p-5" aria-label="Navegación de componentes"><p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#a64b57]">Explorar arquitectura</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{ITEMS.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => handleSelect(item.id)} aria-pressed={selectedId === item.id} className={`group flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition hover:-translate-y-0.5 ${selectedId === item.id ? 'border-[#8c2432] bg-[#8c2432] text-white shadow-[0_8px_18px_rgba(140,36,50,0.22)]' : 'border-[#ead9d3] bg-[#fffdfb] text-[#4e4141] hover:border-[#c77d80] hover:bg-[#fff5f1] hover:shadow-sm'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${selectedId === item.id ? 'bg-[#a94d5b]' : 'bg-[#fbf0ec] text-[#8c2432] group-hover:bg-[#f4ddd8]'}`}><Icon size={16} aria-hidden="true" /></span><span>{item.title}</span></button> })}</div></nav>
      </div>
    </main>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-[#f0e5e0] bg-[#fffaf7] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a64b57]">{title}</p><ul className="mt-3 space-y-2 text-xs leading-5 text-[#766c6b]">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a64b57]" />{item}</li>)}</ul></div>
}