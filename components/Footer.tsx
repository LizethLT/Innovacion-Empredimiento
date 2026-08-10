'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Secciones',
      links: ['Inicio', '¿Qué es la Ley?', 'Arquitectura del Ecosistema de Innovación y Emprendimiento'],
    },
    {
      title: 'Recursos',
      links: ['Videos', 'Biblioteca'],
    },
    {
      title: 'Contacto',
      links: ['Contacto'],
    },
  ]

  return (
    <footer className="bg-gradient-to-r from-[#1E1E1E] to-[#5B0F18] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="font-bold text-[#1E1E1E]">TJ</span>
              </div>
              <span className="font-bold">Tarija</span>
            </div>
            <p className="text-sm text-[#F8F1E7]">Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento</p>
          </div>

          {/* Links */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 text-[#F8F1E7]">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-[#D8A7A7] hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#D8A7A7]">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {currentYear} Municipalidad de Tarija. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </div>

      {/* Top Footer Strip */}
      <div className="bg-white/5 border-t border-white/10 py-4 text-center text-xs text-[#D8A7A7]">
        Diseñado y desarrollado para construir un ecosistema de innovación, creatividad y emprendimiento en Tarija
      </div>
    </footer>
  )
}