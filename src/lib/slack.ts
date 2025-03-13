import * as Sentry from '@sentry/nextjs'

type Contact = {
  name: string
  email: string
  message: string
  id: string
  phone?: string
  created_at: string
}

type Order = {
  id: string
  customer_name: string
  customer_surname: string
  customer_email: string
  total: number
  products: any[]
  created_at: string
  payment_method?: string
  delivery_date?: string
  delivery_time?: string
}

async function sendSlackNotification(webhookUrl: string, payload: any) {
  try {
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

export async function sendContactSlackNotification(contact: Contact) {
  const webhookUrl =
    process.env.SLACK_CONTACT_WEBHOOK_URL ||
    'https://hooks.slack.com/services/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'

  const payload = {
    blocks: [
      {
        type: 'divider'
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📩 Hay un nuevo mensaje de contacto!',
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `👤 *Nombre:* ${contact.name}`
          },
          {
            type: 'mrkdwn',
            text: `📧 *Email:* ${contact.email}`
          }
        ]
      },
      contact.phone
        ? {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `📞 *Teléfono:* ${contact.phone}`
              },
              {
                type: 'mrkdwn',
                text: `🆔 *ID:* #${contact.id}`
              }
            ]
          }
        : {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `🆔 *ID:* #${contact.id}`
              },
              {
                type: 'mrkdwn',
                text: ' '
              }
            ]
          },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `💬 *Mensaje:* ${contact.message.length > 100 ? contact.message.substring(0, 100) + '...' : contact.message}`
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Ver Detalles',
              emoji: true
            },
            url: `${process.env.ADMIN_URL}/mensajes-de-contacto?contact_id=${contact.id}&page=1`,
            style: 'primary'
          }
        ]
      },
      {
        type: 'divider'
      }
    ]
  }

  return sendSlackNotification(webhookUrl, payload)
}

export async function sendOrderSlackNotification(order: Order) {
  const webhookUrl =
    process.env.SLACK_SALES_WEBHOOK_URL ||
    'https://hooks.slack.com/services/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'

  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(order.total)

  const productPreview = order.products
    .slice(0, 3)
    .map((p) => p.name)
    .join(', ')

  const additionalProducts =
    order.products.length > 3 ? ` y ${order.products.length - 3} más...` : ''

  const payload = {
    blocks: [
      {
        type: 'divider'
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 Hay una nueva venta!',
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `🔢 *Orden:* # ${order.id}`
          },
          {
            type: 'mrkdwn',
            text: `💰 *Total:* ${formattedTotal}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `👤 *Cliente:* ${order.customer_name} ${order.customer_surname}`
          },
          {
            type: 'mrkdwn',
            text: `📧 *Email:* ${order.customer_email}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `💳 *Pago:* ${order.payment_method || 'No especificado'}`
          },
          {
            type: 'mrkdwn',
            text: `📅 *Entrega:* ${order.delivery_date ? `${order.delivery_date}${order.delivery_time ? ` (${order.delivery_time})` : ''}` : 'No especificada'}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🍷 *Productos:* ${productPreview}${additionalProducts}`
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Ver Detalles',
              emoji: true
            },
            url: `${process.env.ADMIN_URL}/ordenes?order_id=${order.id}`,
            style: 'primary'
          }
        ]
      },
      {
        type: 'divider'
      }
    ]
  }

  return sendSlackNotification(webhookUrl, payload)
}
