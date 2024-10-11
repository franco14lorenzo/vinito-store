'use server'

import { createClient } from '@/lib/supabase/server'

type Order = {
  customer: { [key: string]: any }
  customer_note: string
  accommodation_id: string
  delivery: { date: string; time: number }
  payment: { method: number }
  total: number
  items: { id: number; quantity: number }[]
}

export async function createOrder(order: Order) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('create_order', {
    customer: order.customer,
    customer_note: order.customer_note,
    accommodation_id: order.accommodation_id,
    delivery_date: order.delivery.date,
    delivery_schedule_id: order.delivery.time, // Ensure this is an integer
    payment_method_id: order.payment.method,
    total_amount: order.total,
    items: order.items
  })

  if (error) {
    return { data: null, error }
  }

  return { data, error: null }
}
