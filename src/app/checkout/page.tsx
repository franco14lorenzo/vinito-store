import { Metadata } from 'next'

export async function generateStaticParams() {
  const tastings = ['standard', 'premium', 'deluxe']
  return tastings.map((type) => ({ type }))
}

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Buy your favorite wines'
}

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
    </div>
  )
}
