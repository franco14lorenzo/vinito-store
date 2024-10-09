import { Clock, Gift, GlassWater, MapPin, Sparkles } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { EXPERIENCE_FEATURES } from '@/constants'

interface IIconMap {
  [key: string]: any
}

const iconsMap: IIconMap = {
  clock: <Clock className="size-6" />,
  gift: <Gift className="size-6" />,
  'map-pin': <MapPin className="size-6" />,
  sparkles: <Sparkles className="size-6" />,
  water: <GlassWater className="size-6" />
}

function Experience() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Exclusive Wine Tasting Experience
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE_FEATURES.map((feature, index) => (
            <Card key={index} className="border-none text-primary">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  {iconsMap[feature.icon]}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
