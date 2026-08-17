'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Contraseña incorrecta')
        return
      }
      // Refresca el Server Component (app/admin/page.tsx) para que
      // vuelva a leer la cookie y muestre el panel.
      router.refresh()
    } catch {
      setError('No se pudo verificar la contraseña. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F1E7] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-[#D8A7A7]/40 p-8 w-full max-w-sm space-y-4"
      >
        <h1 className="text-lg font-semibold text-[#5B0F18] text-center">
          Acceso administrador
        </h1>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B0F18]"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5B0F18] text-white px-4 py-2 rounded-md hover:bg-[#7A1F2B] transition disabled:opacity-50"
        >
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}