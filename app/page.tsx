import { getProperties } from '../lib/properties'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { StatsStrip } from '../components/StatsStrip'
import { FeaturedProperties } from '../components/FeaturedProperties'
import { WhyMasafa } from '../components/WhyMasafa'
import { AgentsStrip } from '../components/AgentsStrip'
import { CtaBand } from '../components/CtaBand'
import { Footer } from '../components/Footer'

export default async function Home() {
  const featured = await getProperties({ limit: 6 })

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <Hero />
      <StatsStrip />
      <FeaturedProperties properties={featured} />
      <WhyMasafa />
      <AgentsStrip />
      <CtaBand />
      <Footer />
    </main>
  )
}
