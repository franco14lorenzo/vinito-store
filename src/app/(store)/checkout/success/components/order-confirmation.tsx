'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Copy } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function OrderConfirmation({
  customerName,
  orderId,
  customerEmail
}: {
  customerName: string
  orderId: string
  customerEmail: string
}) {
  const posthog = usePostHog()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    posthog.capture('Order Details Viewed', {
      order_id: orderId,
      customer_name: customerName,
      customer_email: customerEmail
    })
  }, [posthog, orderId, customerName, customerEmail])

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 5000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start gap-4 px-4 py-12 text-center md:gap-8">
      <Card className="animate-fade-in mx-auto w-full max-w-lg">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
            🎉
          </div>
          <CardTitle className="text-3xl font-bold">
            ¡Gracias, {customerName}!
          </CardTitle>
          <CardDescription className="text-lg">
            Tu orden ha sido procesado con éxito.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground text-sm font-medium">
              ID de la orden
            </p>
            <p className="mt-1 text-lg font-semibold">{orderId}</p>
          </div>
          <Separator />
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">
              Hemos enviado una confirmación por correo electrónico a:
            </p>
            <p className="font-semibold">{customerEmail}</p>
          </div>
          <Separator />
          <p className="text-muted-foreground text-sm">
            Si tienes alguna duda o necesitas ayuda, por favor{' '}
            <Link href="/contacto" className="text-blue-600 hover:underline">
              contáctenos
            </Link>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-2 sm:flex-row sm:justify-between sm:gap-x-6 sm:gap-y-0">
          <Button
            onClick={copyOrderId}
            variant="outline"
            className="fixed-width w-full flex-1 rounded-full bg-white sm:w-auto"
            disabled={copied}
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar ID del pedido
              </>
            )}
          </Button>
          <Button asChild className="w-full flex-1 rounded-full sm:w-auto">
            <Link href="/" onClick={() => posthog.capture('Continue Shopping')}>
              Continuar comprando
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
