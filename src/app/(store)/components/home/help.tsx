import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react'

import Link from 'next/link'

function Help() {
  return (
    <section className="mb-10 flex w-full max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="flex w-full flex-col items-center justify-between gap-4">
        <h3 className="text-sm font-medium text-primary">
          ¿Necesitas ayuda? ¡Estamos aquí para ayudarte!
        </h3>
        <div className="flex max-w-md flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <Link
            className="w-full gap-2 rounded-full border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-opacity-80 md:w-fit"
            href="/faqs"
          >
            <HelpCircle className="mr-2 inline size-5" />
            FAQs
            <ArrowRight className="ml-2 inline size-5" />
          </Link>

          <Link
            className="w-full gap-2 rounded-full border border-white bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 md:w-fit"
            href="/contact"
          >
            <MessageCircle className="mr-2 inline size-5" />
            Contactanos
            <ArrowRight className="ml-2 inline size-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Help
