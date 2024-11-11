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
  return settings.reduce((obj, setting) => {
    obj[setting.key] = setting.value
    return obj
  }, {} as Record<string, string>)
}
