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
  description: 'Frequently asked questions about Vinito'
}

const breadcrumbs = [
  { name: 'Inicio', href: '/' },
  { name: 'FAQs', isCurrentPage: true }
]

const faqs = [
  {
    question: 'What is Vinito?',
    answer:
      'Vinito is a wine delivery service that allows you to order wine online and have it delivered to your accommodation.'
  },
  {
    question: 'Why should I choose Vinito?',
    answer:
      'Vinito offers a wide selection of wines from Mendoza, Argentina. We deliver to your accommodation, so you can enjoy your wine without having to leave your room.'
  },
  {
    question: 'How do I place an order?',
    answer:
      'To place an order, simply browse our selection of wines, add the ones you want to your cart, and proceed to checkout.'
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery times vary depending on your location. You can choose your preferred delivery date and time during checkout. You can order 30 minutes in advance or up to 30 days in advance.'
  },
  {
    question: 'How much does delivery cost?',
    answer:
      'Delivery is free for all our accommodation customers. For other customers, delivery costs vary depending on your location.'
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards with Mercado Pago. We also accept cryptocurrency payments with Binance Pay. You can also pay with cash on delivery.'
  }
]

export default function FaqsPage() {
  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <h1 className="mb-6 mt-10 w-full text-center font-kalnia text-3xl font-bold">
        Frequently Asked Questions
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
