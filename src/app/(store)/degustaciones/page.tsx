import { QueryData } from '@supabase/supabase-js'

import { Metadata } from 'next'

import {
  HeadingSection,
  Tastings
} from '@/app/(store)/degustaciones/components'
import Breadcrumbs from '@/components/blocks/breadcrumbs'
import { createClient } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: 'Degustaciones',
  description: 'Descubre nuestros paquetes de degustación de vinos'
}

const breadcrumbs = [
  { name: 'Inicio', href: '/' },
  { name: 'Degustaciones', isCurrentPage: true }
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
        title="Degustaciones"
        description="Descubrí nuestros paquetes de degustación de vinos"
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
