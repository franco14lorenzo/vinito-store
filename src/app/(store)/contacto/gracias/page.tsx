import { ArrowRight, CheckCircle, Clock, HelpCircle } from 'lucide-react'

import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
  title: 'Gracias por contactarnos',
  description: 'Hemos recibido tu mensaje y te responderemos pronto'
}

export default function ThankYouContactPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const customerName = searchParams.name as string

  if (!customerName) {
    redirect('/contacto')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-4 px-4 py-12 text-center md:gap-8">
      <Card className="animate-fade-in mx-auto w-full max-w-lg">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold">
            ¡Gracias {customerName} por contactarnos!
          </CardTitle>
          <CardDescription className="text-lg">
            Hemos recibido tu mensaje y te responderemos pronto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4 rounded-lg bg-muted p-4">
            <div>
              <h3 className="inline-flex items-center gap-2 font-semibold">
                {' '}
                <Clock className=" h-4 w-4 flex-shrink-0 text-muted-foreground" />
                Tiempo de respuesta estimado
              </h3>
              <p className="text-sm text-muted-foreground">
                Nos esforzamos por responder a todas las consultas dentro de
                24hs horas hábiles.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Mientras tanto, ¿por qué no exploras más de nuestra selección de
              vinos?
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-2 sm:flex-row sm:justify-between sm:gap-x-6 sm:gap-y-0">
          <Button
            asChild
            variant="outline"
            className="fixed-width w-full flex-1 rounded-full bg-white sm:w-auto"
          >
            <Link href="/faqs">
              Preguntas frecuentes
              <HelpCircle className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="w-full flex-1 rounded-full sm:w-auto">
            <Link href="/">
              Continuar comprando
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
