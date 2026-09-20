import { AgentsGrid } from '../../components/AgentsGrid'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { getActiveAgents } from '../../lib/agents'

export default async function AgentsPage() {
  const agents = await getActiveAgents()

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <AgentsGrid agents={agents} />
      <Footer />
    </main>
  )
}
