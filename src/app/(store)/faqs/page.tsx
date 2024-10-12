import type { Metadata } from 'next'

import Breadcrumbs from '@/components/blocks/breadcrumbs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Preguntas frecuentes'
}

const breadcrumbs = [
  { name: 'Inicio', href: '/' },
  { name: 'FAQs', isCurrentPage: true }
]

const faqs = [
  {
    question: '¿Qué es Vinito?',
    answer:
      'Vinito es un servicio de entrega de vinos que te permite pedir vino en línea y recibirlo en tu alojamiento.'
  },
  {
    question: '¿Por qué debería elegir Vinito?',
    answer:
      'Vinito ofrece una amplia selección de vinos de Mendoza, Argentina. Entregamos a tu alojamiento, para que puedas disfrutar de tu vino sin tener que salir de tu habitación.'
  },
  {
    question: '¿Cómo hago un pedido?',
    answer:
      'Para hacer un pedido, simplemente navega por nuestra selección de vinos, añade los que quieras a tu carrito y procede al pago.'
  },
  {
    question: '¿Cuánto tarda la entrega?',
    answer:
      'Los tiempos de entrega varían según tu ubicación. Puedes elegir tu fecha y hora de entrega preferida durante el pago. Puedes pedir con 30 minutos de anticipación o hasta con 30 días de anticipación.'
  },
  {
    question: '¿Cuánto cuesta la entrega?',
    answer:
      'La entrega es gratuita para todos nuestros clientes de alojamiento. Para otros clientes, los costos de entrega varían según tu ubicación.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos todas las principales tarjetas de crédito y débito con Mercado Pago. También aceptamos pagos con criptomonedas a través de Binance Pay. También puedes pagar en efectivo al momento de la entrega.'
  }
]

export default function FaqsPage() {
  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <h1 className="my-6 w-full text-center font-kalnia text-3xl font-bold">
        Preguntas frecuentes
      </h1>
      <Accordion type="single" collapsible className="w-full px-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border-zinc-950/20"
          >
            <AccordionTrigger className="font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
