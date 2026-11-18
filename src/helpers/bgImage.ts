import { getImageProps } from 'next/image'

// CSS background through the Next image optimizer: resized WebP/AVIF instead of the raw (often 1 MB+) upload.
// Same approach as the next/image docs' getImageProps + image-set() example.
export const bgImage = (src?: string | null, width = 1920): string | undefined => {
	if (!src) return undefined
	// SVGs and external hosts outside images.remotePatterns go through untouched
	if (src.endsWith('.svg') || (/^https?:\/\//.test(src) && !/(\.public\.blob\.vercel-storage\.com|inovitas\.ch)\//.test(src))) return `url("${src}")`
	const { srcSet } = getImageProps({ src, alt: '', width, height: Math.round(width * 0.5625) }).props
	if (!srcSet) return `url("${src}")`
	return `image-set(${srcSet.split(', ').map((s) => { const [url, dpi] = s.split(' '); return `url("${url}") ${dpi}` }).join(', ')})`
}
