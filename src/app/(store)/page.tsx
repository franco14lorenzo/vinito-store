import {
  Experience,
  Features,
  Help,
  Hero,
  LineBarSteps
} from '@/app/(store)/components/home'

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
