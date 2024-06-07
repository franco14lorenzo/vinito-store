import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
          type: 'Cabernet Sauvignon',
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
          name: 'Justin Vineyards',
          type: 'Cabernet Sauvignon',
          year: 2017,
          region: 'Paso Robles',
          alcohol: 14.5,
          price: 60
        },
        special: {
          name: 'Justin Vineyards',
          type: 'Cabernet Sauvignon',
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

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <h1 className="px-4 py-10 font-kalnia text-3xl font-bold">
        {tasting.title} Tasting
      </h1>
      <section className="w-full px-4 py-2">
        <h2 className="font-bold">Wines</h2>
        <ul className="my-4 grid grid-cols-repeat-130 place-items-center gap-4 rounded-lg bg-gradient-to-b from-pearl-200 to-pearl-100 p-4 py-3 text-xs">
          {Object.values(tasting.wines).map((wine) => (
            <li key={wine.name}>
              <article className="flex h-52 max-w-32 flex-col justify-between rounded-lg bg-pearl-50 p-4">
                <div className="h-8 w-full ">
                  <h3 className="h-8 font-bold">{wine.name}</h3>
                </div>
                <div className="h-3 w-full text-[10px]">
                  <p>{wine.type}</p>
                </div>
                <div className="mt-3 grid h-full grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 self-end px-1 py-4 text-[10px]">
                    <p>{wine.year}</p>
                    <p>{wine.region}</p>
                    <p>{wine.alcohol}%</p>
                  </div>
                  <div className="h-28 w-full rounded-t-full bg-gradient-to-b from-pearl-100 to-pearl-50 p-2" />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section className="px-4 py-2">
        <h2 className="font-bold">Tasting Description</h2>
        <p className="my-4">{tasting.description}</p>
      </section>
      <section className="grid w-full max-w-72 grid-cols-1 gap-4 px-4 py-2">
        <div className="flex w-full justify-between">
          <p className="text-xl font-bold leading-10">${tasting.price}</p>
          <div className="flex items-center gap-2 font-semibold">
            <button className="size-5 rounded-full bg-black leading-5 text-white">
              -
            </button>
            <span>1</span>
            <button className="size-5 rounded-full bg-black leading-5 text-white">
              +
            </button>
          </div>
        </div>
        <button className="w-full rounded-full bg-black py-3 text-white hover:opacity-80">
          Add to Cart
        </button>
      </section>
    </>
  )
}
