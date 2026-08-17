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
    const formData = await req.formData()
    const titulo = formData.get('titulo')?.toString()
    const descripcion = formData.get('descripcion')?.toString() || null
    const enlace = formData.get('link')?.toString() || formData.get('enlace')?.toString()
    const tipo = formData.get('tipo')?.toString() || 'noticia'
    const imagenUrlExterna = formData.get('imagen_url')?.toString() || null
    const imagenFile = formData.get('imagen') as File | null

    if (!titulo || !enlace) {
      return NextResponse.json({ error: 'Título y enlace son obligatorios' }, { status: 400 })
    }

    let imagen_url = imagenUrlExterna

    if (imagenFile && imagenFile.size > 0) {
      const fileExt = imagenFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `noticias/${fileName}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from('imagenes') // Si tu bucket tiene otro nombre, cámbialo aquí
        .upload(filePath, imagenFile)

      if (uploadError) {
        throw new Error('Error al subir la imagen: ' + uploadError.message)
      }

      const { data: publicURLData } = supabaseAdmin.storage
        .from('imagenes')
        .getPublicUrl(filePath)

      imagen_url = publicURLData.publicUrl
    }

    const { data, error } = await supabaseAdmin
      .from('noticias')
      .insert({ titulo, descripcion, enlace, tipo, imagen_url })
      .select()
      .single()

    if (error) throw error

    try {
      await notificarSuscriptores({ titulo, descripcion: descripcion || '', link: enlace })
    } catch (emailErr) {
      console.error('Error al enviar notificaciones:', emailErr)
    }

    return NextResponse.json({ message: 'Noticia publicada y notificada', noticia: data })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'No se pudo publicar la noticia' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('noticias')
    .select('*')
    .order('creado_en', { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudieron cargar las noticias' }, { status: 500 })
  }

  return NextResponse.json({ noticias: data })
}

export async function PUT(req: NextRequest) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Falta el id de la noticia' }, { status: 400 })
  }

  try {
    const formData = await req.formData()
    const titulo = formData.get('titulo')?.toString()
    const descripcion = formData.get('descripcion')?.toString() || null
    const enlace = formData.get('link')?.toString() || formData.get('enlace')?.toString()
    const tipo = formData.get('tipo')?.toString() || 'noticia'
    const imagenUrlExterna = formData.get('imagen_url')?.toString() || null
    const imagenFile = formData.get('imagen') as File | null

    if (!titulo || !enlace) {
      return NextResponse.json({ error: 'Título y enlace son obligatorios' }, { status: 400 })
    }

    let updateData: any = { titulo, descripcion, enlace, tipo }

    if (imagenFile && imagenFile.size > 0) {
      const fileExt = imagenFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `noticias/${fileName}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from('imagenes')
        .upload(filePath, imagenFile)

      if (uploadError) {
        throw new Error('Error al subir la nueva imagen: ' + uploadError.message)
      }

      const { data: publicURLData } = supabaseAdmin.storage
        .from('imagenes')
        .getPublicUrl(filePath)

      updateData.imagen_url = publicURLData.publicUrl
    } else if (imagenUrlExterna !== null) {
      updateData.imagen_url = imagenUrlExterna
    }

    const { data, error } = await supabaseAdmin
      .from('noticias')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: 'Noticia actualizada', noticia: data })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'No se pudo actualizar la noticia' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Falta el id de la noticia' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('noticias').delete().eq('id', id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudo eliminar la noticia' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Noticia eliminada' })
}