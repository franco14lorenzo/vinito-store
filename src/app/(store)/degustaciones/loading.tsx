import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="-mt-16 flex min-h-screen items-center justify-center">
      <Loader2
        className="text-primary/50 h-10 w-10 animate-spin"
        aria-label="Cargando"
      />
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
