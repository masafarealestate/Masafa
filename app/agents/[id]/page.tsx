import { AgentNotFound } from '../../../components/AgentNotFound'
import { AgentProfile } from '../../../components/AgentProfile'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { getActiveAgentById, getAgentListings } from '../../../lib/agents'

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agent = await getActiveAgentById(id)

  if (!agent) {
    return (
      <main className="min-h-screen bg-sand">
        <Header />
        <AgentNotFound />
        <Footer />
      </main>
    )
  }

  const listings = await getAgentListings(agent.id)

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <AgentProfile agent={agent} listings={listings} />
      <Footer />
    </main>
  )
}
