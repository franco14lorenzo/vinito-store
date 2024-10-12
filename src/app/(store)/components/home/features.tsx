import { ReactNode } from 'react'
import { ClipboardList, Truck, Wine } from 'lucide-react'

import { FEATURES } from '@/constants'

interface IIconMap {
  [key: string]: any
}

const iconsMap: IIconMap = {
  wine: <Wine className="size-6" />,
  experience: <ClipboardList className="size-6" />,
  delivery: <Truck className="size-6" />
}

const Features = () => {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mb-10 text-center text-2xl font-semibold">
        ¿Por qué elegir nuestras experiencias?
      </h2>
      <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <Feature
            key={index}
            icon={iconsMap[feature.icon]}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}

export const Feature = ({
  icon,
  title,
  description
}: Readonly<{
  icon: ReactNode
  title: string
  description: string
}>) => {
  return (
    <article className="flex flex-col items-start text-left">
      <div className="mb-4 rounded-full bg-primary/10 p-2">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </article>
  )
}

export default Features
