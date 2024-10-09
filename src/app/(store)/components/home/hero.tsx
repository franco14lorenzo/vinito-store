import { ArrowRight } from 'lucide-react'

import Link from 'next/link'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <p className="mb-4 text-sm font-medium uppercase text-zinc-950">
          From Mendoza to the world
        </p>
        <h1 className="font-kalnia text-6xl font-bold text-zinc-950">
          Taste Vinito
        </h1>
        <p className="mb-4 mt-3 text-lg font-medium text-zinc-950">
          Embark on a journey of flavors with our curated wine experiences
        </p>
        <Link
          className="mt-4 max-w-fit rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
          href="/tastings"
        >
          Discover our tastings
          <ArrowRight className="ml-2 inline size-5" />
        </Link>
      </div>
    </section>
  )
}

export default Hero
