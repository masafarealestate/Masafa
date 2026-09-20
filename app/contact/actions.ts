'use server'

import { createClient } from '../../lib/supabase-server'

export type ContactFormInput = {
  name: string
  phone: string
  email: string
  message: string
}

export type SubmitContactResult = { error: 'validation' | 'save' | null }

export async function submitContactForm(form: ContactFormInput): Promise<SubmitContactResult> {
  const name = form.name.trim()
  const phone = form.phone.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name || !message || (!phone && !email)) {
    return { error: 'validation' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert({
    name,
    phone: phone || null,
    email: email || null,
    message,
    status: 'new',
    property_id: null,
    agent_id: null,
  })

  if (error) {
    console.error('submitContactForm error:', error.message)
    return { error: 'save' }
  }

  return { error: null }
}
