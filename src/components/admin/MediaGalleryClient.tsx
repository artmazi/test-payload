'use client'
import { useEffect, useRef, useState } from 'react'
import { formatBytes } from '@/helpers/formatBytes'

export type GalleryItem = { id: string; url: string; filename: string; alt: string; mimeType: string; filesize: number; width: number | null; height: number | null }

const KEY = 'i3d-media-view'

export default function MediaGalleryClient({ items }: { items: GalleryItem[] }) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  // Inside a picker drawer ("Choose from existing") the default table must handle selection, so the grid steps aside
  const ref = useRef<HTMLDivElement>(null)
  const [inDrawer, setInDrawer] = useState(false)
  useEffect(() => setInDrawer(!!ref.current?.closest('.drawer, .list-drawer')), [])
  // Remember the choice per browser; storage can be unavailable (private mode), so default to grid
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === 'list') setView('list')
    } catch {}
  }, [])
  useEffect(() => {
    // The default table is hidden with CSS while the grid is shown
    if (inDrawer) return
    document.body.classList.toggle('i3d-media-grid', view === 'grid')
    try {
      localStorage.setItem(KEY, view)
    } catch {}
    return () => document.body.classList.remove('i3d-media-grid')
  }, [view, inDrawer])

  if (inDrawer) return null
  return (
    <div className="i3d-gallery" ref={ref}>
      <div className="i3d-gallery__toggle" role="group" aria-label="View">
        {(['grid', 'list'] as const).map((v) => (
          <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
            {v === 'grid' ? '▦ Grid' : '☰ List'}
          </button>
        ))}
      </div>
      {view === 'grid' && (
        <ul className="i3d-gallery__grid">
          {items.map((m) => {
            const isImage = m.mimeType.startsWith('image/')
            return (
              <li key={m.id}>
                <a href={`/admin/collections/media/${m.id}`} className="i3d-gallery__card">
                  <span className="i3d-gallery__thumb">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin thumbnails, lazy so a page of 50 stays light
                      <img src={m.url} alt={m.alt} loading="lazy" decoding="async" />
                    ) : (
                      <span className="i3d-gallery__ext">{m.filename.split('.').pop()?.toUpperCase()}</span>
                    )}
                  </span>
                  <span className="i3d-gallery__name" title={m.filename}>{m.filename}</span>
                  <span className="i3d-gallery__meta">
                    {formatBytes(m.filesize)}
                    {m.width && m.height ? ` · ${m.width}×${m.height}` : ''}
                  </span>
                </a>
              </li>
            )
          })}
          {!items.length && <li className="i3d-gallery__empty">No files match.</li>}
        </ul>
      )}
    </div>
  )
}
