import { ArrowRight } from 'lucide-react'

import Link from 'next/link'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <p className="mb-4 text-sm font-medium uppercase text-zinc-950">
          De Mendoza al mundo
        </p>
        <h1 className="font-kalnia text-6xl font-bold text-zinc-950">
          Prueba Vinito
        </h1>
        <p className="mb-4 mt-3 text-lg font-medium text-zinc-950">
          Embárcate en un viaje de sabores con nuestras experiencias de vino
          seleccionadas
        </p>
        <Link
          className="mt-4 max-w-fit rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
          href="/degustaciones"
        >
          Descubre nuestras catas
          <ArrowRight className="ml-2 inline size-5" />
        </Link>
      </div>
    </section>
  )
}

export default Hero
