import type { Payload } from 'payload'

// Branded welcome strip above the dashboard cards (admin.components.beforeDashboard), with live counts
export default async function DashboardBanner({ payload }: { payload: Payload }) {
  const [pages, media, categories] = await Promise.all(
    (['pages', 'media', 'categories'] as const).map((collection) => payload.count({ collection }).then((r) => r.totalDocs).catch(() => 0)),
  )
  const stats = [
    { label: 'Pages', value: pages, href: '/admin/collections/pages' },
    { label: 'Media files', value: media, href: '/admin/collections/media' },
    { label: 'Categories', value: categories, href: '/admin/collections/categories' },
  ]
  return (
    <section className="i3d-banner">
      <div className="i3d-banner__text">
        <p className="i3d-banner__eyebrow">infra3D website</p>
        <h2 className="i3d-banner__title">Welcome back</h2>
        <p className="i3d-banner__sub">Edit pages, menus and media for every category of the site.</p>
        <div className="i3d-banner__stats">
          {stats.map((s) => (
            <a key={s.label} href={s.href} className="i3d-banner__stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Decorative: a road in perspective over a dotted point cloud, in the brand colours */}
      <svg className="i3d-banner__art" viewBox="0 0 320 180" aria-hidden="true">
        <defs>
          <linearGradient id="i3d-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: 16 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={10 + col * 20 + (row % 2) * 10} cy={20 + row * 18} r={1 + row * 0.18} fill="#ffffff" opacity={0.12 + row * 0.04} />
          )),
        )}
        <path d="M150 30 L170 30 L270 180 L50 180 Z" fill="url(#i3d-road)" />
        <path d="M160 40 L160 60 M160 78 L160 104 M160 124 L160 160" stroke="#E96200" strokeWidth="4" strokeLinecap="round" />
        <circle cx="236" cy="62" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
        <path d="M226 62 l7 7 l13 -14" fill="none" stroke="#13F100" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </section>
  )
}
