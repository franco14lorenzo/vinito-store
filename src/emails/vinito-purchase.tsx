import * as React from 'react'
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

import { formatCurrency, getImageUrl } from '@/lib/utils'

interface VinitoPurchaseEmailProps {
  customer: {
    name: string
    email: string
    phone?: string
  }
  orderNumber: string
  orderDate: string
  items: {
    id: number
    name: string
    price: number
    quantity: number
    image: string | null
  }[]
  subtotal: number
  shipping: number
  tax: number
  amount: number
  paymentMethod: string
  paymentMethodLabel?: string
  paymentStatus: string
  deliveryDate: string
  deliveryTime?: string
  deliveryAddress: string
  trackingNumber?: string
  settings: Record<string, string>
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const VinitoPurchaseEmail = ({
  customer,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  amount,
  paymentMethod,
  paymentMethodLabel,
  paymentStatus,
  deliveryDate,
  deliveryTime,
  deliveryAddress,
  trackingNumber,
  settings
}: VinitoPurchaseEmailProps) => {
  const previewText = `Vinito - Confirmación de Pedido ${orderNumber}`
  const logoUrl = getImageUrl('/vinito-logo.png')

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-50 p-2 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-gray-200 bg-neutral-50 p-4 pt-6 shadow-xs">
            <Section className="mb-6">
              <Row>
                <Column align="center">
                  <Img
                    src={logoUrl}
                    width="115"
                    height="32"
                    alt="Vinito Logo"
                    className="mx-auto my-0"
                  />
                </Column>
              </Row>
            </Section>
            <Hr className="mt-2 border-gray-200" />

            {/* Header */}
            <Heading className="mx-0 mb-6 text-center text-2xl font-bold text-gray-800">
              ¡{customer.name || 'Estimado cliente'}, gracias por tu compra ! 🎉
            </Heading>

            <Text className="mb-6 text-center text-gray-600">
              Tu pedido ha sido confirmado y está siendo procesado. 🚀
            </Text>

            {/* Order Status */}
            <Section className="mb-6 rounded-lg bg-blue-50 p-4">
              <Text className="text-center text-lg text-blue-800">
                Estado de tu pedido: <br />
                <span className="font-semibold">
                  {paymentStatus === 'Paid'
                    ? '✅ Confirmado'
                    : '⏳ Pendiente de Pago'}
                </span>
              </Text>
            </Section>

            {/* Payment Instructions */}
            {paymentStatus !== 'Paid' && (
              <Section className="mb-6 rounded-lg bg-yellow-50 p-6">
                <Text className="mb-4 text-lg font-semibold text-yellow-800">
                  ⚠️ Acción requerida: Instrucciones de pago
                </Text>
                {paymentMethod === 'bank_transfer' && (
                  <>
                    <Text className="mb-2 text-yellow-800">
                      Para completar tu compra, realiza una transferencia
                      bancaria a la siguiente cuenta:
                    </Text>
                    <Text className="mb-1 font-medium text-yellow-900">
                      🏦 Banco: {settings?.bank_name}
                    </Text>
                    <Text className="mb-1 font-medium text-yellow-900">
                      👤 Titular: {settings?.bank_account_holder_name}
                    </Text>
                    <Text className="mb-1 font-medium text-yellow-900">
                      🔢 CBU: {settings?.bank_account_cbu}
                    </Text>
                    <Text className="mb-1 font-medium text-yellow-900">
                      📛 Alias: {settings?.bank_account_alias}
                    </Text>
                    <Hr className="my-4 border-gray-200" />
                    <Text className="mb-1 font-medium text-yellow-900">
                      💰 Monto a tranferir: {formatCurrency(amount)}
                    </Text>
                    <Text className="mt-2 text-sm font-medium text-yellow-800">
                      📧 Una vez realizada la transferencia, por favor envía el
                      comprobante por WhatsApp al número:{' '}
                      {settings.contact_phone_number}
                    </Text>
                  </>
                )}
                {paymentMethod === 'cash_on_delivery' && (
                  <Text className="text-yellow-800">
                    💵 Prepara {formatCurrency(amount)} en efectivo para
                    entregar al repartidor cuando recibas tu pedido. Por favor,
                    ten en cuenta que el repartidor no dispone de cambio.
                  </Text>
                )}
              </Section>
            )}

            {/* Order details */}
            <Section className="mb-6 rounded-lg bg-gray-50 p-6">
              <Text className="mb-4 text-lg font-semibold text-gray-800">
                Detalles del Pedido
              </Text>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-600">ID del pedido</Text>
                </Column>
                <Column align="right">
                  <Text className="font-medium text-gray-800">
                    {orderNumber}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-600">
                    Fecha del Pedido:
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-gray-800">
                    {new Date(orderDate).toLocaleDateString('es-ES')}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-sm text-gray-600">
                    Estado del Pago:
                  </Text>
                </Column>
                <Column align="right">
                  <Text
                    className={`font-medium ${
                      paymentStatus === 'Paid'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {paymentStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Order summary */}
            <Section className="mb-6 rounded-lg bg-gray-50 p-6">
              <Text className="mb-4 text-lg font-semibold text-gray-800">
                Resumen del Pedido
              </Text>

              {/* Products in summary */}
              {items.map((item) => (
                <Row
                  key={item.id}
                  className="mb-3 border-b border-gray-200 pb-3"
                >
                  <Column className="w-[70%]">
                    <Text className="text-sm text-gray-800">
                      {item.name} x {item.quantity}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text className="text-sm font-medium text-gray-800">
                      {formatCurrency(item.price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}

              {/* Costs breakdown */}
              <Row className="mt-4 mb-2">
                <Column>
                  <Text className="text-sm text-gray-600">Subtotal:</Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-800">
                    {formatCurrency(subtotal)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-600">Envío:</Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-800">
                    {formatCurrency(shipping)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-600">Impuestos:</Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-800">
                    {formatCurrency(tax)}
                  </Text>
                </Column>
              </Row>

              {/* Total */}
              <Hr className="my-4 border-gray-200" />
              <Row>
                <Column>
                  <Text className="text-base font-semibold text-gray-800">
                    Total:
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-base font-bold text-gray-800">
                    {formatCurrency(amount)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Shipping information */}
            <Section className="mb-6">
              <Text className="mb-4 text-lg font-semibold text-gray-800">
                Información de Envío
              </Text>
              <Text className="mb-2 text-gray-800">
                📅 Fecha estimada de entrega:{' '}
                {new Date(deliveryDate).toLocaleDateString('es-ES')}
              </Text>
              {deliveryTime && (
                <Text className="mb-2 text-gray-800">
                  ⏰ Horario estimado de entrega: {deliveryTime}
                </Text>
              )}
              <Text className="mb-2 text-gray-800">
                🏠 Alojamiento: {deliveryAddress}
              </Text>
              {trackingNumber && (
                <Text className="text-gray-800">
                  🚚 Número de seguimiento: {trackingNumber}
                </Text>
              )}
            </Section>

            {/* Payment information */}
            <Section className="mb-6">
              <Text className="mb-4 text-lg font-semibold text-gray-800">
                Información de Pago
              </Text>
              <Text className="mb-2 text-gray-800">
                💳 Método de Pago: {paymentMethodLabel}
              </Text>
              <Text className="text-gray-800">
                💰 Estado del Pago:{' '}
                {paymentStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="mb-6 border-gray-200" />
            <Text className="mb-4 text-center text-sm text-gray-600">
              Si tienes alguna pregunta sobre tu pedido, no dudes en
              contactarnos:
            </Text>
            <Text className="text-center text-sm text-gray-600">
              📧 Email: {settings.contact_email} | 📞 WhatsApp:{' '}
              {settings.contact_phone_number} <br />
              🌐 Web:{' '}
              <Link
                href={`${baseUrl}/contacto`}
                className="text-blue-600 hover:underline"
              >
                {baseUrl}/contacto
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VinitoPurchaseEmail.PreviewProps = {
  customer: {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+34 600 123 456'
  },
  orderNumber: '123456',
  orderDate: '2023-10-01',
  items: [
    {
      id: 1,
      name: 'Vino Tinto Reserva',
      price: 25.99,
      quantity: 2,
      image: `${baseUrl}/vino-tinto-reserva.png`
    },
    {
      id: 2,
      name: 'Vino Blanco Chardonnay',
      price: 19.99,
      quantity: 1,
      image: `${baseUrl}/vino-blanco-chardonnay.png`
    }
  ],
  subtotal: 71.97,
  shipping: 5.99,
  tax: 6.48,
  amount: 84.44,
  paymentMethod: 'bank_transfer',
  paymentMethodLabel: 'Transferencia Bancaria',
  paymentStatus: 'pending',
  deliveryDate: '2023-10-05',
  deliveryTime: '10:00 - 12:00',
  deliveryAddress: 'Calle Falsa 123, Madrid, España',
  trackingNumber: 'TRACK123456789',
  settings: {
    contact_email: 'contacto@example.com',
    contact_phone_number: '+34 600 123 456',
    bank_name: 'Banco Santander',
    bank_account_holder_name: 'Juan Pérez',
    bank_account_cbu: '1234567890123456789012',
    bank_account_alias: 'juan.perez'
  }
}

export default VinitoPurchaseEmail
