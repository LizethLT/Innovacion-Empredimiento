'use client'

import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function Contact() {
  const contactMethods = [
    {
      icon: MapPin,
      title: 'Dirección',
      value: 'Av. Jaime Paz Zamora Nro. 700, Tarija, Bolivia',
      subtitle: 'Municipalidad de Tarija'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+591 4 664 4000',
      subtitle: 'Secretaría de Innovación'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@innovaciontarija.gob.bo',
      subtitle: 'Consultas generales'
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lunes a Viernes',
      subtitle: '8:00 - 16:30'
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Contacto</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Estamos aquí para responder tus preguntas y apoyarte en tu participación en el ecosistema
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div
                key={index}
                className="bg-white border border-[#D8A7A7] rounded-lg p-6 hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-[#1E1E1E] mb-1">{method.title}</h3>
                <p className="text-sm font-semibold text-[#7A1F2B] mb-2">{method.value}</p>
                <p className="text-xs text-gray-600">{method.subtitle}</p>
              </div>
            )
          })}
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <div className="bg-white border border-[#D8A7A7] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7]"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Asunto</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7]"
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7]"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#5B0F18] to-[#7A1F2B] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Social and Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] text-white rounded-lg p-8">
              <h4 className="text-xl font-bold mb-4">Síguenos en Redes Sociales</h4>
              <p className="mb-6 text-sm">Mantente actualizado con las últimas noticias y eventos del ecosistema</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.3"/>
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="17.5" cy="6.5" r="1.5" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#D8A7A7] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="text-[#7A1F2B] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-[#1E1E1E] mb-2">Chat en Línea</h4>
                  <p className="text-sm text-gray-600 mb-3">Disponible de lunes a viernes de 8:00 a 16:30</p>
                  <button className="text-[#7A1F2B] font-semibold text-sm hover:text-[#1E1E1E]">
                    Iniciar chat →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F1E7] border border-[#D8A7A7] rounded-lg p-6">
              <h4 className="font-bold text-[#1E1E1E] mb-2">Suscríbete a Noticias</h4>
              <p className="text-sm text-gray-600 mb-4">Recibe actualizaciones sobre nuevas oportunidades e iniciativas</p>
              <input
                type="email"
                className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white mb-2"
                placeholder="tu@email.com"
              />
              <button className="w-full px-4 py-2 bg-[#5B0F18] text-white font-semibold rounded-lg hover:bg-[#1E1E1E] transition-colors text-sm">
                Suscribir
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
