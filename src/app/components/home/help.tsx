import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react'

import Link from 'next/link'

import ScrollTopButton from './scroll-top-button'

function Help() {
  return (
    <section className="mb-10 flex w-full max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="text-base font-medium text-primary">
          Need help? We&rsquo;re here for you.
        </h3>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            className="max-w-fit gap-2 rounded-full border border-white bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80"
            href="/contact"
          >
            <MessageCircle className="mr-2 inline size-5" />
            Contact us
            <ArrowRight className="ml-2 inline size-5" />
          </Link>

          <Link
            className="max-w-fit gap-2 rounded-full border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-opacity-80"
            href="/faqs"
          >
            <HelpCircle className="mr-2 inline size-5" />
            FAQs
            <ArrowRight className="ml-2 inline size-5" />
          </Link>
        </div>
      </div>
      <div className="mt-10 text-sm text-muted-foreground">
        <ScrollTopButton />
      </div>
    </section>
  )
}

export default Help
