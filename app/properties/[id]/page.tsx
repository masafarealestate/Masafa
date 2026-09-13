import { getPropertyById } from '../../../lib/properties'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { PropertyBreadcrumb } from '../../../components/PropertyBreadcrumb'
import { PropertyGallery } from '../../../components/PropertyGallery'
import { PropertyHeaderBlock } from '../../../components/PropertyHeaderBlock'
import { PropertySpecs } from '../../../components/PropertySpecs'
import { PropertyDescriptionTabs } from '../../../components/PropertyDescriptionTabs'
import { PropertyAmenities } from '../../../components/PropertyAmenities'
import { AgentContactCard } from '../../../components/AgentContactCard'
import { PropertyLocationCard } from '../../../components/PropertyLocationCard'
import { PropertyNotFound } from '../../../components/PropertyNotFound'
import { Reveal } from '../../../components/Reveal'

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { property, images, amenities } = await getPropertyById(id)

  if (!property) {
    return (
      <main className="min-h-screen bg-sand">
        <Header />
        <PropertyNotFound />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <PropertyBreadcrumb property={property} />

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <Reveal>
              <PropertyGallery images={images} property={property} />
            </Reveal>
            <PropertyHeaderBlock property={property} />
            <PropertySpecs property={property} />
            <PropertyDescriptionTabs property={property} />
            <PropertyAmenities amenities={amenities} />
            <PropertyLocationCard property={property} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <AgentContactCard property={property} />
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
