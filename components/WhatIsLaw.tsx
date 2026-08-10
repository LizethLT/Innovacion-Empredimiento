'use client'

import { useRef, useState } from 'react'
import {
  Award,
  Briefcase,
  Building2,
  Globe2,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  Palette,
  Rocket,
  Target,
  Users,
  Zap,
} from 'lucide-react'

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

const benefits = [
  {
    id: 'oportunidades',
    icon: Rocket,
    title: 'Más oportunidades para emprender',
    description:
      'Accede a programas, convocatorias y desafíos que facilitan la creación y crecimiento de emprendimientos a nivel local.',
  },
  {
    id: 'empleo',
    icon: Briefcase,
    title: 'Más empleo y desarrollo económico',
    description:
      'Genera nuevas inversiones y empleos de mayor calidad mediante apoyo a proyectos innovadores y sostenibles.',
  },
  {
    id: 'formacion',
    icon: GraduationCap,
    title: 'Formación para el futuro',
    description:
      'Impulsa la capacitación, investigación y desarrollo de habilidades que preparan a la población para el futuro.',
  },
  {
    id: 'innovacion',
    icon: Lightbulb,
    title: 'Innovación para resolver problemas',
    description:
      'Fomenta soluciones creativas entre ciudadanos, empresas y gobierno para enfrentar desafíos locales.',
  },
  {
    id: 'tecnologia',
    icon: MapPin,
    title: 'Acceso a tecnología y nuevos espacios',
    description:
      'Facilita el acceso a laboratorios, talleres y plataformas digitales para convertir ideas en proyectos reales.',
  },
  {
    id: 'sostenible',
    icon: Target,
    title: 'Desarrollo sostenible',
    description:
      'Promueve un crecimiento responsable que mejora la calidad de vida y protege el entorno para las futuras generaciones.',
  },
  {
    id: 'gobierno',
    icon: Building2,
    title: 'Un Gobierno más moderno e innovador',
    description:
      'Fortalece la planificación, la coordinación institucional y la toma de decisiones basadas en evidencia.',
  },
  {
    id: 'colaboracion',
    icon: Handshake,
    title: 'Más colaboración entre instituciones',
    description:
      'Integra Gobierno, universidades, empresas y organizaciones para trabajar juntos en objetivos comunes.',
  },
  {
    id: 'tarija',
    icon: Globe2,
    title: 'Más oportunidades para Tarija',
    description:
      'Conecta al municipio con redes nacionales e internacionales para innovación, inversión y conocimiento.',
  },
  {
    id: 'valor',
    icon: Award,
    title: 'Más valor para lo que produce Tarija',
    description:
      'Impulsa la innovación en sectores estratégicos como cultura, turismo, producción y activos territoriales.',
  },
  {
    id: 'inclusion',
    icon: Users,
    title: 'Más inclusión y participación',
    description:
      'Genera oportunidades para jóvenes, mujeres y ciudadanos en la construcción del ecosistema de innovación.',
  },
  {
    id: 'futuro',
    icon: Zap,
    title: 'Un municipio preparado para el futuro',
    description:
      'Define una visión de largo plazo con programas e instrumentos para un ecosistema más sólido y sostenible.',
  },
]

export default function WhatIsLaw() {
  const [selectedBenefitId, setSelectedBenefitId] = useState(benefits[0].id)
  const benefitRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const handleBenefitClick = (id: string) => {
    setSelectedBenefitId(id)
    benefitRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6 mb-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-[#1E1E1E]">¿Qué es esta Ley?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              La Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento establece un marco legal para transformar Tarija mediante la innovación, la cooperación y el desarrollo sostenible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        </div>

        <div className="rounded-[2rem] border border-[#D8A7A7] bg-[#fffdfb] p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#E6F4E8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#2B5B2F]">
                Beneficios para la población
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#1E1E1E]">¿Cómo mejora esta Ley tu vida?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                Explora los beneficios que trae la Ley en educación, empleo, tecnología, colaboración y sostenibilidad.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 items-start">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              const isSelected = benefit.id === selectedBenefitId
              return (
                <button
                  key={benefit.id}
                  type="button"
                  ref={(element) => {
                    benefitRefs.current[benefit.id] = element
                  }}
                  onClick={() => handleBenefitClick(benefit.id)}
                  className={`group rounded-[1.5rem] border p-6 text-left transition ${
                    isSelected
                      ? 'border-[#7A1F2B] bg-[#F8F1E7] shadow-lg'
                      : 'border-[#D8A7A7] bg-white hover:border-[#7A1F2B] hover:bg-[#f8f1e7]'
                  }`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${
                    isSelected ? 'bg-[#7A1F2B] text-white' : 'bg-[#F8F1E7] text-[#5B0F18]'
                  }`}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[#1E1E1E]">{benefit.title}</h3>
                  {isSelected ? (
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">{benefit.description}</p>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
