'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { createOrder } from '@/app/(store)/checkout/components/checkout-form/actions'
import ContactInformation from '@/app/(store)/checkout/components/checkout-form/contact-information'
import DeliveryInformation from '@/app/(store)/checkout/components/checkout-form/delivery-information'
import OrderSummary from '@/app/(store)/checkout/components/checkout-form/order-summary'
import PaymentInformation from '@/app/(store)/checkout/components/checkout-form/payment-information'
import type { CartItem } from '@/app/(store)/contexts/cart'
import { useCart } from '@/app/(store)/contexts/cart'
import type { Accommodation } from '@/app/contexts/accommodation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { IS_DEV_ENVIRONMENT } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'

type Order = {
  customer: { [key: string]: any }
  customer_note: string
  accommodation_id: string
  delivery: { date: string; time: number }
  payment: { method: number }
  total: number
  items: {
    id: number
    quantity: number
    slug: string
    price: number
    image: string | null
    name: string
  }[]
}

const formSchema = z.object({
  accommodation: z.string({
    required_error:
      'Por favor escanea el QR de tu alojamiento o ingresa mediante el link que te proporcionaron.'
  }),
  deliveryDate: z.date().refine(
    (date) => {
      const now = new Date()
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)
      now.setHours(0, 0, 0, 0)
      return selectedDate >= now
    },
    {
      message: 'Selecciona una fecha válida.'
    }
  ),
  deliveryTime: z.string().min(1, {
    message: 'Selecciona una hora de entrega.'
  }),
  name: z.string().min(1, {
    message: 'Ingresa tu nombre.'
  }),
  surname: z.string().min(1, {
    message: 'Ingresa tu apellido.'
  }),
  email: z.string().email({
    message: 'Ingresa un correo electrónico válido.'
  }),
  phone: z.string().min(6, {
    message: 'Ingresa un número de teléfono válido.'
  }),
  customerNote: z
    .string()
    .max(255, {
      message: 'El mensaje no puede tener más de 255 caracteres.'
    })
    .optional(),
  paymentMethod: z.string().min(1, {
    message: 'Selecciona un método de pago.'
  })
})

const CheckoutForm = ({
  items,
  accommodation,
  paymentMethods,
  deliverySchedules
}: {
  items: CartItem[]
  accommodation: Accommodation | null
  paymentMethods: {
    id: number
    name: string
    type: 'cash_on_delivery' | 'bank_transfer' | null
  }[]
  deliverySchedules: {
    id: number
    name: string
    start_time: string
    end_time: string
  }[]
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { totalPrice, clearCart } = useCart()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      accommodation: accommodation?.id || '',
      deliveryDate: new Date(),
      deliveryTime: '',
      customerNote: '',
      paymentMethod: ''
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    const order: Order = {
      customer: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone
      },
      customer_note: values.customerNote || '',
      accommodation_id: values.accommodation,
      delivery: {
        date: values.deliveryDate.toISOString(),
        time: Number(values.deliveryTime)
      },
      payment: {
        method: Number(values.paymentMethod) || 0
      },
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        slug: item.slug,
        price: Number(item.price),
        image: item.image,
        name: item.name
      })),
      total: Number(totalPrice) || 0
    }

    const { data, error } = await createOrder(order)

    if (error) {
      IS_DEV_ENVIRONMENT ? console.error(error) : Sentry.captureException(error)
      toast({
        variant: 'destructive',
        title: 'Error al procesar tu orden',
        description:
          'Hubo un error al procesar tu orden. Por favor intenta de nuevo. Si el problema persiste, por favor contáctanos.'
      })
      setLoading(false)
      return
    }

    clearCart()
    router.push(
      `/checkout/success/?name=${values.name}&email=${values.email}&order_id=${data[0].order_id}`
    )
  }

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen w-full flex-1 flex-col items-start justify-center gap-4 px-4 pb-56 md:flex-row-reverse md:justify-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <OrderSummary
          items={items}
          totalPrice={formatCurrency(totalPrice)}
          loading={loading}
        />

        <div className="flex w-full flex-1 flex-col items-start justify-start gap-4 py-4">
          <DeliveryInformation
            form={form}
            deliverySchedules={deliverySchedules}
            accommodationName={accommodation?.name || ''}
          />
          <ContactInformation form={form} />
          <PaymentInformation form={form} paymentMethods={paymentMethods} />
        </div>
        <Button
          type="submit"
          className="h-10 w-full rounded-full disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
          disabled={loading}
        >
          {!loading ? (
            'Comprar ahora'
          ) : (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin text-white"
                aria-label="Cargando"
              />
              <span>Procesando tu compra</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default CheckoutForm
