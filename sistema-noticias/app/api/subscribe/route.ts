import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('suscriptores')
      .insert({ email: email.trim().toLowerCase() })

    if (error) {
      // código 23505 = ya existe (email duplicado), no es un error real
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Ya estás suscrito' }, { status: 200 })
      }
      throw error
    }

    return NextResponse.json({ message: 'Suscripción exitosa' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'No se pudo suscribir' }, { status: 500 })
  }
}
