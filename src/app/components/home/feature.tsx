import { ReactNode } from 'react'

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
    <article className="flex flex-col items-center justify-start gap-2 text-balance rounded-lg bg-gradient-to-b from-pearl-100 to-pearl-50 p-6 text-left">
      {icon && icon}
      <h2 className="text-base font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
    </article>
  )
}
