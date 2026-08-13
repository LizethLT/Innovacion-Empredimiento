'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ViewedNoticia {
  id: string
  viewedAt: string
}

interface NotificationContextType {
  unviewedCount: number
  viewedNoticias: Set<string>
  markAsViewed: (noticiasId: string) => void
  loadViewedNoticias: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [viewedNoticias, setViewedNoticias] = useState<Set<string>>(new Set())
  const [unviewedCount, setUnviewedCount] = useState(0)

  // Cargar noticias visualizadas del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('viewedNoticias')
    if (stored) {
      try {
        const viewed = JSON.parse(stored) as ViewedNoticia[]
        setViewedNoticias(new Set(viewed.map(v => v.id)))
      } catch (e) {
        console.error('Error loading viewed noticias:', e)
      }
    }
  }, [])

  const markAsViewed = (noticiasId: string) => {
    setViewedNoticias(prev => {
      const updated = new Set(prev)
      updated.add(noticiasId)
      
      // Guardar en localStorage
      const viewedArray: ViewedNoticia[] = Array.from(updated).map(id => ({
        id,
        viewedAt: new Date().toISOString(),
      }))
      localStorage.setItem('viewedNoticias', JSON.stringify(viewedArray))
      
      return updated
    })
  }

  const loadViewedNoticias = () => {
    const stored = localStorage.getItem('viewedNoticias')
    if (stored) {
      try {
        const viewed = JSON.parse(stored) as ViewedNoticia[]
        setViewedNoticias(new Set(viewed.map(v => v.id)))
      } catch (e) {
        console.error('Error loading viewed noticias:', e)
      }
    }
  }

  // Calcular unviewedCount cuando cambien las noticias visualizadas
  useEffect(() => {
    const updateUnviewedCount = () => {
      fetch('/api/noticias')
        .then(res => res.json())
        .then(data => {
          const noticias = data.noticias ?? []
          const unviewed = noticias.filter((n: any) => !viewedNoticias.has(n.id))
          setUnviewedCount(unviewed.length)
        })
        .catch(e => console.error('Error fetching noticias:', e))
    }

    updateUnviewedCount()
    const interval = setInterval(updateUnviewedCount, 5000)

    return () => clearInterval(interval)
  }, [viewedNoticias])

  return (
    <NotificationContext.Provider value={{ unviewedCount, viewedNoticias, markAsViewed, loadViewedNoticias }}>
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