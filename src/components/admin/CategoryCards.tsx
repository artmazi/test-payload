import type { ListViewServerProps } from 'payload'
import { Gutter } from '@payloadcms/ui'
import { CategoryIcon } from './categoryIcons'

// Categories list view as cards (admin.components.views.list); there are only a handful, so no paging or search
export default async function CategoryCards({ payload, hasCreatePermission, newDocumentURL, locale }: ListViewServerProps) {
  const { docs } = await payload.find({ collection: 'categories', depth: 0, limit: 100, sort: 'title', locale: locale?.code as any })
  const counts = await Promise.all(docs.map((c) => payload.count({ collection: 'pages', where: { category: { equals: c.id } } }).then((r) => r.totalDocs)))
  return (
    <Gutter className="i3d-cats">
      <header className="i3d-cats__head">
        <h1>Categories</h1>
        {hasCreatePermission && (
          <a href={newDocumentURL} className="btn btn--style-pill btn--size-small" style={{ margin: 0 }}>
            Create new
          </a>
        )}
      </header>
      <ul className="i3d-cats__grid">
        {docs.map((c, i) => (
          <li key={c.id} className="i3d-cat">
            <a className="i3d-cat__main" href={`/admin/collections/categories/${c.id}`}>
              <span className="i3d-cat__icon"><CategoryIcon name={c.icon} /></span>
              <span className="i3d-cat__title">{c.title}</span>
              <span className="i3d-cat__slug">/{c.slug}</span>
            </a>
            <div className="i3d-cat__stats">
              <span><strong>{counts[i]}</strong> pages</span>
              <span><strong>{c.menu?.length || 0}</strong> menu items</span>
            </div>
            <div className="i3d-cat__links">
              <a href={`/admin/collections/pages?where[category][equals]=${c.id}`}>Pages</a>
              <a href={`/admin/collections/categories/${c.id}`}>Edit menu</a>
            </div>
          </li>
        ))}
      </ul>
    </Gutter>
  )
}
