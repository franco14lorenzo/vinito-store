'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import { Resend } from 'resend'
import { v4 as uuid } from 'uuid'

import { IS_DEV_ENVIRONMENT } from '@/constants'
import VinitoPurchaseEmail from '@/emails/vinito-purchase'
import { verifyCaptchaToken } from '@/lib/captcha'
import { sendOrderSlackNotification } from '@/lib/slack'
import { createClient } from '@/lib/supabase/server'
import { transformSettingsToObject } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

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

export async function createOrder(order: Order, captchaToken: string) {
  const isCaptchaValid = await verifyCaptchaToken(captchaToken)
  if (!isCaptchaValid) {
    return {
      data: null,
      error: {
        message: 'Error verifying captcha token'
      }
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.rpc('create_order', {
    customer: order.customer,
    customer_note: order.customer_note,
    accommodation_id: order.accommodation_id,
    delivery_date: order.delivery.date,
    delivery_schedule_id: order.delivery.time,
    payment_method_id: order.payment.method,
    total_amount: order.total,
    items: order.items
  })

  if (error) {
    IS_DEV_ENVIRONMENT ? console.error(error) : Sentry.captureException(error)
    return { data: null, error }
  }

  for (const item of order.items) {
    revalidatePath(`/degustaciones/${item.slug}`)
  }

  // Get additional data for the Slack notification
  const [
    { data: paymentMethod, error: paymentMethodError },
    { data: accommodation, error: accommodationError },
    { data: deliverySchedule, error: deliveryScheduleError }
  ] = await Promise.all([
    supabase
      .from('payment_methods')
      .select('type, name')
      .eq('id', order.payment.method)
      .single(),
    supabase
      .from('accommodations')
      .select('name')
      .eq('id', order.accommodation_id)
      .single(),
    supabase
      .from('delivery_schedules')
      .select('name')
      .eq('id', order.delivery.time)
      .single()
  ])

  const deliveryDate = order.delivery.date
    ? new Date(order.delivery.date).toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    : undefined

  const orderId = data[0].order_id.toString()
  await sendOrderSlackNotification({
    id: orderId,
    customer_name: order.customer.name,
    customer_surname: order.customer.surname,
    customer_email: order.customer.email,
    total: order.total,
    products: order.items,
    created_at: new Date().toISOString(),
    payment_method: paymentMethod?.name,
    delivery_date: deliveryDate,
    delivery_time: deliverySchedule?.name
  })

  let settings = [
    'contact_email',
    'contact_phone_number',
    'send_purchase_emails'
  ]

  if (paymentMethod?.type === 'bank_transfer') {
    const bankSettings = [
      'bank_name',
      'bank_account_holder_name',
      'bank_account_cbu',
      'bank_account_alias'
    ]
    settings = [...settings, ...bankSettings]
  }

  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', settings)

  const settingsObject = transformSettingsToObject(settingsData || [])
  const metadataError =
    paymentMethodError ||
    accommodationError ||
    deliveryScheduleError ||
    settingsError

  if (metadataError) {
    IS_DEV_ENVIRONMENT
      ? console.error(metadataError)
      : Sentry.captureException(metadataError)
    return { data, error: null }
  }

  const sendPurchaseEmails = settingsObject?.send_purchase_emails === 'true'

  if (sendPurchaseEmails) {
    try {
      const { error } = await resend.emails.send({
        from: 'Vinito <noreply@vinito.store>',
        to: [order.customer.email],
        subject: '¡Gracias por tu compra!',
        react: VinitoPurchaseEmail({
          customer: { name: order.customer.name, email: order.customer.email },
          orderNumber: data[0].order_id,
          orderDate: new Date().toISOString(),
          items: order.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          subtotal: order.total,
          shipping: 0,
          tax: 0,
          amount: order.total,
          paymentMethod: paymentMethod?.type || 'cash_on_delivery',
          paymentMethodLabel: paymentMethod?.name || 'Contra entrega',
          paymentStatus: 'pending',
          deliveryDate: order.delivery.date,
          deliveryTime: deliverySchedule?.name || '',
          deliveryAddress: accommodation?.name || '',
          trackingNumber: undefined,
          settings: settingsObject
        }),
        headers: {
          'X-Entity-Ref-ID': uuid()
        }
      })

      if (error) {
        IS_DEV_ENVIRONMENT
          ? console.error(error)
          : Sentry.captureException(error)
      }
    } catch (error) {
      IS_DEV_ENVIRONMENT ? console.error(error) : Sentry.captureException(error)
    }
  }

  return { data, error: null }
}
