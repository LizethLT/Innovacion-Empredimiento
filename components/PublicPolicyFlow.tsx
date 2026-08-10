'use client'

import { ArrowRight } from 'lucide-react'

export default function PublicPolicyFlow() {
  const stages = [
    {
      number: '1',
      title: 'Diagnóstico',
      description: 'Análisis de la situación actual del ecosistema',
      details: ['Investigación', 'Consulta ciudadana', 'Evaluación de necesidades']
    },
    {
      number: '2',
      title: 'Formulación',
      description: 'Diseño de políticas y estrategias',
      details: ['Propuestas', 'Validación técnica', 'Consenso']
    },
    {
      number: '3',
      title: 'Implementación',
      description: 'Ejecución de programas y proyectos',
      details: ['Asignación de recursos', 'Ejecución', 'Seguimiento']
    },
    {
      number: '4',
      title: 'Evaluación',
      description: 'Medición de resultados e impacto',
      details: ['Indicadores', 'Evaluación', 'Aprendizajes']
    },
    {
      number: '5',
      title: 'Retroalimentación',
      description: 'Ajustes y mejora continua',
      details: ['Análisis', 'Ajustes', 'Rediseño']
    },
  ]

  return (
    <section className="bg-[#fbf8f3] px-4 py-20 text-[#241d1d]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a1f2b]">
            Proceso institucional
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-[#5b0f18] sm:text-5xl">
            Ciclo de Política Pública
          </h2>
          <p className="text-lg text-[#6f6565] max-w-3xl">
            Proceso sistemático para la formulación, implementación y evaluación de políticas.
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:grid grid-cols-5 gap-6 mb-12 relative">
          {stages.map((stage, index) => (
            <div key={index} className="relative flex flex-col">
              <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-[#5b0f18] to-[#7a1f2b] p-6 text-white shadow-sm">
                <div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-[#241d1d] shadow-sm">
                    {stage.number}
                  </div>
                  <h3 className="mb-2 text-center font-bold text-lg">{stage.title}</h3>
                  <p className="mb-4 text-center text-sm text-[#f8f1e7]">{stage.description}</p>
                </div>
                <ul className="space-y-1.5 border-t border-white/20 pt-3 text-xs">
                  {stage.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[#f8f1e7]">
                      <span className="h-1 w-1 rounded-full bg-[#f8f1e7]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Flecha conectora ajustada */}
              {index < stages.length - 1 && (
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#dec7c2] shadow-sm">
                  <ArrowRight className="text-[#7a1f2b]" size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-4 mb-12">
          {stages.map((stage, index) => (
            <div key={index} className="rounded-2xl bg-gradient-to-br from-[#5b0f18] to-[#7a1f2b] p-6 text-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#241d1d]">
                  {stage.number}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-bold text-lg">{stage.title}</h3>
                  <p className="mb-3 text-sm text-[#f8f1e7]">{stage.description}</p>
                  <ul className="space-y-1 text-xs">
                    {stage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[#f8f1e7]">
                        <span className="h-1 w-1 rounded-full bg-[#f8f1e7]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[#dec7c2] bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold text-[#5b0f18]">Participación Continua</h4>
            <p className="text-sm text-[#6f6565]">En cada etapa se consulta y valida con actores relevantes.</p>
          </div>
          <div className="rounded-2xl border border-[#dec7c2] bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold text-[#5b0f18]">Basada en Evidencia</h4>
            <p className="text-sm text-[#6f6565]">Decisiones fundamentadas en datos e investigación.</p>
          </div>
          <div className="rounded-2xl border border-[#dec7c2] bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold text-[#5b0f18]">Mejora Continua</h4>
            <p className="text-sm text-[#6f6565]">Aprendizaje y adaptación permanente a nuevas realidades.</p>
          </div>
        </div>
      </div>
    </section>
  )
}