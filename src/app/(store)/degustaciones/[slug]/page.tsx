import { QueryData } from '@supabase/supabase-js'

import Image from 'next/image'
import { notFound } from 'next/navigation'

import Actions from '@/app/(store)/degustaciones/[slug]/components/actions'
import Breadcrumbs from '@/components/blocks/breadcrumbs'
import { IS_DEV_ENVIRONMENT } from '@/constants'
import { createClient } from '@/lib/supabase/client'
import { getImageUrl } from '@/lib/utils'

export async function generateStaticParams() {
  const { data } = await getTastingsSlugs()

  return data.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const { data } = await getTastingWithWines(params.slug)

  return {
    title: data?.name,
    description: data?.short_description
  }
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
    { name: 'Inicio', href: '/' },
    { name: 'Degustaciones', href: '/degustaciones' },
    { name: data.slug, isCurrentPage: true }
  ]

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />

      <section className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
          {data.stock === 0 && (
            <div className="absolute right-0 top-0 rounded-bl-lg bg-neutral-500/50 px-2 py-1 text-white">
              Sin Stock
            </div>
          )}
          <Image
            src={getImageUrl(data.image as string)}
            priority
            width={624}
            height={624}
            alt={data.name}
          />
        </div>

        <article className="flex flex-col justify-between gap-4 px-4">
          <section className="py-4 md:py-0">
            <h1 className="h-14 font-kalnia text-3xl font-bold">{data.name}</h1>
            <h2 className="font-bold">Descripción de la degustación</h2>
            <p className="my-4">{data.long_description}</p>
            <h2 className="font-bold">Vinos</h2>
            <p className="my-4">{data.wines.length} unidades de 750ml</p>
            <h2 className="font-bold">Maridajes</h2>
            <p className="my-4">{data.pairings}</p>
          </section>
          <div className="hidden md:block">
            <Actions
              item={{
                slug: data.slug,
                price: data.price,
                name: data.name,
                stock: data.stock,
                id: data.id,
                image: data.image
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
            stock: data.stock,
            image: data.image
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
      'id, name, slug, stock, short_description, long_description, pairings, image, price, wines (id)'
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
  const supabase = createClient()
  const tastingsSlugsQuery = supabase
    .from('tastings')
    .select('slug')
    .eq('status', 'active')

  type TastingsSlugs = QueryData<typeof tastingsSlugsQuery>

  const { data, error } = await tastingsSlugsQuery

  return { data: data as TastingsSlugs, error }
}
