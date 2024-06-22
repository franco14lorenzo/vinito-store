/* import { ArrowRight } from 'lucide-react' */

import Link from 'next/link'

import { TASTINGS } from '@/constants'

const Tastings = () => {
  return (
    <section className="mt-4 grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {TASTINGS.map((tasting, index) => (
        <Tasting key={index} {...tasting} />
      ))}
    </section>
  )
}

export const Tasting = ({
  title,
  description,
  wines
}: {
  title: string
  description: string
  wines: number
}) => {
  return (
    <Link
      className="rounded-3xl hover:opacity-80"
      href={`/tastings/${title.toLowerCase()}`}
    >
      <article className="flex flex-col items-start justify-start gap-4 rounded-lg p-4 text-left text-sm">
        <div className="aspect-square w-full rounded-xl bg-pearl-100" />
        <section className="flex flex-col items-start justify-start gap-2">
          <h2 className="mb-2 mt-4 text-center font-kalnia text-2xl font-bold text-zinc-950">
            {title}
          </h2>
          <p className="text-zinc-500">{wines} wines</p>
          <p className="text-zinc-950">{description}</p>
        </section>
        {/*  <Link
        className="mt-4 rounded-full bg-black px-4 py-2 text-white hover:bg-opacity-80"
        href={`/tastings/${title.toLowerCase()}`}
      >
        View details
        <ArrowRight className="ml-1 inline size-5" />
      </Link> */}
      </article>
    </Link>
  )
}

export default Tastings
