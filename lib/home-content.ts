import type { LucideIcon } from 'lucide-react'
import { Briefcase, GraduationCap, Landmark, Rocket } from 'lucide-react'

/** Datos del concejal impulsor de la Ley — reemplazar foto y ampliar bio cuando estén disponibles */
export const CONCEJAL = {
  name: 'Lic. Renan Justiniano Arce',
  role: 'Concejal Municipal de Tarija',
  motto: 'Generando Oportunidades Para Nuestra Gente',
  photo: '/concejal-renan.jpg',
  email: 'renanjustiniano@tarijaunida.com',
  phone: '71863543',
  summary:
    'Impulsor de la Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento, presentada ante el Concejo Municipal de Tarija como marco para fortalecer el talento local y la transformación productiva del municipio.',
  originSummary:
    'La Ley nace para dar a Tarija un marco institucional permanente que articule a universidades, emprendedores, empresas y organizaciones sociales en torno a la innovación, evitando que las buenas iniciativas queden aisladas o dependan de un solo gobierno.',
  details: [
    'Tarija atraviesa un momento decisivo. Vivimos en un municipio con talento, creatividad, riqueza cultural, recursos naturales, universidades, emprendedores y sectores productivos con un enorme potencial. Sin embargo, durante muchos años esos esfuerzos han avanzado de manera aislada, sin una política pública capaz de articularlos y convertirlos en un verdadero motor de desarrollo.',
    'Con esa convicción nace el Proyecto de Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento. No es solamente una nueva norma; es una propuesta para construir una visión compartida de futuro, donde la innovación deje de ser un concepto y se convierta en una herramienta para generar oportunidades, empleo, inversión y bienestar para todos los tarijeños.',
    'Esta Ley ha sido concebida para las personas. Para el estudiante que sueña con desarrollar una idea innovadora, para el emprendedor que busca hacer crecer su negocio, para el productor que quiere agregar valor a su trabajo, para el investigador que genera conocimiento, para el artista que transforma la cultura en oportunidades, para las empresas que apuestan por la competitividad y para cada ciudadano que cree en una Tarija con más oportunidades y mejores condiciones para desarrollarse.',
    'Para lograrlo, la Ley incorpora herramientas modernas de gobernanza, planificación y articulación, como el Consejo Municipal del Ecosistema, las Mesas Temáticas, el Observatorio Municipal, el Plan Municipal para el Desarrollo del Ecosistema, la Agenda Estratégica Anual, el FabLab Tarija, los Distritos Creativos, la Plataforma Digital del Ecosistema y otros instrumentos diseñados para fortalecer el talento local, promover la innovación y generar nuevas oportunidades de desarrollo.',
    'Estoy convencido de que el progreso de Tarija no dependerá únicamente de sus recursos, sino de la capacidad de su gente para crear, colaborar, emprender e innovar. Por eso, esta Ley también es una invitación a participar. Ninguna política pública puede transformar una ciudad si no es construida con quienes la viven todos los días.',
    'Los invito a conocer este proyecto, aportar con sus ideas y ser parte de este proceso. Porque el futuro de Tarija no se espera: se construye juntos.',
  ],
}

export interface MesaDebate {
  id: string
  numero: number
  titulo: string
  descripcion: string
  icon: LucideIcon
  /** Pega aquí el link de YouTube del video de la mesa cuando esté disponible (ej: https://youtu.be/XXXXXXXXXXX) */
  youtubeUrl?: string
}

/** Mesas temáticas del Ecosistema Municipal (Art. 17 de la Ley) usadas como "Mesas de Debate" */
export const MESAS_DEBATE: MesaDebate[] = [
  {
    id: 'mesa-1',
    numero: 1,
    titulo: 'Sector Público y Gobernanza',
    descripcion: 'Articulación entre el Gobierno Municipal y las instituciones públicas del ecosistema.',
    icon: Landmark,
    youtubeUrl: 'https://youtu.be/OfFY4_m1qfo?si=Md_6kkWJzRHEeSOP',
  },
  {
    id: 'mesa-2',
    numero: 2,
    titulo: 'Educación Superior e Investigación',
    descripcion: 'Universidades, institutos técnicos y centros de investigación de Tarija.',
    icon: GraduationCap,
    youtubeUrl: 'https://youtu.be/94yHixczYaQ?si=7VJ1w2xunSF-bBn4',
  },
  {
    id: 'mesa-3',
    numero: 3,
    titulo: 'Sector Empresarial y Productivo',
    descripcion: 'Cámaras, gremios y organizaciones del tejido productivo local.',
    icon: Briefcase,
    youtubeUrl: 'https://youtu.be/dznTVPyGeac?si=VkE-MUTtkIE5o9Ld',
  },
  {
    id: 'mesa-4',
    numero: 4,
    titulo: 'Emprendimiento e Innovación',
    descripcion: 'Emprendedores, startups y organizaciones de apoyo al emprendimiento.',
    icon: Rocket,
    youtubeUrl: 'https://youtu.be/dznTVPyGeac?si=VkE-MUTtkIE5o9Ld',
  },
]

export interface PodcastEpisode {
  id: string
  titulo: string
  descripcion: string
  duracion: string
  youtubeUrl?: string
}

/** Episodios de video — reemplazar youtubeUrl por el link real de cada uno cuando esté publicado */
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-1',
    titulo: 'Episodio 1: La Ley y sus objetivos',
    descripcion: 'Un recorrido por los objetivos centrales de la Ley Municipal de Innovación.',
    duracion: '03:36',
    youtubeUrl: 'https://youtu.be/dznTVPyGeac?si=VkE-MUTtkIE5o9Ld',
  },
  {
    id: 'ep-2',
    titulo: '¿Quién es el Concejal y por qué nació?',
    descripcion: 'Conversación sobre el origen de la propuesta y el rol del Concejal impulsor.',
    duracion: '03:40',
    youtubeUrl: 'https://youtu.be/94yHixczYaQ?si=7VJ1w2xunSF-bBn4',
  },
  {
    id: 'ep-3',
    titulo: 'Episodios el concejal y qué nació',
    descripcion: 'Detalles sobre el proceso de construcción colectiva de la Ley.',
    duracion: '08:00',
    youtubeUrl: 'https://youtu.be/dznTVPyGeac?si=VkE-MUTtkIE5o9Ld',
  },
  {
    id: 'ep-4',
    titulo: 'Quién es y por qué nació',
    descripcion: 'Resumen del contexto municipal que impulsó esta normativa.',
    duracion: '07:50',
    youtubeUrl: 'https://youtu.be/94yHixczYaQ?si=7VJ1w2xunSF-bBn4',
  },
]
