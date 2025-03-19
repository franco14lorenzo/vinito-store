import { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'
import { QueryData } from '@supabase/supabase-js'

import {
  HeadingSection,
  TastingPageAnalytics,
  Tastings
} from '@/app/(store)/degustaciones/components'
import Breadcrumbs from '@/components/blocks/breadcrumbs'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Degustaciones',
  description: 'Descubre nuestros paquetes de degustación de vinos'
}

const breadcrumbs = [
  { name: 'Inicio', href: '/' },
  { name: 'Degustaciones', isCurrentPage: true }
]

export default async function TastingListPage() {
  const { data, error } = await getCachedTastings()

  if (error) {
    // TODO: Handle this error
    throw error
  }

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <HeadingSection
        title="Degustaciones"
        description="Descubrí nuestros paquetes de degustación de vinos"
      />
      <Tastings tastings={data} />
      <TastingPageAnalytics tastings={data} />
    </>
  )
}

async function getTastingsWithWines() {
  const supabase = createClient()
  const tastingsWithWinesQuery = supabase
    .from('tastings')
    .select('id, name, short_description, slug, image, wines (id), stock')
    .eq('status', 'active')
    .order('id', { ascending: true })

  type TastingsWithWines = QueryData<typeof tastingsWithWinesQuery>

  const { data, error } = await tastingsWithWinesQuery

  return { data: data as TastingsWithWines, error }
}

const getCachedTastings = cache(
  async () => {
    const { data, error } = await getTastingsWithWines()

    return { data, error }
  },
  ['tastings'],
  {
    tags: ['tastings']
  }
)
