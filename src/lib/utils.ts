import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Setting {
  key: string
  value: string
}

export function transformSettingsToObject(
  settings: Setting[]
): Record<string, string> {
  return settings.reduce(
    (obj, setting) => {
      obj[setting.key] = setting.value
      return obj
    },
    {} as Record<string, string>
  )
}

export function formatCurrency(value: number | undefined) {
  return typeof value === 'number'
    ? value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
    : '$0,00'
}

export function getImageUrl(image: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images${image}`
}
