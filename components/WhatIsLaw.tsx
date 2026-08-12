'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Award,
  Briefcase,
  Building2,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  Target,
  Users,
  X,
  Zap,
  Rocket,
  ScrollText,
  ArrowUpRight,
} from 'lucide-react'

const PDF_PATH = '/docs/Ley Innovacion y emprendedurismo FINAL.pdf'
const PDF_COVER_IMAGE = ''

const lawInfo = [
  {
    id: 'que-es',
    icon: Lightbulb,
    title: 'Qué es esta Ley',
    caption: 'Un marco normativo para la innovación y el conocimiento en Tarija.',
    description:
      'Establece las bases para un ecosistema municipal de innovación, creatividad, emprendimiento y economía del conocimiento que articula actores y políticas públicas.',
  },
  {
    id: 'para-quien',
    icon: Users,
    title: 'Para quién es',
    caption: 'Para ciudadanía, empresas, universidades y gobierno.',
    description:
      'Busca beneficiar a emprendedores, instituciones académicas, sector público y comunidades locales mediante acciones colaborativas y proyectos estratégicos.',
  },
  {
    id: 'por-que',
    icon: Building2,
    title: 'Por qué existe',
    caption: 'Porque Tarija necesita un modelo de desarrollo integral.',
    description:
      'Necesita consolidar capacidades, atraer inversión y transformar el talento local en oportunidades productivas con continuidad y sostenibilidad.',
  },
  {
    id: 'cómo-funciona',
    icon: Handshake,
    title: 'Cómo funciona',
    caption: 'Con mesas técnicas, observatorio y gobierno colaborativo.',
    description:
      'Activa una gobernanza basada en la coordinación entre Secretaría Técnica, Observatorio Municipal, Mesas Técnicas y actores del ecosistema.',
  },
]

// Cada beneficio incluye "action" (cómo se accede / cómo funciona en la práctica),
// que es el texto que se muestra en el modal ampliado.
const benefits = [
  {
    id: 'oportunidades',
    icon: Rocket,
    title: 'Más oportunidades para emprender',
    tag: 'Cómo acceder',
    description:
      'Accede a programas, convocatorias y desafíos que facilitan la creación y crecimiento de emprendimientos a nivel local.',
    action:
      'A través de convocatorias públicas organizadas por la Secretaría Técnica, cualquier emprendedor puede presentar su idea o proyecto y competir por financiamiento semilla, mentorías especializadas y espacios de incubación dentro del ecosistema municipal.',
  },
  {
    id: 'empleo',
    icon: Briefcase,
    title: 'Más empleo y desarrollo económico',
    tag: 'Cómo funciona',
    description:
      'Genera nuevas inversiones y empleos de mayor calidad mediante apoyo a proyectos innovadores y sostenibles.',
    action:
      'El municipio impulsa alianzas entre empresas, inversionistas y los proyectos que pasan por los programas de innovación, priorizando la contratación de mano de obra y talento local a medida que esos proyectos crecen.',
  },
  {
    id: 'formacion',
    icon: GraduationCap,
    title: 'Formación para el futuro',
    tag: 'Cómo acceder',
    description:
      'Impulsa la capacitación, investigación y desarrollo de habilidades que preparan a la población para el futuro.',
    action:
      'Mediante convenios con universidades y las Mesas Técnicas, se organizan talleres, diplomados y programas de capacitación en habilidades digitales, gestión de proyectos e innovación, abiertos a estudiantes y a la ciudadanía en general.',
  },
  {
    id: 'innovacion',
    icon: Lightbulb,
    title: 'Innovación para resolver problemas',
    tag: 'Cómo funciona',
    description:
      'Fomenta soluciones creativas entre ciudadanos, empresas y gobierno para enfrentar desafíos locales.',
    action:
      'El Observatorio Municipal identifica problemas concretos del municipio —movilidad, medio ambiente, servicios públicos— y los convierte en retos abiertos que ciudadanos, empresas y estudiantes pueden resolver mediante proyectos de innovación.',
  },
  {
    id: 'tecnologia',
    icon: MapPin,
    title: 'Acceso a tecnología y nuevos espacios',
    tag: 'Cómo acceder',
    description:
      'Facilita el acceso a laboratorios, talleres y plataformas digitales para convertir ideas en proyectos reales.',
    action:
      'Podrás inscribirte para usar laboratorios de fabricación digital, talleres de prototipado y plataformas tecnológicas habilitadas por el municipio, donde una idea se convierte en un producto o servicio funcional.',
  },
  {
    id: 'sostenible',
    icon: Target,
    title: 'Desarrollo sostenible',
    tag: 'Cómo funciona',
    description:
      'Promueve un crecimiento responsable que mejora la calidad de vida y protege el entorno para las futuras generaciones.',
    action:
      'Todo proyecto financiado o promovido bajo esta Ley debe cumplir criterios de sostenibilidad ambiental y social, priorizando iniciativas que reduzcan el impacto ambiental y mejoren la calidad de vida de la población.',
  },
  {
    id: 'gobierno',
    icon: Building2,
    title: 'Un Gobierno más moderno e innovador',
    tag: 'Cómo funciona',
    description:
      'Fortalece la planificación, la coordinación institucional y la toma de decisiones basadas en evidencia.',
    action:
      'A través del Observatorio Municipal, las decisiones de gobierno se apoyan en datos actualizados y en la coordinación entre secretarías, lo que agiliza trámites y mejora la planificación del desarrollo local.',
  },
  {
    id: 'colaboracion',
    icon: Handshake,
    title: 'Más colaboración entre instituciones',
    tag: 'Cómo funciona',
    description:
      'Integra Gobierno, universidades, empresas y organizaciones para trabajar juntos en objetivos comunes.',
    action:
      'Las Mesas Técnicas reúnen periódicamente a representantes del Gobierno Municipal, universidades, empresas y organizaciones sociales para coordinar proyectos conjuntos y evitar que se dupliquen esfuerzos.',
  },
  {
    id: 'tarija',
    icon: Globe2,
    title: 'Más oportunidades para Tarija',
    tag: 'Cómo funciona',
    description:
      'Conecta al municipio con redes nacionales e internacionales para innovación, inversión y conocimiento.',
    action:
      'La Secretaría Técnica gestiona alianzas con redes de innovación nacionales e internacionales, abriendo la puerta para que proyectos tarijeños accedan a cooperación, inversión extranjera y mayor visibilidad fuera del municipio.',
  },
  {
    id: 'valor',
    icon: Award,
    title: 'Más valor para lo que produce Tarija',
    tag: 'Cómo funciona',
    description:
      'Impulsa la innovación en sectores estratégicos como cultura, turismo, producción y activos territoriales.',
    action:
      'Se priorizan programas de innovación aplicados a los sectores propios de Tarija —vitivinicultura, turismo, producción agropecuaria y cultura— para agregar valor a lo que el municipio ya produce.',
  },
  {
    id: 'inclusion',
    icon: Users,
    title: 'Más inclusión y participación',
    tag: 'Cómo acceder',
    description:
      'Genera oportunidades para jóvenes, mujeres y ciudadanos en la construcción del ecosistema de innovación.',
    action:
      'Las convocatorias del ecosistema de innovación incluyen cupos y condiciones preferenciales para jóvenes, mujeres emprendedoras y grupos con menor acceso a oportunidades, para asegurar una participación equitativa.',
  },
  {
    id: 'futuro',
    icon: Zap,
    title: 'Un municipio preparado para el futuro',
    tag: 'Cómo funciona',
    description:
      'Define una visión de largo plazo con programas e instrumentos para un ecosistema más sólido y sostenible.',
    action:
      'La Ley establece instrumentos de planificación de largo plazo y evaluación continua a través del Observatorio Municipal, garantizando que el ecosistema de innovación se sostenga más allá de una sola gestión de gobierno.',
  },
]

// Todo el movimiento de este archivo usa transiciones normales de Tailwind
// (transition + duration + delay), sin @keyframes ni styled-jsx: menos CSS
// que generar y menos trabajo para el compilador en cada guardado.
const CLOSE_ANIM_MS = 150

export default function WhatIsLaw() {
  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const [pdfVisible, setPdfVisible] = useState(false)
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null)
  const [benefitVisible, setBenefitVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const selectedBenefit = benefits.find((b) => b.id === selectedBenefitId) ?? null

  useEffect(() => setMounted(true), [])

  const openPdf = () => {
    setIsPdfOpen(true)
    requestAnimationFrame(() => setPdfVisible(true))
  }
  const closePdf = () => {
    setPdfVisible(false)
    window.setTimeout(() => setIsPdfOpen(false), CLOSE_ANIM_MS)
  }

  const openBenefit = (id: string) => {
    setSelectedBenefitId(id)
    requestAnimationFrame(() => setBenefitVisible(true))
  }
  const closeBenefit = () => {
    setBenefitVisible(false)
    window.setTimeout(() => setSelectedBenefitId(null), CLOSE_ANIM_MS)
  }

  useEffect(() => {
    document.body.style.overflow = isPdfOpen || selectedBenefitId ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isPdfOpen, selectedBenefitId])

  useEffect(() => {
    if (!selectedBenefitId) return
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && closeBenefit()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedBenefitId])

  const pdfModal = (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-150 ${
        pdfVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      onClick={closePdf}
    >
      <div
        className={`relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ${
          pdfVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePdf}
          aria-label="Cerrar documento"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1E1E1E] shadow-md transition hover:bg-white hover:text-[#7A1F2B]"
        >
          <X size={20} />
        </button>
        <iframe
          src={`${PDF_PATH}#view=FitH`}
          className="h-full w-full"
          title="Proyecto de Ley - Innovación Tarija"
        />
      </div>
    </div>
  )

  const benefitModal = selectedBenefit ? (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-150 ${
        benefitVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      onClick={closeBenefit}
    >
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl transition-all duration-200 ${
          benefitVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] px-8 pb-10 pt-8 text-white">
          <button
            type="button"
            onClick={closeBenefit}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <X size={18} />
          </button>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <selectedBenefit.icon size={30} aria-hidden="true" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Beneficio para la población
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-snug">{selectedBenefit.title}</h3>
        </div>

        <div className="px-8 py-7">
          <p className="text-base leading-relaxed text-gray-700">{selectedBenefit.description}</p>

          <div className="mt-6 rounded-2xl border border-[#D8A7A7] bg-[#F8F1E7] p-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5B0F18]">
              {selectedBenefit.tag}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-[#3a2020]">{selectedBenefit.action}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center">
          <button
            type="button"
            onClick={openPdf}
            className="group relative mx-auto block w-full max-w-[280px] focus:outline-none"
            aria-label="Ver el proyecto de Ley completo"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#D8A7A7] bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
              {PDF_COVER_IMAGE ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PDF_COVER_IMAGE}
                  alt="Portada del proyecto de Ley"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-center rounded-xl bg-white/10 p-3">
                    <ScrollText size={32} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      Proyecto de Ley Municipal
                    </p>
                    <p className="mt-2 text-lg font-bold leading-snug">
                      Innovación, Creatividad, Emprendimiento y Economía del Conocimiento
                    </p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                    Municipio de Tarija
                  </p>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#5B0F18] shadow">
                  <FileText size={16} aria-hidden="true" />
                  Ver documento
                </span>
              </div>
            </div>
          </button>

          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-[#1E1E1E]">¿Qué es esta Ley?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              La Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento establece un marco legal para transformar Tarija mediante la innovación, la cooperación y el desarrollo sostenible.
            </p>
            <button
              type="button"
              onClick={openPdf}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5B0F18] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7A1F2B]"
            >
              <FileText size={18} aria-hidden="true" />
              Ver el proyecto de Ley completo
            </button>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {lawInfo.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="rounded-[1.75rem] border border-[#D8A7A7] bg-[#fcfbf8] p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F8F1E7] text-[#5B0F18]">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1E1E1E]">{item.title}</h3>
                <p className="mt-3 text-sm text-[#5B0F18] font-semibold">{item.caption}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            )
          })}
        </div>

        <div className="rounded-[2rem] border border-[#D8A7A7] bg-[#fffdfb] p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#E6F4E8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#2B5B2F]">
                Beneficios para la población
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#1E1E1E]">¿Cómo mejora esta Ley tu vida?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                Explora los beneficios que trae la Ley en educación, empleo, tecnología, colaboración y sostenibilidad. Haz clic en cualquier tarjeta para ver el detalle.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <button
                  key={benefit.id}
                  type="button"
                  onClick={() => openBenefit(benefit.id)}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#D8A7A7] bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7A1F2B] hover:shadow-lg"
                >
                  {/* Resplandor de color que aparece detrás al pasar el cursor */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#7A1F2B]/25 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-100 group-hover:scale-125"
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F8F1E7] text-[#5B0F18] transition-colors duration-200 group-hover:bg-[#7A1F2B] group-hover:text-white">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 text-[#D8A7A7] opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#7A1F2B] group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="relative mt-5 text-base font-semibold text-[#1E1E1E]">{benefit.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-gray-600">{benefit.description}</p>
                  <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5B0F18]">
                    {benefit.tag}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {isPdfOpen && mounted ? createPortal(pdfModal, document.body) : null}
      {selectedBenefitId && mounted ? createPortal(benefitModal, document.body) : null}
    </section>
  )
}