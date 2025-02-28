import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/utils'

export function WinesTabs({
  wines
}: {
  wines: {
    name: string
    type: string
    year: number
    region: string
    alcohol: number
    price: number
  }[]
}) {
  return (
    <Tabs
      defaultValue={`${wines[0].name}-${wines[0].type}`}
      orientation="vertical"
      className="flex gap-4"
    >
      <TabsList className="grid h-auto gap-2 bg-neutral-100 px-4 py-4 text-xs">
        {wines.map((wine) => (
          <TabsTrigger
            aria-label={wine.type}
            key={`${wine.name}-${wine.type}`}
            value={`${wine.name}-${wine.type}`}
            className="h-auto text-wrap p-2 text-xs shadow-sm hover:bg-neutral-200 active:bg-neutral-200"
          >
            {wine.name} - {wine.type}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="grid flex-1 gap-4 px-4 py-2">
        {wines.map((wine) => (
          <TabsContent
            aria-label={`${wine.name} details`}
            key={`${wine.name}-${wine.type}`}
            value={`${wine.name}-${wine.type}`}
          >
            <h2 className="text-lg font-semibold">{wine.type}</h2>
            <p className="text-sm text-zinc-950">
              {wine.year} {wine.region} {wine.alcohol}%
            </p>
            <p className="text-lg font-semibold">
              ${formatCurrency(wine.price)}
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

export default WinesTabs
