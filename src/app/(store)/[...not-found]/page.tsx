import { Metadata } from 'next'
import Link from 'next/link'
import { Home, Wine } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'Lo sentimos, parece que esta página no existe'
}

export default function NotFound() {
  return (
    <div className="text-foreground mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center p-4">
      <h1 className="font-kalnia -mt-10 mb-4 text-center text-4xl font-bold">
        ¡Ups! Página no encontrada
      </h1>
      <p className="mb-8 text-center text-base">
        Lo sentimos, parece que esta página no existe.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          className="flex w-full items-center justify-center rounded-full sm:w-auto"
        >
          <Link href="/degustaciones">
            <Wine className="mr-2 h-5 w-5" />
            Explora nuestras degustaciones
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex w-full items-center justify-center rounded-full bg-white sm:w-auto"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}
