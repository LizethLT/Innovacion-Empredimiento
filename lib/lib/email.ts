import nodemailer from 'nodemailer'
import { supabaseAdmin } from './supabase'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

interface Noticia {
  titulo: string
  descripcion?: string
  link: string
}

export async function notificarSuscriptores(noticia: Noticia) {
  const { data: subs, error } = await supabaseAdmin
    .from('suscriptores')
    .select('email')

  if (error) throw error
  if (!subs || subs.length === 0) return

  const emails = subs.map((s) => s.email)

  // Gmail recomienda no pasar de ~50-100 destinatarios por envío.
  // Si la lista crece mucho, conviene migrar a Resend o Brevo.
  const chunkSize = 50
  for (let i = 0; i < emails.length; i += chunkSize) {
    const chunk = emails.slice(i, i + chunkSize)
    await transporter.sendMail({
      from: `"Noticias" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      bcc: chunk,
      subject: `Nueva publicación: ${noticia.titulo}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#5B0F18;">${noticia.titulo}</h2>
          <p style="color:#1E1E1E;">${noticia.descripcion ?? ''}</p>
          <p>
            <a href="${noticia.link}" style="background:#5B0F18;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">
              Ver contenido
            </a>
          </p>
        </div>
      `,
    })
  }
}
