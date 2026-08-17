import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'


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