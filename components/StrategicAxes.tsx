'use client'

import { Rocket, Code, Users, TrendingUp, Lightbulb, Globe } from 'lucide-react'

export default function StrategicAxes() {
  const axes = [
    {
      icon: Rocket,
      number: '01',
      title: 'Emprendimiento e Innovación',
      description: 'Desarrollo de nuevos modelos de negocio basados en innovación y creatividad que generen valor y empleo',
      initiatives: ['Incubación de empresas', 'Aceleración de startups', 'Mentoría empresarial']
    },
    {
      icon: Code,
      number: '02',
      title: 'Transformación Digital',
      description: 'Adopción de tecnologías digitales para mejorar procesos, servicios y competitividad',
      initiatives: ['Infraestructura tecnológica', 'Capacitación digital', 'Conectividad']
    },
    {
      icon: Users,
      number: '03',
      title: 'Talento y Capital Humano',
      description: 'Formación y retención de talento especializado en economía del conocimiento',
      initiatives: ['Programas de capacitación', 'Becas y financiamiento', 'Atracción de talentos']
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Crecimiento Económico',
      description: 'Generación de empleo de calidad y diversificación de la base económica municipal',
      initiatives: ['Atracción de inversión', 'Asistencia a pequeñas empresas', 'Mercados de oportunidad']
    },
    {
      icon: Lightbulb,
      number: '05',
      title: 'Investigación y Desarrollo',
      description: 'Promoción de I+D para generar conocimiento y soluciones innovadoras',
      initiatives: ['Centros de investigación', 'Transferencia tecnológica', 'Colaboración académica']
    },
    {
      icon: Globe,
      number: '06',
      title: 'Integración Regional',
      description: 'Articulación con ecosistemas de innovación de otras regiones y países',
      initiatives: ['Redes de colaboración', 'Intercambio de experiencias', 'Cooperación internacional']
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Ejes Estratégicos</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Pilares fundamentales que orientan la implementación de la Ley y el desarrollo del ecosistema
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {axes.map((axis, index) => {
            const Icon = axis.icon
            return (
              <div
                key={index}
                className="bg-white border border-[#D8A7A7] rounded-lg p-6 hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] rounded-lg flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-3xl font-bold text-[#D8A7A7]">{axis.number}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">{axis.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{axis.description}</p>
                <div className="space-y-2">
                  {axis.initiatives.map((init, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#7A1F2B] rounded-full"></div>
                      <span className="text-xs text-gray-700">{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Integration */}
        <div className="mt-12 bg-white border-2 border-[#7A1F2B] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">Visión Integrada</h3>
          <p className="text-gray-700 mb-6">
            Estos ejes estratégicos funcionan de manera integrada para crear un ecosistema robusto donde la innovación, el emprendimiento y el conocimiento son los motores del desarrollo municipal.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] text-white p-4 rounded-lg">
              <p className="font-bold mb-2">Sinergia</p>
              <p className="text-sm">Las iniciativas se potencian mutuamente para mayor impacto</p>
            </div>
            <div className="bg-gradient-to-br from-[#7A1F2B] to-[#5B0F18] text-white p-4 rounded-lg">
              <p className="font-bold mb-2">Continuidad</p>
              <p className="text-sm">Políticas de largo plazo que trascienden gobiernos</p>
            </div>
            <div className="bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] text-white p-4 rounded-lg">
              <p className="font-bold mb-2">Participación</p>
              <p className="text-sm">Involucramiento de todos los actores del ecosistema</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
