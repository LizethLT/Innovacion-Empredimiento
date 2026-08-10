'use client'

import { Play } from 'lucide-react'

export default function Videos() {
  const videos = [
    {
      title: 'Introducción a la Ley Municipal',
      description: 'Visión general de los objetivos y alcances de la Ley',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B]',
      duration: '8:45'
    },
    {
      title: 'Arquitectura Institucional',
      description: 'Estructura y funciones de los órganos de gobernanza',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#5B0F18]',
      duration: '12:30'
    },
    {
      title: 'Oportunidades para Emprendedores',
      description: 'Cómo la Ley beneficia a startups y emprendimientos',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#1E1E1E]',
      duration: '10:15'
    },
    {
      title: 'Transformación Digital en Tarija',
      description: 'Iniciativas digitales impulsadas por la Ley',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#1E1E1E]',
      duration: '9:50'
    },
    {
      title: 'Participación Ciudadana',
      description: 'Cómo participar en la implementación de la Ley',
      thumbnail: 'bg-gradient-to-br from-[#1E1E1E] to-[#5B0F18]',
      duration: '7:20'
    },
    {
      title: 'Ejes Estratégicos Explicados',
      description: 'Desglose de cada uno de los seis ejes de acción',
      thumbnail: 'bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B]',
      duration: '15:40'
    },
    {
      title: 'Casos de Éxito del Ecosistema',
      description: 'Ejemplos de empresas e iniciativas que han prosperado',
      thumbnail: 'bg-gradient-to-br from-[#7A1F2B] to-[#5B0F18]',
      duration: '11:25'
    },
    {
      title: 'Financiamiento e Incentivos',
      description: 'Programas de apoyo financiero para innovadores',
      thumbnail: 'bg-gradient-to-br from-[#1E1E1E] to-[#7A1F2B]',
      duration: '10:10'
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Videos</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Contenido audiovisual para conocer más sobre la Ley y sus oportunidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white border border-[#D8A7A7] rounded-lg overflow-hidden hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 group cursor-pointer"
            >
              <div className={`${video.thumbnail} aspect-video flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-[#5B0F18] fill-[#5B0F18]" size={28} />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1E1E1E] mb-2 text-sm group-hover:text-[#7A1F2B] transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription CTA */}
        <div className="mt-12 bg-white border-2 border-[#5B0F18] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">Canal Oficial de Videos</h3>
          <p className="text-gray-600 mb-6">Accede a más contenido, cursos y documentales en nuestro canal oficial</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B0F18] text-white font-semibold rounded-lg hover:bg-[#1E1E1E] transition-colors">
            Ver en YouTube
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.175c-3.674-.576-11.308-.576-14.98 0C2.309 3.727 1.813 5.746 1.813 12c0 6.254.496 8.273 2.822 8.825 3.672.576 11.306.576 14.98 0 2.326-.552 2.822-2.571 2.822-8.825 0-6.254-.496-8.273-2.822-8.825zm-3.97 9.75L9.08 15.08V8.92l6.565 3.83z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
