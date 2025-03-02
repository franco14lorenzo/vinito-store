'use server'

import { createClient } from '@/lib/supabase/server'

type Contact = {
  name: string
  email: string
  message: string
}

export async function sendContact(contact: Contact) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select('name')
    .single()

  if (error) {
    return { data: null, error }
  }

  return { data, error: null }
}
