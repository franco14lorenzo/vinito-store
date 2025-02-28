'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'

import type { Accommodation } from './accommodation'

export async function setAccommodationCookie(accommodation: Accommodation) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  const cookieStore = await cookies()

  cookieStore.set({
    name: 'accommodation',
    path: '/',
    value: JSON.stringify(accommodation),
    expires
  })
}

export async function getAccommodationCookie() {
  const cookieStore = await cookies()
  const accommodation = cookieStore.get('accommodation')?.value

  return accommodation ? JSON.parse(accommodation) : null
}

export async function clearAccommodationCookie() {
  const cookieStore = await cookies()

  cookieStore.delete('accommodation')
  redirect('/scan-qr')
}

export async function getAccommodationById(id: string) {
  const supabase = createClient()
  const supabaseAcommodationQuery = supabase
    .from('accommodations')
    .select('id, name, address')
    .eq('id', id)
    .single()

  type Accommodation = QueryData<typeof supabaseAcommodationQuery>

  const { data, error } = await supabaseAcommodationQuery

  if (error && error.code === 'PGRST116' /* The result contains 0 rows */) {
    return { data: null, error: null }
  }

  return { data: data as Accommodation, error }
}
