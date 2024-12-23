'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'

import { Kalnia, Raleway } from 'next/font/google'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { IS_DEV_ENVIRONMENT } from '@/constants'

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const kalnia = Kalnia({ subsets: ['latin'], variable: '--font-kalnia' })

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    IS_DEV_ENVIRONMENT && console.error(error)
    // TODO: Handle error in production environment
  }, [error])

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${kalnia.variable} flex min-h-screen w-full flex-col items-center justify-start bg-neutral-50 font-raleway text-zinc-950`}
      >
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center p-4 text-foreground">
          <AlertTriangle className="-mt-10 mb-4 h-16 w-16 text-destructive" />
          <h1 className="mb-4 text-center font-kalnia text-4xl font-bold">
            ¡Ups! Algo salió mal
          </h1>
          <p className="mb-8 text-center text-base">
            Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido
            notificado y estamos trabajando para solucionarlo.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => reset()}
              className="flex w-full items-center justify-center rounded-full sm:w-auto"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Intentar de nuevo
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
      </body>
    </html>
  )
}
