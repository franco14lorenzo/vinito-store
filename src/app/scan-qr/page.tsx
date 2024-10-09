import { MessageCircle, QrCode } from 'lucide-react'

import type { Metadata } from 'next'

import Logo from '@/app/components/logo'
import ScanQRButton from '@/app/scan-qr/components/scan-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Scan QR Code',
  description: 'Scan the QR code to access the store front'
}

export default function ScanQRPage() {
  return (
    <div className="grid gap-4">
      <header className="flex h-16 items-center justify-center p-2">
        <Logo />
      </header>

      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="-mt-20 w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold md:text-2xl">
              <QrCode className="mr-2 h-6 w-6" />
              Escanea el código QR
            </CardTitle>
            <CardDescription>
              Escanea el código QR ubicado en tu alojamiento para acceder a
              nuestro ecommerce. O solicita el link de acceso por WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-inside list-decimal space-y-2">
              <li>
                Busca el código QR en tu habitación o en la recepción del
                alojamiento.
              </li>
              <li>Haz clic en el botón &quot;Escanear QR&quot; abajo.</li>
              <li>Permite el acceso a la cámara si se te solicita.</li>
              <li>Apunta la cámara al código QR y espera a que se escanee.</li>
              <li>¡Listo! Accede al link que se abrirá en tu navegador.</li>
            </ol>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:space-x-4 md:flex-row md:justify-between">
            <Button
              variant="outline"
              className="w-full rounded-full bg-white md:w-auto"
              asChild
            >
              <a target="_blank" href="https://wa.me/5492615040179">
                <MessageCircle className="mr-2 h-4 w-4" />
                Solicitar link
              </a>
            </Button>
            <ScanQRButton />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
