import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { QueryData } from '@supabase/supabase-js'
import { ArrowRight } from 'lucide-react'

import CheckoutForm from '@/app/(store)/checkout/components/checkout-form'
import type { CartItem } from '@/app/(store)/contexts/cart'
import type { Accommodation } from '@/app/contexts/accommodation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Finalizar Compra',
  description: 'Compra tus vinos favoritos'
}

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const itemsCookie = cookieStore.get('cartItems')?.value
  const items = itemsCookie ? (JSON.parse(itemsCookie) as CartItem[]) : []

  const accommodationCookie = cookieStore.get('accommodation')?.value
  const accommodation = accommodationCookie
    ? (JSON.parse(accommodationCookie) as Accommodation)
    : null

  const { data: paymentMethods } = await getPaymentsMethods()

  const { data: deliverySchedules } = await getDeliverySchedules()

  return (
    <>
      <h1 className="my-6 w-full text-center font-kalnia text-3xl font-bold">
        Finalizar Compra
      </h1>
      {items?.length ? (
        <CheckoutForm
          items={items}
          accommodation={accommodation}
          paymentMethods={paymentMethods}
          deliverySchedules={deliverySchedules}
        />
      ) : (
        <section className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-56 text-center">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <p className="px-4 py-2 text-center text-sm">
              Tu carrito está vacío
            </p>
            <p className="px-4 py-2 text-center text-lg font-semibold">
              ¡Agrega algunos artículos para comenzar!
            </p>
            <Link
              className="mt-4 flex h-12 max-w-fit items-center justify-center rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
              href="/degustaciones"
            >
              Descubre nuestras degustaciones
              <ArrowRight className="ml-2 inline size-5" />
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

async function getPaymentsMethods() {
  const supabase = createClient()
  const paymentsMethodsQuery = supabase
    .from('payment_methods')
    .select('id, name, type')
    .eq('status', 'active')

  type PaymentsMethods = QueryData<typeof paymentsMethodsQuery>

  const { data, error } = await paymentsMethodsQuery

  return { data: data as PaymentsMethods, error }
}

async function getDeliverySchedules() {
  const supabase = createClient()
  const deliverySchedulseQuery = supabase
    .from('delivery_schedules')
    .select('id, name, start_time, end_time')
    .eq('status', 'active')

  type DeliverySchedules = QueryData<typeof deliverySchedulseQuery>

  const { data, error } = await deliverySchedulseQuery

  return { data: data as DeliverySchedules, error }
}
