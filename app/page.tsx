'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import TabLayout from '@/components/TabLayout'
import Overview from '@/components/Overview'
import WhatIsLaw from '@/components/WhatIsLaw'
import InteractiveEcosystem from '@/components/InteractiveEcosystem'
import Videos from '@/components/Videos'
import Library from '@/components/Library'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'ley', label: '¿Qué es la Ley?' },
    { id: 'ecosistema', label: 'Ecosistema' },
    { id: 'videos', label: 'Videos' },
    { id: 'biblioteca', label: 'Biblioteca' },
    { id: 'contacto', label: 'Contacto' },
  ]

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.history.pushState({ section: id }, '', `#${id}`)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
    }

    const handlePopState = (event: PopStateEvent) => {
      const section = window.location.hash.replace('#', '') || 'inicio'
      setActiveSection(section)
    }

    window.addEventListener('popstate', handlePopState)

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
      document.body.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const timeoutId = window.setTimeout(scrollToTop, 80)
    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [activeSection])

  const tabs = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: '🏠',
      content: <Overview onNavigate={handleNavClick} />,
    },
    {
      id: 'ley',
      label: '¿Qué es la Ley?',
      icon: '📖',
      content: <WhatIsLaw />,
    },
    {
      id: 'ecosistema',
      label: 'Arquitectura',
      icon: '🌍',
      content: <InteractiveEcosystem />,
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: '📹',
      content: <Videos />,
    },
    {
      id: 'biblioteca',
      label: 'Biblioteca',
      icon: '📚',
      content: <Library />,
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: '📞',
      content: <Contact />,
    },
  ]

  return (
    <>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={(value) => setMobileMenuOpen(value)}
        sections={sections}
        activeSection={activeSection}
        setActiveSection={handleNavClick}
      />

      <TabLayout tabs={tabs} activeTab={activeSection} onTabChange={handleNavClick} />

      <Footer sections={sections} onNavigate={handleNavClick} />
    </>
  )
}
