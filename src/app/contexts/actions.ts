'use server'

import { QueryData } from '@supabase/supabase-js'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

import type { Accommodation } from './accommodation'

export async function setAccommodationCookie(accommodation: Accommodation) {
  const cookieStore = cookies()

  cookieStore.set({
    name: 'accommodation',
    path: '/',
    value: JSON.stringify(accommodation)
  })
}

export async function clearAccommodationCookie() {
  const cookieStore = cookies()

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
