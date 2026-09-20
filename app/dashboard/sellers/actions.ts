'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../lib/supabase-server'
import { isSellerFieldsValid, type SellerFieldsValue } from '../../../lib/seller-fields'

export type SellerFormInput = SellerFieldsValue

type SaveErrorCode = 'auth' | 'validation' | 'save' | null

export type SaveSellerResult = { error: SaveErrorCode; id?: string }

function buildPayload(form: SellerFormInput) {
  return {
    full_name: form.full_name.trim(),
    phone: form.phone.trim() || null,
    whatsapp: form.whatsapp.trim() || null,
    email: form.email.trim() || null,
    type: form.type,
    internal_notes: form.internal_notes.trim() || null,
  }
}

export async function createSeller(form: SellerFormInput): Promise<SaveSellerResult> {
  if (!isSellerFieldsValid(form)) return { error: 'validation' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'auth' }

  const { data, error } = await supabase
    .from('sellers')
    .insert({ ...buildPayload(form), created_by: user.id })
    .select('id')
    .single()

  if (error || !data) {
    console.error('createSeller error:', error?.message)
    return { error: 'save' }
  }

  revalidatePath('/dashboard/sellers')

  return { error: null, id: data.id }
}

export async function updateSeller(id: string, form: SellerFormInput): Promise<SaveSellerResult> {
  if (!isSellerFieldsValid(form)) return { error: 'validation' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'auth' }

  const { data, error } = await supabase.from('sellers').update(buildPayload(form)).eq('id', id).select('id').single()

  if (error || !data) {
    console.error('updateSeller error:', error?.message)
    return { error: 'save' }
  }

  revalidatePath('/dashboard/sellers')
  revalidatePath(`/dashboard/sellers/${id}`)

  return { error: null, id }
}

export type DeleteSellerResult = { error: 'auth' | 'delete' | null }

export async function deleteSeller(id: string): Promise<DeleteSellerResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'auth' }

  const { error } = await supabase.from('sellers').delete().eq('id', id)

  if (error) {
    console.error('deleteSeller error:', error.message)
    return { error: 'delete' }
  }

  revalidatePath('/dashboard/sellers')
  revalidatePath('/dashboard/properties')
  revalidatePath('/dashboard')

  return { error: null }
}
