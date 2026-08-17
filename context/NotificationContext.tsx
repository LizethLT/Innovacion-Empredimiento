'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface Noticia {
  id: string
  title?: string
  link?: string
  date?: string
  category?: string
  [key: string]: any
}

interface ViewedNoticia {
  id: string
  viewedAt: string
}

interface NotificationContextType {
  noticias: Noticia[]
  unviewedCount: number
  viewedNoticias: Set<string>
  markAsViewed: (noticiaId: string) => void
  markAllAsViewed: (ids: string[]) => void
}

const STORAGE_KEY = 'viewedNoticias'

const POLL_INTERVAL_MS = 60000

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

function loadViewedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Set()
    const parsed = JSON.parse(stored) as ViewedNoticia[]
    return new Set(parsed.map((v) => v.id))
  } catch (e) {
    console.error('Error loading viewed noticias:', e)
    return new Set()
  }
}

function saveViewedIds(ids: Set<string>) {
  const payload: ViewedNoticia[] = Array.from(ids).map((id) => ({
    id,
    viewedAt: new Date().toISOString(),
  }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [viewedNoticias, setViewedNoticias] = useState<Set<string>>(new Set())

  // Cargamos lo ya visto UNA sola vez al montar.
  useEffect(() => {
    setViewedNoticias(loadViewedIds())
  }, [])


  useEffect(() => {
    const fetchNoticias = () => {
      fetch('/api/noticias')
        .then((res) => res.json())
        .then((data) => setNoticias(data.noticias ?? []))
        .catch((e) => console.error('Error fetching noticias:', e))
    }

    fetchNoticias()
    const interval = setInterval(fetchNoticias, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const markAsViewed = useCallback((noticiaId: string) => {
    setViewedNoticias((prev) => {
      if (prev.has(noticiaId)) return prev // nada cambió, evita un render/guardado de más
      const updated = new Set(prev)
      updated.add(noticiaId)
      saveViewedIds(updated)
      return updated
    })
  }, [])

  const markAllAsViewed = useCallback((ids: string[]) => {
    setViewedNoticias((prev) => {
      let changed = false
      const updated = new Set(prev)
      ids.forEach((id) => {
        if (!updated.has(id)) {
          updated.add(id)
          changed = true
        }
      })
      if (!changed) return prev
      saveViewedIds(updated)
      return updated
    })
  }, [])

  // Derivado directamente del render: nunca queda "desfasado" ni requiere
  // un efecto aparte que dispare renders extra.
  const unviewedCount = noticias.filter((n) => !viewedNoticias.has(n.id)).length

  return (
    <NotificationContext.Provider
      value={{ noticias, unviewedCount, viewedNoticias, markAsViewed, markAllAsViewed }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}