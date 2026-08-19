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

// Inicialización segura de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false)
  const [visitas, setVisitas] = useState<number | null>(null)
  const anchorNavRef = useRef(false)

  // Lógica para registrar visita de forma segura
  useEffect(() => {
    // Solo ejecutamos si las variables de entorno están presentes
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase no está configurado, omitiendo contador.')
      return
    }

    async function registrarVisita() {
      try {
        const { data, error } = await supabase
          .from('visitas')
          .select('total')
          .eq('id', 1)
          .single()

        if (data) {
          const nuevoTotal = (data.total || 0) + 1
          setVisitas(nuevoTotal)

          await supabase
            .from('visitas')
            .update({ total: nuevoTotal })
            .eq('id', 1)
        }
      } catch (error) {
        console.error('Error al actualizar contador:', error)
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
      window.setTimeout(attemptScroll, 150)
    })
  }

  const handleNavClick = (id: string) => {
    const isAnchorNav = ['origen-de-la-ley', 'instrumentos-estrategicos', 'ejes-programaticos-permanentes'].includes(id)

    if (id === 'origen-de-la-ley') {
      setIsOriginModalOpen(true)
      setActiveSection('inicio')
      setMobileMenuOpen(false)
      if (typeof window !== 'undefined') window.history.pushState({ section: 'inicio' }, '', '#origen-de-la-ley')
      window.setTimeout(() => {
        const target = document.getElementById('origen-de-la-ley')
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace('#', '')
    if (hash) setActiveSection(hash === 'ecosistema' ? 'ecosistema' : 'inicio')
    
    const scrollToTop = () => {
      if (anchorNavRef.current) { anchorNavRef.current = false; return }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const timeoutId = window.setTimeout(scrollToTop, 80)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: '🏠', content: <Overview onNavigate={handleNavClick} isOriginModalOpen={isOriginModalOpen} onOpenOriginModal={() => setIsOriginModalOpen(true)} onCloseOriginModal={() => setIsOriginModalOpen(false)} /> },
    { id: 'ley', label: '¿Qué es la Ley?', icon: '📖', content: <WhatIsLaw /> },
    { id: 'ecosistema', label: 'Arquitectura', icon: '🌍', content: <InteractiveEcosystem /> },
    { id: 'videos', label: 'Videos', icon: '📹', content: <Videos /> },
    { id: 'noticias', label: 'Noticias', icon: '📰', content: <Noticias /> },
    { id: 'biblioteca', label: 'Biblioteca', icon: '📚', content: <Library /> },
    { id: 'contacto', label: 'Contacto', icon: '📞', content: <Contact /> },
  ]

  return (
    <>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
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

      <div className="bg-gray-50 py-3 text-center border-t border-gray-200 text-sm text-gray-600">
        <span>👁️ Visitas totales: </span>
        <span className="font-bold text-blue-600">
          {visitas !== null ? visitas.toLocaleString() : 'Cargando...'}
        </span>
      </div>

      <Footer sections={sections} onNavigate={handleNavClick} />
    </>
  )
}