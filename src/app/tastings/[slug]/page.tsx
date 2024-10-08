import { QueryData } from '@supabase/supabase-js'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Actions from '@/app/tastings/[slug]/components/actions'
import Breadcrumbs from '@/components/blocks/breadcrumbs'
import { IS_DEV_ENVIRONMENT } from '@/constants'
import { createClient as createClientBrowser } from '@/lib/supabase/client'
import { createClient } from '@/lib/supabase/server'

export async function generateStaticParams() {
  const { data } = await getTastingsSlugs()

  return data.map(({ slug }) => ({ params: { slug } }))
}

export const metadata: Metadata = {
  title: 'Tasting Details',
  description: 'Discover our wine tastings'
}

export default async function TastingDetailsPage({
  params
}: {
  params: { slug: string }
}) {
  const { data, error } = await getTastingWithWines(params.slug)

  if (error) {
    IS_DEV_ENVIRONMENT && console.error(error)
    // TODO: Handle error in production environment
    throw error
  }

  if (!data) {
    return notFound()
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Tastings', href: '/tastings' },
    { name: data.slug, isCurrentPage: true }
  ]

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />

      <section className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        <section className="flex flex-col px-4">
          <div className="aspect-square w-full rounded-lg bg-neutral-100" />
        </section>

        <article className="flex flex-col justify-between gap-4 px-4">
          <section className="py-4 md:py-0">
            <h1 className="h-14 font-kalnia text-3xl font-bold">
              {data.name} Tasting
            </h1>
            <h2 className="font-bold">Tasting Description</h2>
            <p className="my-4">{data.long_description}</p>
            <h2 className="font-bold">Wines</h2>
            <p className="my-4">{data.wines.length} units of 750ml</p>
            <h2 className="font-bold">Pairings</h2>
            <p className="my-4">{data.pairings}</p>
          </section>
          <div className="hidden md:block">
            <Actions
              item={{
                slug: data.slug,
                price: data.price,
                name: data.name,
                stock: data.stock,
                id: data.id
              }}
            />
          </div>
        </article>
      </section>

      <div className="h-[60px] w-full md:hidden" />

      <div className="fixed inset-x-0 bottom-0 block  border-t border-zinc-950/10 bg-neutral-50 px-4 pb-4 shadow md:hidden">
        <Actions
          item={{
            id: data.id,
            slug: data.slug,
            price: data.price,
            name: data.name,
            stock: data.stock
          }}
        />
      </div>
    </>
  )
}

async function getTastingWithWines(slug: string) {
  const supabase = createClient()
  const tastingWithWinesQuery = supabase
    .from('tastings')
    .select(
      'id, name, slug, stock, long_description, pairings, image, price, wines (id)'
    )
    .eq('status', 'active')
    .eq('slug', slug)
    .single()

  type TastingWithWines = QueryData<typeof tastingWithWinesQuery>

  const { data, error } = await tastingWithWinesQuery

  if (error && error.code === 'PGRST116' /* The result contains 0 rows */) {
    return { data: null, error: null }
  }

  return { data: data as TastingWithWines, error }
}

async function getTastingsSlugs() {
  const supabase = createClientBrowser()
  const tastingsSlugsQuery = supabase
    .from('tastings')
    .select('slug')
    .eq('status', 'active')

  type TastingsSlugs = QueryData<typeof tastingsSlugsQuery>

  const { data, error } = await tastingsSlugsQuery

  return { data: data as TastingsSlugs, error }
}
