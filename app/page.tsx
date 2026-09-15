import { getProperties } from '../lib/properties'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { StatsStrip } from '../components/StatsStrip'
import { FeaturedProperties } from '../components/FeaturedProperties'
import { WhyMasafa } from '../components/WhyMasafa'
import { AgentsStrip } from '../components/AgentsStrip'
import { CtaBand } from '../components/CtaBand'
import { Footer } from '../components/Footer'
import { StaffOnlyNotice } from '../components/StaffOnlyNotice'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [featured, params] = await Promise.all([getProperties({ limit: 6 }), searchParams])

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      {params.notice === 'staff-only' && <StaffOnlyNotice />}
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
