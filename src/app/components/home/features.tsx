import { ReactNode } from 'react'
import { ClipboardList, Truck, Wine } from 'lucide-react'

import { FEATURES } from '@/constants'

interface IIconMap {
  [key: string]: any
}

const iconsMap: IIconMap = {
  wine: <Wine className="size-8" />,
  experience: <ClipboardList className="size-8" />,
  delivery: <Truck className="size-8" />
}

const Features = () => {
  return (
    <section className="my-12 mt-12 grid grid-cols-1 gap-6 px-3 md:grid-cols-3">
      {FEATURES.map((feature, index) => (
        <Feature
          key={index}
          icon={iconsMap[feature.icon]}
          title={feature.title}
          description={feature.description}
        />
      ))}
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
    <article className="flex flex-col items-start justify-start gap-2 text-balance rounded-lg bg-gradient-to-b from-pearl-100 to-pearl-50 p-6 text-left">
      {icon && icon}
      <h2 className="text-base font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
    </article>
  )
}

export default Features
