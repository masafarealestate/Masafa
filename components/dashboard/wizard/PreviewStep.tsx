import { AgentContactCard } from '../../AgentContactCard'
import { PropertyAmenities } from '../../PropertyAmenities'
import { PropertyDescriptionTabs } from '../../PropertyDescriptionTabs'
import { PropertyGallery } from '../../PropertyGallery'
import { PropertyHeaderBlock } from '../../PropertyHeaderBlock'
import { PropertyLocationCard } from '../../PropertyLocationCard'
import { PropertySpecs } from '../../PropertySpecs'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import { buildPreviewProperty, getPreviewImages, type PreviewAgent, type PreviewPropertyType, type PreviewSeller } from '../../../lib/property-wizard-preview'
import type { PropertyFormState } from '../../../lib/property-wizard'
import type { Amenity } from '../../../lib/types'

export function PreviewStep({
  form,
  propertyTypes,
  sellers,
  agents,
  amenities,
  t,
}: {
  form: PropertyFormState
  propertyTypes: PreviewPropertyType[]
  sellers: PreviewSeller[]
  agents: PreviewAgent[]
  amenities: Amenity[]
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const property = buildPreviewProperty(form, propertyTypes, agents, sellers)
  const images = getPreviewImages(form)
  const selectedAmenities = amenities.filter((a) => form.amenityIds.includes(a.id))

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.preview.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.preview.subheading}</p>

      <div className="mt-5 grid grid-cols-1 gap-8 rounded-lg border border-stone bg-sand p-4 md:p-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <PropertyGallery images={images} property={property} />
          <PropertyHeaderBlock property={property} />
          <PropertySpecs property={property} />
          <PropertyDescriptionTabs property={property} />
          <PropertyAmenities amenities={selectedAmenities} />
          <PropertyLocationCard property={property} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AgentContactCard property={property} />
        </aside>
      </div>
    </div>
  )
}
