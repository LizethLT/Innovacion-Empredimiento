import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Obtener todas las noticias ordenadas de más nueva a más vieja
export async function GET() {
  try {
    const { data: noticias, error } = await supabase
      .from('noticias')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ noticias })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 })
  }
}

// POST: Crear una nueva noticia con soporte para FormData (imagen y texto)
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const titulo = formData.get('titulo') as string
    const descripcion = formData.get('descripcion') as string
    const link = formData.get('link') as string
    const tipo = formData.get('tipo') as string
    const imageFile = formData.get('imageFile') as File | null
    const imageUrlInput = formData.get('imageUrl') as string | null

    if (!titulo || !link) {
      return NextResponse.json({ error: 'El título y el link son obligatorios' }, { status: 400 })
    }

    let imagen_url: string | null = null

    // 1. Si subió un archivo desde el dispositivo, lo guardamos en Supabase Storage
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `noticias/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images') // Asegúrate de que tu bucket se llame 'images' o cámbialo aquí
        .upload(filePath, imageFile)

      if (uploadError) {
        return NextResponse.json({ error: 'Error al subir la imagen: ' + uploadError.message }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      imagen_url = publicUrlData.publicUrl
    } 
    // 2. Si pegó una URL de imagen externa, la usamos directamente
    else if (imageUrlInput && imageUrlInput.trim() !== '') {
      imagen_url = imageUrlInput.trim()
    }

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('noticias')
      .insert([
        {
          titulo,
          descripcion: descripcion || null,
          link,
          tipo: tipo || 'Noticia',
          imagen_url,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, noticia: data[0] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno al procesar la solicitud' }, { status: 500 })
  }
}

// PUT: Actualizar una noticia existente
export async function PUT(request: Request) {
  try {
    const formData = await request.formData()
    const id = formData.get('id') as string
    const titulo = formData.get('titulo') as string
    const descripcion = formData.get('descripcion') as string
    const link = formData.get('link') as string
    const tipo = formData.get('tipo') as string
    const imageFile = formData.get('imageFile') as File | null
    const imageUrlInput = formData.get('imageUrl') as string | null
    const currentImagenUrl = formData.get('currentImagenUrl') as string | null

    if (!id || !titulo || !link) {
      return NextResponse.json({ error: 'ID, título y link son obligatorios' }, { status: 400 })
    }

    let imagen_url = currentImagenUrl

    // Si selecciona una nueva imagen de archivo
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `noticias/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile)

      if (uploadError) {
        return NextResponse.json({ error: 'Error al subir la imagen: ' + uploadError.message }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      imagen_url = publicUrlData.publicUrl
    } 
    // Si introduce una URL de imagen externa nueva
    else if (imageUrlInput && imageUrlInput.trim() !== '') {
      imagen_url = imageUrlInput.trim()
    }

    const { data, error } = await supabase
      .from('noticias')
      .update({
        titulo,
        descripcion: descripcion || null,
        link,
        tipo: tipo || 'Noticia',
        imagen_url,
      })
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, noticia: data[0] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno al actualizar' }, { status: 500 })
  }
}

// DELETE: Eliminar una noticia por ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Se requiere el ID de la noticia' }, { status: 400 })
    }

    const { error } = await supabase.from('noticias').delete().eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno al eliminar' }, { status: 500 })
  }
}