'use client'

import { useState, type FormEvent } from 'react'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [link, setLink] = useState('')
  const [tipo, setTipo] = useState('noticia')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthenticated(true)
    } else {
      setLoginError('Contraseña incorrecta')
    }
  }

  const handlePublicar = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/admin/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, link, tipo }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setTitulo('')
      setDescripcion('')
      setLink('')
    } catch {
      setStatus('error')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F1E7] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white border border-[#D8A7A7] rounded-lg p-8 w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-[#1E1E1E]">Panel de Noticias</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B]"
            required
          />
          {loginError && <p className="text-sm text-red-700">{loginError}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#5B0F18] text-white font-semibold rounded-lg hover:bg-[#1E1E1E] transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F1E7] px-4 py-12">
      <form
        onSubmit={handlePublicar}
        className="bg-white border border-[#D8A7A7] rounded-lg p-8 max-w-xl mx-auto space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#1E1E1E]">Publicar noticia</h1>

        <div>
          <label className="block text-sm font-semibold mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Link (video o noticia)</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="https://..."
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B]"
          >
            <option value="noticia">Noticia</option>
            <option value="video">Video</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#5B0F18] to-[#7A1F2B] text-white font-semibold rounded-lg disabled:opacity-60"
        >
          {status === 'sending' ? 'Publicando y notificando...' : 'Publicar y notificar'}
        </button>

        {status === 'sent' && (
          <p className="text-sm font-semibold text-green-700">
            ¡Noticia publicada y suscriptores notificados!
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-semibold text-red-700">
            Hubo un error al publicar. Intenta de nuevo.
          </p>
        )}
      </form>
    </div>
  )
}
