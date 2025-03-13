'use server'

import * as Sentry from '@sentry/nextjs'

import { verifyCaptchaToken } from '@/lib/captcha'
import { sendContactSlackNotification } from '@/lib/slack'
import { createClient } from '@/lib/supabase/server'

type Contact = {
  name: string
  email: string
  message: string
}

export async function sendContact(contact: Contact, token: string) {
  const isCaptchaValid = await verifyCaptchaToken(token)
  if (!isCaptchaValid) {
    return {
      data: null,
      error: {
        message: 'Error verifying captcha token'
      }
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select('*')
    .single()

  if (error) {
    process.env.IS_DEV_ENVIRONMENT
      ? console.error(error)
      : Sentry.captureException(error)
    return { data: null, error }
  }

  await sendContactSlackNotification({
    ...data,
    id: data.id.toString(),
    phone: data.phone || undefined
  })

  return {
    data,
    error: null
  }
}
