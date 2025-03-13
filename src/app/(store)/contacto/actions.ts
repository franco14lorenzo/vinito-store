'use server'

import * as Sentry from '@sentry/nextjs'

import { verifyCaptchaToken } from '@/lib/captcha'
import { createClient } from '@/lib/supabase/server'

type Contact = {
  name: string
  email: string
  message: string
}

async function sendSlackNotification(
  contact: Contact & { id: string; phone?: string; created_at: string }
) {
  try {
    const webhookUrl =
      process.env.SLACK_CONTACT_WEBHOOK_URL ||
      'https://hooks.slack.com/services/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'

    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📩 Nuevo Contacto Recibido',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*👤 Nombre:* ${contact.name}`
            },
            {
              type: 'mrkdwn',
              text: `*📧 Email:* ${contact.email}`
            },
            contact.phone
              ? {
                  type: 'mrkdwn',
                  text: `*📞 Teléfono:* ${contact.phone}`
                }
              : null,
            {
              type: 'mrkdwn',
              text: `*📅 Fecha:* ${new Date(contact.created_at).toLocaleString()}`
            }
          ].filter(Boolean)
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `💬 *Mensaje:* "${contact.message}"`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '🔍 Ver Detalle'
              },
              url: `${process.env.ADMIN_URL}/mensajes-de-contacto?contact_id=${contact.id}&page=1`,
              style: 'primary'
            }
          ]
        }
      ]
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(
        `Error sending Slack notification: ${response.statusText}`
      )
    }

    return { success: true }
  } catch (error) {
    process.env.IS_DEV_ENVIRONMENT
      ? console.error(error)
      : Sentry.captureException(error)

    return { success: false, error }
  }
}

export async function sendContact(contact: Contact, token: string) {
  const captchaVerified = await verifyCaptchaToken(token)
  if (!captchaVerified) {
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

  await sendSlackNotification({
    ...data,
    id: data.id.toString(),
    phone: data.phone || undefined
  })

  return {
    data,
    error: null
  }
}
