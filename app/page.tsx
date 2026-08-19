'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import TabLayout from '@/components/TabLayout'
import Overview from '@/components/Overview'
import WhatIsLaw from '@/components/WhatIsLaw'
import InteractiveEcosystem from '@/components/InteractiveEcosystem'
import Videos from '@/components/Videos'
import Noticias from '@/components/Noticias'
import Library from '@/components/Library'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Inicializamos Supabase con tus variables de entorno públicas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false)
  const [visitas, setVisitas] = useState<number | null>(null) // Estado para el contador
  const anchorNavRef = useRef(false)

  // Lógica para registrar y obtener visitas al cargar la página principal
  useEffect(() => {
    async function registrarVisita() {
      try {
        // 1. Obtenemos el total actual de la tabla 'visitas' (fila id = 1)
        const { data, error } = await supabase
          .from('visitas')
          .select('total')
          .eq('id', 1)
          .single()

        if (data) {
          const nuevoTotal = (data.total || 0) + 1
          setVisitas(nuevoTotal)

          // 2. Actualizamos sumando 1 visita en la base de datos
          await supabase
            .from('visitas')
            .update({ total: nuevoTotal })
            .eq('id', 1)
        }
      } catch (error) {
        console.error('Error al actualizar el contador de visitas:', error)
      }
    }

    registrarVisita()
  }, [])

  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'ley', label: '¿Qué es la Ley?' },
    { id: 'ecosistema', label: 'Ecosistema' },
    { id: 'videos', label: 'Videos' },
    { id: 'biblioteca', label: 'Biblioteca' },
    { id: 'contacto', label: 'Contacto' },
  ]

  const scrollToSectionById = (id: string) => {
    const attemptScroll = () => {
      const target = document.getElementById(id)
      if (!target) return false

      const headerOffset = 150
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
      return true
    }

    if (typeof window === 'undefined') return

    if (attemptScroll()) return

    window.requestAnimationFrame(() => {
      if (attemptScroll()) return
      window.setTimeout(() => {
        attemptScroll()
      }, 150)
    })
  }

  const handleNavClick = (id: string) => {
    const isAnchorNav =
      id === 'origen-de-la-ley' ||
      id === 'instrumentos-estrategicos' ||
      id === 'ejes-programaticos-permanentes'

    if (id === 'origen-de-la-ley') {
      setIsOriginModalOpen(true)
      setActiveSection('inicio')
      setMobileMenuOpen(false)

      if (typeof window !== 'undefined') {
        window.history.pushState({ section: 'inicio' }, '', '#origen-de-la-ley')
      }

      window.setTimeout(() => {
        const target = document.getElementById('origen-de-la-ley')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
      return
    }

    const mappedSection = id === 'ecosistema' ? 'ecosistema' : isAnchorNav ? 'inicio' : id

    anchorNavRef.current = id === 'ecosistema' || isAnchorNav
    setActiveSection(mappedSection)
    setMobileMenuOpen(false)

    if (typeof window !== 'undefined') {
      window.history.pushState({ section: mappedSection }, '', `#${id}`)
      scrollToSectionById(id)
    }
  }

  const normalizeTabFromHash = (hash: string) => {
    if (!hash) return 'inicio'

    const anchorIds = new Set([
      'origen-de-la-ley',
      'instrumentos-estrategicos',
      'ejes-programaticos-permanentes',
    ])

    if (anchorIds.has(hash)) return 'inicio'

    return hash
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(normalizeTabFromHash(hash))
    }

    const handlePopState = (event: PopStateEvent) => {
      const section = normalizeTabFromHash(window.location.hash.replace('#', '') || 'inicio')
      setActiveSection(section)
    }

    window.addEventListener('popstate', handlePopState)

    const scrollToTop = () => {
      if (anchorNavRef.current) {
        anchorNavRef.current = false
        return
      }

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
      content: (
        <Overview
          onNavigate={handleNavClick}
          isOriginModalOpen={isOriginModalOpen}
          onOpenOriginModal={() => setIsOriginModalOpen(true)}
          onCloseOriginModal={() => setIsOriginModalOpen(false)}
        />
      ),
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
      id: 'noticias',
      label: 'Noticias',
      icon: '📰',
      content: <Noticias />,
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
        centerSections={[
          { id: 'origen-de-la-ley', label: 'Origen de la Ley' },
          { id: 'ecosistema', label: 'El ecosistema' },
          { id: 'instrumentos-estrategicos', label: 'Instrumentos' },
          { id: 'ejes-programaticos-permanentes', label: 'Ejes programáticos' },
          { id: 'noticias', label: 'Noticias' },
        ]}
        activeSection={activeSection}
        setActiveSection={handleNavClick}
      />

      <TabLayout tabs={tabs} activeTab={activeSection} onTabChange={handleNavClick} />

      {/* Indicador visual flotante o integrado de visitas */}
      <div className="bg-gray-50 py-3 text-center border-t border-gray-200 text-sm text-gray-600">
        <span>👁️ Visitas totales al sitio: </span>
        <span className="font-bold text-blue-600">
          {visitas !== null ? visitas.toLocaleString() : 'Cargando...'}
        </span>
      </div>

      <Footer sections={sections} onNavigate={handleNavClick} />
    </>
  )
}