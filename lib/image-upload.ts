import { supabase } from './supabase'

const STORAGE_BUCKET = 'properties'
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82
export const MAX_UPLOAD_FILE_SIZE = 15 * 1024 * 1024 // 15MB, checked before we even attempt to resize

/** Downscales + re-encodes an image client-side so uploads stay small and the site stays fast. */
async function resizeImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas 2d context unavailable')
  ctx.drawImage(bitmap, 0, 0, width, height)

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('canvas toBlob failed'))), 'image/jpeg', JPEG_QUALITY)
  })
}

export class ImageUploadError extends Error {}

export async function uploadPropertyImage(file: File, folder: string): Promise<{ path: string; url: string }> {
  if (file.size > MAX_UPLOAD_FILE_SIZE) {
    throw new ImageUploadError('file_too_large')
  }

  let blob: Blob = file
  let ext = (file.name.split('.').pop() || 'jpg').toLowerCase()

  try {
    blob = await resizeImage(file)
    ext = 'jpg'
  } catch {
    // Resize failed (unsupported format, huge file, older browser) — fall back to the original file.
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const path = `${folder}/${filename}`

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, blob, {
    contentType: ext === 'jpg' ? 'image/jpeg' : file.type || 'image/jpeg',
    upsert: false,
  })

  if (error) throw new ImageUploadError(error.message)

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return { path, url: data.publicUrl }
}

export async function removePropertyImage(path: string): Promise<void> {
  await supabase.storage.from(STORAGE_BUCKET).remove([path])
}
