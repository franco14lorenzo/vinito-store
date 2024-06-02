const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="flex w-full max-w-screen-xl  flex-col items-center justify-center gap-2 overflow-hidden rounded-xl rounded-b-none bg-black p-4">
      <p className="text-center text-xs text-white">
        &copy; {year} Vinito. All rights reserved.
      </p>
      <select className="rounded-lg border border-white bg-black p-1 text-xs text-white">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </footer>
  )
}

export default Footer
