'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { IS_DEV_ENVIRONMENT } from '@/constants'

export default function Error({
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
  )
}
