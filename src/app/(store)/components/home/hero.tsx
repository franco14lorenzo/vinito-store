import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <p className="mb-4 text-sm font-medium text-zinc-950 uppercase">
          De Mendoza al mundo
        </p>
        <h1 className="font-kalnia text-6xl font-bold text-zinc-950">
          Prueba Vinito
        </h1>
        <p className="mt-3 mb-4 text-lg font-medium text-zinc-950">
          Embárcate en un viaje de sabores con nuestras experiencias de vino
          seleccionadas
        </p>
        <Link
          className="hover:bg-opacity-80 mt-4 flex h-12 max-w-fit min-w-48 items-center justify-center gap-2 rounded-full border border-white bg-black px-4 font-medium text-white"
          href="/degustaciones"
        >
          <span>Descubre nuestras catas</span>
          <ArrowRight className="inline size-5" />
        </Link>
      </div>
    </section>
  )
}

export default Hero
