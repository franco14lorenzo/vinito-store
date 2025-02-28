import { unstable_cache as cache } from 'next/cache'
import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/client'
import { transformSettingsToObject } from '@/lib/utils'

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

export const getCachedSettings = cache(
  async (SETTINGS_KEYS) => {
    const { data: settingsData } = await getSettings(SETTINGS_KEYS)
    return transformSettingsToObject(settingsData)
  },
  ['settings'],
  {
    tags: ['settings']
  }
)
