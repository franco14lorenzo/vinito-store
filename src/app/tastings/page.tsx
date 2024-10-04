import { QueryData } from '@supabase/supabase-js'

import { Metadata } from 'next'

import { HeadingSection, Tastings } from '@/app/tastings/components'
import Breadcrumbs from '@/components/blocks/breadcrumbs'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Tastings',
  description: 'Discover our wine tasting packages'
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Tastings', isCurrentPage: true }
]

export default async function TastingListPage() {
  const { data, error } = await getTastingsWithWines()

  if (error) {
    // TODO: Handle error
    throw error
  }

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <HeadingSection
        title="Tastings"
        description="Discover our wine tasting packages"
      />
      <Tastings tastings={data} />
    </>
  )
}

async function getTastingsWithWines() {
  const supabase = createClient()
  const tastingsWithWinesQuery = supabase
    .from('tastings')
    .select('id, name, short_description, slug, image, wines (id)')
    .eq('status', 'active')
    .order('id', { ascending: true })

  type TastingsWithWines = QueryData<typeof tastingsWithWinesQuery>

  const { data, error } = await tastingsWithWinesQuery

  return { data: data as TastingsWithWines, error }
}
