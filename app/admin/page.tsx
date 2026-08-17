import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Usa la service_role key, NO la anon/public key: esta ruta corre en el
// servidor y necesita permisos para insertar/actualizar sin las
// restricciones de RLS.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BUCKET = 'noticias-imagenes'
const TABLE = 'noticias'

// Límite de tamaño: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

function validarImagen(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('La imagen no puede superar los 5MB')
  }
}

async function subirImagen(file: File): Promise<string> {
  validarImagen(file)

  const extension = file.name.split('.').pop() || 'jpg'
  const fileName = `${randomUUID()}.${extension}`

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    throw new Error(`No se pudo subir la imagen: ${error.message}`)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

// Borra una imagen anterior del bucket a partir de su URL pública.
// No lanza error si falla: es una limpieza best-effort.
async function borrarImagenAnterior(imagenUrl: string | null | undefined) {
  if (!imagenUrl) return
  try {
    const fileName = imagenUrl.split(`/${BUCKET}/`).pop()
    if (fileName) {
      await supabase.storage.from(BUCKET).remove([fileName])
    }
  } catch {
    // Si falla el borrado, no interrumpimos el flujo principal
  }
}

// GET: listar noticias (para el panel de admin y para Contact.tsx / NotificationContext)
export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ noticias: data })
}

// POST: crear noticia nueva
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const titulo = formData.get('titulo') as string
    const descripcion = (formData.get('descripcion') as string) || null
    const link = formData.get('link') as string
    const tipo = (formData.get('tipo') as string) || 'noticia'
    const imagenFile = formData.get('imagen') as File | null
    const imagenUrlExterna = (formData.get('imagen_url') as string) || null

    if (!titulo || !link) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    let imagen_url: string | null = imagenUrlExterna

    // Si subieron un archivo, tiene prioridad sobre una URL externa
    if (imagenFile && imagenFile.size > 0) {
      imagen_url = await subirImagen(imagenFile)
    }

    const { data, error } = await supabase
      .from(TABLE)
      .insert({ titulo, descripcion, link, tipo, imagen_url })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // TODO: acá va tu lógica existente para notificar a los suscriptores
    // por email (Resend), usando la tabla `suscriptores`.

    return NextResponse.json({ noticia: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Error inesperado' }, { status: 500 })
  }
}

// PUT: editar una noticia existente (?id=...)
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 })
    }

    const formData = await req.formData()
    const titulo = formData.get('titulo') as string
    const descripcion = (formData.get('descripcion') as string) || null
    const link = formData.get('link') as string
    const tipo = (formData.get('tipo') as string) || 'noticia'
    const imagenFile = formData.get('imagen') as File | null
    const imagenUrlExterna = formData.get('imagen_url') as string | null

    const updateData: Record<string, any> = { titulo, descripcion, link, tipo }

    if (imagenFile && imagenFile.size > 0) {
      // Trae la noticia actual para poder borrar su imagen vieja
      const { data: noticiaActual } = await supabase
        .from(TABLE)
        .select('imagen_url')
        .eq('id', id)
        .single()

      updateData.imagen_url = await subirImagen(imagenFile)

      if (noticiaActual?.imagen_url) {
        await borrarImagenAnterior(noticiaActual.imagen_url)
      }
    } else if (imagenUrlExterna) {
      updateData.imagen_url = imagenUrlExterna
    }

    const { data, error } = await supabase
      .from(TABLE)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ noticia: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Error inesperado' }, { status: 500 })
  }
}

// DELETE: eliminar una noticia (?id=...)
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Falta el id' }, { status: 400 })
  }

  // Borra también la imagen asociada del bucket, si existe
  const { data: noticia } = await supabase
    .from(TABLE)
    .select('imagen_url')
    .eq('id', id)
    .single()

  if (noticia?.imagen_url) {
    await borrarImagenAnterior(noticia.imagen_url)
  }

  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}