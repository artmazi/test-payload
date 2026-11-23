// href for a linkFields() value: page links follow the page, /<locale>[/<category>][/<slug>] (home has no slug segment);
// URL links are used as typed
export const linkHref = (link: any, locale: string): string => {
	const page = link?.type === 'page' && typeof link.page === 'object' ? link.page : null
	if (!page) return link?.url || '#'
	return '/' + [locale, page.category?.slug, page.slug === 'home' ? null : page.slug].filter(Boolean).join('/')
}
