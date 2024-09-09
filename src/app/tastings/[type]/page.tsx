import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Actions from '@/app/tastings/[type]/components/actions'
/* import WinesTabs from '@/app/tastings/[type]/components/wines-tabs' */
import Breadcrumbs from '@/components/blocks/breadcrumbs'

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
      wines: [
        {
          name: 'Sullivan Vineyards',
          type: 'Chardonnay',
          year: 2019,
          region: 'Napa Valley',
          alcohol: 13.5,
          price: 50
        },
        {
          name: 'Benziger Family Winery',
          type: 'Merlot',
          year: 2018,
          region: 'Sonoma County',
          alcohol: 14.2,
          price: 45
        },
        {
          name: 'Justin Vineyards',
          type: 'Cabernet Sauvignon',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        }
      ],
      description:
        "Our Standard Tasting is perfect for newcomers, featuring a delightful selection of three wines. With a mix of red and white wines, this tasting is a great introduction to the world of Mendoza's wines. We start with a light and refreshing Chardonnay, followed by a rich and smooth Merlot, and finish with a bold and complex Cabernet Sauvignon.",
      price: (50 + 45 + 60) * 0.9
    },
    premium: {
      title: 'Premium',
      wines: {
        white: {
          name: 'Sullivan Vineyards',
          type: 'Chardonnay',
          year: 2019,
          region: 'Napa Valley',
          alcohol: 13.5,
          price: 50
        },
        red: {
          name: 'Benziger Family Winery',
          type: 'Merlot',
          year: 2018,
          region: 'Sonoma County',
          alcohol: 14.2,
          price: 45
        },
        sparkling: {
          name: 'Justin Vineyards',
          type: 'Cabernet Sauvignon',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        },
        dessert: {
          name: 'Justin Vineyards',
          type: 'Cabernet Franc',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        }
      },
      description:
        'The Premium Tasting elevates your experience with four exceptional wines, ideal for expanding your wine knowledge. This tasting includes a Chardonnay, Merlot, Cabernet Sauvignon, and a dessert wine, each carefully selected to showcase the best of Mendoza. Indulge in a variety of flavors and styles, from light and crisp whites to bold and complex reds. Perfect for wine enthusiasts and those looking to explore new wines.',
      price: (50 + 45 + 60 + 60) * 0.9
    },
    deluxe: {
      title: 'Deluxe',
      wines: {
        white: {
          name: 'Sullivan Vineyards',
          type: 'Chardonnay',
          year: 2019,
          region: 'Napa Valley',
          alcohol: 13.5,
          price: 50
        },
        red: {
          name: 'Benziger Family Winery',
          type: 'Merlot',
          year: 2018,
          region: 'Sonoma County',
          alcohol: 14.2,
          price: 45
        },
        sparkling: {
          name: 'Justin Vineyards',
          type: 'Cabernet Sauvignon',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        },
        dessert: {
          name: 'Dessert Wine',
          type: 'Cabernet Sauvignon',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        },
        special: {
          name: 'Justin Vineyards',
          type: 'Cabernet Franc',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        }
      },
      description:
        'For the ultimate indulgence, our Deluxe Tasting includes five of the finest wines, perfect for connoisseurs and special occasions. This tasting features a Chardonnay, Merlot, Cabernet Sauvignon, dessert wine, and a special reserve wine, each handpicked to showcase the best of Mendoza. Experience a range of flavors and styles, from light and crisp whites to bold and complex reds. Treat yourself to an unforgettable tasting experience with our most exclusive selection of wines.',
      price: (50 + 45 + 60 + 60 + 60) * 0.9
    }
  }[params.type]

  if (!tasting) {
    return notFound()
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Tastings', href: '/tastings' },
    { name: tasting.title, isCurrentPage: true }
  ]

  const wines = Object.values(tasting.wines)

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />

      <section className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        <section className="flex flex-col px-4">
          <div className="aspect-square w-full rounded-lg bg-neutral-100" />
        </section>

        <article className="flex flex-col justify-between gap-4 px-4">
          <section className="py-4 md:py-0">
            <h1 className="h-14 font-kalnia text-3xl font-bold">
              {tasting.title} Tasting
            </h1>
            <h2 className="font-bold">Tasting Description</h2>
            <p className="my-4">{tasting.description}</p>
            <h2 className="font-bold">Wines</h2>
            <p className="my-4">{wines.length} units of 750ml</p>
            <h2 className="font-bold">Mariage</h2>
            <p className="my-4">Cheese and charcuterie board</p>
          </section>
          <div className="hidden md:block">
            <Actions item={{ price: tasting.price, name: tasting.title }} />
          </div>
        </article>
      </section>

      {/*       <section className="grid w-full gap-4 px-4 py-2">
        <h2 className="font-bold">Wines Details</h2>
        <WinesTabs wines={wines} />
      </section> */}

      <div className="h-[60px] w-full md:hidden" />

      <div className="fixed inset-x-0 bottom-0 block  border-t border-zinc-950/10 bg-neutral-50 px-4 pb-4 shadow md:hidden">
        <Actions item={{ price: tasting.price, name: tasting.title }} />
      </div>
    </>
  )
}
