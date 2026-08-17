export interface LibraryDocument {
  id: string
  title: string
  description: string
  type: string
  date: string
  pages: string
  /** Categoría a la que pertenece el documento (ej: "Leyes", "Mesas", "Metodología") */
  category?: string
  /** Coloca el PDF con este mismo nombre dentro de /public/docs/ para que el botón "Descargar" funcione */
  file: string
}

/**
 * Biblioteca de documentos. Para activar la descarga de cada uno, sube el PDF
 * correspondiente a /public/docs/ con el nombre indicado en `file`.
 */
export const LIBRARY_DOCUMENTS: LibraryDocument[] = [
   {
    id: 'reglamento',
    title: 'Agenda Impulsa Tarija',
    description: 'Una agenda para impulsar la innovación, el talento y el desarrollo de Tarija.',
    type: 'PDF',
    date: '2026',
    pages: '8 páginas',
    category: 'Leyes', 
    file: '/docs/Agenda.pdf',
  },
  {
    id: 'ley-completa',
    title: 'Ley Innovacion y Emprendedurismo COMPLETA',
    description: 'Texto íntegro de la Ley Municipal de Innovación',
    type: 'PDF',
    date: '2026',
    pages: '52 páginas',
    category: 'Leyes', // <-- Aquí asignas la categoría
    file: '/docs/Ley Innovacion y emprendedurismo.pdf',
  },
  /*{
    id: 'plan-estrategico',
    title: 'Plan Estratégico 2024-2028',
    description: 'Estrategia municipal de innovación a mediano plazo',
    type: 'PDF',
    date: '2024',
    pages: '42 páginas',
    category: 'Mesas', // <-- Puedes repetir la categoría si corresponde
    file: '/docs/plan-estrategico-2024-2028.pdf',
  },
  {
    id: 'manual-procedimientos',
    title: 'Manual de Procedimientos',
    description: 'Guía paso a paso para acceder a beneficios',
    type: 'PDF',
    date: '2024',
    pages: '22 páginas',
    category: 'Metodología', // <-- Aquí asignas la categoría
    file: '/docs/manual-de-procedimientos.pdf',
  },
  /*{
    id: 'informe-implementacion',
    title: 'Informe de Implementación',
    description: 'Resultados y avances del primer año',
    type: 'PDF',
    date: '2024',
    pages: '35 páginas',
    category: 'Mesas', // <-- Aquí asignas la categoría
    file: '/docs/informe-de-implementacion.pdf',
  },
  {
    id: 'directorio-actores',
    title: 'Directorio de Actores',
    description: 'Contactos de instituciones y organismos del ecosistema',
    type: 'PDF',
    date: '2024',
    pages: '12 páginas',
    category: 'Mesas', // <-- Aquí asignas la categoría
    file: '/docs/directorio-actores.pdf',
  },
  {
    id: 'guia-emprendedores',
    title: 'Guía para Emprendedores',
    description: 'Recursos y apoyo disponibles para emprendimientos',
    type: 'PDF',
    date: '2024',
    pages: '18 páginas',
    category: 'Metodología', // <-- Aquí asignas la categoría
    file: '/docs/guia-para-emprendedores.pdf',
  },
  {
    id: 'bases-convocatorias',
    title: 'Bases de Convocatorias',
    description: 'Términos de referencia para acceder a financiamiento',
    type: 'PDF',
    date: '2024',
    pages: '25 páginas',
    category: 'Metodología', // <-- Aquí asignas la categoría
    file: '/docs/bases-de-convocatorias.pdf',
  },*/
]