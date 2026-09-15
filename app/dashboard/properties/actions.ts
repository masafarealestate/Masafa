'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../lib/supabase-server'
import { buildMediaInsertRows, buildPropertyPayload, type PropertyFormState } from '../../../lib/property-wizard'
import type { SupabaseClient } from '@supabase/supabase-js'

export type ActionResult = { error: string | null }

async function setStatus(id: string, status: 'published' | 'hidden'): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('properties').update({ status }).eq('id', id)

  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')

  return { error: error?.message ?? null }
}

export async function publishProperty(id: string): Promise<ActionResult> {
  return setStatus(id, 'published')
}

export async function hideProperty(id: string): Promise<ActionResult> {
  return setStatus(id, 'hidden')
}

export async function deleteProperty(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('properties').delete().eq('id', id)

  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')

  return { error: error?.message ?? null }
}

type SaveErrorCode = 'auth' | 'seller' | 'property' | null

export type SavePropertyResult = { error: SaveErrorCode; id?: string; fellBackToPendingReview?: boolean }

type TargetStatus = 'draft' | 'pending_review' | 'published'

async function resolveSellerId(
  supabase: SupabaseClient,
  form: PropertyFormState
): Promise<{ sellerId: string | null; failed: boolean }> {
  if (form.sellerMode === 'existing') {
    return { sellerId: form.sellerId || null, failed: false }
  }
  if (!form.newSeller.full_name.trim()) {
    return { sellerId: null, failed: false }
  }

  const { data: seller, error } = await supabase
    .from('sellers')
    .insert({
      full_name: form.newSeller.full_name.trim(),
      phone: form.newSeller.phone || null,
      whatsapp: form.newSeller.whatsapp || null,
      email: form.newSeller.email || null,
      type: form.newSeller.type,
      internal_notes: form.newSeller.internal_notes || null,
    })
    .select('id')
    .single()

  if (error) {
    console.error('resolveSellerId error:', error.message)
    return { sellerId: null, failed: true }
  }

  return { sellerId: seller.id, failed: false }
}

async function syncAmenities(supabase: SupabaseClient, propertyId: string, amenityIds: string[]) {
  await supabase.from('property_amenities').delete().eq('property_id', propertyId)
  if (amenityIds.length > 0) {
    const rows = amenityIds.map((amenity_id) => ({ property_id: propertyId, amenity_id }))
    const { error } = await supabase.from('property_amenities').insert(rows)
    if (error) console.error('syncAmenities error:', error.message)
  }
}

async function syncMedia(supabase: SupabaseClient, propertyId: string, form: PropertyFormState) {
  await supabase.from('property_media').delete().eq('property_id', propertyId)
  const rows = buildMediaInsertRows(propertyId, form)
  if (rows.length > 0) {
    const { error } = await supabase.from('property_media').insert(rows)
    if (error) console.error('syncMedia error:', error.message)
  }
}

export async function createProperty(form: PropertyFormState, targetStatus: TargetStatus): Promise<SavePropertyResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'auth' }

  const { sellerId, failed: sellerFailed } = await resolveSellerId(supabase, form)
  if (sellerFailed) return { error: 'seller' }

  let status: TargetStatus = targetStatus
  let payload = buildPropertyPayload(form, status, sellerId, { createdBy: user.id })
  let { data: property, error: propertyError } = await supabase.from('properties').insert(payload).select('id').single()

  let fellBack = false
  if (propertyError && targetStatus === 'published') {
    status = 'pending_review'
    payload = buildPropertyPayload(form, status, sellerId, { createdBy: user.id })
    ;({ data: property, error: propertyError } = await supabase.from('properties').insert(payload).select('id').single())
    fellBack = !propertyError
  }

  if (propertyError || !property) {
    console.error('createProperty property error:', propertyError?.message)
    return { error: 'property' }
  }

  await syncAmenities(supabase, property.id, form.amenityIds)
  await syncMedia(supabase, property.id, form)

  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')

  return { error: null, id: property.id, fellBackToPendingReview: fellBack }
}

export async function updateProperty(
  propertyId: string,
  form: PropertyFormState,
  targetStatus: TargetStatus
): Promise<SavePropertyResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'auth' }

  const { sellerId, failed: sellerFailed } = await resolveSellerId(supabase, form)
  if (sellerFailed) return { error: 'seller' }

  let status: TargetStatus = targetStatus
  let payload = buildPropertyPayload(form, status, sellerId)
  let { data: updated, error: updateError } = await supabase
    .from('properties')
    .update(payload)
    .eq('id', propertyId)
    .select('id')
    .single()

  // RLS on UPDATE often just filters the row silently (no data, no explicit error) rather than
  // throwing — `.single()` then errors with "no rows found", which we treat the same as a denial.
  let fellBack = false
  if ((updateError || !updated) && targetStatus === 'published') {
    status = 'pending_review'
    payload = buildPropertyPayload(form, status, sellerId)
    ;({ data: updated, error: updateError } = await supabase
      .from('properties')
      .update(payload)
      .eq('id', propertyId)
      .select('id')
      .single())
    fellBack = !updateError && Boolean(updated)
  }

  if (updateError || !updated) {
    console.error('updateProperty error:', updateError?.message)
    return { error: 'property' }
  }

  await syncAmenities(supabase, propertyId, form.amenityIds)
  await syncMedia(supabase, propertyId, form)

  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')
  revalidatePath(`/properties/${propertyId}`)

  return { error: null, id: propertyId, fellBackToPendingReview: fellBack }
}

type DuplicateErrorCode = 'auth' | 'not_found' | 'failed' | null

export async function duplicateProperty(id: string): Promise<{ error: DuplicateErrorCode; id?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'auth' }

  const { data: source, error: sourceError } = await supabase.from('properties').select('*').eq('id', id).single()
  if (sourceError || !source) return { error: 'not_found' }

  const raw = source as Record<string, unknown>
  const omit = new Set(['id', 'ref_number', 'created_at', 'created_by', 'published_at', 'status', 'views_count'])
  const copyableFields = Object.fromEntries(Object.entries(raw).filter(([key]) => !omit.has(key)))

  const { data: created, error: createError } = await supabase
    .from('properties')
    .insert({ ...copyableFields, status: 'draft', published_at: null, created_by: user.id })
    .select('id')
    .single()

  if (createError || !created) {
    console.error('duplicateProperty error:', createError?.message)
    return { error: 'failed' }
  }

  const [{ data: amenities }, { data: media }] = await Promise.all([
    supabase.from('property_amenities').select('amenity_id').eq('property_id', id),
    supabase.from('property_media').select('url, type, is_primary, sort_order').eq('property_id', id),
  ])

  if (amenities && amenities.length > 0) {
    await supabase.from('property_amenities').insert(amenities.map((a) => ({ property_id: created.id, amenity_id: a.amenity_id })))
  }
  if (media && media.length > 0) {
    await supabase.from('property_media').insert(media.map((m) => ({ ...m, property_id: created.id })))
  }

  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')

  return { error: null, id: created.id }
}
