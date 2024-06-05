const HeadingSection = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="font-kalnia text-4xl font-bold text-zinc-950">{title}</h1>
      <p className="text-zinc-950">{description}</p>
    </section>
  )
}

export default HeadingSection
