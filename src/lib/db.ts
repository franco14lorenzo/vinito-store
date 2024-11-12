import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/client'

export async function getSettings(settings: string[]) {
  const supabase = createClient()
  const settingsQuery = supabase
    .from('settings')
    .select('key, value')
    .in('key', settings)

  type Settings = QueryData<typeof settingsQuery>

  const { data, error } = await settingsQuery

  return { data: data as Settings, error }
}
