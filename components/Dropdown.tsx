'use client'

import { useEffect, useId, useRef, useState } from 'react'

export type DropdownOption = { value: string; label: string }

// Lets every open dropdown tell its siblings to close, without a shared provider.
const DROPDOWN_OPEN_EVENT = 'masafa:dropdown-open'

export function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
}) {
  const instanceId = useId()
  const labelId = `${instanceId}-label`
  const listboxId = `${instanceId}-listbox`

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])
  const pendingScrollIndexRef = useRef<number | null>(null)

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  )
  const selectedOption = options[selectedIndex] ?? options[0]

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  useEffect(() => {
    function handleOtherOpen(e: Event) {
      const detail = (e as CustomEvent<string>).detail
      if (detail !== instanceId) setOpen(false)
    }
    document.addEventListener(DROPDOWN_OPEN_EVENT, handleOtherOpen)
    return () => document.removeEventListener(DROPDOWN_OPEN_EVENT, handleOtherOpen)
  }, [instanceId])

  // Scrolls to the initially-active option once, right after the panel mounts (refs only
  // exist post-commit). Deliberately NOT re-run on later activeIndex changes — those are
  // handled explicitly by keyboard navigation below, so hovering never fights a manual scroll.
  useEffect(() => {
    if (open && pendingScrollIndexRef.current !== null) {
      optionRefs.current[pendingScrollIndexRef.current]?.scrollIntoView({ block: 'nearest' })
      pendingScrollIndexRef.current = null
    }
  }, [open])

  function openDropdown(startIndex: number) {
    setActiveIndex(startIndex)
    setOpen(true)
    pendingScrollIndexRef.current = startIndex
    document.dispatchEvent(new CustomEvent(DROPDOWN_OPEN_EVENT, { detail: instanceId }))
  }

  // Keyboard-driven moves scroll the newly active option into view immediately; the option
  // refs already exist since the panel must be open to reach this path.
  function moveActiveIndex(nextIndex: number) {
    setActiveIndex(nextIndex)
    optionRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' })
  }

  function selectOption(index: number) {
    const opt = options[index]
    if (opt) onChange(opt.value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function handleButtonKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openDropdown(selectedIndex)
        else moveActiveIndex(Math.min(activeIndex + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openDropdown(selectedIndex)
        else moveActiveIndex(Math.max(activeIndex - 1, 0))
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          moveActiveIndex(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          moveActiveIndex(options.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) openDropdown(selectedIndex)
        else selectOption(activeIndex)
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          setOpen(false)
        }
        break
      default:
        break
    }
  }

  function handleBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} onBlur={handleBlur} className="relative flex flex-col gap-1 text-xs font-medium text-muted">
      <span id={labelId}>{label}</span>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${instanceId}-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openDropdown(selectedIndex))}
        onKeyDown={handleButtonKeyDown}
        className="flex items-center justify-between gap-2 rounded-sm border border-stone bg-surface px-3 py-2 text-start text-sm text-ink transition-colors hover:border-brass hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          width="16"
          height="16"
          className="dropdown-chevron shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--muted)' }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          // Prevents the browser's default focus-shift on mousedown over non-focusable
          // content (options, scrollbar). Without this, interacting with the list blurs
          // the trigger button, which fires handleBlur and closes the panel mid-gesture.
          onMouseDown={(e) => e.preventDefault()}
          className="dropdown-panel start-0 top-full mt-1.5 w-full p-1"
        >
          {options.map((opt, i) => {
            const selected = opt.value === value
            const active = i === activeIndex
            return (
              <li
                key={opt.value}
                id={`${instanceId}-option-${i}`}
                role="option"
                aria-selected={selected}
                ref={(el) => {
                  optionRefs.current[i] = el
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => selectOption(i)}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm text-ink"
                style={{ background: active ? 'var(--sand)' : 'transparent' }}
              >
                <span className="truncate" style={selected ? { color: 'var(--brass)', fontWeight: 600 } : undefined}>
                  {opt.label}
                </span>
                {selected && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    className="shrink-0"
                    style={{ color: 'var(--brass)' }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m4 10 4 4 8-8" />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
