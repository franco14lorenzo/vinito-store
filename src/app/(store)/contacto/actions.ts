'use server'

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

    if (!webhookUrl) {
      console.error('Slack contact webhook URL is not configured')
      return {
        success: false,
        error: 'Slack contact webhook URL is not configured'
      }
    }

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
    console.error('Failed to send contact Slack notification:', error)
    return { success: false, error }
  }
}

export async function sendContact(contact: Contact) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select('*')
    .single()

  if (error) {
    return { data: null, error }
  }
  console.log('🚀 ~ sendContact ~ data:', data)

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
