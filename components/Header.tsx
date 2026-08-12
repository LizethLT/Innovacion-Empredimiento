'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
  sections: Array<{ id: string; label: string }>
  activeSection: string
  setActiveSection: (id: string) => void
}

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  sections,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const sectionMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)


  const mobileButtonLabel = mobileMenuOpen ? 'Cerrar menú de secciones' : 'Abrir menú de secciones'

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)

    if (id === 'contacto') {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('touchmove', handleOutsideTouchMove)
      window.removeEventListener('scroll', handleScroll)
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
              {/* Brand Text */}
              <div className="hidden sm:block">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white">Impulsa</span>
                  <span className="text-lg font-bold text-[#FFB3B3]">Tarija</span>
                </div>
                <p className="text-xs text-white/70 font-medium">Concejo Municipal de Tarija</p>
              </div>
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Contact Dropdown + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Secciones Button with Dropdown */}
            <div ref={sectionMenuRef} className="relative hidden sm:block">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  mobileMenuOpen
                    ? 'bg-white text-[#810100] shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
                title="Ver secciones"
              >
                <Menu size={16} />
                <span>Secciones</span>
              </button>
              {mobileMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg p-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
                  {sections.filter((section) => section.id !== 'contacto').map((section) => (
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

            {/* Mobile Menu Button - For Sections */}
            <div ref={mobileMenuRef} className="relative md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-all ${
                  mobileMenuOpen
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
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
          <div ref={mobilePanelRef} className="md:hidden pb-4 border-t border-border pt-4">
            <p className="px-3 text-xs font-bold text-primary uppercase tracking-wider mb-3">Secciones</p>
            <div className="space-y-2">
              {sections.filter((section) => section.id !== 'contacto').map((section) => (
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
          </div>
        )}
      </div>
    </header>
  )
}
