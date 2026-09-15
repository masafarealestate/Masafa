'use client'

import { useRef, useState } from 'react'
import type { Dictionary } from '../../../lib/i18n/dictionaries'
import { ImageUploadError, MAX_UPLOAD_FILE_SIZE, removePropertyImage, uploadPropertyImage } from '../../../lib/image-upload'
import type { MediaItem, PropertyFormState } from '../../../lib/property-wizard'
import { inputClass, labelClass } from './fieldStyles'

export function PhotosStep({
  form,
  onChange,
  folder,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  folder: string
  t: Dictionary['dashboard']['propertyWizard']
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragIndexRef = useRef<number | null>(null)

  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const photos = form.media.filter((m) => m.type === 'photo')

  function updatePhotos(next: MediaItem[]) {
    onChange({ media: [...next, ...form.media.filter((m) => m.type !== 'photo')] })
  }

  async function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return

    setError(null)
    setUploading(true)

    const uploaded: MediaItem[] = []
    for (const file of files) {
      if (file.size > MAX_UPLOAD_FILE_SIZE) {
        setError(t.photos.errors.tooLarge)
        continue
      }
      try {
        const { path, url } = await uploadPropertyImage(file, folder)
        uploaded.push({ path, url, type: 'photo', isPrimary: false })
      } catch (err) {
        const isTooLarge = err instanceof ImageUploadError && err.message === 'file_too_large'
        setError(isTooLarge ? t.photos.errors.tooLarge : t.photos.errors.uploadFailed)
      }
    }

    if (uploaded.length > 0) {
      const current = form.media.filter((m) => m.type === 'photo')
      const next = [...current, ...uploaded]
      if (!next.some((p) => p.isPrimary) && next.length > 0) next[0] = { ...next[0], isPrimary: true }
      updatePhotos(next)
    }

    setUploading(false)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) void handleFiles(e.dataTransfer.files)
  }

  function setPrimary(index: number) {
    updatePhotos(photos.map((p, i) => ({ ...p, isPrimary: i === index })))
  }

  async function removeAt(index: number) {
    const target = photos[index]
    if (target.path) await removePropertyImage(target.path).catch(() => undefined)
    const next = photos.filter((_, i) => i !== index)
    if (target.isPrimary && next.length > 0) next[0] = { ...next[0], isPrimary: true }
    updatePhotos(next)
  }

  function moveTo(from: number, to: number) {
    if (to < 0 || to >= photos.length) return
    const next = [...photos]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    updatePhotos(next)
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.photos.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.photos.subheading}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        className={`mt-6 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-10 text-center transition-colors motion-safe:duration-150 ${
          dragOver ? 'border-brass bg-brass/10' : 'border-stone bg-sand hover:border-brass'
        }`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="text-muted">
          <path d="M12 16V4m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
        </svg>
        <p className="text-sm font-medium text-ink">{t.photos.dropzone}</p>
        <p className="text-xs text-muted">{t.photos.dropzoneHint}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {uploading && <p className="mt-3 text-sm text-muted">{t.photos.uploading}</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {photos.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={photo.url}
              draggable
              onDragStart={() => {
                dragIndexRef.current = index
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const from = dragIndexRef.current
                if (from !== null && from !== index) moveTo(from, index)
                dragIndexRef.current = null
              }}
              className="group relative overflow-hidden rounded-md border border-stone bg-surface motion-safe:transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-square w-full cursor-grab object-cover active:cursor-grabbing" />

              {photo.isPrimary && (
                <span className="absolute start-1.5 top-1.5 rounded-sm bg-[color:var(--brass)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {t.photos.primaryBadge}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/60 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100">
                <button
                  type="button"
                  onClick={() => setPrimary(index)}
                  disabled={photo.isPrimary}
                  title={t.photos.setPrimary}
                  className="rounded-sm bg-white/90 px-1.5 py-1 text-[10px] font-semibold text-ink disabled:opacity-50"
                >
                  ★
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveTo(index, index - 1)}
                    disabled={index === 0}
                    title={t.photos.moveBack}
                    className="rounded-sm bg-white/90 px-1.5 py-1 text-[10px] font-semibold text-ink disabled:opacity-50"
                  >
                    <span className="inline-block rtl:rotate-180">‹</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTo(index, index + 1)}
                    disabled={index === photos.length - 1}
                    title={t.photos.moveForward}
                    className="rounded-sm bg-white/90 px-1.5 py-1 text-[10px] font-semibold text-ink disabled:opacity-50"
                  >
                    <span className="inline-block rtl:rotate-180">›</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  title={t.photos.remove}
                  className="rounded-sm bg-white/90 px-1.5 py-1 text-[10px] font-semibold text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          {t.photos.youtubeLabel}
          <input
            type="url"
            value={form.youtubeUrl}
            onChange={(e) => onChange({ youtubeUrl: e.target.value })}
            placeholder="https://youtube.com/..."
            className={inputClass}
          />
        </label>

        <div>
          <label className={labelClass}>
            {t.photos.tourLabel}
            <input
              type="url"
              value={form.tourUrl}
              onChange={(e) => onChange({ tourUrl: e.target.value })}
              placeholder="https://..."
              className={inputClass}
            />
          </label>
          {form.tourUrl && (
            <div className="mt-2 flex gap-3 text-xs text-ink">
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="tourType"
                  checked={form.tourType === 'virtual_tour'}
                  onChange={() => onChange({ tourType: 'virtual_tour' })}
                />
                {t.photos.tourTypeVirtual}
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="tourType"
                  checked={form.tourType === 'tour_360'}
                  onChange={() => onChange({ tourType: 'tour_360' })}
                />
                {t.photos.tourType360}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
