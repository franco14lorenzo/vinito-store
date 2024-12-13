import { QueryData } from '@supabase/supabase-js'

import type { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'

import Breadcrumbs from '@/components/blocks/breadcrumbs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { createClient } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Preguntas frecuentes'
}

const breadcrumbs = [
  { name: 'Inicio', href: '/' },
  { name: 'FAQs', isCurrentPage: true }
]

export const dynamic = 'force-static'

export default async function FaqsPage() {
  const { data, error } = await getCachedFaqs()

  if (error) {
    // TODO: Handle error
    throw error
  }

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <h1 className="my-6 w-full text-center font-kalnia text-3xl font-bold">
        Preguntas frecuentes
      </h1>
      <Accordion type="single" collapsible className="w-full px-4">
        {data.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={`faq-${faq.id}`}
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

async function getFaqs() {
  const supabase = createClient()
  const faqsQuery = supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('status', 'active')
    .order('order', { ascending: true })

  type Faqs = QueryData<typeof faqsQuery>

  const { data, error } = await faqsQuery

  return { data: data as Faqs, error }
}

const getCachedFaqs = cache(
  async () => {
    const { data: faqsData, error } = await getFaqs()
    return { data: faqsData, error }
  },
  ['faqs'],
  {
    tags: ['faqs']
  }
)
