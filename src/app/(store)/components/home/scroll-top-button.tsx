'use client'
import { ChevronsUp } from 'lucide-react'

function ScrollTopButton() {
  return (
    <button
      className="text-primary hover:bg-opacity-80 mt-4 max-w-fit rounded-full px-4 py-2 font-medium"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      Scroll to top
      <ChevronsUp className="ml-2 inline size-5 animate-bounce" />
    </button>
  )
}

export default ScrollTopButton
