import { Amphora, Calendar, Search, Smile } from 'lucide-react'

import { STEPS } from '@/constants'

interface IIconMap {
  [key: string]: any
}

const iconsMap: IIconMap = {
  search: <Search className="size-6" />,
  schedule: <Calendar className="size-6" />,
  tasting: <Amphora className="size-6" />,
  rate: <Smile className="size-6" />
}

function LineBarSteps() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-10 text-center text-2xl font-semibold">
          How it works
        </h2>
        <div className="relative">
          <div className="absolute bottom-12 left-[19px] top-0 h-[530px] w-0.5 bg-gray-700 md:left-1/2 md:top-12 md:h-auto" />
          <div className="space-y-12">
            {STEPS.map((step, index) => (
              <article
                key={index}
                className={`flex flex-col-reverse items-start md:flex-row md:items-center`}
              >
                <div
                  className={`flex w-full pl-12 md:w-1/2 ${
                    index % 2 === 0
                      ? 'md:justify-end md:pr-10'
                      : 'md:order-last md:justify-start md:pl-10'
                  }`}
                >
                  <div className="max-w-xs">
                    <div className="mb-2 flex items-center">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:absolute md:left-1/2 md:-translate-x-1/2 md:transform">
                  {iconsMap[step.icon]}
                </div>
                <div className="hidden w-1/2 md:block" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LineBarSteps
