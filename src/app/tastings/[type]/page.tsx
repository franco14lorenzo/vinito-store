import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tastings = ['standard', 'premium', 'deluxe']
  return tastings.map((type) => ({ type }))
}

export const metadata: Metadata = {
  title: 'Tasting Details',
  description: 'Discover our wine tastings'
}

export default function TastingDetailsPage({
  params
}: {
  params: { type: string }
}) {
  const tasting = {
    standard: {
      title: 'Standard',
      description:
        'Our Standard Tasting is perfect for newcomers, featuring a delightful selection of three wines.',
      wines: 3
    },
    premium: {
      title: 'Premium',
      description:
        'The Premium Tasting elevates your experience with four exceptional wines, ideal for expanding your wine knowledge.',
      wines: 4
    },
    deluxe: {
      title: 'Deluxe',
      description:
        'For the ultimate indulgence, our Deluxe Tasting includes five of the finest wines, perfect for connoisseurs and special occasions.',
      wines: 5
    }
  }[params.type]

  if (!tasting) {
    return notFound()
  }

  return (
    <>
      <h1 className="mb-4 font-kalnia text-3xl font-bold">{tasting.title}</h1>
      <p className="mb-4 text-lg">{tasting.description}</p>
      <p className="text-lg">Number of wines: {tasting.wines}</p>
    </>
  )
}
