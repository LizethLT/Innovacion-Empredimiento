import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'
import { notificarSuscriptores } from '@/lib/email'

async function estaAutenticado() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return !!session && session === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { titulo, descripcion, link, tipo } = await req.json()

    if (!titulo || !link) {
      return NextResponse.json({ error: 'Título y link son obligatorios' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('noticias')
      .insert({ titulo, descripcion, link, tipo: tipo || 'noticia' })
      .select()
      .single()

    if (error) throw error

    await notificarSuscriptores({ titulo, descripcion, link })

    return NextResponse.json({ message: 'Noticia publicada y notificada', noticia: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'No se pudo publicar la noticia' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('noticias')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'No se pudieron cargar las noticias' }, { status: 500 })
  }

  return NextResponse.json({ noticias: data })
}
