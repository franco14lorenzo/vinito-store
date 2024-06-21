import type { Metadata } from 'next'

import Breadcrumbs from '@/components/blocks/breadcrumbs'

export const metadata: Metadata = {
  title: 'FAQs | Vinito',
  description: 'Frequently asked questions about Vinito'
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'FAQs', href: '/faqs' }
]

export default function FaqsPage() {
  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <h1 className="mb-6 mt-10 w-full text-center font-kalnia text-3xl font-bold">
        Frequently Asked Questions
      </h1>
    </>
  )
}
