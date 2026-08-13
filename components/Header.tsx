'use client'

import { useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

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

// Orden fijo deseado para el panel de secciones en mobile.
// Se compara por LABEL normalizado (sin tildes, minúsculas, sin espacios extra)
// en vez de por `id`, porque los ids reales usados en page.tsx no siempre
// coinciden exactamente con los que se puedan suponer aquí. Comparar por label
// es más robusto: el texto visible es el que conocemos con certeza.
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

// Dropdown de escritorio (ícono ☰ junto a "Contacto"): solo estas secciones,
// en este orden. Las demás (Origen, Instrumentos, Ejes, Noticias) ya están
// visibles en la barra central de desktop, así que no hace falta repetirlas acá.
const DESKTOP_DROPDOWN_LABEL_ORDER = [
  'inicio',
  'que es la ley',
  'el ecosistema',
  'videos',
  'biblioteca',
]

// Normaliza: minúsculas, sin tildes/diacríticos, sin signos ¿ ?, espacios colapsados.
function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
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

  const mobileButtonLabel = mobileMenuOpen ? 'Cerrar menú de secciones' : 'Abrir menú de secciones'

  // Secciones del dropdown de ícono (todas menos "contacto")
  const navSections = sections.filter((section) => section.id !== 'contacto')

  // Panel de mobile: combina centerSections + navSections (sin duplicar ids) y
  // luego las reordena según MOBILE_LABEL_ORDER (comparando por label normalizado).
  // Cualquier sección que no esté en esa lista de orden queda al final, en el
  // orden en que llegó.
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

  // Dropdown de escritorio: solo las secciones de DESKTOP_DROPDOWN_LABEL_ORDER,
  // en ese orden (no incluye "remaining" — es una lista cerrada, no todas las secciones).
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

    // En desktop, hacer scroll con la rueda del mouse no dispara mousedown ni
    // touchmove, así que el dropdown se quedaba abierto. Lo cerramos también
    // al detectar scroll de la página.
    const handleScroll = () => {
      setMobileMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('touchmove', handleOutsideTouchMove)

    // FIX #3: al abrir el panel dentro del header (que es "sticky"), el contenido
    // de la página se empuja hacia abajo. Si no estás en el tope, el navegador
    // ajusta el scroll para compensar ese empuje (scroll anchoring) y eso disparaba
    // un evento "scroll" que cerraba el menú de inmediato. Retrasamos la activación
    // del listener de scroll para que ese ajuste automático no cuente como "el
    // usuario quiso cerrar el menú".
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
              {/* Imagen del logo */}
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
              {/* Brand Text — FIX #1: antes tenía "hidden sm:block" y nunca se veía
                  en celulares. Ahora siempre es visible; solo el subtítulo se oculta
                  en pantallas muy chicas para no saturar el header. */}
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

          {/* Secciones destacadas (centro) - Origen de la Ley / Ecosistema / Instrumentos / Ejes */}
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

          {/* Spacer (solo cuando el nav central está oculto, en pantallas < md) */}
          <div className="flex-1 md:hidden"></div>

          {/* Secciones (icono, dropdown) + Contacto */}
          <div className="flex items-center gap-2 shrink-0">
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

            {/* Mobile Menu Button - para pantallas pequeñas */}
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

        {/* Mobile Sections Menu — orden fijo definido en MOBILE_LABEL_ORDER */}
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