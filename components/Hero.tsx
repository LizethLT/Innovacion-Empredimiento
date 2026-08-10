'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      {/* Foto de fondo: usamos el endpoint oficial Special:FilePath de Wikimedia Commons,
          que redirige siempre al archivo real sin necesidad de adivinar la URL con el hash.
          Foto: "Plaza y Monumento a Luis de Fuentes, Tarija - Bolivia.jpg" (CC BY-SA 4.0)
          https://commons.wikimedia.org/wiki/File:Plaza_y_Monumento_a_Luis_de_Fuentes_Tarija_-_Bolivia.jpg
          Si prefieres otra foto, cambia el nombre de archivo en la URL de abajo. */}
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Plaza_y_Monumento_a_Luis_de_Fuentes_Tarija_-_Bolivia.jpg?width=1600"
        alt="Plaza principal de Tarija"
        className="absolute inset-0 size-full object-cover"
        onError={(e) => {
          // Si el link llegara a fallar, se mantiene solo el fondo rojo
          e.currentTarget.style.display = 'none'
        }}
      />

      {/* Overlay rojo opaco */}
      <div className="absolute inset-0 bg-[#810100]/70" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <p className="text-lg font-semibold uppercase tracking-widest text-white/80">
            Marco Normativo Municipal
          </p>
          <h1 className="text-pretty text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
            Marco normativo para construir un ecosistema dinámico, colaborativo y sostenible para el Municipio de Tarija
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <button
            onClick={() => scrollToSection('ley')}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#1a1a1a] shadow-lg transition-all hover:bg-[#f5f5f5] hover:shadow-xl"
          >
            Leer la Ley <ArrowRight size={20} />
          </button>
          <button
            onClick={() => scrollToSection('videos')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#810100] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#630000] hover:shadow-xl"
          >
            Ver Videos <ArrowRight size={20} />
          </button>
          <button
            onClick={() => scrollToSection('biblioteca')}
            className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-transparent px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            Descargar PDF
          </button>
          <button
            onClick={() => scrollToSection('participacion')}
            className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-transparent px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            Conocer el Ecosistema
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce pt-12">
          <div className="flex justify-center">
            <div className="text-white opacity-75">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}