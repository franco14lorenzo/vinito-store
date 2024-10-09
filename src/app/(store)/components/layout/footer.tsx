const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="flex w-full max-w-screen-xl  flex-col items-center justify-center gap-2 overflow-hidden rounded-b-none border-t border-black/50 p-4">
      <p className="text-center text-xs text-zinc-950">
        &copy; {year} Vinito. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="language" className="text-xs text-zinc-950">
          Language:
        </label>
        <select
          className="cursor-pointer rounded-lg border border-black bg-transparent p-1 text-xs text-zinc-950"
          name="language"
          id="language"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </footer>
  )
}

export default Footer
