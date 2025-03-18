import {
  Experience,
  Features,
  Help,
  Hero,
  LineBarSteps
} from '@/app/(store)/(home)/components'

export const dynamic = 'force-static'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <LineBarSteps />
      <Experience />
      <Help />
    </>
  )
}
