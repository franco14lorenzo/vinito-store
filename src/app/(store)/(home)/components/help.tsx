import Link from 'next/link'
import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react'

function Help() {
  return (
    <section className="mb-10 flex w-full max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="flex w-full flex-col items-center justify-between gap-4">
        <h3 className="text-primary text-sm font-medium">
          ¿Necesitas ayuda? ¡Estamos aquí para ayudarte!
        </h3>
        <div className="flex max-w-md flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <Link
            className="border-primary text-primary hover:bg-opacity-80 w-full min-w-48 gap-2 rounded-full border bg-transparent px-4 py-2 text-sm font-medium md:w-fit"
            href="/faqs"
          >
            <HelpCircle className="mr-2 inline size-5" />
            FAQs
            <ArrowRight className="ml-2 inline size-5" />
          </Link>

          <Link
            className="hover:bg-opacity-80 w-full min-w-48 gap-2 rounded-full border border-white bg-black px-4 py-2 text-sm font-medium text-white md:w-fit"
            href="/contacto"
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
