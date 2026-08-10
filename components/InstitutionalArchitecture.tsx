'use client'

import { Building2, Users, Target, Network } from 'lucide-react'

export default function InstitutionalArchitecture() {
  const components = [
    {
      icon: Building2,
      title: 'Municipalidad de Tarija',
      description: 'Ente rector y articulador del ecosistema de innovación municipal',
      responsibilities: ['Regulación', 'Coordinación', 'Fiscalización']
    },
    {
      icon: Users,
      title: 'Consejo Municipal de Innovación',
      description: 'Órgano colegiado de decisión y dirección estratégica',
      responsibilities: ['Planificación', 'Evaluación', 'Aprobación']
    },
    {
      icon: Network,
      title: 'Secretaría de Innovación',
      description: 'Unidad técnica ejecutiva encargada de la implementación',
      responsibilities: ['Ejecución', 'Monitoreo', 'Administración']
    },
    {
      icon: Target,
      title: 'Comités Especializados',
      description: 'Grupos temáticos para áreas específicas del ecosistema',
      responsibilities: ['Asesoría', 'Seguimiento', 'Propuestas']
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Arquitectura Institucional</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Estructura organizacional diseñada para asegurar la coordinación y efectividad en la implementación de la Ley
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {components.map((comp, index) => {
            const Icon = comp.icon
            return (
              <div
                key={index}
                className="bg-white border border-[#D8A7A7] rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">{comp.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{comp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {comp.responsibilities.map((resp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F8F1E7] text-[#5B0F18] text-xs font-semibold rounded-full">
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Governance Model */}
        <div className="mt-12 bg-white border-2 border-[#7A1F2B] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Modelo de Gobernanza</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#7A1F2B] rounded-full"></div>
              <p className="text-gray-700"><span className="font-bold text-[#1E1E1E]">Participativa:</span> Inclusión de todos los actores del ecosistema</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#7A1F2B] rounded-full"></div>
              <p className="text-gray-700"><span className="font-bold text-[#1E1E1E]">Transparente:</span> Acceso a información pública y rendición de cuentas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#7A1F2B] rounded-full"></div>
              <p className="text-gray-700"><span className="font-bold text-[#1E1E1E]">Efectiva:</span> Coordinación entre instituciones públicas y privadas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#7A1F2B] rounded-full"></div>
              <p className="text-gray-700"><span className="font-bold text-[#1E1E1E]">Sostenible:</span> Recursos y mecanismos de financiamiento permanentes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
