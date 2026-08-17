'use client'

import { useState, useEffect, type FormEvent } from 'react'

interface Noticia {
  id: string
  titulo: string
  descripcion: string | null
  link: string
  tipo: string
  imagen_url: string | null
  created_at: string
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [link, setLink] = useState('')
  const [tipo, setTipo] = useState('noticia')
  const [imagenUrl, setImagenUrl] = useState('')
  const [imagenFile, setImagenFile] = useState<File | null>(null)
  
  const [editId, setEditId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const cargarNoticias = async () => {
    const res = await fetch('/api/noticias')
    if (res.ok) {
      const data = await res.json()
      setNoticias(data.noticias ?? [])
    }
  }

  useEffect(() => {
    if (authenticated) cargarNoticias()
  }, [authenticated])

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
      const formData = new FormData()
      formData.append('titulo', titulo)
      formData.append('descripcion', descripcion)
      formData.append('link', link)
      formData.append('tipo', tipo)
      formData.append('imagen_url', imagenUrl)
      if (imagenFile) {
        formData.append('imagen', imagenFile)
      }

      const url = editId ? `/api/noticias?id=${editId}` : '/api/noticias'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: formData,
      })

      if (!res.ok) throw new Error()

      setStatus('sent')
      setTitulo('')
      setDescripcion('')
      setLink('')
      setTipo('noticia')
      setImagenUrl('')
      setImagenFile(null)
      setEditId(null)
      cargarNoticias()
    } catch {
      setStatus('error')
    }
  }

  const handleEditarClick = (noticia: Noticia) => {
    setEditId(noticia.id)
    setTitulo(noticia.titulo)
    setDescripcion(noticia.descripcion || '')
    setLink(noticia.link)
    setTipo(noticia.tipo)
    setImagenUrl(noticia.imagen_url || '')
    setImagenFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelarEdicion = () => {
    setEditId(null)
    setTitulo('')
    setDescripcion('')
    setLink('')
    setTipo('noticia')
    setImagenUrl('')
    setImagenFile(null)
  }

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia? Esta acción no se puede deshacer.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/noticias?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setNoticias((prev) => prev.filter((n) => n.id !== id))
    } catch {
      alert('No se pudo eliminar la noticia. Intenta de nuevo.')
    } finally {
      setDeletingId(null)
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
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500"
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1E1E1E]">
            {editId ? 'Editar noticia' : 'Publicar noticia'}
          </h1>
          {editId && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="text-xs text-gray-500 hover:text-black underline"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Link (video o noticia)</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="https://..."
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E]"
          >
            <option value="noticia">Noticia</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Sección de Imagen */}
        <div className="border border-[#D8A7A7] p-4 rounded-lg space-y-3">
          <label className="block text-sm font-semibold text-[#1E1E1E]">Imagen de la noticia</label>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subir archivo desde tu dispositivo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5B0F18] file:text-white hover:file:bg-[#7A1F2B]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">O pega una URL de imagen externa:</label>
            <input
              type="url"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-4 py-2 border border-[#D8A7A7] rounded-lg focus:outline-none focus:border-[#7A1F2B] bg-white text-[#1E1E1E] placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#5B0F18] to-[#7A1F2B] text-white font-semibold rounded-lg disabled:opacity-60"
        >
          {status === 'sending' 
            ? (editId ? 'Actualizando...' : 'Publicando y notificando...') 
            : (editId ? 'Guardar cambios' : 'Publicar y notificar')}
        </button>

        {status === 'sent' && (
          <p className="text-sm font-semibold text-green-700">
            {editId ? '¡Noticia actualizada correctamente!' : '¡Noticia publicada y suscriptores notificados!'}
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-semibold text-red-700">
            Hubo un error al procesar la solicitud. Intenta de nuevo.
          </p>
        )}
      </form>

      <div className="max-w-xl mx-auto mt-8 space-y-3">
        <h2 className="text-lg font-bold text-[#1E1E1E]">Noticias publicadas</h2>
        {noticias.length === 0 ? (
          <p className="text-sm text-gray-600">Todavía no hay noticias publicadas.</p>
        ) : (
          noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="bg-white border border-[#D8A7A7] rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <div className="overflow-hidden">
                <p className="font-semibold text-[#1E1E1E] truncate">{noticia.titulo}</p>
                <p className="text-xs text-gray-600">{noticia.tipo === 'video' ? 'Video' : 'Noticia'}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEditarClick(noticia)}
                  className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(noticia.id)}
                  disabled={deletingId === noticia.id}
                  className="px-3 py-2 bg-red-700 text-white text-sm font-semibold rounded-lg hover:bg-red-800 disabled:opacity-60"
                >
                  {deletingId === noticia.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}