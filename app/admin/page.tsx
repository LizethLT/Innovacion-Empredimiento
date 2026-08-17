'use client'

import { useEffect, useState, FormEvent } from 'react'

type Noticia = {
  id: string
  titulo: string
  descripcion: string | null
  link: string
  tipo: string
  imagen_url: string | null
  created_at: string
}

const TIPOS = ['noticia', 'evento', 'comunicado']

export default function AdminPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estado del formulario (crear o editar)
  const [editId, setEditId] = useState<string | null>(null)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [link, setLink] = useState('')
  const [tipo, setTipo] = useState('noticia')
  const [imagenUrl, setImagenUrl] = useState('')
  const [imagenFile, setImagenFile] = useState<File | null>(null)

  async function cargarNoticias() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/noticias')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al cargar noticias')
      setNoticias(data.noticias || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarNoticias()
  }, [])

  function limpiarFormulario() {
    setEditId(null)
    setTitulo('')
    setDescripcion('')
    setLink('')
    setTipo('noticia')
    setImagenUrl('')
    setImagenFile(null)
  }

  function iniciarEdicion(n: Noticia) {
    setEditId(n.id)
    setTitulo(n.titulo)
    setDescripcion(n.descripcion || '')
    setLink(n.link)
    setTipo(n.tipo)
    setImagenUrl(n.imagen_url || '')
    setImagenFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('titulo', titulo)
      formData.append('descripcion', descripcion)
      formData.append('link', link)
      formData.append('tipo', tipo)
      if (imagenFile) {
        formData.append('imagen', imagenFile)
      } else if (imagenUrl) {
        formData.append('imagen_url', imagenUrl)
      }

      const url = editId ? `/api/noticias?id=${editId}` : '/api/noticias'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al guardar')

      limpiarFormulario()
      await cargarNoticias()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta noticia? Esta acción no se puede deshacer.')) return
    setError(null)
    try {
      const res = await fetch(`/api/noticias?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al eliminar')
      await cargarNoticias()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F1E7] text-[#1E1E1E] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#5B0F18] mb-6">
          Administración de noticias
        </h1>

        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Formulario de creación / edición */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-[#D8A7A7]/40 p-6 mb-10 space-y-4"
        >
          <h2 className="text-lg font-semibold text-[#7A1F2B]">
            {editId ? 'Editar noticia' : 'Nueva noticia'}
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link *</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              placeholder="https://..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Imagen (archivo)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              O pega una URL de imagen externa en vez de subir un archivo:
            </p>
            <input
              type="url"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://..."
              disabled={!!imagenFile}
              className="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#5B0F18] text-white px-5 py-2 rounded-md hover:bg-[#7A1F2B] transition disabled:opacity-50"
            >
              {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Publicar noticia'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        {/* Listado de noticias */}
        <h2 className="text-lg font-semibold text-[#7A1F2B] mb-4">
          Noticias publicadas
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : noticias.length === 0 ? (
          <p className="text-sm text-gray-500">Todavía no hay noticias.</p>
        ) : (
          <div className="space-y-3">
            {noticias.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-lg border border-[#D8A7A7]/40 p-4 flex gap-4 items-start"
              >
                {n.imagen_url && (
                  <img
                    src={n.imagen_url}
                    alt={n.titulo}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{n.titulo}</h3>
                    <span className="text-xs bg-[#D8A7A7]/30 text-[#5B0F18] px-2 py-0.5 rounded-full">
                      {n.tipo}
                    </span>
                  </div>
                  {n.descripcion && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {n.descripcion}
                    </p>
                  )}
                  <a
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#7A1F2B] underline mt-1 inline-block truncate max-w-full"
                  >
                    {n.link}
                  </a>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => iniciarEdicion(n)}
                    className="text-xs px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="text-xs px-3 py-1 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}