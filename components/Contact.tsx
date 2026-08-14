'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Clock, MessageSquare, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [phone, setPhone] = useState('')

  const [newsEmail, setNewsEmail] = useState('')
  const [newsStatus, setNewsStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+591 72994687',
      subtitle: 'Secretaría de Innovación',
      isWhatsApp: true,
      link: 'https://wa.me/59172994687',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'comision.economica.concejo@gmail.com',
      subtitle: 'Consultas generales',
      isWhatsApp: false,
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lunes a Viernes',
      subtitle: '8:00 - 12:00 / 14:00 - 18:30',
      isWhatsApp: false,
    },
  ]

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          telefono: data.get('telefono'),
          email: data.get('email'),
          asunto: data.get('asunto'),
          mensaje: data.get('mensaje'),
        }),
      })

      if (!response.ok) throw new Error('No se pudo enviar')

      setStatus('sent')
      form.reset()
      setPhone('')
    } catch (error) {
      setStatus('error')
    }
  }

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNewsStatus('sending')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsEmail }),
      })

      if (!response.ok) throw new Error('No se pudo suscribir')

      setNewsStatus('sent')
      setIsSubscribed(true)
      localStorage.setItem('news_subscribed', 'true')
      setNewsEmail('')
    } catch (error) {
      setNewsStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 px-4 bg-gradient-to-br from-[#F8F1E7] to-white">
      <div className="max-w-6xl mx-auto">

        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E1E]">Contacto</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Estamos aquí para responder tus preguntas y apoyarte en tu participación en el ecosistema
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon

            const cardContent = (
              <>
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-[#1E1E1E] mb-1">{method.title}</h3>
                <p className="text-sm font-semibold text-[#7A1F2B] mb-2">{method.value}</p>
                <p className="text-xs text-gray-600">{method.subtitle}</p>
              </>
            )

            if (method.isWhatsApp) {
              return (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#D8A7A7] rounded-lg p-6 hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 text-center block group cursor-pointer"
                >
                  {cardContent}
                </a>
              )
            }

            return (
              <div
                key={index}
                className="bg-white border border-[#D8A7A7] rounded-lg p-6 hover:shadow-lg hover:border-[#7A1F2B] transition-all duration-300 text-center"
              >
                {cardContent}
              </div>
            )
          })}
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <div className="bg-white border border-[#D8A7A7] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Envíanos un Mensaje</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7] text-[#1E1E1E] placeholder-gray-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Teléfono / Celular</label>
                  <div className="flex overflow-hidden rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] focus-within:border-[#7A1F2B]">
                    <span className="flex items-center border-r border-[#D8A7A7] px-3 text-sm font-semibold text-[#5B0F18]">
                      +591
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                      className="w-full bg-transparent px-4 py-2 text-[#1E1E1E] placeholder-gray-500 outline-none"
                      placeholder="70000000"
                    />
                  </div>
                  <input type="hidden" name="telefono" value={phone ? `+591 ${phone}` : ''} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7] text-[#1E1E1E] placeholder-gray-500"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  required
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7] text-[#1E1E1E] placeholder-gray-500"
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Mensaje</label>
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-[#F8F1E7] text-[#1E1E1E] placeholder-gray-500"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#5B0F18] to-[#7A1F2B] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              {status === 'sent' && (
                <p className="text-sm font-semibold text-green-700">
                  ¡Mensaje enviado! Te responderemos a la brevedad.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-semibold text-red-700">
                  Hubo un problema al enviar tu mensaje. Intenta de nuevo en unos minutos.
                </p>
              )}
            </form>
          </div>

          {/* Social and Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#5B0F18] to-[#7A1F2B] text-white rounded-lg p-8">
              <h4 className="text-xl font-bold mb-4">Síguenos en Redes Sociales</h4>
              <p className="mb-6 text-sm">Mantente actualizado con las últimas noticias y eventos</p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1EpDqBHqyV/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/renanjustinianoarce?igsh=MTFyY3RucmhhdjZuMQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@renanjustinianoarce?_r=1&_t=ZS-98liqVksBMt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.6 5.82c-.83-.72-1.36-1.75-1.44-2.9h-3.03v13.44c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 01-2.9-2.9 2.9 2.9 0 012.9-2.9c.3 0 .58.05.85.13V10.5a5.95 5.95 0 00-.85-.06 5.95 5.95 0 00-5.95 5.95A5.95 5.95 0 009.23 22.34a5.95 5.95 0 005.95-5.95V9.01a8.16 8.16 0 004.76 1.53V7.51a4.85 4.85 0 01-3.34-1.69z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-[#F8F1E7] border border-[#D8A7A7] rounded-lg p-6">
              <h4 className="font-bold text-[#1E1E1E] mb-2">Suscríbete a Noticias</h4>
              <p className="text-sm text-gray-600 mb-4">Recibe una notificación cada vez que se publique una noticia o video nuevo</p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg text-sm font-semibold">
                  <CheckCircle size={20} />
                  <span>¡Ya estás suscrito para recibir novedades!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500"
                    placeholder="tu@email.com"
                  />
                  <button
                    type="submit"
                    disabled={newsStatus === 'sending'}
                    className="w-full px-4 py-2 bg-[#5B0F18] text-white font-semibold rounded-lg hover:bg-[#1E1E1E] transition-colors text-sm disabled:opacity-60"
                  >
                    {newsStatus === 'sending' ? 'Suscribiendo...' : 'Suscribir'}
                  </button>
                  {newsStatus === 'error' && (
                    <p className="text-sm font-semibold text-red-700">No se pudo suscribir, intenta de nuevo.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}