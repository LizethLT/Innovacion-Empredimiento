'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cog,
  Eye,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Lightbulb,
  MapPin,
  Megaphone,
  Network,
  Palette,
  Play,
  Quote,
  Rocket,
  Target,
  Users,
  Video,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { CONCEJAL, MESAS_DEBATE, PODCAST_EPISODES } from '@/lib/home-content'
import { articles, getArticleByRange } from '@/lib/articles'
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from '@/lib/youtube'
import VideoThumbnail from '@/components/VideoThumbnail'

const HERO_CLIPS = [
  {
    id: 'presentacion',
    title: '¿Cómo funcionará el Consejo Municipal de Innovación de Tarija?',
    duration: '3:06',
    youtubeUrl: 'https://youtu.be/WCNXOwngRHk',
  },
  {
    id: 'mesa-1',
    title: 'Mesa 1 | Gobernanza y Planificación del Ecosistema de Innovación',
    duration: '0:53',
    youtubeUrl: 'https://youtu.be/e6XG6gb58Qo',
  },
  {
    id: 'mesa-2',
    title: 'Mesa 2 | Talento, Emprendimiento y Programas Municipales',
    duration: '0:56',
    youtubeUrl: 'https://youtu.be/gqsh08KK6vY',
  },
  {
    id: 'mesa-3',
    title: 'Mesa 3 | Instrumentos Estratégicos para la Innovación',
    duration: '0:54',
    youtubeUrl: 'https://youtu.be/JBrkHYzaVtM',
  },
  {
    id: 'mesa-4',
    title: 'Mesa 4 | Implementación, Sostenibilidad y Proyección del Ecosistema',
    duration: '0:56',
    youtubeUrl: 'https://youtu.be/PRlOmQkYE9M',
  },
]

const ACTORS = [
  {
    id: 'gobierno',
    label: 'Gobierno Municipal',
    description: 'Dirección, coordinación y liderazgo público',
    icon: Building2,
  },
  {
    id: 'universidades',
    label: 'Universidades',
    description: 'Conocimiento, ciencia y formación',
    icon: GraduationCap,
  },
  {
    id: 'empresas',
    label: 'Empresas',
    description: 'Producción, innovación y competitividad',
    icon: Briefcase,
  },
  {
    id: 'cooperacion',
    label: 'Cooperación Nacional e Internacional',
    description: 'Alianzas y recursos externos',
    icon: Globe2,
  },
  {
    id: 'sector-cultural',
    label: 'Sector Cultural',
    description: 'Creatividad, identidad y cultura',
    icon: Palette,
  },
  {
    id: 'instituciones-financieras',
    label: 'Instituciones Financieras',
    description: 'Financiamiento y acceso a capital',
    icon: Landmark,
  },
  {
    id: 'sociales',
    label: 'Organizaciones Sociales',
    description: 'Participación ciudadana y tejido social',
    icon: Users,
  },
]

const PROGRAMMATIC_AXES = [
  {
    id: 'eje-1',
    shortLabel: 'EJE 1',
    title: 'DESARROLLO DEL TALENTO Y ECONOMÍA DEL CONOCIMIENTO',
    subtitle: 'Fortalece capacidades, creatividad, investigación e innovación para generar oportunidades, competitividad y desarrollo basado en conocimiento.',
    description:
      'El Eje Programático Permanente de Desarrollo del Talento y Economía del Conocimiento impulsa la formación, especialización y aprovechamiento del talento humano como principal motor del desarrollo. Promueve la educación, investigación, creatividad, innovación y transferencia de conocimiento para fortalecer capacidades, generar empleo de calidad, incrementar la competitividad y consolidar una economía basada en el conocimiento y el valor agregado. (art. 37 al 42 de la ley)',
    icon: Award,
  },
  {
    id: 'eje-2',
    shortLabel: 'EJE 2',
    title: 'INNOVACIÓN, EMPRENDIMIENTO Y DESARROLLO EMPRESARIAL',
    subtitle: 'Impulsa emprendimientos, empresas innovadoras y nuevos modelos productivos para fortalecer competitividad, empleo y crecimiento sostenible. ',
    description:
      'El Eje Programático Permanente de Innovación, Emprendimiento y Desarrollo Empresarial promueve la creación, consolidación y crecimiento de emprendimientos y empresas innovadoras. Fortalece capacidades, impulsa la adopción de nuevas tecnologías, fomenta modelos de negocio sostenibles y genera condiciones para incrementar la productividad, competitividad, empleo de calidad y diversificación económica del municipio, fortaleciendo el ecosistema local de innovación. (art. 43 al 48 de la ley)',
    icon: Rocket,
  },
  {
    id: 'eje-3',
    shortLabel: 'EJE 3',
    title: 'VALORIZACIÓN Y DESARROLLO DE LOS ACTIVOS TERRITORIALES ESTRATÉGICOS',
    subtitle: 'Transforma recursos, identidad y potencial local en oportunidades de innovación, valor agregado y desarrollo sostenible.',
    description:
      'El Eje Programático Permanente de Valorización y Desarrollo de los Activos Territoriales Estratégicos promueve la identificación, protección, valorización y aprovechamiento sostenible de los recursos, capacidades e identidad del municipio. Impulsa la innovación, el emprendimiento y la generación de valor agregado a partir de los activos naturales, culturales, productivos, turísticos y patrimoniales, fortaleciendo el desarrollo económico, la competitividad territorial y el bienestar de la población. (art. 49 al 54 de la ley)',
    icon: Target,
  },
  {
    id: 'eje-4',
    shortLabel: 'EJE 4',
    title: 'ARTICULACIÓN, COOPERACIÓN E INTERNACIONALIZACIÓN DEL ECOSISTEMA',
    subtitle: 'Conecta actores, conocimiento, inversión y cooperación para ampliar oportunidades e impulsar un ecosistema competitivo y global.',
    description:
      'El Eje Programático Permanente de Articulación, Cooperación e Internacionalización del Ecosistema fortalece la coordinación entre instituciones públicas, academia, empresas, emprendedores y sociedad civil. Promueve alianzas estratégicas, cooperación técnica, intercambio de conocimiento, atracción de inversiones, acceso a mercados y vinculación con redes nacionales e internacionales, consolidando un ecosistema más competitivo, colaborativo y con proyección global para Tarija. (art. 55 al 60 de la ley)',
    icon: Handshake,
  },
]

const INSTRUMENTS = [
  {
    id: 'instrumento-1',
    shortLabel: 'a.',
    title: 'CENTRO MUNICIPAL DE INNOVACIÓN, PROTOTIPADO Y FABRICACIÓN DIGITAL (FABLAB TARIJA)',
    subtitle: 'Instrumento estratégico que impulsa innovación, creatividad, prototipado y emprendimientos mediante colaboración, tecnología y talento local.',
    description:
      'El Centro Municipal De Innovación, Prototipado Y Fabricación Digital (Fablab Tarija) es el instrumento estratégico del Sistema Municipal de Innovación que promueve la creatividad, la experimentación y el desarrollo de soluciones innovadoras. Como laboratorio abierto y colaborativo, facilita el acceso a tecnologías, conocimientos y procesos de prototipado para transformar ideas en productos, servicios y emprendimientos, fortaleciendo el talento local, la transferencia de conocimiento y el desarrollo sostenible del municipio. (art. 64 al 72 de la ley)',
    icon: Wrench,
  },
  {
    id: 'instrumento-2',
    shortLabel: 'b.',
    title: 'DISTRITOS CREATIVOS E INNOVADORES',
    subtitle: 'Instrumento estratégico que integra talento, cultura, innovación y emprendimiento para transformar territorios con alto potencial.',
    description:
      'Los Distritos Creativos E Innovadores son instrumentos estratégicos que promueven la concentración de actividades creativas, culturales, tecnológicas y emprendedoras en territorios con alto potencial de desarrollo. Mediante la articulación entre sector público, academia, empresas y ciudadanía, impulsan la innovación, la colaboración, la regeneración urbana, la atracción de inversiones y la generación de oportunidades económicas sostenibles para el municipio. (art. 73 al 80 de la ley)',
    icon: MapPin,
  },
  {
    id: 'instrumento-3',
    shortLabel: 'c.',
    title: 'PLATAFORMA DIGITAL DEL ECOSISTEMA',
    subtitle: 'Instrumento estratégico que conecta actores, oportunidades, información, servicios e innovación municipal colaborativa.',
    description:
      'La Plataforma Digital del Ecosistema es el instrumento estratégico que integra en un entorno digital a los actores, programas, servicios, convocatorias e iniciativas del Sistema Municipal de Innovación. Facilita la articulación, colaboración, acceso a información, gestión del conocimiento, participación ciudadana y seguimiento de oportunidades, fortaleciendo la coordinación y el desarrollo del ecosistema de innovación y emprendimiento del municipio. (art. 81 al 86 de la ley)',
    icon: Globe2,
  },
  {
    id: 'instrumento-4',
    shortLabel: 'd.',
    title: 'PROGRAMA MUNICIPAL DE CONVOCATORIAS, DESAFÍOS E INNOVACIÓN ABIERTA',
    subtitle: 'Instrumento estratégico que impulsa innovación abierta mediante desafíos, colaboración y soluciones para Tarija.',
    description:
      'El Programa Municipal de Convocatorias, Desafíos e Innovación Abierta es el instrumento estratégico que promueve la generación de soluciones innovadoras para los desafíos del municipio mediante convocatorias públicas. Articula a ciudadanía, emprendedores, universidades, empresas e instituciones para desarrollar proyectos colaborativos que fortalezcan el ecosistema, impulsen la innovación y generen valor público, económico y social para Tarija. (art. 87 al 93 de la ley)',
    icon: Megaphone,
  },
  {
    id: 'instrumento-5',
    shortLabel: 'e.',
    title: 'RED MUNICIPAL DE COOPERACIÓN E INTERNACIONALIZACIÓN DEL ECOSISTEMA',
    subtitle: 'Instrumento estratégico que conecta el ecosistema con alianzas, inversión, conocimiento y oportunidades globales.',
    description:
      'La Red Municipal de Cooperación e Internacionalización del Ecosistema es el instrumento estratégico que fortalece la vinculación del municipio con redes nacionales e internacionales de innovación, emprendimiento, inversión y conocimiento. Promueve alianzas, intercambio de experiencias, cooperación técnica, atracción de oportunidades y acceso a mercados, consolidando un ecosistema competitivo, conectado y con proyección global para el desarrollo sostenible de Tarija. (art. 94 al 99 de la ley)',
    icon: Network,
  },
]

// Geometría del arco superior del diagrama "Consejo Municipal"
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

function ringSegmentPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
) {
  const startOuter = polarToCartesian(cx, cy, rOuter, startAngle)
  const endOuter = polarToCartesian(cx, cy, rOuter, endAngle)
  const startInner = polarToCartesian(cx, cy, rInner, endAngle)
  const endInner = polarToCartesian(cx, cy, rInner, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ')
}

function arcLinePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

const ARC_CX = 500
const ARC_CY = 480
const ARC_OUTER = 430
const ARC_INNER = 380
const ARC_MID = (ARC_OUTER + ARC_INNER) / 2

const ARC_LEFT_PATH = ringSegmentPath(ARC_CX, ARC_CY, ARC_OUTER, ARC_INNER, 180, 270)
const ARC_RIGHT_PATH = ringSegmentPath(ARC_CX, ARC_CY, ARC_OUTER, ARC_INNER, 270, 360)
const ARC_LEFT_TEXT_PATH = arcLinePath(ARC_CX, ARC_CY, ARC_MID, 183, 267)
const ARC_RIGHT_TEXT_PATH = arcLinePath(ARC_CX, ARC_CY, ARC_MID, 273, 357)

const CONCEJAL_MODAL_HEADING = 'Un compromiso con el futuro de Tarija'

const CONCEJAL_MODAL_PARAGRAPHS = [
  'Tarija atraviesa un momento decisivo. Vivimos en un municipio con talento, creatividad, riqueza cultural, recursos naturales, universidades, emprendedores y sectores productivos con un enorme potencial. Sin embargo, durante muchos años esos esfuerzos han avanzado de manera aislada, sin una política pública capaz de articularlos y convertirlos en un verdadero motor de desarrollo.',
  'Con esa convicción nace el Proyecto de Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento. No es solamente una nueva norma; es una propuesta para construir una visión compartida de futuro, donde la innovación deje de ser un concepto y se convierta en una herramienta para generar oportunidades, empleo, inversión y bienestar para todos los tarijeños.',
  'Esta Ley ha sido concebida para las personas. Para el estudiante que sueña con desarrollar una idea innovadora, para el emprendedor que busca hacer crecer su negocio, para el productor que quiere agregar valor a su trabajo, para el investigador que genera conocimiento, para el artista que transforma la cultura en oportunidades, para las empresas que apuestan por la competitividad y para cada ciudadano que cree en una Tarija con más oportunidades y mejores condiciones para desarrollarse.',
  'Su propósito es consolidar un Ecosistema Municipal de Innovación, donde el Gobierno Municipal, las universidades, las empresas, los emprendedores, la sociedad civil y la cooperación trabajen de manera coordinada para impulsar proyectos de alto impacto y construir soluciones a los desafíos del municipio.',
  'Para lograrlo, la Ley incorpora herramientas modernas de gobernanza, planificación y articulación, como el Consejo Municipal del Ecosistema, las Mesas Temáticas, el Observatorio Municipal, el Plan Municipal para el Desarrollo del Ecosistema, la Agenda Estratégica Anual, el FabLab Tarija, los Distritos Creativos, la Plataforma Digital del Ecosistema y otros instrumentos diseñados para fortalecer el talento local, promover la innovación y generar nuevas oportunidades de desarrollo.',
  'Estoy convencido de que el progreso de Tarija no dependerá únicamente de sus recursos, sino de la capacidad de su gente para crear, colaborar, emprender e innovar. Por eso, esta Ley también es una invitación a participar. Ninguna política pública puede transformar una ciudad si no es construida con quienes la viven todos los días.',
  'Los invito a conocer este proyecto, aportar con sus ideas y ser parte de este proceso. Porque el futuro de Tarija no se espera: se construye juntos.',
]

const CONCEJAL_MODAL_HIGHLIGHT = {
  title: 'Un compromiso con el futuro de Tarija',
  text: 'Tarija tiene el talento, la creatividad y el potencial para convertirse en un referente de innovación y emprendimiento. Este Proyecto de Ley nace para transformar ese potencial en oportunidades, articulando al Gobierno Municipal, las universidades, las empresas, los emprendedores y la ciudadanía en un mismo propósito. A través de una visión compartida, una gobernanza colaborativa y herramientas innovadoras, busca impulsar el desarrollo sostenible, generar empleo de calidad y construir una economía basada en el conocimiento. Porque el futuro de Tarija no depende solo de sus recursos, sino de la capacidad de su gente para crear, innovar y emprender juntos.',
}


const SUPPORTERS = [
  { id: 'apoyo-1', name: 'Institución 1', logo: '/logos/oficina del concejal.png' },
  { id: 'apoyo-2', name: 'Institución 2', logo: '/logos/concejo municipal tarija.jpeg' },
  { id: 'apoyo-3', name: 'Institución 3', logo: '/logos/LOGO FAUTAPO.png' },
  { id: 'apoyo-4', name: 'Institución 4', logo: '/logos/ECOSIES TARIJA.png' },
  { id: 'apoyo-5', name: 'Institución 5', logo: '/logos/Logo Tarija Dialoga.png' },
  { id: 'apoyo-6', name: 'Institución 6', logo: '/logos/aniv.png' },
  { id: 'apoyo-7', name: 'Institución 7', logo: '/logos/federacion de empresarios.png' },
  { id: 'apoyo-8', name: 'Institución 8', logo: '/logos/comebol.png' },
  { id: 'apoyo-9', name: 'Institución 9', logo: '/logos/UPDS.png' },
  { id: 'apoyo-10', name: 'Institución 10', logo: '/logos/' },
  { id: 'apoyo-11', name: 'Institución 11', logo: '/logos/' },
  { id: 'apoyo-12', name: 'Institución 12', logo: '/logos/' },
  { id: 'apoyo-13', name: 'Institución 13', logo: '/logos/' },
]

function renderOverviewArticleContent(content: string) {
  const lines = content.split('\n').filter((line) => line.trim())
  const elements: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith('CAPÍTULO')) {
      elements.push(
        <div key={`chapter-${i}`} className="border-y-2 border-[#810100] bg-[#fbf0ec] py-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#810100]">Sistema Municipal</p>
          <h3 className="text-2xl font-black text-[#621b27]">{line}</h3>
        </div>,
      )
    } else if (line.match(/^Artículo\s+\d+/)) {
      const articleMatch = line.match(/^(Artículo\s+\d+)\.?\s*\((.*?)\)(.*)/)
      if (articleMatch) {
        elements.push(
          <div key={`article-${i}`} className="mt-6 mb-4 rounded-xl border-l-4 border-[#810100] bg-gradient-to-r from-[#fbf0ec] to-[#fff5f1] p-4">
            <div className="flex items-start gap-3">
              <FileText size={20} className="mt-1 shrink-0 text-[#810100]" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#810100]">{articleMatch[1]}</p>
                <h4 className="text-lg font-bold text-[#621b27]">({articleMatch[2]})</h4>
              </div>
            </div>
          </div>,
        )
      }
    } else if (line.match(/^[IVX]+\./)) {
      elements.push(
        <div key={`roman-${i}`} className="ml-4 mt-4 border-l-2 border-[#dfa0a0] pl-4">
          <p className="text-sm leading-7 text-[#441f25]">
            <span className="font-bold text-[#810100]">{line.substring(0, line.indexOf('.') + 1)}</span>
            {line.substring(line.indexOf('.') + 1)}
          </p>
        </div>,
      )
    } else if (line.match(/^[a-z]\)/)) {
      elements.push(
        <div key={`letter-${i}`} className="mt-2 ml-8">
          <p className="text-sm leading-7 text-[#441f25]">
            <span className="font-bold text-[#810100]">{line.substring(0, line.indexOf(')') + 1)}</span>
            {line.substring(line.indexOf(')') + 1)}
          </p>
        </div>,
      )
    } else if (line.match(/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/) && line.length > 10 && !line.includes('Artículo') && !line.startsWith('I.')) {
      elements.push(
        <div key={`title-${i}`} className="mt-6 mb-4">
          <h3 className="text-xl font-bold uppercase tracking-wide text-[#621b27]">{line}</h3>
        </div>,
      )
    } else if (line.length > 0) {
      elements.push(
        <p key={`text-${i}`} className="text-sm leading-7 text-[#441f25]">
          {line}
        </p>,
      )
    }
  }

  return elements
}

export default function Overview({
  onNavigate,
  isOriginModalOpen,
  onOpenOriginModal,
  onCloseOriginModal,
}: {
  onNavigate: (id: string) => void
  isOriginModalOpen: boolean
  onOpenOriginModal: () => void
  onCloseOriginModal: () => void
}) {
  const [activeClip, setActiveClip] = useState(0)
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null)
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null)
  const [playingMesa, setPlayingMesa] = useState<string | null>(null)
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null)
  const [isConcejalInfoOpen, setConcejalInfoOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [mesaPage, setMesaPage] = useState(0)
  const [podcastPage, setPodcastPage] = useState(0)
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[0] | null>(null)
  const [isArticleModalOpen, setArticleModalOpen] = useState(false)
  const concejalCardRef = useRef<HTMLDivElement | null>(null)

  // Formulario "Envíanos un Mensaje" (sección Home, antes de "Con el apoyo de")
  const [contactPhone, setContactPhone] = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const MESAS_PER_PAGE = 2
  const mesaPageCount = Math.max(1, Math.ceil(MESAS_DEBATE.length / MESAS_PER_PAGE))
  const podcastPageCount = Math.max(1, Math.ceil(PODCAST_EPISODES.length / MESAS_PER_PAGE))
  const visibleMesas = MESAS_DEBATE.slice(mesaPage * MESAS_PER_PAGE, mesaPage * MESAS_PER_PAGE + MESAS_PER_PAGE)
  const visiblePodcasts = PODCAST_EPISODES.slice(
    podcastPage * MESAS_PER_PAGE,
    podcastPage * MESAS_PER_PAGE + MESAS_PER_PAGE,
  )

  const goTo = (index: number) => setActiveClip((index + HERO_CLIPS.length) % HERO_CLIPS.length)

  const openConcejalInfo = () => {
    setConcejalInfoOpen(true)
    onOpenOriginModal()
  }

  const closeConcejalInfo = () => {
    setConcejalInfoOpen(false)
    onCloseOriginModal()
    window.setTimeout(() => {
      concejalCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  useEffect(() => {
    if (isOriginModalOpen) {
      setConcejalInfoOpen(true)
    }
  }, [isOriginModalOpen])

  // Necesario para que createPortal solo se ejecute en el cliente (document existe)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Bloquea el scroll del body mientras el modal está abierto, y lo restaura al cerrar.
  // Esto evita saltos raros y hace que el modal siempre quede centrado en la pantalla visible.
  useEffect(() => {
    if (!isConcejalInfoOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isConcejalInfoOpen])

  const handleAxisToggle = (axisId: string) => {
    setSelectedAxis((current) => (current === axisId ? null : axisId))
    requestAnimationFrame(() => {
      document.getElementById('ejes-programaticos-detalle')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  const handleInstrumentToggle = (instrumentId: string) => {
    setSelectedInstrument((current) => (current === instrumentId ? null : instrumentId))
    requestAnimationFrame(() => {
      document.getElementById('instrumentos-detalle')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  const handleArticleClick = (range: string) => {
    // Normalizar el rango: convertir "37 al 42" -> "37 al 42", etc.
    const normalizedRange = range.trim()
    const article = getArticleByRange(normalizedRange)
    if (article) {
      setSelectedArticle(article)
      setArticleModalOpen(true)
    }
  }

  const closeArticleModal = () => {
    setArticleModalOpen(false)
    window.setTimeout(() => {
      setSelectedArticle(null)
    }, 300)
  }

  // Envío del formulario de contacto ubicado en el Home, antes de "Con el apoyo de"
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactStatus('sending')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          telefono: data.get('telefono'),
          email: data.get('email'),
          asunto: data.get('asunto'),
          mensaje: data.get('mensaje'),
        }),
      })

      if (!response.ok) throw new Error('No se pudo enviar')

      setContactStatus('sent')
      form.reset()
      setContactPhone('')
    } catch (error) {
      setContactStatus('error')
    }
  }

  // Componente helper para renderizar texto con botones de artículos
  const renderDescriptionWithArticleLinks = (text: string) => {
    // Patrón flexible que captura "art. XX al YY de la ley" o variaciones
    const articlePattern = /\(art\.\s+([^)]+)\s+de la ley\)/gi
    const parts = text.split(articlePattern)

    return (
      <>
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return <span key={index}>{part}</span>
          } else {
            // part contiene el rango, ej: "37 al 42", "24", etc.
            const range = part.trim()
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleArticleClick(range)}
                className="ml-1 inline-flex items-center gap-1 rounded-md bg-[#810100] px-2 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-[#630000]"
                title={`Ver artículos ${range}`}
              >
                art. {range}
              </button>
            )
          }
        })}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Presentación */}
      <div className="relative overflow-hidden rounded-xl border border-[#e0e0e0] shadow-sm">
        <div className="relative flex flex-col justify-start bg-gradient-to-br from-[#630000] via-[#810100] to-[#A01400] px-6 py-4 sm:px-8 sm:py-6">
          {/* Foto del Concejo Municipal de Tarija — reemplaza /public/hero-inicio.jpg por la foto real */}
          <img
            src="/hero-tarija.jpg"
            alt="Concejo Municipal de Tarija"
            className="absolute inset-0 size-full object-cover"
            onError={(e) => {
              // Si aún no subiste /public/hero-inicio.jpg, se mantiene el degradado de fondo
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#630000]/90 via-[#810100]/50 to-[#810100]/10" />

          <div className="relative flex flex-col gap-2 pt-2 pb-2">
            <h1 className="max-w-3xl text-3xl leading-[1.10] font-extrabold tracking-tight text-white sm:text-3xl">
              PROYECTO DE LEY MUNICIPAL DE INNOVACIÓN,<br />
              <span className="text-[#FFB199] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">CREATIVIDAD, EMPRENDIMIENTO Y ECONOMÍA DEL</span><br />
              CONOCIMIENTO DEL MUNICIPIO DE TARIJA
            </h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
              <div
        id="origen-de-la-ley"
        ref={concejalCardRef}
        className="grid grid-cols-1 gap-6 rounded-xl border border-[#D8A7A7] bg-white p-6 shadow-sm sm:grid-cols-2 sm:items-center"
      >
        {/* Mitad izquierda: foto grande (no circular) + nombre debajo */}
        <div className="flex flex-col items-center gap-3 text-center sm:border-r sm:border-[#f0e2e2] sm:pr-6">
          <button
            type="button"
            onClick={openConcejalInfo}
            aria-label="Ver más información sobre el origen de la Ley"
            className="group w-full overflow-hidden rounded-2xl transition hover:opacity-90"
          >
            <img
              src={CONCEJAL.photo}
              alt={CONCEJAL.name}
              className="aspect-[4/5] w-full border border-[#D8A7A7] object-cover object-top transition group-hover:border-[#810100]"
            />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1E1E1E]">{CONCEJAL.name}</span>
            <span className="text-xs text-gray-500">{CONCEJAL.role}</span>
          </div>
        </div>

        {/* Mitad derecha: información + botón */}
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-left text-lg font-bold text-[#1E1E1E]">
            Origen de la Ley: ¿Por qué fue creada?
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">{CONCEJAL.originSummary}</p>
          <button
            type="button"
            onClick={openConcejalInfo}
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#810100] bg-[#fff5f2] px-4 py-2 text-sm font-semibold text-[#810100] transition hover:bg-[#f3dfd8]"
          >
            Más información
          </button>
        </div>
      </div>

        <div className="flex flex-col gap-4 rounded-xl border border-[#D8A7A7] bg-white p-6 shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[#F8F1E7] text-[#5B0F18]">
            <FileText aria-hidden="true" size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#1E1E1E]">PROYECTO DE LEY MUNICIPAL DE INNOVACIÓN, CREATIVIDAD, EMPRENDIMIENTO Y ECONOMÍA DEL CONOCIMIENTO DEL MUNICIPIO DE TARIJA</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Esta Ley impulsa un nuevo modelo de desarrollo para Tarija, basado en la innovación, la creatividad, el emprendimiento y la colaboración entre los actores del Ecosistema Municipal, generando las condiciones para transformar el talento en oportunidades y desarrollo sostenible.
            Conoce la propuesta completa y descubre cómo juntos podemos construir el futuro de Tarija...

          </p>
          <button
            type="button"
            onClick={() => onNavigate('ley')}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#7A1F2B] hover:text-[#1E1E1E]"
          >
            Leer la Ley completa
            <ArrowRight aria-hidden="true" size={14} />
          </button>
        </div>
      </div>
      {/* Carrusel de video principal */}
      <div className="my-4 text-center">
        <h2 className="text-4xl font-black text-[#621b27] mb-2">Construyamos la Ley</h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">Conoce los detalles de la Ley Municipal de Innovación a través de videos, presentaciones y recursos audiovisuales.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative flex items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => goTo(activeClip - 1)}
            aria-label="Video anterior"
            className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5] sm:size-9"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>

          {/* Miniatura anterior (asoma a la izquierda) */}
          <button
            type="button"
            onClick={() => goTo(activeClip - 1)}
            aria-label={`Ver: ${HERO_CLIPS[(activeClip - 1 + HERO_CLIPS.length) % HERO_CLIPS.length].title}`}
            className="hidden aspect-video w-[14%] shrink-0 overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-[#1E1E1E] to-[#5B0F18] opacity-75 transition-opacity hover:opacity-100 sm:block"
          >
            <div className="relative size-full">
              <img
                src={getYoutubeThumbnailUrl(HERO_CLIPS[(activeClip - 1 + HERO_CLIPS.length) % HERO_CLIPS.length].youtubeUrl) ?? undefined}
                alt={HERO_CLIPS[(activeClip - 1 + HERO_CLIPS.length) % HERO_CLIPS.length].title}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-3 text-left text-white">
                <div className="flex items-center justify-center">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play aria-hidden="true" size={16} className="ml-0.5" />
                  </span>
                </div>
                <div>
                  <p className="line-clamp-2 text-[10px] font-semibold leading-tight">
                    {HERO_CLIPS[(activeClip - 1 + HERO_CLIPS.length) % HERO_CLIPS.length].title}
                  </p>
                  <span className="mt-1 inline-flex text-[9px] text-white/80">
                    {HERO_CLIPS[(activeClip - 1 + HERO_CLIPS.length) % HERO_CLIPS.length].duration}
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Video activo (grande, al centro) */}
          <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-[#810100] bg-white shadow-md">
            {getYoutubeEmbedUrl(HERO_CLIPS[activeClip].youtubeUrl) ? (
              <iframe
                key={HERO_CLIPS[activeClip].id}
                src={getYoutubeEmbedUrl(HERO_CLIPS[activeClip].youtubeUrl)!}
                title={HERO_CLIPS[activeClip].title}
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative flex size-full items-center justify-center bg-gradient-to-br from-[#1E1E1E] via-[#5B0F18] to-[#7A1F2B]">
                <button
                  type="button"
                  title="Video pendiente de publicación"
                  className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <Play aria-hidden="true" size={26} className="ml-1" />
                </button>
                <p className="absolute bottom-6 px-6 text-center text-sm font-medium text-white/85">
                  {HERO_CLIPS[activeClip].title}
                </p>
                <span className="absolute right-3 bottom-3 rounded bg-black/40 px-2 py-1 text-xs text-white/85">
                  {HERO_CLIPS[activeClip].duration}
                </span>
                <span className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-xs text-white/85">
                  {activeClip + 1}/{HERO_CLIPS.length}
                </span>
              </div>
            )}
          </div>

          {/* Miniatura siguiente (asoma a la derecha) */}
          <button
            type="button"
            onClick={() => goTo(activeClip + 1)}
            aria-label={`Ver: ${HERO_CLIPS[(activeClip + 1) % HERO_CLIPS.length].title}`}
            className="hidden aspect-video w-[14%] shrink-0 overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-[#7A1F2B] to-[#1E1E1E] opacity-75 transition-opacity hover:opacity-100 sm:block"
          >
            <div className="relative size-full">
              <img
                src={getYoutubeThumbnailUrl(HERO_CLIPS[(activeClip + 1) % HERO_CLIPS.length].youtubeUrl) ?? undefined}
                alt={HERO_CLIPS[(activeClip + 1) % HERO_CLIPS.length].title}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-3 text-left text-white">
                <div className="flex items-center justify-center">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play aria-hidden="true" size={16} className="ml-0.5" />
                  </span>
                </div>
                <div>
                  <p className="line-clamp-2 text-[10px] font-semibold leading-tight">
                    {HERO_CLIPS[(activeClip + 1) % HERO_CLIPS.length].title}
                  </p>
                  <span className="mt-1 inline-flex text-[9px] text-white/80">
                    {HERO_CLIPS[(activeClip + 1) % HERO_CLIPS.length].duration}
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => goTo(activeClip + 1)}
            aria-label="Video siguiente"
            className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5] sm:size-9"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>

        {/* Indicadores (puntos) */}
        <div className="flex items-center justify-center gap-2">
          {HERO_CLIPS.map((clip, index) => (
            <button
              key={clip.id}
              type="button"
              onClick={() => setActiveClip(index)}
              aria-label={`Ir al video ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === activeClip ? 'w-6 bg-[#810100]' : 'w-2 bg-[#e0e0e0] hover:bg-[#810100]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arquitectura Institucional arriba y el resto abajo en el orden solicitado */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-lg font-bold text-[#1E1E1E]">ARQUITECTURA DE LEY</h2>
          </div>

          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="border-b border-[#D8A7A7] xl:border-r xl:border-b-0">
              <div className="bg-[#1E1E1E] px-5 py-3 text-left text-white">
                <h3 id="ejes-programaticos-permanentes" className="text-base font-semibold tracking-wide uppercase">Ejes programáticos permanentes</h3>
                <p className="mt-1 text-[10px] text-white/75"></p>
              </div>
              <div className="bg-white">
                {PROGRAMMATIC_AXES.map((item) => {
                  const Icon = item.icon
                  const isOpen = selectedAxis === item.id

                  return (
                    <div key={item.id} className="border-b border-[#e8dede] last:border-b-0">
                      <button
                        type="button"
                        onClick={() => handleAxisToggle(item.id)}
                        className="w-full px-4 py-4 text-left transition-colors hover:bg-[#faf3f1]"
                        aria-expanded={isOpen}
                      >
                        <div className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-[#810100] uppercase">
                          {item.shortLabel}
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#D8A7A7] bg-[#F8F1E7] text-[#810100]">
                            <Icon aria-hidden="true" size={20} />
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-[15px] font-semibold leading-tight text-[#810100] sm:text-[16px]">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-[12px] leading-relaxed text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          id="ejes-programaticos-detalle"
                          className="px-4 pb-4 text-[13px] leading-relaxed text-gray-700"
                        >
                          {renderDescriptionWithArticleLinks(item.description)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ==================== DIAGRAMA "CONSEJO MUNICIPAL DE INNOVACIÓN" (más espaciado) ==================== */}
            <div className="flex flex-col gap-4 p-4 xl:p-6">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 id="consejo-municipal-innovacion" className="text-sm font-bold tracking-wide text-[#1E1E1E] uppercase">
                  Consejo Municipal de Innovación y Emprendimiento
                </h3>
                <p className="text-[11px] text-gray-500">Estructura y actores del Ecosistema Municipal</p>
              </div>

              <div className="rounded-[2rem] border border-[#ead9d3] bg-white px-4 py-6 shadow-[0_20px_60px_rgba(98,27,39,0.08)] sm:px-8 sm:py-8">
                <div className="relative mx-auto h-[580px] max-w-[700px] sm:h-[620px]">
                  {/* Botones superiores: Agenda / Plan Municipal (forzados a 3 líneas) */}
                  <button
                    type="button"
                    aria-label="Ver Agenda Estratégica de Innovación"
                    onClick={() => onNavigate('ecosistema')}
                    className="absolute left-[3%] top-2 z-10 w-[37%] rounded-xl border border-[#d7a3a1] bg-[#fffaf8] px-3 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#8c2432] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8c2432] hover:bg-[#fff3f1] sm:text-xs"
                  >
                    Agenda<br />Estratégica Anual<br />del Ecosistema
                  </button>
                  <button
                    type="button"
                    aria-label="Ver Plan Municipal para el Desarrollo del Ecosistema"
                    onClick={() => onNavigate('ecosistema')}
                    className="absolute right-[3%] top-2 z-10 w-[37%] rounded-xl border border-[#d7a3a1] bg-[#fffaf8] px-3 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#8c2432] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8c2432] hover:bg-[#fff3f1] sm:text-xs"
                  >
                    Plan Municipal<br />para el Desarrollo<br />del Ecosistema
                  </button>

                  {/* Arcos decorativos: más abajo y más pequeños para no chocar con los botones ni el título */}
                  <div className="absolute left-1/2 top-[14%] h-[100px] w-[84%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#c77d80]" />
                  <div className="absolute left-1/2 top-[16%] h-[100px] w-[84%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#e4b1ae]" />
                  <div className="absolute left-1/2 top-[9%] h-7 w-px -translate-x-1/2 bg-[#8c2432]" />

                  <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 620" aria-hidden="true">
                    {/* Flecha hacia "Agenda Estratégica Anual del Ecosistema" (más arriba, más corta) */}
                <path d="M 185 45 Q 160 25 150 4" stroke="#d39495" strokeWidth="2" fill="none" />
                <path d="M 150 0 L 142 15 L 158 15 Z" fill="#d39495" />

                <path d="M 515 45 Q 540 25 550 4" stroke="#d39495" strokeWidth="2" fill="none" />
                <path d="M 550 0 L 542 15 L 558 15 Z" fill="#d39495" />
                  </svg>

                  {/* Título central: con más espacio respecto al arco */}
                  <div className="absolute left-1/2 top-[33%] w-full -translate-x-1/2 text-center text-sm font-bold leading-5 text-[#241f20] sm:text-base">
                    Consejo Municipal de Innovación<br />y Emprendimiento
                  </div>

                  {/* Círculo "Actores" */}
                  <button
                    type="button"
                    onClick={() => onNavigate('ecosistema')}
                    aria-label="Ver Actores"
                    className="absolute left-1/2 top-[43%] flex h-44 w-44 -translate-x-1/2 flex-col items-center justify-center rounded-full border-[3px] border-[#8c2432] bg-[#8c2432] text-white shadow-[0_14px_28px_rgba(140,36,50,0.2)] transition hover:scale-[1.02] sm:h-48 sm:w-48"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.28em]">Actores</span>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[Building2, Briefcase, GraduationCap, Handshake, Target, Users].map((Icon, index) => (
                        <span key={index} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a94d5b] sm:h-10 sm:w-10">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Líneas hacia los círculos inferiores */}
                  <div className="absolute left-[18%] top-[74%] h-16 w-[31%] -rotate-[22deg] border-t border-[#d39495]" />
                  <div className="absolute left-1/2 top-[74%] h-16 -translate-x-1/2 border-l border-[#d39495]" />
                  <div className="absolute right-[18%] top-[74%] h-16 w-[31%] rotate-[22deg] border-t border-[#d39495]" />

                  {/* Círculos inferiores: Secretaría / Observatorio / Mesas */}
                  {[
                    ['secretaria', 'Secretaría', 'Técnica', Building2, 'left-[4%]'],
                    ['observatorio', 'Observatorio', 'Municipal', Eye, 'left-1/2 -translate-x-1/2'],
                    ['mesas', 'Mesas', 'Técnicas', Users, 'right-[4%]'],
                  ].map(([id, line1, line2, Icon, position]) => (
                    <button
                      key={id as string}
                      type="button"
                      onClick={() => onNavigate('ecosistema')}
                      className={`absolute ${position} top-[88%] flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-[#dfa0a0] bg-[#fffdfb] text-[10px] font-semibold text-[#241f20] shadow-sm transition hover:-translate-y-1 hover:bg-[#fff5f1] sm:h-24 sm:w-24`}
                    >
                      <Icon size={21} className="mb-2" strokeWidth={1.8} aria-hidden="true" />
                      <span>{line1 as string}</span>
                      <span>{line2 as string}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('ecosistema')}
                className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full bg-[#810100] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#630000]"
              >
                Ver arquitectura completa
                <ArrowUpRight aria-hidden="true" size={14} />
              </button>
            </div>
            {/* ==================== FIN DIAGRAMA ==================== */}

            <div className="border-t border-[#D8A7A7] xl:border-l xl:border-t-0">
              <div className="bg-[#1E1E1E] px-5 py-3 text-left text-white">
                <h3 id="instrumentos-estrategicos" className="text-base font-semibold tracking-wide uppercase">
                  Instrumentos Estratégicos
                </h3>
                <p className="mt-1 text-[10px] text-white/75">
                 
                </p>
              </div>
              <div className="bg-white">
                {INSTRUMENTS.map((item) => {
                  const Icon = item.icon
                  const isOpen = selectedInstrument === item.id

                  return (
                    <div key={item.id} className="border-b border-[#e8dede] last:border-b-0">
                      <button
                        type="button"
                        onClick={() => handleInstrumentToggle(item.id)}
                        className="w-full px-4 py-4 text-left transition-colors hover:bg-[#faf3f1]"
                        aria-expanded={isOpen}
                      >
                        <div className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-[#810100] uppercase">
                          {item.shortLabel}
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#D8A7A7] bg-[#F8F1E7] text-[#810100]">
                            <Icon aria-hidden="true" size={20} />
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-[15px] font-semibold leading-tight text-[#810100] sm:text-[16px]">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-[12px] leading-relaxed text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          id="instrumentos-detalle"
                          className="px-4 pb-4 text-[13px] leading-relaxed text-gray-700"
                        >
                          {renderDescriptionWithArticleLinks(item.description)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

       

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mesas de Debate — carrusel de 2 videos */}
          <div className="flex flex-col gap-5 rounded-xl border border-[#D8A7A7] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#1E1E1E]">Mesas de Debate</h2>
              <span className="text-xs font-semibold tracking-wide text-[#810100] uppercase">
             
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
{visibleMesas.map((mesa) => {
              const Icon = mesa.icon
              const embedUrl = getYoutubeEmbedUrl(mesa.youtubeUrl)
              const thumbnailUrl = getYoutubeThumbnailUrl(mesa.youtubeUrl)
              const isPlaying = playingMesa === mesa.id

              return (
                <article
                  key={mesa.id}
                  className="overflow-hidden rounded-xl border border-[#D8A7A7] bg-[#fffdfb] shadow-sm transition-transform hover:-translate-y-0.5"
                >
<div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#5B0F18] to-[#7A1F2B]">
                    {isPlaying && embedUrl ? (
                      <iframe
                        src={`${embedUrl}?autoplay=1`}
                        title={mesa.titulo}
                        className="absolute inset-0 size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt={mesa.titulo}
                            className="absolute inset-0 size-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            title={embedUrl ? `Reproducir ${mesa.titulo}` : 'Video pendiente de publicación'}
                            onClick={() => {
                              if (embedUrl) {
                                setPlayingMesa(mesa.id)
                              }
                            }}
                            className={`flex size-12 items-center justify-center rounded-full border border-white/60 bg-white/20 text-white transition-colors ${
                              embedUrl ? 'hover:bg-white/30' : 'cursor-default opacity-60'
                            }`}
                          >
                            <Play aria-hidden="true" size={18} className="ml-0.5" />
                          </button>
                        </div>
                        <span className="absolute right-2 bottom-2 rounded bg-black/45 px-2 py-1 text-[10px] font-semibold text-white uppercase">
                          Mesa-{mesa.numero}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#1E1E1E] text-white">
                        <Icon aria-hidden="true" size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-widest text-[#810100] uppercase">
                          Mesa-Desafío {mesa.numero}
                        </p>
                        <h3 className="text-sm font-bold leading-snug text-[#1E1E1E]">{mesa.titulo}</h3>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-gray-600">{mesa.descripcion}</p>

                    <div className="mt-auto flex items-center justify-between border-t border-[#f0e2e2] pt-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        YouTube
                      </span>
{embedUrl ? (
                        <button
                          type="button"
                          onClick={() => setPlayingMesa(mesa.id)}
                          className="inline-flex items-center gap-1 rounded-md bg-[#810100] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#630000]"
                        >
                          <Play aria-hidden="true" size={12} className="ml-0.5" />
                          Ver
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400">Pendiente</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setMesaPage((page) => (page - 1 + mesaPageCount) % mesaPageCount)}
                aria-label="Mesas anteriores"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5]"
              >
                <ChevronLeft aria-hidden="true" size={16} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: mesaPageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMesaPage(index)}
                    aria-label={`Ir a la página ${index + 1} de mesas`}
                    className={`h-2 rounded-full transition-all ${
                      index === mesaPage ? 'w-6 bg-[#810100]' : 'w-2 bg-[#e0e0e0] hover:bg-[#810100]'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setMesaPage((page) => (page + 1) % mesaPageCount)}
                aria-label="Siguientes mesas"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5]"
              >
                <ChevronRight aria-hidden="true" size={16} />
              </button>
            </div>
          </div>

          {/* Podcast — carrusel de 2 videos */}
          <div className="flex flex-col gap-5 rounded-xl border border-[#D8A7A7] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#1E1E1E]">Podcast</h2>
              <span className="text-xs font-semibold tracking-wide text-[#810100] uppercase">
           
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
{visiblePodcasts.map((episode) => {
            const embedUrl = getYoutubeEmbedUrl(episode.youtubeUrl)
            const thumbnailUrl = getYoutubeThumbnailUrl(episode.youtubeUrl)
            const isPlaying = playingEpisode === episode.id

            return (
              <article
                key={episode.id}
                className="overflow-hidden rounded-xl border border-[#D8A7A7] bg-[#fffdfb] shadow-sm transition-transform hover:-translate-y-0.5"
              >
<div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#5B0F18] to-[#7A1F2B]">
                  {isPlaying && embedUrl ? (
                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title={episode.titulo}
                      className="absolute inset-0 size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={episode.titulo}
                          className="absolute inset-0 size-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          title={embedUrl ? `Reproducir ${episode.titulo}` : 'Video pendiente de publicación'}
                          onClick={() => {
                            if (embedUrl) {
                              setPlayingEpisode(episode.id)
                            }
                          }}
                          className={`flex size-12 items-center justify-center rounded-full border border-white/60 bg-white/20 text-white transition-colors ${
                            embedUrl ? 'hover:bg-white/30' : 'cursor-default opacity-60'
                          }`}
                        >
                          <Play aria-hidden="true" size={18} className="ml-0.5" />
                        </button>
                      </div>
                      <span className="absolute right-2 bottom-2 rounded bg-black/45 px-2 py-1 text-[10px] font-semibold text-white uppercase">
                        {episode.duracion}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#1E1E1E] text-white">
                      <Video aria-hidden="true" size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold tracking-widest text-[#810100] uppercase">
                        Podcast
                      </p>
                      <h3 className="text-sm font-bold leading-snug text-[#1E1E1E]">{episode.titulo}</h3>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-600">{episode.descripcion}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-[#f0e2e2] pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                      YouTube
                    </span>
{embedUrl ? (
                        <button
                          type="button"
                          onClick={() => setPlayingEpisode(episode.id)}
                          className="inline-flex items-center gap-1 rounded-md bg-[#810100] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#630000]"
                        >
                          <Play aria-hidden="true" size={12} className="ml-0.5" />
                          Ver
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400">Pendiente</span>
                      )}
                  </div>
                </div>
              </article>
            )
          })}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setPodcastPage((page) => (page - 1 + podcastPageCount) % podcastPageCount)}
                aria-label="Episodios anteriores"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5]"
              >
                <ChevronLeft aria-hidden="true" size={16} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: podcastPageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPodcastPage(index)}
                    aria-label={`Ir a la página ${index + 1} de episodios`}
                    className={`h-2 rounded-full transition-all ${
                      index === podcastPage ? 'w-6 bg-[#810100]' : 'w-2 bg-[#e0e0e0] hover:bg-[#810100]'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPodcastPage((page) => (page + 1) % podcastPageCount)}
                aria-label="Siguientes episodios"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#810100] bg-white text-[#810100] shadow-sm transition-colors hover:bg-[#f5f5f5]"
              >
                <ChevronRight aria-hidden="true" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Envíanos un Mensaje — layout horizontal (Nombre/Teléfono, Email, Asunto | Mensaje + botón) */}
      <div className="rounded-xl border border-[#D8A7A7] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#1E1E1E]">Envíanos un Mensaje</h2>
        <form onSubmit={handleContactSubmit} className="grid gap-6 lg:grid-cols-2">
          {/* Columna izquierda: Nombre + Teléfono, Email, Asunto */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1E1E1E]">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  className="w-full rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] px-4 py-2 text-[#1E1E1E] placeholder-gray-500 focus:border-[#7A1F2B] focus:outline-none"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1E1E1E]">Teléfono / Celular</label>
                <div className="flex overflow-hidden rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] focus-within:border-[#7A1F2B]">
                  <span className="flex items-center border-r border-[#D8A7A7] px-3 text-sm font-semibold text-[#5B0F18]">
                    +591
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    className="w-full bg-transparent px-4 py-2 text-[#1E1E1E] placeholder-gray-500 outline-none"
                    placeholder="70000000"
                  />
                </div>
                {/* Campo real que se envía en el formulario, ya con el prefijo incluido */}
                <input type="hidden" name="telefono" value={contactPhone ? `+591 ${contactPhone}` : ''} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1E1E1E]">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] px-4 py-2 text-[#1E1E1E] placeholder-gray-500 focus:border-[#7A1F2B] focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1E1E1E]">Asunto</label>
              <input
                type="text"
                name="asunto"
                required
                className="w-full rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] px-4 py-2 text-[#1E1E1E] placeholder-gray-500 focus:border-[#7A1F2B] focus:outline-none"
                placeholder="Asunto del mensaje"
              />
            </div>
          </div>

          {/* Columna derecha: Mensaje (grande) + botón debajo */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col">
              <label className="mb-2 block text-sm font-semibold text-[#1E1E1E]">Mensaje</label>
              <textarea
                name="mensaje"
                required
                className="min-h-[160px] w-full flex-1 resize-none rounded-lg border border-[#D8A7A7] bg-[#F8F1E7] px-4 py-2 text-[#1E1E1E] placeholder-gray-500 focus:border-[#7A1F2B] focus:outline-none"
                placeholder="Tu mensaje"
              />
            </div>

            <button
              type="submit"
              disabled={contactStatus === 'sending'}
              className="w-full rounded-lg bg-gradient-to-r from-[#5B0F18] to-[#7A1F2B] px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
            >
              {contactStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {contactStatus === 'sent' && (
              <p className="text-sm font-semibold text-green-700">
                ¡Mensaje enviado! Te responderemos a la brevedad.
              </p>
            )}
            {contactStatus === 'error' && (
              <p className="text-sm font-semibold text-red-700">
                Hubo un problema al enviar tu mensaje. Intenta de nuevo en unos minutos.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Con el apoyo de */}
      <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1E1E1E]">Con el apoyo de:</h2>
          <p className="mt-2 text-sm text-gray-600">Instituciones que respaldan este proyecto de ley</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {SUPPORTERS.map((supporter) => (
            <div
              key={supporter.id}
              className="group flex items-center justify-center py-6"
            >
              <img
                src={supporter.logo}
                alt={supporter.name}
                title={supporter.name}
                className="h-32 w-auto max-w-full object-contain transition-all duration-300 ease-out group-hover:scale-110 sm:h-36 sm:grayscale sm:group-hover:grayscale-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <Building2
                aria-hidden="true"
                size={72}
                className="hidden text-[#c9a3a3] transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-[#810100]"
              />
            </div>
          ))}
        </div>
      </div>

      {/*
        MODAL "Más información" del Concejal.
       
      */}
      {isMounted && isConcejalInfoOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6 sm:px-6"
              onClick={closeConcejalInfo}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto overflow-x-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeConcejalInfo}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 z-10 rounded-full border border-[#e8dede] bg-white px-3 py-2 text-sm font-semibold text-[#1E1E1E] shadow-sm transition hover:bg-[#f9f9f9]"
                >
                  Cerrar
                </button>

                <div className="p-6 pt-10 sm:p-6 sm:pt-10">
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <span className="h-7 w-1.5 shrink-0 rounded-full bg-[#810100]" />
                    <h2 className="max-w-2xl text-xl font-bold text-[#1E1E1E] sm:text-2xl">{CONCEJAL_MODAL_HEADING}</h2>
                  </div>

              <div className="float-left mb-4 mr-6 w-36 sm:w-40">
                <img
                  src={CONCEJAL.photo}
                  alt={CONCEJAL.name}
                  className="aspect-square w-full rounded-lg border border-[#e8dede] bg-[#f8f1e7] object-contain"
                />
                <div className="mt-2 text-left">
                  <p className="text-xs font-bold leading-tight text-[#1E1E1E]">{CONCEJAL.name}</p>
                  <p className="mt-0.5 text-xs leading-tight text-gray-600">{CONCEJAL.role}</p>
                  <p className="text-xs leading-tight text-gray-600">Concejo Municipal de Tarija</p>
                </div>
              </div>

                  {/* Entradilla: primer párrafo destacado para dar entrada a la lectura */}
                  <p className="mb-4 text-justify text-[15px] font-medium leading-relaxed text-[#5B0F18]">
                    {CONCEJAL_MODAL_PARAGRAPHS[0]}
                  </p>

                  {CONCEJAL_MODAL_PARAGRAPHS.slice(1, 5).map((paragraph, index) => (
                    <p key={index} className="mb-3 text-justify text-sm leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  ))}

                  {/* Cita destacada a mitad del texto */}
                  <div className="clear-both my-5 flex gap-3 rounded-2xl border-l-4 border-[#810100] bg-[#fff5f2] px-4 py-4">
                    <Quote aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-[#810100]" />
                    <p className="text-sm italic leading-relaxed text-[#5B0F18]">
                      {CONCEJAL_MODAL_PARAGRAPHS[5]}
                    </p>
                  </div>

                  <p className="mb-1 text-justify text-sm leading-relaxed text-gray-700">
                    {CONCEJAL_MODAL_PARAGRAPHS[6]}
                  </p>
                  <p className="text-right text-xs font-semibold text-[#810100]">— {CONCEJAL.name}</p>

                  <div className="clear-both" />
                </div>

                <div className="mx-6 mb-6 flex gap-3 rounded-3xl border border-[#e8dede] bg-[#faf5f2] p-5 sm:mx-8 sm:mb-8">
                  <Quote aria-hidden="true" size={28} className="shrink-0 text-[#d8a7a7]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#810100]">
                      {CONCEJAL_MODAL_HIGHLIGHT.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{CONCEJAL_MODAL_HIGHLIGHT.text}</p>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {/* Modal de Artículos */}
      {isMounted && isArticleModalOpen && selectedArticle
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 sm:px-6"
              onClick={closeArticleModal}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeArticleModal}
                  aria-label="Cerrar"
                  className="sticky top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#810100] text-white shadow-lg transition hover:bg-[#630000]"
                >
                  <X size={20} />
                </button>

                <div className="p-6 sm:p-10">
                  <div className="mb-8 text-center">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#8c2432]">
                      Artículos
                    </p>
                    <h2 className="mb-2 text-3xl font-black text-[#621b27]">
                      {selectedArticle.range}
                    </h2>
                    <p className="text-lg font-bold text-[#810100]">{selectedArticle.title}</p>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#810100]" />
                  </div>

                  <div className="space-y-6">
                    {renderOverviewArticleContent(selectedArticle.content)}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}