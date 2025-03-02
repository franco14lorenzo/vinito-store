const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-center gap-2 overflow-hidden rounded-b-none border-t p-4">
      <p className="text-center text-[10px]">
        &copy; {year} Vinito. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
