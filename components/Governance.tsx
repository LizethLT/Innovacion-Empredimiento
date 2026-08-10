'use client'

import { Shield, CheckCircle, AlertCircle, Award } from 'lucide-react'

export default function Governance() {
  const principles = [
    {
      icon: Shield,
      title: 'Seguridad Jurídica',
      description: 'Marco legal claro y predecible para todos los actores del ecosistema'
    },
    {
      icon: CheckCircle,
      title: 'Cumplimiento Normativo',
      description: 'Adherencia a principios constitucionales y legales vigentes'
    },
    {
      icon: AlertCircle,
      title: 'Fiscalización',
      description: 'Mecanismos de control y auditoría del cumplimiento de objetivos'
    },
    {
      icon: Award,
      title: 'Reconocimiento',
      description: 'Incentivos y reconocimientos para actores que generan impacto'
    },
  ]

  const bodies = [
    {
      name: 'Consejo Municipal de Innovación',
      composition: 'Representantes del sector público, privado, académico y sociedad civil',
      functions: ['Definir estrategia', 'Aprobar políticas', 'Resolver conflictos', 'Evaluar resultados']
    },
    {
      name: 'Secretaría de Innovación',
      composition: 'Equipo técnico multidisciplinario',
      functions: ['Ejecutar decisiones', 'Gestionar recursos', 'Coordinar iniciativas', 'Reportar avances']
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Gobernanza</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Principios y mecanismos que garantizan una gestión efectiva, transparente y participativa
          </p>
        </div>

        {/* Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-[#F8F1E7] border border-[#D8A7A7] rounded-lg p-6 hover:border-[#7A1F2B] transition-colors"
              >
                <div className="w-10 h-10 bg-[#7A1F2B] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-[#1E1E1E] mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.description}</p>
              </div>
            )
          })}
        </div>

        {/* Governance Bodies */}
        <div className="space-y-6">
          {bodies.map((body, index) => (
            <div key={index} className="border-l-4 border-[#7A1F2B] bg-[#F8F1E7] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">{body.name}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-[#5B0F18] mb-2">COMPOSICIÓN</p>
                  <p className="text-gray-700">{body.composition}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#5B0F18] mb-2">FUNCIONES PRINCIPALES</p>
                  <ul className="space-y-1">
                    {body.functions.map((func, idx) => (
                      <li key={idx} className="text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#7A1F2B] rounded-full"></span>
                        {func}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Making Process */}
        <div className="mt-12 bg-white border-2 border-[#5B0F18] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Proceso de Toma de Decisiones</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {['Propuesta', 'Análisis', 'Debate', 'Votación', 'Ejecución'].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 w-full md:w-auto">
                <div className="w-8 h-8 bg-[#7A1F2B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold text-[#1E1E1E]">{step}</span>
                {idx < 4 && <div className="hidden md:block flex-1 h-0.5 bg-[#D8A7A7] mx-2"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
