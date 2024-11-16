/* import { ArrowRight } from 'lucide-react' */

import Image from 'next/image'
import Link from 'next/link'

import { getImageUrl } from '@/lib/utils'

type TastingType = {
  id: number
  name: string
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
    wines
  } = tasting
  const winesCount = wines.length
  return (
    <Link
      className="rounded-3xl hover:opacity-80"
      href={`/degustaciones/${slug}`}
    >
      <article className="flex flex-col items-start justify-start gap-4 overflow-hidden rounded-lg p-4 text-left text-sm">
        <Image
          className="overflow-hidden rounded-xl bg-neutral-100"
          src={getImageUrl(image as string)}
          priority={index === 0}
          width={368}
          height={368}
          alt={name}
        />

        <section className="flex flex-col items-start justify-start gap-2">
          <h2 className="mb-2 mt-4 text-center font-kalnia text-2xl font-bold text-zinc-950">
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
