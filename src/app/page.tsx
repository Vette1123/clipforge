import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { LogoMarquee } from '@/components/site/LogoMarquee'
import { Features } from '@/components/site/Features'
import { HowItWorks } from '@/components/site/HowItWorks'
import { Pricing } from '@/components/site/Pricing'
import { FAQ } from '@/components/site/FAQ'
import { CTA } from '@/components/site/CTA'
import { Footer } from '@/components/site/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
