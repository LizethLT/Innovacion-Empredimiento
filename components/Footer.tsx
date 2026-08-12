'use client'

interface FooterProps {
  sections: Array<{ id: string; label: string }>
  onNavigate: (id: string) => void
}

export default function Footer({ sections, onNavigate }: FooterProps) {
  const footerSections = [
    {
      title: 'Secciones',
      links: sections.filter((section) => ['inicio', 'ley', 'ecosistema'].includes(section.id)),
    },
    {
      title: 'Recursos',
      links: sections.filter((section) => ['videos', 'biblioteca'].includes(section.id)),
    },
    {
      title: 'Contacto',
      links: sections.filter((section) => section.id === 'contacto'),
    },
  ]

  return (
    <footer className="bg-gradient-to-r from-[#1E1E1E] to-[#5B0F18] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white p-2 overflow-hidden">
                <img
                  src="/logo.jpeg"
                  alt="Logo Impulsa Tarija"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <span className="font-bold">Impulsa Tarija</span>
            </div>
            <p className="text-sm text-[#F8F1E7]">Ley Municipal de Innovación, Creatividad, Emprendimiento y Economía del Conocimiento</p>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 text-[#F8F1E7]">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(link.id)}
                      className="text-left text-sm text-[#D8A7A7] hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
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
          
        </div>
      </div>

      {/* Top Footer Strip */}
      <div className="bg-white/5 border-t border-white/10 py-4 text-center text-xs text-[#D8A7A7]">
        Diseñado y desarrollado para construir un ecosistema de innovación, creatividad y emprendimiento en Tarija
      </div>
    </footer>
  )
}