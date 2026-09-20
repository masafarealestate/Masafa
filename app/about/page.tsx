import { AboutHero } from '../../components/AboutHero'
import { AboutStory } from '../../components/AboutStory'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { StatsStrip } from '../../components/StatsStrip'
import { WhyMasafa } from '../../components/WhyMasafa'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <AboutHero />
      <AboutStory />
      <WhyMasafa />
      <StatsStrip />
      <Footer />
    </main>
  )
}
