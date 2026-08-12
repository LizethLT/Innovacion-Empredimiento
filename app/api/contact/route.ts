import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@innovaciontarija.gob.bo'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Impulsa Tarija <onboarding@resend.dev>'

interface ContactPayload {
  nombre?: string
  telefono?: string
  email?: string
  asunto?: string
  mensaje?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildContactEmailHtml({ nombre, telefono, email, asunto, mensaje }: ContactPayload) {
  const safe = {
    nombre: escapeHtml(nombre || '—'),
    telefono: escapeHtml(telefono || '—'),
    email: escapeHtml(email || '—'),
    asunto: escapeHtml(asunto || '—'),
    mensaje: escapeHtml(mensaje || '—').replace(/\n/g, '<br />'),
  }

  return `
<!DOCTYPE html>
<html lang="es">
  <body style="margin:0; padding:0; background-color:#f3ecec; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3ecec; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e8dede;">
            
            <!-- Encabezado: Logo y Título -->
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="cid:logo-inline" alt="Impulsa Tarija" style="height:45px; width:auto; display:block;" />
                    </td>
                    <td style="vertical-align:middle; padding-left:12px;">
                      <span style="display:block; font-size:18px; font-weight:800; color:#810100; letter-spacing:0.5px; text-transform:uppercase; line-height:1.1;">Impulsa</span>
                      <span style="display:block; font-size:18px; font-weight:800; color:#810100; letter-spacing:0.5px; text-transform:uppercase; line-height:1.1;">Tarija</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 32px 0 32px;" align="center">
                <h1 style="margin:0; font-size:20px; color:#1E1E1E;">Nuevo mensaje de contacto</h1>
                <p style="margin:6px 0 0 0; font-size:13px; color:#7a7a7a;">
                  Recibido desde el formulario del sitio del Ecosistema Municipal de Innovación
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:12px; font-weight:700; color:#810100; text-transform:uppercase; vertical-align:top; width:110px;">Nombre</td>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:14px; color:#1E1E1E;">${safe.nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:12px; font-weight:700; color:#810100; text-transform:uppercase; vertical-align:top;">Teléfono</td>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:14px; color:#1E1E1E;">${safe.telefono}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:12px; font-weight:700; color:#810100; text-transform:uppercase; vertical-align:top;">Email</td>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:14px; color:#1E1E1E;">${safe.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:12px; font-weight:700; color:#810100; text-transform:uppercase; vertical-align:top;">Asunto</td>
                    <td style="padding:10px 0; border-bottom:1px solid #f0e2e2; font-size:14px; color:#1E1E1E;">${safe.asunto}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:12px; font-weight:700; color:#810100; text-transform:uppercase; vertical-align:top;">Mensaje</td>
                    <td style="padding:10px 0; font-size:14px; color:#1E1E1E; line-height:1.6;">${safe.mensaje}</td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <tr>
              <td style="padding:32px 0 0 0;">
                <svg width="100%" height="90" viewBox="0 0 600 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                  <path d="M0 88 C 90 45, 200 15, 320 35 C 430 53, 500 30, 600 55 L 600 90 L 0 90 Z" fill="#6B0000" />
                  <path d="M0 90 C 100 70, 210 35, 340 50 C 450 63, 520 42, 600 68 L 600 90 L 0 90 Z" fill="#E4032D" />
                </svg>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim()
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Falta configurar RESEND_API_KEY en las variables de entorno.' },
      { status: 500 },
    )
  }

  let payload: ContactPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud inválido.' }, { status: 400 })
  }

  const { nombre, telefono, email, asunto, mensaje } = payload

  if (!nombre || !email || !asunto || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  let logoBuffer: Buffer
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.jpeg')
    logoBuffer = fs.readFileSync(logoPath)
  } catch (err) {
    return NextResponse.json({ error: 'No se encontró el archivo logo.jpeg en /public.' }, { status: 500 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Contacto] ${asunto}`,
      html: buildContactEmailHtml({ nombre, telefono, email, asunto, mensaje }),
      attachments: [
        {
          filename: 'logo.jpeg',
          content: logoBuffer.toString('base64'),
          contentId: 'logo-inline',
        },
      ],
    })

    if (error) {
      console.error('Error de Resend:', error)
      return NextResponse.json({ error: 'No se pudo enviar el correo.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('Error inesperado al enviar el correo:', err)
    return NextResponse.json({ error: 'Error inesperado al enviar el correo.' }, { status: 500 })
  }
}