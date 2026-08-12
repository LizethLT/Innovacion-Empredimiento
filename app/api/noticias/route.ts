import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Ruta PÚBLICA de solo lectura: cualquiera puede consultarla para ver
// las noticias, pero no puede publicar ni modificar nada desde aquí
// (eso solo se puede hacer desde /admin, que sí pide contraseña).
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('noticias')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudieron cargar las noticias' }, { status: 500 })
  }

  return NextResponse.json({ noticias: data ?? [] })
}