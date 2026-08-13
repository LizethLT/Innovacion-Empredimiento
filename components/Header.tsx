'use client'

import { useEffect, useRef } from 'react'
import { Menu, X, Bell } from 'lucide-react'
import { useNotifications } from '@/context/NotificationContext'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
  /** Secciones usadas en el dropdown "Secciones" (icono) y en el menú mobile */
  sections: Array<{ id: string; label: string }>
  /**
   * Secciones destacadas que se muestran como links directos en el centro del header
   * (desktop). Si no se pasa, se usan los 4 ejes por defecto de la Ley.
   */
  centerSections?: Array<{ id: string; label: string }>
  activeSection: string
  setActiveSection: (id: string) => void
}

const DEFAULT_CENTER_SECTIONS = [
  { id: 'origen', label: 'Origen de la Ley' },
  { id: 'ecosistema', label: 'El Ecosistema' },
  { id: 'instrumentos', label: 'Instrumentos' },
  { id: 'ejes', label: 'Ejes Programáticos' },
]

const MOBILE_LABEL_ORDER = [
  'inicio',
  'origen de la ley',
  'que es la ley',
  'el ecosistema',
  'instrumentos',
  'ejes programaticos',
  'noticias',
  'videos',
  'biblioteca',
]

const DESKTOP_DROPDOWN_LABEL_ORDER = [
  'inicio',
  'que es la ley',
  'el ecosistema',
  'videos',
  'biblioteca',
]

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  sections,
  centerSections = DEFAULT_CENTER_SECTIONS,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const sectionMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)

  // Obtenemos el contador de notificaciones no leídas del contexto
  const { unviewedCount } = useNotifications()

  const mobileButtonLabel = mobileMenuOpen ? 'Cerrar menú de secciones' : 'Abrir menú de secciones'

  const navSections = sections.filter((section) => section.id !== 'contacto')

  const allSectionsMap = new Map<string, { id: string; label: string }>()
  ;[...centerSections, ...navSections].forEach((section) => {
    if (!allSectionsMap.has(section.id)) {
      allSectionsMap.set(section.id, section)
    }
  })

  const allSectionsList = Array.from(allSectionsMap.values())

  const orderedKnown = MOBILE_LABEL_ORDER
    .map((wantedLabel) =>
      allSectionsList.find((section) => normalizeLabel(section.label) === wantedLabel)
    )
    .filter((section): section is { id: string; label: string } => Boolean(section))

  const knownIds = new Set(orderedKnown.map((section) => section.id))
  const remaining = allSectionsList.filter((section) => !knownIds.has(section.id))

  const mobileSections = [...orderedKnown, ...remaining]

  const desktopDropdownSections = DESKTOP_DROPDOWN_LABEL_ORDER
    .map((wantedLabel) =>
      allSectionsList.find((section) => normalizeLabel(section.label) === wantedLabel)
    )
    .filter((section): section is { id: string; label: string } => Boolean(section))

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    if (!mobileMenuOpen) return

    const isInsideAnySectionArea = (target: Node | null) => {
      if (!target) return false
      return Boolean(
        sectionMenuRef.current?.contains(target) ||
          mobileMenuRef.current?.contains(target) ||
          mobilePanelRef.current?.contains(target)
      )
    }

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (!isInsideAnySectionArea(target)) {
        setMobileMenuOpen(false)
      }
    }

    const handleOutsideTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0] || event.changedTouches[0]
      if (!touch) return
      const element = document.elementFromPoint(touch.clientX, touch.clientY)
      if (!isInsideAnySectionArea(element as Node | null)) {
        setMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setMobileMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('touchmove', handleOutsideTouchMove)

    let scrollListenerActive = false
    const scrollListenerTimeout = window.setTimeout(() => {
      scrollListenerActive = true
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 350)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('touchmove', handleOutsideTouchMove)
      window.clearTimeout(scrollListenerTimeout)
      if (scrollListenerActive) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [mobileMenuOpen, setMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-[#810100] border-b border-[#630000] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md cursor-pointer transition-opacity duration-150 hover:opacity-80 active:opacity-60"
              aria-label="Ir al inicio"
              title="Ir al inicio"
            >
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary shadow-md">
                <img
                  src="/logo.jpeg"
                  alt="Logo Municipio de Tarija"
                  className="size-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="block">
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-bold text-white">Impulsa</span>
                  <span className="text-base sm:text-lg font-bold text-[#FFB3B3]">Tarija</span>
                </div>
                <p className="hidden xs:block sm:block text-[10px] sm:text-xs text-white/70 font-medium">
                  Concejo Municipal de Tarija
                </p>
              </div>
            </button>
          </div>

          {/* Secciones destacadas (centro) */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-2 px-4">
            {centerSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavClick(section.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-white text-[#810100] shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 md:hidden"></div>

          {/* Secciones (icono, dropdown) + Campana de Notificaciones + Contacto */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Campana de Notificaciones */}
            <div className="relative inline-flex items-center justify-center p-2">
              <button
                type="button"
                onClick={() => handleNavClick('noticias')}
                className="relative flex items-center justify-center p-1.5 rounded-md text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Notificaciones de noticias"
                aria-label="Notificaciones de noticias"
              >
                <Bell size={20} />
                {unviewedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-bold text-white shadow-sm ring-1 ring-[#810100] animate-pulse">
                    {unviewedCount > 9 ? '9+' : unviewedCount}
                  </span>
                )}
              </button>
            </div>

            <div ref={sectionMenuRef} className="relative hidden sm:block">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex items-center justify-center p-2 rounded-md transition-all ${
                  mobileMenuOpen
                    ? 'bg-white text-[#810100] shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
                title="Ver secciones"
                aria-label="Ver secciones"
              >
                <Menu size={20} />
              </button>
              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg p-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
                  {desktopDropdownSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleNavClick(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact link */}
            <button
              type="button"
              onClick={() => handleNavClick('contacto')}
              className="hidden md:block px-3 py-2 text-sm font-medium text-white rounded-md transition-all hover:bg-white/10"
            >
              Contacto
            </button>

            {/* Mobile Menu Button */}
            <div ref={mobileMenuRef} className="relative md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-all ${
                  mobileMenuOpen
                    ? 'bg-white text-[#810100]'
                    : 'text-white hover:bg-white/10'
                }`}
                title={mobileButtonLabel}
                aria-label={mobileButtonLabel}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sections Menu */}
        {mobileMenuOpen && (
          <div ref={mobilePanelRef} className="md:hidden pb-4 border-t border-white/20 pt-4">
            <p className="px-3 text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Secciones</p>
            <div className="space-y-2">
              {mobileSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-white text-[#810100]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contacto')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}