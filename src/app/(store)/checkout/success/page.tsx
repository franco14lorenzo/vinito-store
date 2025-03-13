import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import OrderConfirmation from '@/app/(store)/checkout/success/components/order-confirmation'

import ConfettiEffect from '../../components/confetti-effect'

export const metadata: Metadata = {
  title: 'Gracias por tu compra',
  description: '¡Gracias por tu compra!'
}

export default async function SuccessCheckoutPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const customerName = searchParams.name as string
  const customerEmail = searchParams.email as string
  const orderId = searchParams.order_id as string

  if (!customerName || !customerEmail || !orderId) {
    redirect('/checkout')
  }

  return (
    <>
      <OrderConfirmation
        customerName={customerName}
        customerEmail={customerEmail}
        orderId={orderId}
      />
      <ConfettiEffect />
    </>
  )
}
