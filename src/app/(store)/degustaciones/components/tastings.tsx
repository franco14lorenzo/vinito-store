/* import { ArrowRight } from 'lucide-react' */

import Image from 'next/image'
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

type TastingType = {
  id: number
  name: string
  stock: number
  short_description: string | null
  slug: string
  image: string | null
  wines: {
    id: number
  }[]
}

type TastingsType = TastingType[]

const Tastings = ({ tastings }: { tastings: TastingsType }) => {
  return (
    <section className="mt-4 grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {tastings.map((tasting, index) => (
        <Tasting key={index} tasting={tasting} index={index} />
      ))}
    </section>
  )
}

export const Tasting = ({
  tasting,
  index
}: {
  tasting: TastingType
  index: number
}) => {
  const {
    name,
    short_description: shortDescription,
    slug,
    image,
    wines,
    stock
  } = tasting
  console.log('🚀 ~ image:', image)
  const winesCount = wines.length
  return (
    <Link
      className="rounded-3xl hover:opacity-80"
      href={`/degustaciones/${slug}`}
    >
      <article className="flex flex-col items-start justify-start gap-4 overflow-hidden rounded-lg p-4 text-left text-sm">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
          {stock <= 0 && (
            <div className="absolute inset-0 z-10 overflow-hidden rounded-lg bg-black/10 backdrop-blur-[2px]">
              <div className="absolute top-0 right-0 rounded-bl-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-900 shadow-xs backdrop-blur-sm">
                Sin stock
              </div>
            </div>
          )}
          {image ? (
            <Image
              className="overflow-hidden rounded-lg bg-neutral-100 object-cover"
              src={image}
              priority={index === 0}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="size-12 text-zinc-400" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <section className="flex flex-col items-start justify-start gap-2">
          <h2 className="font-kalnia mt-4 mb-2 text-center text-2xl font-bold text-zinc-950">
            {name}
          </h2>
          <p className="text-zinc-500">{winesCount} vinos</p>
          <p className="text-zinc-950">{shortDescription}</p>
        </section>
        {/*  <Link
        className="mt-4 rounded-full bg-black px-4 py-2 text-white hover:bg-opacity-80"
        href={`/degustaciones/${slug}`}
      >
        View details
        <ArrowRight className="ml-1 inline size-5" />
      </Link> */}
      </article>
    </Link>
  )
}

export default Tastings
