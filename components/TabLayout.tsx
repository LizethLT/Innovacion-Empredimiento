'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface TabLayoutProps {
  tabs: Array<{
    id: string
    label: string
    icon?: React.ReactNode
    content: React.ReactNode
  }>
  defaultTab?: string
  /** Si se pasa junto con onTabChange, el componente se vuelve controlado desde afuera */
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export default function TabLayout({ tabs, defaultTab, activeTab: activeTabProp, onTabChange }: TabLayoutProps) {
  const isControlled = activeTabProp !== undefined
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id)
  const activeTab = isControlled ? activeTabProp : internalActiveTab
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTabChange = (tabId: string) => {
    setIsTransitioning(true)
    setMenuOpen(false)
    setTimeout(() => {
      if (isControlled) {
        onTabChange?.(tabId)
      } else {
        setInternalActiveTab(tabId)
      }
      setIsTransitioning(false)
    }, 200)
  }

  const currentTab = tabs.find(tab => tab.id === activeTab)
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab)

  // Evita el scroll de fondo mientras el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-white">

      {/* Menú de navegación — panel lateral, no se superpone al contenido como un header flotante */}
      {menuOpen && (
        <>
          <button
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 animate-in fade-in duration-200"
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-4">
              <p className="text-sm font-bold tracking-widest text-primary-foreground uppercase">Navegación</p>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-md p-1.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex w-full items-center gap-3 border-l-4 px-5 py-3.5 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'border-l-primary bg-muted'
                      : 'border-l-transparent hover:bg-muted/50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-semibold ${activeTab === tab.id ? 'text-primary' : 'text-foreground'}`}>
                      {tab.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {index + 1} de {tabs.length}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">Progreso</span>
                <div className="h-1.5 flex-1 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / tabs.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-primary">
                  {currentIndex + 1}/{tabs.length}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Contenido de la pestaña */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
          }`}
        >
          {currentTab && currentTab.content}
        </div>
      </div>
    </div>
  )
}
