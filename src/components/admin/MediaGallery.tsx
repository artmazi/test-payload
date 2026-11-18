import type { BeforeListTableServerProps } from 'payload'
import MediaGalleryClient, { type GalleryItem } from './MediaGalleryClient'

// Grid view for the media list (beforeListTable): uses the same page of docs as the table, so search, filters,
// sorting and pagination keep working; the client part toggles between grid and the normal table
export default function MediaGallery({ data }: BeforeListTableServerProps) {
  const items: GalleryItem[] = (data?.docs || []).map((d: any) => ({
    id: String(d.id),
    url: d.url || '',
    filename: d.filename || '',
    alt: d.alt || '',
    mimeType: d.mimeType || '',
    filesize: d.filesize || 0,
    width: d.width || null,
    height: d.height || null,
  }))
  return <MediaGalleryClient items={items} />
}
