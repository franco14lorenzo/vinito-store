import { ArrowRight } from 'lucide-react'

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
    <article className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-b from-pearl-100 to-pearl-50 p-4">
      <h2 className="mb-2 mt-4 text-center font-kalnia text-2xl font-bold text-zinc-950">
        {title}
      </h2>
      <div className="h-64 w-64 rounded-xl bg-gradient-to-t from-pearl-100 to-pearl-50" />
      <p className="text-zinc-950">{wines} wines</p>
      <p className="text-zinc-950">{description}</p>
      <Link
        className="mt-4 rounded-full bg-black px-4 py-2 text-white hover:bg-opacity-80"
        href={`/tastings/${title.toLowerCase()}`}
      >
        View details
        <ArrowRight className="ml-1 inline size-5" />
      </Link>
    </article>
  )
}

export default Tastings
