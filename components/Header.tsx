'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

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
  const [contactMenuOpen, setContactMenuOpen] = useState(false)

  const contactInfo = [
    { label: 'Dirección', value: 'Av. Jaime Paz Zamora Nro. 700, Tarija, Bolivia' },
    { label: 'Teléfono', value: '+591 4 664 4000' },
    { label: 'Email', value: 'info@tarija.gob.bo' },
    { label: 'Horario', value: 'Lunes a Viernes 8:00 - 16:30' },
  ]

  const mobileButtonLabel = mobileMenuOpen ? 'Cerrar menú de secciones' : 'Abrir menú de secciones'

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
    setContactMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#810100] border-b border-[#630000] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              {/* Imagen del logo */}
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary shadow-md">
                <img
                  src="/logo.png"
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
                  <span className="text-lg font-bold text-white">Innova</span>
                  <span className="text-lg font-bold text-[#FFB3B3]">Tarija</span>
                </div>
                <p className="text-xs text-white/70 font-medium">Municipio de Tarija</p>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Contact Dropdown + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Secciones Button with Dropdown */}
            <div className="relative hidden sm:block">
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
                  {sections.map((section) => (
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

            {/* Contact Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setContactMenuOpen(!contactMenuOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  contactMenuOpen
                    ? 'bg-white text-[#810100] shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Contacto <ChevronDown size={16} className={`transform transition-transform ${contactMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {contactMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#e0e0e0] rounded-lg shadow-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="border-b border-[#e0e0e0] pb-3 mb-2">
                    <p className="text-sm font-bold text-[#810100] tracking-wider">INFORMACIÓN DE CONTACTO</p>
                  </div>
                  {contactInfo.map((item) => (
                    <div key={item.label} className="hover:bg-[#f5f5f5] p-2 rounded-md transition-colors">
                      <p className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm text-[#666] mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button - For Sections */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-all ${
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

        {/* Mobile Sections Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4">
            <p className="px-3 text-xs font-bold text-primary uppercase tracking-wider mb-3">Secciones</p>
            <div className="space-y-2">
              {sections.map((section) => (
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
